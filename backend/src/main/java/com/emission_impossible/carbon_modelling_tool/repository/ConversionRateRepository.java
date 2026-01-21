package com.emission_impossible.carbon_modelling_tool.repository;

import com.emission_impossible.carbon_modelling_tool.model.ConversionRate;
import com.emission_impossible.carbon_modelling_tool.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConversionRateRepository extends JpaRepository<ConversionRate, Long> {
    // We might need to also consider the year as it can vary over time
    public List<ConversionRate>  findByEmissionTypeIdAndLocationId(Long emissionTypeId, Long locationId);
    public List<ConversionRate>  findByLocationAndYear(Location location, int year);
}