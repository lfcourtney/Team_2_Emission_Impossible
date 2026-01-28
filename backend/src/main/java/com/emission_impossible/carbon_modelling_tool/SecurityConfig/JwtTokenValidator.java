package com.emission_impossible.carbon_modelling_tool.SecurityConfig;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;


import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.List;

/**
 * Enforce that all requests to /api/** have JWT token in request header.
 *
 * Instantiated, therefore, in 'ApplicationConfig', used specifically in the SecurityFilterChain:
 *
 * SecurityFilterChain intercepts all HTTP requests, executing before all HTTP requests
 *
 * * ============================================================================
 *  * JwtTokenValidator
 *  * ============================================================================
 *  *
 *  * PURPOSE (High-level):
 *  * --------------------
 *  * This class is responsible for checking whether an incoming HTTP request
 *  * contains a valid JSON Web Token (JWT). If the token is valid, the user is
 *  * considered "authenticated" (logged in) for the duration of that request.
 *  *
 *  * In simple terms:
 *  * - It looks for a token in the request
 *  * - It verifies that the token is real and unmodified
 *  * - It extracts the user's identity and permissions
 *  * - It tells Spring Security: "this user is allowed to proceed"
 *  *
 *  *
 *  * WHAT IS A JSON WEB TOKEN (JWT)?
 *  * ------------------------------
 *  * A JSON Web Token (JWT) is a compact, secure way to represent user information.
 *  * It is commonly used for authentication in modern web applications.
 *  *
 *  * Think of a JWT like a **tamper-proof digital ID card**:
 *  * - It is issued when a user successfully logs in
 *  * - It is sent by the client (browser, mobile app, etc.) with every request
 *  * - The server verifies it instead of asking for a username/password again
 *  *
 *  * A JWT usually contains:
 *  * - Who the user is (e.g. email)
 *  * - What the user is allowed to do (roles/permissions)
 *  * - A digital signature to prove it was issued by your server
 *  *
 *  *
 *  * HOW JWT AUTHENTICATION WORKS (Beginner-friendly flow):
 *  * ------------------------------------------------------
 *  * 1. User logs in with username/password
 *  * 2. Server creates a JWT and signs it using a secret key
 *  * 3. Client stores the JWT (e.g. in local storage)
 *  * 4. Client sends the JWT in the HTTP header with each request
 *  * 5. This filter:
 *  *    - Reads the token
 *  *    - Verifies the signature
 *  *    - Extracts user details
 *  *    - Marks the request as authenticated
 *  *
 *  *
 *  * WHY THIS CLASS EXTENDS OncePerRequestFilter:
 *  * --------------------------------------------
 *  * OncePerRequestFilter ensures that this logic runs **once per HTTP request**.
 *  * This is important for performance and security.
 *  *
 *  *
 *  * WHY THIS FILTER EXISTS:
 *  * -----------------------
 *  * Spring Security does not automatically understand JWTs.
 *  * This class "teaches" Spring Security how to:
 *  * - Read JWTs
 *  * - Validate them
 *  * - Convert them into Spring Security authentication objects
 *  *
 *  *
 *  * WHERE THIS FILTER IS USED:
 *  * --------------------------
 *  * This filter is registered in the Spring SecurityFilterChain.
 *  * That means it runs BEFORE your controllers receive the request.
 *  *
 *  * If authentication fails, the request will not reach your API endpoints.
 *  */
public class JwtTokenValidator extends OncePerRequestFilter {

    /**
     * This method is automatically called by Spring for every HTTP request, a result of its inclusion in the Spring SecurityFilterChain.
     * It performs the JWT validation logic.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // Step 1: Read the JWT from the HTTP request header
        // Example header:
        // Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
        String jwt = request.getHeader(JwtConstant.JWT_HEADER);
        System.out.println("JWT Token in JwtTokenValidator: " + jwt);
        if (jwt != null && jwt.startsWith("Bearer ")) {

            // Remove "Bearer " prefix to get the actual token
            jwt = jwt.substring(7);

            System.out.println("JWT Token in JwtTokenValidator: " + jwt);
            try {
                // Step 2: Recreate the secret key used to sign the token
                // This key MUST match the one used when the token was created
                SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

                // Step 3: Verify the token and extract its contents ("claims")
                @SuppressWarnings("deprecation")
                Claims claims = Jwts.parser().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
                System.out.print(claims);

                // Step 4: Extract user information from the token
                String email = String.valueOf(claims.get("email"));
                System.out.print(email);
                String authorities = String.valueOf(claims.get("authorities"));


                // Step 5: Convert roles/permissions into Spring Security format
                List<GrantedAuthority> auth = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);


                // Step 6: Create an Authentication object
                Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, auth);

                // Step 7: Store authentication in Spring Security context
                // This tells Spring: "this request is authenticated"
                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (Exception e) {
                // If token is invalid, expired, or tampered with
                throw new BadCredentialsException("Invalid token", e);
            }
        }

        // Step 8: Continue processing the request
        filterChain.doFilter(request, response);
    }
}