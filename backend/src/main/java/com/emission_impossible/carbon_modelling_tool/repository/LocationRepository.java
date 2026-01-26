package com.emission_impossible.carbon_modelling_tool.repository;

import com.emission_impossible.carbon_modelling_tool.model.EmissionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.emission_impossible.carbon_modelling_tool.model.Location;

import java.util.List;
import java.util.Optional;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {

    Optional<Location> findByName(String name);

    // Find all Locations belonging to a given Client (by client ID)
    List<Location> findByClientId(Long clientId);

}