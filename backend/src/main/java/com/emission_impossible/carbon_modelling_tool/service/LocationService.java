package com.emission_impossible.carbon_modelling_tool.service;

import com.emission_impossible.carbon_modelling_tool.model.Client;
import com.emission_impossible.carbon_modelling_tool.model.Location;
import com.emission_impossible.carbon_modelling_tool.repository.ClientRepository;
import com.emission_impossible.carbon_modelling_tool.repository.LocationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    private final LocationRepository locationRepository;
    private final ClientRepository clientRepository;

    public LocationService(LocationRepository locationRepository, ClientRepository clientRepository){
        this.locationRepository = locationRepository;
        this.clientRepository = clientRepository;
    }


    public Location getLocation(Long locationId){
        return this.locationRepository.findById(locationId)
                .orElseThrow(() -> new RuntimeException(String.format("Location with location id %d not found", locationId)));
    }

    public List<Location> getLocationsForClient(Long clientId){
        return this.locationRepository.findByClientId(clientId);
    }

    public List<Location> getAllLocations(){
        return this.locationRepository.findAll();
    }

    public Location addLocation(Long clientId, String name, String region){

        Client findClient = this.clientRepository.findById(clientId)
                .orElseThrow(() -> new RuntimeException(String.format("Client with client id %d not found", clientId)));

        Location newLocation = new Location(name, region, findClient);

        this.locationRepository.save(newLocation);

        return newLocation;
    }

}
