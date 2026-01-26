package com.emission_impossible.carbon_modelling_tool;

import com.emission_impossible.carbon_modelling_tool.dto.EmissionsDataDTO;
import com.emission_impossible.carbon_modelling_tool.dto.EmissionsSummaryDTO;
import com.emission_impossible.carbon_modelling_tool.model.*;
import com.emission_impossible.carbon_modelling_tool.repository.*;
import com.emission_impossible.carbon_modelling_tool.service.EmissionsDataService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

/**
 * - Calculating CO2e values
 * - Adding emissions data
 * - Getting emissions by location, client, and date range
 * - Calculating total CO2e for locations and clients
 * - Creating emissions summaries by type
 * - Comprehensive DTO mapping tests
 */
class EmissionsDataServiceTest extends BaseRepositoryTest {

    @Autowired
    private EmissionsDataService emissionsDataService;

    @Autowired
    private EmissionsDataRepository emissionsDataRepository;

    @Autowired
    private ConversionRateRepository conversionRateRepository;

    @Autowired
    private EmissionTypeRepository emissionTypeRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Test
    void calculateCO2e() {
        Client client = clientRepository.save(new Client("Test Client"));
        Location location = locationRepository.save(new Location("Test Location", "EU", client));
        EmissionType type = emissionTypeRepository.save(
                new EmissionType("Electricity", "kWh", "Scope 2", "Test")
        );

        conversionRateRepository.save(
                new ConversionRate(2024, 0.5, "kg CO2e/kWh", "Test rate", type, location)
        );

        EmissionsData data = new EmissionsData(
                LocalDate.of(2024, 1, 1), 100.0, type, location
        );

        double co2e = emissionsDataService.calculateCO2e(data);

        assertEquals(50.0, co2e, 0.001);
    }

    @Test
    void calculateCO2eThrowsExceptionWhenConversionRateNotFound() {
        Client client = clientRepository.save(new Client("Test Client"));
        Location location = locationRepository.save(new Location("Test Location", "EU", client));
        EmissionType type = emissionTypeRepository.save(
                new EmissionType("Electricity", "kWh", "Scope 2", "Test")
        );

        EmissionsData data = new EmissionsData(
                LocalDate.of(2025, 1, 1), 100.0, type, location
        );

        assertThrows(RuntimeException.class, () -> emissionsDataService.calculateCO2e(data));
    }

    @Test
    void addEmission() {
        Client client = clientRepository.save(new Client("Test Client"));
        Location location = locationRepository.save(new Location("Test Location", "EU", client));
        EmissionType type = emissionTypeRepository.save(
                new EmissionType("Electricity", "kWh", "Scope 2", "Test")
        );

        conversionRateRepository.save(
                new ConversionRate(2024, 0.5, "kg CO2e/kWh", "Test rate", type, location)
        );

        EmissionsData newData = emissionsDataService.addEmission(
                type.getId(), location.getId(), LocalDate.of(2024, 1, 1), 100.0
        );

        assertNotNull(newData.getId());
        assertEquals(100.0, newData.getValue());
        assertEquals(type.getId(), newData.getEmissionType().getId());
        assertEquals(location.getId(), newData.getLocation().getId());
    }

    @Test
    void addEmissionThrowsExceptionWhenConversionRateNotFound() {
        Client client = clientRepository.save(new Client("Test Client"));
        Location location = locationRepository.save(new Location("Test Location", "EU", client));
        EmissionType type = emissionTypeRepository.save(
                new EmissionType("Electricity", "kWh", "Scope 2", "Test")
        );

        assertThrows(RuntimeException.class,
                () -> emissionsDataService.addEmission(
                        type.getId(), location.getId(), LocalDate.of(2025, 1, 1), 100.0
                ));
    }

    @Test
    void getEmissionsForLocation() {
        Client client = clientRepository.save(new Client("Test Client"));
        Location location = locationRepository.save(new Location("Test Location", "EU", client));
        EmissionType type = emissionTypeRepository.save(
                new EmissionType("Electricity", "kWh", "Scope 2", "Test")
        );

        conversionRateRepository.save(
                new ConversionRate(2024, 0.5, "kg CO2e/kWh", "Test rate", type, location)
        );

        emissionsDataRepository.save(
                new EmissionsData(LocalDate.of(2024, 1, 1), 100.0, type, location)
        );
        emissionsDataRepository.save(
                new EmissionsData(LocalDate.of(2024, 2, 1), 150.0, type, location)
        );

        List<EmissionsDataDTO> dtoList = emissionsDataService.getEmissionsForLocation(location.getId());

        assertTrue(dtoList.size() >= 2);
        assertNotNull(dtoList.get(0).getCo2e());
    }

    @Test
    void getEmissionsForClient() {
        Client client = clientRepository.save(new Client("Test Client"));
        Location location1 = locationRepository.save(new Location("Location 1", "EU", client));
        Location location2 = locationRepository.save(new Location("Location 2", "UK", client));
        EmissionType type = emissionTypeRepository.save(
                new EmissionType("Electricity", "kWh", "Scope 2", "Test")
        );

        conversionRateRepository.save(
                new ConversionRate(2024, 0.5, "kg CO2e/kWh", "Test rate", type, location1)
        );
        conversionRateRepository.save(
                new ConversionRate(2024, 0.5, "kg CO2e/kWh", "Test rate", type, location2)
        );

        emissionsDataRepository.save(
                new EmissionsData(LocalDate.of(2024, 1, 1), 100.0, type, location1)
        );
        emissionsDataRepository.save(
                new EmissionsData(LocalDate.of(2024, 1, 1), 150.0, type, location2)
        );

        List<EmissionsDataDTO> dtoList = emissionsDataService.getEmissionsForClient(client.getId());

        assertTrue(dtoList.size() >= 2);
    }

    @Test
    void getAllEmissions() {
        Client client = clientRepository.save(new Client("Test Client"));
        Location location = locationRepository.save(new Location("Test Location", "EU", client));
        EmissionType type = emissionTypeRepository.save(
                new EmissionType("Electricity", "kWh", "Scope 2", "Test")
        );

        conversionRateRepository.save(
                new ConversionRate(2024, 0.5, "kg CO2e/kWh", "Test rate", type, location)
        );

        emissionsDataRepository.save(
                new EmissionsData(LocalDate.of(2024, 1, 1), 100.0, type, location)
        );

        List<EmissionsDataDTO> dtoList = emissionsDataService.getAllEmissions();

        assertTrue(dtoList.size() >= 1);
    }

    @Test
    void getEmissionsByDateRangeWithLocation() {
        Client client = clientRepository.save(new Client("Test Client"));
        Location location = locationRepository.save(new Location("Test Location", "EU", client));
        EmissionType type = emissionTypeRepository.save(
                new EmissionType("Electricity", "kWh", "Scope 2", "Test")
        );

        conversionRateRepository.save(
                new ConversionRate(2024, 0.5, "kg CO2e/kWh", "Test rate", type, location)
        );

        emissionsDataRepository.save(
                new EmissionsData(LocalDate.of(2024, 1, 15), 100.0, type, location)
        );
        emissionsDataRepository.save(
                new EmissionsData(LocalDate.of(2024, 2, 15), 150.0, type, location)
        );
        emissionsDataRepository.save(
                new EmissionsData(LocalDate.of(2024, 3, 15), 200.0, type, location)
        );

        List<EmissionsDataDTO> dtoList = emissionsDataService.getEmissionsByDateRange(
                LocalDate.of(2024, 1, 1),
                LocalDate.of(2024, 2, 28),
                location.getId()
        );

        assertTrue(dtoList.size() >= 2);
        assertTrue(dtoList.stream().allMatch(dto -> dto.getLocationId().equals(location.getId())));
    }

    @Test
    void getEmissionsByDateRangeWithoutLocation() {
        Client client = clientRepository.save(new Client("Test Client"));
        Location location = locationRepository.save(new Location("Test Location", "EU", client));
        EmissionType type = emissionTypeRepository.save(
                new EmissionType("Electricity", "kWh", "Scope 2", "Test")
        );

        conversionRateRepository.save(
                new ConversionRate(2024, 0.5, "kg CO2e/kWh", "Test rate", type, location)
        );

        emissionsDataRepository.save(
                new EmissionsData(LocalDate.of(2024, 1, 15), 100.0, type, location)
        );

        List<EmissionsDataDTO> dtoList = emissionsDataService.getEmissionsByDateRange(
                LocalDate.of(2024, 1, 1),
                LocalDate.of(2024, 12, 31),
                null
        );

        assertTrue(dtoList.size() >= 1);
    }

    @Test
    void getTotalCO2eForLocation() {
        Client client = clientRepository.save(new Client("Test Client"));
        Location location = locationRepository.save(new Location("Test Location", "EU", client));
        EmissionType type = emissionTypeRepository.save(
                new EmissionType("Electricity", "kWh", "Scope 2", "Test")
        );

        conversionRateRepository.save(
                new ConversionRate(2024, 0.5, "kg CO2e/kWh", "Test rate", type, location)
        );

        emissionsDataRepository.save(
                new EmissionsData(LocalDate.of(2024, 1, 1), 100.0, type, location)
        );
        emissionsDataRepository.save(
                new EmissionsData(LocalDate.of(2024, 2, 1), 200.0, type, location)
        );

        double totalCO2e = emissionsDataService.getTotalCO2eForLocation(location.getId());

        assertEquals(150.0, totalCO2e, 0.001);
    }

    @Test
    void getTotalCO2eForClient() {
        Client client = clientRepository.save(new Client("Test Client"));
        Location location1 = locationRepository.save(new Location("Location 1", "EU", client));
        Location location2 = locationRepository.save(new Location("Location 2", "UK", client));
        EmissionType type = emissionTypeRepository.save(
                new EmissionType("Electricity", "kWh", "Scope 2", "Test")
        );

        conversionRateRepository.save(
                new ConversionRate(2024, 0.5, "kg CO2e/kWh", "Test rate", type, location1)
        );
        conversionRateRepository.save(
                new ConversionRate(2024, 0.5, "kg CO2e/kWh", "Test rate", type, location2)
        );

        emissionsDataRepository.save(
                new EmissionsData(LocalDate.of(2024, 1, 1), 100.0, type, location1)
        );
        emissionsDataRepository.save(
                new EmissionsData(LocalDate.of(2024, 1, 1), 200.0, type, location2)
        );

        double totalCO2e = emissionsDataService.getTotalCO2eForClient(client.getId());

        assertEquals(150.0, totalCO2e, 0.001);
    }

    @Test
    void getEmissionsSummaryByType() {
        Client client = clientRepository.save(new Client("Test Client"));
        Location location = locationRepository.save(new Location("Test Location", "EU", client));
        EmissionType electricityType = emissionTypeRepository.save(
                new EmissionType("Electricity", "kWh", "Scope 2", "Test")
        );
        EmissionType gasType = emissionTypeRepository.save(
                new EmissionType("Natural Gas", "m³", "Scope 1", "Test")
        );

        conversionRateRepository.save(
                new ConversionRate(2024, 0.5, "kg CO2e/kWh", "Test rate", electricityType, location)
        );
        conversionRateRepository.save(
                new ConversionRate(2024, 2.0, "kg CO2e/m³", "Test rate", gasType, location)
        );

        emissionsDataRepository.save(
                new EmissionsData(LocalDate.of(2024, 1, 1), 100.0, electricityType, location)
        );
        emissionsDataRepository.save(
                new EmissionsData(LocalDate.of(2024, 2, 1), 150.0, electricityType, location)
        );
        emissionsDataRepository.save(
                new EmissionsData(LocalDate.of(2024, 1, 1), 50.0, gasType, location)
        );

        Map<String, EmissionsSummaryDTO> summary =
                emissionsDataService.getEmissionsSummaryByType(location.getId());

        assertNotNull(summary.get("Electricity"));
        assertNotNull(summary.get("Natural Gas"));

        EmissionsSummaryDTO electricitySummary = summary.get("Electricity");
        assertEquals(250.0, electricitySummary.getTotalValue(), 0.001);
        assertEquals(125.0, electricitySummary.getTotalCO2e(), 0.001);
        assertEquals(2, electricitySummary.getCount());
        assertEquals("kWh", electricitySummary.getUnit());

        EmissionsSummaryDTO gasSummary = summary.get("Natural Gas");
        assertEquals(50.0, gasSummary.getTotalValue(), 0.001);
        assertEquals(100.0, gasSummary.getTotalCO2e(), 0.001);
        assertEquals(1, gasSummary.getCount());
        assertEquals("m³", gasSummary.getUnit());
    }
}