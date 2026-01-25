package com.emission_impossible.carbon_modelling_tool.seeder;

import com.emission_impossible.carbon_modelling_tool.model.ConversionRate;
import com.emission_impossible.carbon_modelling_tool.model.EmissionType;
import com.emission_impossible.carbon_modelling_tool.model.EmissionsData;
import com.emission_impossible.carbon_modelling_tool.model.Location;
import com.emission_impossible.carbon_modelling_tool.repository.ConversionRateRepository;
import com.emission_impossible.carbon_modelling_tool.repository.EmissionTypeRepository;
import com.emission_impossible.carbon_modelling_tool.repository.EmissionsDataRepository;
import com.emission_impossible.carbon_modelling_tool.repository.LocationRepository;
import com.emission_impossible.carbon_modelling_tool.util.CsvUtils;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@Order(5)
public class EmissionsDataSeeder implements CommandLineRunner {

    private final EmissionsDataRepository emissionsDataRepository;
    private final EmissionTypeRepository emissionTypeRepository;
    private final LocationRepository locationRepository;

    public EmissionsDataSeeder(EmissionsDataRepository emissionsDataRepository, EmissionTypeRepository emissionTypeRepository, LocationRepository locationRepository){
        this.emissionsDataRepository = emissionsDataRepository;
        this.emissionTypeRepository = emissionTypeRepository;
        this.locationRepository = locationRepository;
    }

    @Override
    public void run(String... args) {
        if (this.emissionsDataRepository.count() > 0) {
            System.out.println("Emissions Data Database already contains emissions data.");
            return;
        }

        // For each row of data in CSV file
        // Important: requires file in /src/main/resources/seed-data to run
        CsvUtils.read("seed-data/emissions_data.csv").forEach(row -> {

            EmissionType emissionType = emissionTypeRepository
                    .findByName(row.get("emissionType"))
                    .orElseThrow(() -> new RuntimeException("EmissionType not found"));

            Location location = locationRepository
                    .findByName(row.get("location"))
                    .orElseThrow(() -> new RuntimeException("Location not found"));

            // New emissions data to save
            EmissionsData emissionData = new EmissionsData(
                    LocalDate.parse(row.get("date")),
                    Double.parseDouble(row.get("amount")),
                    emissionType,
                    location
            );

            this.emissionsDataRepository.save(emissionData);
        });
    }

}
