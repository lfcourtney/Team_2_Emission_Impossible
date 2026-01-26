package com.emission_impossible.carbon_modelling_tool;

import com.emission_impossible.carbon_modelling_tool.model.Client;
import com.emission_impossible.carbon_modelling_tool.model.ConversionRate;
import com.emission_impossible.carbon_modelling_tool.model.EmissionType;
import com.emission_impossible.carbon_modelling_tool.model.Location;
import com.emission_impossible.carbon_modelling_tool.repository.ClientRepository;
import com.emission_impossible.carbon_modelling_tool.repository.ConversionRateRepository;
import com.emission_impossible.carbon_modelling_tool.repository.EmissionTypeRepository;
import com.emission_impossible.carbon_modelling_tool.repository.LocationRepository;
import com.emission_impossible.carbon_modelling_tool.service.ConversionRateService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * - Getting conversion rates by various criteria
 * - Getting rates for a location
 * - Getting all rates
 * - Updating existing rates
 * - Creating new rates when updating non-existent ones
 * - Exception handling for invalid inputs
 */
class ConversionRateServiceTest extends BaseRepositoryTest {

    @Autowired
    private ConversionRateService conversionRateService;

    @Autowired
    private ConversionRateRepository conversionRateRepository;

    @Autowired
    private EmissionTypeRepository emissionTypeRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Test
    void getRate() {
        Client client = clientRepository.save(new Client("Test Client"));
        Location location = locationRepository.save(new Location("Test Location", "EU", client));
        EmissionType type = emissionTypeRepository.save(
                new EmissionType("Electricity", "kWh", "Scope 2", "Test")
        );

        ConversionRate rate = conversionRateRepository.save(
                new ConversionRate(2024, 0.5, "kg CO2e/kWh", "Test rate", type, location)
        );

        ConversionRate found = conversionRateService.getRate(
                type.getId(), location.getId(), 2024
        );

        assertNotNull(found);
        assertEquals(0.5, found.getRate());
    }

    @Test
    void getRateThrowsExceptionWhenNotFound() {
        assertThrows(RuntimeException.class,
                () -> conversionRateService.getRate(999L, 999L, 2024));
    }

    @Test
    void getRatesForLocation() {
        Client client = clientRepository.save(new Client("Test Client"));
        Location location = locationRepository.save(new Location("Test Location", "EU", client));
        EmissionType type1 = emissionTypeRepository.save(
                new EmissionType("Electricity", "kWh", "Scope 2", "Test")
        );
        EmissionType type2 = emissionTypeRepository.save(
                new EmissionType("Gas", "m³", "Scope 1", "Test")
        );

        conversionRateRepository.save(
                new ConversionRate(2024, 0.5, "kg CO2e/kWh", "Test", type1, location)
        );
        conversionRateRepository.save(
                new ConversionRate(2024, 2.0, "kg CO2e/m³", "Test", type2, location)
        );

        List<ConversionRate> rates = conversionRateService.getRatesForLocation(location.getId());

        assertTrue(rates.size() >= 2);
    }

    @Test
    void getAllRates() {
        Client client = clientRepository.save(new Client("Test Client"));
        Location location = locationRepository.save(new Location("Test Location", "EU", client));
        EmissionType type = emissionTypeRepository.save(
                new EmissionType("Electricity", "kWh", "Scope 2", "Test")
        );

        conversionRateRepository.save(
                new ConversionRate(2024, 0.5, "kg CO2e/kWh", "Test", type, location)
        );

        List<ConversionRate> rates = conversionRateService.getAllRates();

        assertTrue(rates.size() >= 1);
    }

    @Test
    void updateRateExisting() {
        Client client = clientRepository.save(new Client("Test Client"));
        Location location = locationRepository.save(new Location("Test Location", "EU", client));
        EmissionType type = emissionTypeRepository.save(
                new EmissionType("Electricity", "kWh", "Scope 2", "Test")
        );

        ConversionRate existingRate = conversionRateRepository.save(
                new ConversionRate(2024, 0.5, "kg CO2e/kWh", "Old description", type, location)
        );

        ConversionRate updatedRate = new ConversionRate(
                2024, 0.8, "kg CO2e/kWh", "New description", type, location
        );

        ConversionRate result = conversionRateService.updateRate(updatedRate);

        assertEquals(existingRate.getId(), result.getId());
        assertEquals(0.8, result.getRate());
        assertEquals("New description", result.getDescription());
    }

    @Test
    void updateRateCreatesNewWhenNotExists() {
        Client client = clientRepository.save(new Client("Test Client"));
        Location location = locationRepository.save(new Location("Test Location", "EU", client));
        EmissionType type = emissionTypeRepository.save(
                new EmissionType("Electricity", "kWh", "Scope 2", "Test")
        );

        ConversionRate newRate = new ConversionRate(
                2025, 0.6, "kg CO2e/kWh", "New rate", type, location
        );

        ConversionRate result = conversionRateService.updateRate(newRate);

        assertNotNull(result.getId());
        assertEquals(0.6, result.getRate());
        assertEquals(2025, result.getYear());
    }

    @Test
    void updateRateThrowsExceptionWhenEmissionTypeIsNull() {
        Client client = clientRepository.save(new Client("Test Client"));
        Location location = locationRepository.save(new Location("Test Location", "EU", client));

        ConversionRate invalidRate = new ConversionRate(
                2024, 0.5, "kg CO2e/kWh", "Test", null, location
        );

        assertThrows(IllegalArgumentException.class,
                () -> conversionRateService.updateRate(invalidRate));
    }

    @Test
    void updateRateThrowsExceptionWhenLocationIsNull() {
        EmissionType type = emissionTypeRepository.save(
                new EmissionType("Electricity", "kWh", "Scope 2", "Test")
        );

        ConversionRate invalidRate = new ConversionRate(
                2024, 0.5, "kg CO2e/kWh", "Test", type, null
        );

        assertThrows(IllegalArgumentException.class,
                () -> conversionRateService.updateRate(invalidRate));
    }

    @Test
    void getRateFor() {
        Client client = clientRepository.save(new Client("Test Client"));
        Location location = locationRepository.save(new Location("Test Location", "EU", client));
        EmissionType type = emissionTypeRepository.save(
                new EmissionType("Electricity", "kWh", "Scope 2", "Test")
        );

        conversionRateRepository.save(
                new ConversionRate(2024, 0.5, "kg CO2e/kWh", "Test rate", type, location)
        );

        ConversionRate found = conversionRateService.getRateFor(location, type, 2024);

        assertNotNull(found);
        assertEquals(0.5, found.getRate());
        assertEquals(type.getId(), found.getEmissionType().getId());
    }

    @Test
    void getRateForThrowsExceptionWhenNotFound() {
        Client client = clientRepository.save(new Client("Test Client"));
        Location location = locationRepository.save(new Location("Test Location", "EU", client));
        EmissionType type = emissionTypeRepository.save(
                new EmissionType("Electricity", "kWh", "Scope 2", "Test")
        );

        assertThrows(RuntimeException.class,
                () -> conversionRateService.getRateFor(location, type, 2030));
    }
}