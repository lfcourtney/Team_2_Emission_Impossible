package com.emission_impossible.carbon_modelling_tool.seeder;

import com.emission_impossible.carbon_modelling_tool.model.Client;
import com.emission_impossible.carbon_modelling_tool.model.EmissionType;
import com.emission_impossible.carbon_modelling_tool.repository.ClientRepository;
import com.emission_impossible.carbon_modelling_tool.util.CsvUtils;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(1)
public class ClientSeeder implements CommandLineRunner {

    private final ClientRepository clientRepository;

    public ClientSeeder(ClientRepository clientRepository){
        this.clientRepository = clientRepository;
    }


    @Override
    public void run(String... args) {
        if (this.clientRepository.count() > 0) {
            System.out.println("Client Database already contains clients.");
            return;
        }

        // For each row of data in CSV file
        // Important: requires file in /src/main/resources/seed-data to run
        CsvUtils.read("seed-data/clients.csv").forEach(row -> {

            // New client type to save
            Client client = new Client(
                    row.get("name")
            );

            // Save new emission type given current CSV row
            this.clientRepository.save(client);
        });
    }
}
