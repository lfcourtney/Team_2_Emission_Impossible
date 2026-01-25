package com.emission_impossible.carbon_modelling_tool.controller;

import com.emission_impossible.carbon_modelling_tool.model.User;
import com.emission_impossible.carbon_modelling_tool.response.UserResponse;
import com.emission_impossible.carbon_modelling_tool.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


// Handle requests that, per the Spring Security setup in ApplicationConfig,
// require a JWT value in the Authorization header.
//
// Such routes are identified in that they begin with /api
@RestController
@RequestMapping("/api")
public class ApiController {

    private final UserService userService;

    public ApiController(UserService userService){
        this.userService = userService;
    }


    @GetMapping("/get-authenticated-user")
    public ResponseEntity<UserResponse> getAuthenticatedUserHandler()  {

        //NOTE: Once user is signed in.
        // The way to get authenticated user:
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null){
            throw new AuthenticationCredentialsNotFoundException("No Authentication details found. There is no currently authenticated user.");
        }

        // Stores email address of signed in user
        String currentPrincipalName = authentication.getName();

        User signedInUser = this.userService.findByEmail(currentPrincipalName);

        UserResponse userResponse = new UserResponse(signedInUser.getFullName(), signedInUser.getEmail());

        return new ResponseEntity<>(userResponse, HttpStatus.OK);

    }

}
