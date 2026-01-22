package com.emission_impossible.carbon_modelling_tool.seeder;

import com.emission_impossible.carbon_modelling_tool.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(1)
public class UserSeeder implements CommandLineRunner {

    private final UserRepository userRepository;

    public UserSeeder(UserRepository userRepository){
        this.userRepository = userRepository;
    }


    @Override
    public void run(String... args) {
        // Populate client repository as it is empty
        if (this.userRepository.count() == 0) {

        }else{
            System.out.println("User Database already contains users.");
        }
    }


}
