package com.emission_impossible.carbon_modelling_tool.repository;

import com.emission_impossible.carbon_modelling_tool.model.EmissionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmissionTypeRepository extends JpaRepository<EmissionType, Long> {}