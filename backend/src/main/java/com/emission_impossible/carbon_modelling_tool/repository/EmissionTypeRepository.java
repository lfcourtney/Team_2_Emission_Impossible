package com.emission_impossible.carbon_modelling_tool.repository;

import com.emission_impossible.carbon_modelling_tool.model.Client;
import com.emission_impossible.carbon_modelling_tool.model.EmissionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmissionTypeRepository extends JpaRepository<EmissionType, Long> {

    Optional<EmissionType> findByName(String name);

}