package com.emission_impossible.carbon_modelling_tool.seeder;

import com.emission_impossible.carbon_modelling_tool.repository.EmissionTypeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(6)
public class EmissionTypeSeeder implements CommandLineRunner {

    private final EmissionTypeRepository emissionTypeRepository;

    public EmissionTypeSeeder(EmissionTypeRepository emissionTypeRepository){
        this.emissionTypeRepository = emissionTypeRepository;
    }


    @Override
    public void run(String... args) {
        // Populate client repository as it is empty
        if (this.emissionTypeRepository.count() == 0) {

        }else{
            System.out.println("Emission Type Database already contains emission types.");
        }
    }


}
