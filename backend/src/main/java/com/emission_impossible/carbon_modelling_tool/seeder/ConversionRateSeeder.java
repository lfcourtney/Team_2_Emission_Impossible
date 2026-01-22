package com.emission_impossible.carbon_modelling_tool.seeder;

import com.emission_impossible.carbon_modelling_tool.repository.ConversionRateRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(4)
public class ConversionRateSeeder implements CommandLineRunner {

    private final ConversionRateRepository conversionRateRepository;

    public ConversionRateSeeder(ConversionRateRepository conversionRateRepository){
        this.conversionRateRepository = conversionRateRepository;
    }


    @Override
    public void run(String... args) {
        // Populate client repository as it is empty
        if (this.conversionRateRepository.count() == 0) {

        }else{
            System.out.println("Conversion Rate Database already contains conversion rates.");
        }
    }

}
