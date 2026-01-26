package com.emission_impossible.carbon_modelling_tool;

import com.emission_impossible.carbon_modelling_tool.model.Client;
import com.emission_impossible.carbon_modelling_tool.model.EmissionType;
import com.emission_impossible.carbon_modelling_tool.model.EmissionsData;
import com.emission_impossible.carbon_modelling_tool.model.Location;
import com.emission_impossible.carbon_modelling_tool.repository.ClientRepository;
import com.emission_impossible.carbon_modelling_tool.repository.EmissionTypeRepository;
import com.emission_impossible.carbon_modelling_tool.repository.EmissionsDataRepository;
import com.emission_impossible.carbon_modelling_tool.repository.LocationRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertNotNull;

class EmissionsDataRepositoryTest extends BaseRepositoryTest {

    @Autowired
    private EmissionsDataRepository emissionsDataRepository;

    @Autowired
    private EmissionTypeRepository emissionTypeRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private ClientRepository clientRepository;


    @Test
    void createEmissionsData() {
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

        EmissionsData data = new EmissionsData(
                LocalDate.now(), 100.0, saveType, saveLocation
        );

        EmissionsData saved = emissionsDataRepository.save(data);
        assertNotNull(saved.getId());
    }
}

