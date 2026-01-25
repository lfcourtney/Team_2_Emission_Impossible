package com.emission_impossible.carbon_modelling_tool.service;

import com.emission_impossible.carbon_modelling_tool.model.User;
import com.emission_impossible.carbon_modelling_tool.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Works with UserRepository, the class that is able to interact with the User
 * database storing the logged in users directly.
 */
@Service
public class UserService implements UserDetailsService{

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(username);


        if(user.isEmpty()) {
            throw new UsernameNotFoundException("User not found with this email: "+username);

        }


        System.out.println("Loaded user: " + user.get().getEmail());
        List<GrantedAuthority> authorities = new ArrayList<>();
        return new org.springframework.security.core.userdetails.User(
                user.get().getEmail(),
                user.get().getPassword(),
                authorities);
    }


}
