package com.emission_impossible.carbon_modelling_tool;

import com.emission_impossible.carbon_modelling_tool.model.Client;
import com.emission_impossible.carbon_modelling_tool.model.Location;
import com.emission_impossible.carbon_modelling_tool.repository.ClientRepository;
import com.emission_impossible.carbon_modelling_tool.repository.LocationRepository;
import com.emission_impossible.carbon_modelling_tool.service.LocationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * - Getting a location by ID
 * - Getting locations for a specific client
 * - Getting all locations
 * - Adding a new location
 * - Exception handling for invalid operations
 */
class LocationServiceTest extends BaseRepositoryTest {

    @Autowired
    private LocationService locationService;

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Test
    void getLocation() {
        Client client = clientRepository.save(new Client("Test Client"));
        Location location = locationRepository.save(new Location("Test Location", "EU", client));

        Location found = locationService.getLocation(location.getId());

        assertNotNull(found);
        assertEquals("Test Location", found.getName());
        assertEquals("EU", found.getRegion());
    }

    @Test
    void getLocationThrowsExceptionWhenNotFound() {
        assertThrows(RuntimeException.class, () -> locationService.getLocation(999L));
    }

    @Test
    void getLocationsForClient() {
        Client client = clientRepository.save(new Client("Test Client"));
        locationRepository.save(new Location("Location A", "EU", client));
        locationRepository.save(new Location("Location B", "UK", client));

        List<Location> locations = locationService.getLocationsForClient(client.getId());

        assertTrue(locations.size() >= 2);
    }

    @Test
    void getAllLocations() {
        Client client = clientRepository.save(new Client("Test Client"));
        locationRepository.save(new Location("Location A", "EU", client));
        locationRepository.save(new Location("Location B", "UK", client));

        List<Location> locations = locationService.getAllLocations();

        assertTrue(locations.size() >= 2);
    }

    @Test
    void addLocation() {
        Client client = clientRepository.save(new Client("Test Client"));

        Location newLocation = locationService.addLocation(client.getId(), "New Location", "US");

        assertNotNull(newLocation.getId());
        assertEquals("New Location", newLocation.getName());
        assertEquals("US", newLocation.getRegion());
        assertEquals(client.getId(), newLocation.getClient().getId());
    }

    @Test
    void addLocationThrowsExceptionWhenClientNotFound() {
        assertThrows(RuntimeException.class,
                () -> locationService.addLocation(999L, "Test Location", "EU"));
    }
}