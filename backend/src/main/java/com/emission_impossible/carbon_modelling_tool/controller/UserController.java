package com.emission_impossible.carbon_modelling_tool.controller;


import com.emission_impossible.carbon_modelling_tool.SecurityConfig.JwtProvider;
import com.emission_impossible.carbon_modelling_tool.model.User;
import com.emission_impossible.carbon_modelling_tool.repository.UserRepository;
import com.emission_impossible.carbon_modelling_tool.response.AuthResponse;
import com.emission_impossible.carbon_modelling_tool.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

// Handle all requests from frontend to backend as part of authentication and authorisation process.
// All such requests will start with /auth
@RestController
@RequestMapping("/auth")
public class UserController {

    private final UserRepository userRepository;
    // Password Encoder comes from spring boot security
    private final PasswordEncoder passwordEncoder;
    private final UserService customUserDetails;

    // Dependency injection
    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder, UserService customUserDetails) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.customUserDetails = customUserDetails;
    }

    // Create new user entry in User table. Password value
    // will be hashed for security using Bcrypt.
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user)  {
        String email = user.getEmail();
        String password = user.getPassword();
        String fullName = user.getFullName();

        Optional<User> isEmailExist = userRepository.findByEmail(email);

        // Not empty. Therefore, user exists. Therefore, throw exception.
        if (!isEmailExist.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email Is Already Used With Another Account");
        }

        User createdUser = new User();
        createdUser.setEmail(email);
        createdUser.setFullName(fullName);
        createdUser.setPassword(passwordEncoder.encode(password));

        User savedUser = userRepository.save(createdUser);
        userRepository.save(savedUser);
        Authentication authentication = new UsernamePasswordAuthenticationToken(email,password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = JwtProvider.generateToken(authentication);


        //NOTE: Once user is signed in.
        // The way to get authenticated user:
        //Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        //String currentPrincipalName = authentication.getName();

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Register Success");
        authResponse.setStatus(true);
        return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.OK);

    }





    // Throws 403 forbidden HTTP response if client is
    // trying to sign into an account that has not been
    // registered. Otherwise will set the current authentication session,
    // using the authorised sign in details submitted by the user.
    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody User loginRequest) {
        String username = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        System.out.println(username+"-------"+password);

        Authentication authentication = authenticate(username,password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = JwtProvider.generateToken(authentication);
        AuthResponse authResponse = new AuthResponse();

        authResponse.setMessage("Login success");
        authResponse.setJwt(token);
        authResponse.setStatus(true);

        return new ResponseEntity<AuthResponse>(authResponse,HttpStatus.OK);
    }


    // Returns necessary information to start user session
    // (calling relevant method from 'SecurityContextHolder'),
    // providing the parameters passed into this method can be
    // used to log the user into a valid user account.
    private Authentication authenticate(String username, String password) {

        System.out.println(username+"---++----"+password);

        UserDetails userDetails = customUserDetails.loadUserByUsername(username);

        System.out.println("Sig in in user details"+ userDetails);

        if(userDetails == null) {
            System.out.println("Sign in details - null" + userDetails);

            throw new BadCredentialsException("Invalid username and password");
        }

        if(!passwordEncoder.matches(password,userDetails.getPassword())) {
            System.out.println("Sign in userDetails - password mismatch"+userDetails);

            throw new BadCredentialsException("Invalid password");

        }

        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());

    }



}

