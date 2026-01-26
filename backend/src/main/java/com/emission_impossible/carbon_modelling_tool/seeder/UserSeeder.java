package com.emission_impossible.carbon_modelling_tool.seeder;

import com.emission_impossible.carbon_modelling_tool.model.User;
import com.emission_impossible.carbon_modelling_tool.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
// Do not run in test profile
@Profile("!test")
// Make the last seeder class to be run: it has no dependencies.
@Order(6)
public class UserSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    // Password Encoder comes from spring boot security
    private final PasswordEncoder passwordEncoder;

    public UserSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Add default users to application.
     * Necessary so that login functionality can be demonstrated.
     * Add two users so that logout functionality can be demonstrated.
     *
     * Password encoder uses bcrypt so that passwords are
     * not stored unencrypted in database
     */
    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            userRepository.save(new User("Jack Bauer", "jack@email.com", this.passwordEncoder.encode("password")));
            userRepository.save(new User("Fox Mulder", "fox@email.com", this.passwordEncoder.encode("password")));

            System.out.println("Database initialised with default users.");
        } else {
            System.out.println("Database already contains users.");
        }
    }
}
