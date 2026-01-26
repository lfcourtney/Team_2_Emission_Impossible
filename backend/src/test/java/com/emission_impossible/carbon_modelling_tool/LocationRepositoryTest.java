package com.emission_impossible.carbon_modelling_tool;

import com.emission_impossible.carbon_modelling_tool.model.Client;
import com.emission_impossible.carbon_modelling_tool.model.Location;
import com.emission_impossible.carbon_modelling_tool.repository.ClientRepository;
import com.emission_impossible.carbon_modelling_tool.repository.LocationRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;


import static org.junit.jupiter.api.Assertions.*;

class LocationRepositoryTest extends BaseRepositoryTest {

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Test
    void createLocationForClient() {

        Client clientA = new Client("Test Client");
        clientRepository.save(clientA);

        Client client = clientRepository.findAll().get(0);

        Location location = new Location("Test Location", "EU", client);
        Location saved = locationRepository.save(location);

        assertNotNull(saved.getId());
        assertEquals(client.getId(), saved.getClient().getId());
    }
}

