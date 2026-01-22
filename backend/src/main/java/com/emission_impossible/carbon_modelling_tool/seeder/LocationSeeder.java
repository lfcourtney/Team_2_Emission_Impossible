package com.emission_impossible.carbon_modelling_tool.seeder;

import com.emission_impossible.carbon_modelling_tool.repository.LocationRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(3)
public class LocationSeeder implements CommandLineRunner {

    private final LocationRepository locationRepository;

    public LocationSeeder(LocationRepository locationRepository){
        this.locationRepository = locationRepository;
    }


    @Override
    public void run(String... args) {
        // Populate client repository as it is empty
        if (this.locationRepository.count() == 0) {

        }else{
            System.out.println("Location Database already contains locations.");
        }
    }


}
