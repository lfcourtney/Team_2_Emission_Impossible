package com.emission_impossible.carbon_modelling_tool.SecurityConfig;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
public class ApplicationConfig {

    @SuppressWarnings("deprecation")
    @Bean
    // Intercepts each and every HTTP requests such that
        // this code is executed before every HTTP request.
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http


                .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(
                            /*
                            /api/** → authenticated()

                            Any request whose path starts with /api/

                            Must be authenticated

                            Your JwtTokenValidator filter is expected to validate the JWT and set the security context

                            anyRequest().permitAll()

                            Every other request that does NOT match /api/**

                            Is allowed without authentication

                            No login, no JWT, no credentials required.

                            Example axios request using JTW token ('jsonWebToken'):

                            axios.get('http://localhost:8081/api/get-authenticated-user', {
                                  headers: {
                                    "Authorization": "Bearer " + jsonWebToken,
                                  },

                                  // indicates whether or not cross-site Access-Control requests
                                  // should be made using credentials
                                  withCredentials: true
                                })
                             */
                        authorize -> authorize.requestMatchers("/api/**")
                                .authenticated().anyRequest().permitAll())
                .addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class)
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()));
        //.httpBasic(Customizer.withDefaults())
        //.formLogin(Customizer.withDefaults());
        return http.build();
    }


    // Prevent Cross-Origin Resource Sharing (CORS) error when HTTP
    // requests are made from frontend. To that end, allow requests
    // from localhost 5173: localhost uses port 5173
    private CorsConfigurationSource corsConfigurationSource() {
        return new CorsConfigurationSource() {
            @Override
            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                CorsConfiguration ccfg = new CorsConfiguration();

                // Note: frontend is configured to port 5173.
                ccfg.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
                ccfg.setAllowedMethods(Collections.singletonList("*"));
                ccfg.setAllowCredentials(true);
                ccfg.setAllowedHeaders(Collections.singletonList("*"));
                ccfg.setExposedHeaders(Arrays.asList("Authorization"));
                ccfg.setMaxAge(3600L);
                return ccfg;

            }
        };

    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
