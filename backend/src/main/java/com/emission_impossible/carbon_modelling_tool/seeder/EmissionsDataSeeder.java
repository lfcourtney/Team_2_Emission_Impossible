package com.emission_impossible.carbon_modelling_tool.seeder;

import com.emission_impossible.carbon_modelling_tool.repository.ConversionRateRepository;
import com.emission_impossible.carbon_modelling_tool.repository.EmissionsDataRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(5)
public class EmissionsDataSeeder implements CommandLineRunner {

    private final EmissionsDataRepository emissionsDataRepository;

    public EmissionsDataSeeder(EmissionsDataRepository emissionsDataRepository){
        this.emissionsDataRepository = emissionsDataRepository;
    }


    @Override
    public void run(String... args) {
        // Populate client repository as it is empty
        if (this.emissionsDataRepository.count() == 0) {

        }else{
            System.out.println("Emissions Data Database already contains emissions data.");
        }
    }


}
