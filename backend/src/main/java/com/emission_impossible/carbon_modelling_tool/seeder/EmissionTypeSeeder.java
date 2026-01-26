package com.emission_impossible.carbon_modelling_tool.seeder;

import com.emission_impossible.carbon_modelling_tool.model.EmissionType;
import com.emission_impossible.carbon_modelling_tool.repository.EmissionTypeRepository;
import com.emission_impossible.carbon_modelling_tool.util.CsvUtils;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
// Do not run in test profile
@Profile("!test")
@Order(3)
public class EmissionTypeSeeder implements CommandLineRunner {

    private final EmissionTypeRepository emissionTypeRepository;

    public EmissionTypeSeeder(EmissionTypeRepository emissionTypeRepository){
        this.emissionTypeRepository = emissionTypeRepository;
    }


    @Override
    public void run(String... args) {
        if (this.emissionTypeRepository.count() > 0) {
            System.out.println("Emission Type Database already contains emission types.");
            return;
        }

        // For each row of data in CSV file
        // Important: requires file in /src/main/resources/seed-data to run
        CsvUtils.read("seed-data/emission_types.csv").forEach(row -> {

            // New emission type to save
            EmissionType emissionType = new EmissionType(
                    row.get("name"),
                    row.get("unit"),
                    row.get("scope"),
                    row.get("description")
            );

            // Save new emission type given current CSV row
            this.emissionTypeRepository.save(emissionType);
        });
    }
}
