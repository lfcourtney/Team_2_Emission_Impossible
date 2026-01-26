package com.emission_impossible.carbon_modelling_tool;

import com.emission_impossible.carbon_modelling_tool.model.Client;
import com.emission_impossible.carbon_modelling_tool.model.ConversionRate;
import com.emission_impossible.carbon_modelling_tool.model.EmissionType;
import com.emission_impossible.carbon_modelling_tool.model.Location;
import com.emission_impossible.carbon_modelling_tool.repository.ClientRepository;
import com.emission_impossible.carbon_modelling_tool.repository.ConversionRateRepository;
import com.emission_impossible.carbon_modelling_tool.repository.EmissionTypeRepository;
import com.emission_impossible.carbon_modelling_tool.repository.LocationRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.assertThrows;

class ConversionRateRepositoryTest extends BaseRepositoryTest {

    @Autowired
    private ConversionRateRepository conversionRateRepository;

    @Autowired
    private EmissionTypeRepository emissionTypeRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private ClientRepository clientRepository;


    @Test
    void uniqueConstraintEnforced() {

        // Add emission type
        EmissionType saveType = new EmissionType(
                "Test Type", "kWh", "Scope 2", "Test description"
        );

         emissionTypeRepository.save(saveType);

        // Add location
        Client clientA = new Client("Test Client");
        Client client = clientRepository.save(clientA);

        Location saveLocation = new Location("Test Location", "EU", client);
        locationRepository.save(saveLocation);


        ConversionRate rate1 = new ConversionRate(
                2024, 1.23, "kg", "test", saveType, saveLocation
        );
        conversionRateRepository.save(rate1);

        ConversionRate rate2 = new ConversionRate(
                2024, 2.34, "kg", "duplicate", saveType, saveLocation
        );

        assertThrows(Exception.class, () -> conversionRateRepository.saveAndFlush(rate2));
    }
}

