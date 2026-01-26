package com.emission_impossible.carbon_modelling_tool;

import com.emission_impossible.carbon_modelling_tool.model.User;
import com.emission_impossible.carbon_modelling_tool.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

class UserRepositoryTest extends BaseRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void createUser() {
        User user = new User("Test User", "test@email.com", "password");
        User saved = userRepository.save(user);

        assertNotNull(saved.getId());
    }

    @Test
    void findByEmail() {
        User user = new User("Email User", "email@test.com", "pass");
        userRepository.save(user);

        Optional<User> found = userRepository.findByEmail("email@test.com");
        assertTrue(found.isPresent());
    }
}

