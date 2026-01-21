package com.emission_impossible.carbon_modelling_tool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.emission_impossible.carbon_modelling_tool.model.Location;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
}