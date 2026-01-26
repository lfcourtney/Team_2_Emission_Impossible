package com.emission_impossible.carbon_modelling_tool;

import com.emission_impossible.carbon_modelling_tool.model.User;
import com.emission_impossible.carbon_modelling_tool.repository.UserRepository;
import com.emission_impossible.carbon_modelling_tool.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

/**
 * - Finding users by email
 * - Loading user details for authentication
 * - Testing Spring Security integration
 * - Exception handling for non-existent users
 */
class UserServiceTest extends BaseRepositoryTest {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void findByEmail() {
        User user = new User("Test User", "test@example.com", "password123");
        userRepository.save(user);

        User found = userService.findByEmail("test@example.com");

        assertNotNull(found);
        assertEquals("Test User", found.getFullName());
        assertEquals("test@example.com", found.getEmail());
    }

    @Test
    void findByEmailThrowsExceptionWhenNotFound() {
        assertThrows(UsernameNotFoundException.class,
                () -> userService.findByEmail("nonexistent@example.com"));
    }

    @Test
    void loadUserByUsername() {
        String encodedPassword = passwordEncoder.encode("password123");
        User user = new User("Test User", "test@example.com", encodedPassword);
        userRepository.save(user);

        UserDetails userDetails = userService.loadUserByUsername("test@example.com");

        assertNotNull(userDetails);
        assertEquals("test@example.com", userDetails.getUsername());
        assertEquals(encodedPassword, userDetails.getPassword());
        assertNotNull(userDetails.getAuthorities());
    }

    @Test
    void loadUserByUsernameThrowsExceptionWhenNotFound() {
        assertThrows(UsernameNotFoundException.class,
                () -> userService.loadUserByUsername("nonexistent@example.com"));
    }

    @Test
    void loadUserByUsernameReturnsUserWithEmptyAuthorities() {
        String encodedPassword = passwordEncoder.encode("password123");
        User user = new User("Test User", "test@example.com", encodedPassword);
        userRepository.save(user);

        UserDetails userDetails = userService.loadUserByUsername("test@example.com");

        assertTrue(userDetails.getAuthorities().isEmpty());
    }
}