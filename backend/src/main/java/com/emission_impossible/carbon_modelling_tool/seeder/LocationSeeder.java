package com.emission_impossible.carbon_modelling_tool.seeder;

import com.emission_impossible.carbon_modelling_tool.model.Client;
import com.emission_impossible.carbon_modelling_tool.model.EmissionType;
import com.emission_impossible.carbon_modelling_tool.model.EmissionsData;
import com.emission_impossible.carbon_modelling_tool.model.Location;
import com.emission_impossible.carbon_modelling_tool.repository.ClientRepository;
import com.emission_impossible.carbon_modelling_tool.repository.LocationRepository;
import com.emission_impossible.carbon_modelling_tool.util.CsvUtils;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@Order(2)
public class LocationSeeder implements CommandLineRunner {

    private final LocationRepository locationRepository;
    private final ClientRepository clientRepository;

    public LocationSeeder(LocationRepository locationRepository, ClientRepository clientRepository){
        this.locationRepository = locationRepository;
        this.clientRepository = clientRepository;
    }


//    @Override
//    public void run(String... args) {
//        // Populate client repository as it is empty
//        if (this.locationRepository.count() == 0) {
//            Client version1Client = this.clientRepository.findByName("Version 1")
//                    .orElseThrow(() -> new RuntimeException("Client not found"));
//
//            // Save Dublin Office
//            this.locationRepository.save(new Location("Dublin Office", "EU", version1Client));
//            this.locationRepository.save(new Location("London Office", "UK", version1Client));
//
//
//        }else{
//            System.out.println("Location Database already contains locations.");
//        }
//    }


    @Override
    public void run(String... args) {
        if (this.locationRepository.count() > 0) {
            System.out.println("Locations Database already contains locations data.");
            return;
        }

        // For each row of data in CSV file
        // Important: requires file in /src/main/resources/seed-data to run
        CsvUtils.read("seed-data/locations.csv").forEach(row -> {

            Client foundClient = this.clientRepository.findByName(row.get("clientName")).orElseThrow(() -> new RuntimeException("Client not found"));


            // New location to save
            Location location = new Location(
                    row.get("name"),
                    row.get("region"),
                    foundClient
            );

            this.locationRepository.save(location);
        });
    }


}
