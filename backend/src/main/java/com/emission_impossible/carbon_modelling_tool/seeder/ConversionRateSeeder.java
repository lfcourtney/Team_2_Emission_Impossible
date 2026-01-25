package com.emission_impossible.carbon_modelling_tool.seeder;

import com.emission_impossible.carbon_modelling_tool.model.ConversionRate;
import com.emission_impossible.carbon_modelling_tool.model.EmissionType;
import com.emission_impossible.carbon_modelling_tool.model.Location;
import com.emission_impossible.carbon_modelling_tool.repository.ConversionRateRepository;
import com.emission_impossible.carbon_modelling_tool.repository.EmissionTypeRepository;
import com.emission_impossible.carbon_modelling_tool.repository.LocationRepository;
import com.emission_impossible.carbon_modelling_tool.util.CsvUtils;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(4)
public class ConversionRateSeeder implements CommandLineRunner {

    private final ConversionRateRepository conversionRateRepository;
    private final EmissionTypeRepository emissionTypeRepository;
    private final LocationRepository locationRepository;

    public ConversionRateSeeder(ConversionRateRepository conversionRateRepository, EmissionTypeRepository emissionTypeRepository, LocationRepository locationRepository){
        this.conversionRateRepository = conversionRateRepository;
        this.emissionTypeRepository = emissionTypeRepository;
        this.locationRepository = locationRepository;
    }

    @Override
    public void run(String... args) {
        if (conversionRateRepository.count() > 0) {
            System.out.println("Conversion Rate Database already contains conversion rates.");
            return;
        }

        // For each row of data in CSV file
        // Important: requires file in /src/main/resources/seed-data to run
        CsvUtils.read("seed-data/conversion_rates.csv").forEach(row -> {

            EmissionType emissionType = emissionTypeRepository
                    .findByName(row.get("emissionType"))
                    .orElseThrow(() -> new RuntimeException("Emission Type not found"));

            Location location = locationRepository
                    .findByName(row.get("location"))
                    .orElseThrow(() -> new RuntimeException("Location not found"));

            // New conversion rate to save
            ConversionRate conversionRate = new ConversionRate(
                    Integer.parseInt(row.get("year")),
                    Double.parseDouble(row.get("value")),
                    row.get("unit"),
                    row.get("description"),
                    emissionType,
                    location
            );

            conversionRateRepository.save(conversionRate);
        });
    }

}
