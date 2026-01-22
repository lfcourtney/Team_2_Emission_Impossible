package com.emission_impossible.carbon_modelling_tool.seeder;

import com.emission_impossible.carbon_modelling_tool.repository.ClientRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(2)
public class ClientSeeder implements CommandLineRunner {

    private final ClientRepository clientRepository;

    public ClientSeeder(ClientRepository clientRepository){
        this.clientRepository = clientRepository;
    }


    @Override
    public void run(String... args) {
        // Populate client repository as it is empty
        if (this.clientRepository.count() == 0) {

        }else{
            System.out.println("Client Database already contains clients.");
        }
    }
}
