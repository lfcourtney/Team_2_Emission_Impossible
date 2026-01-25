package com.emission_impossible.carbon_modelling_tool.repository;

import com.emission_impossible.carbon_modelling_tool.model.ConversionRate;
import com.emission_impossible.carbon_modelling_tool.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConversionRateRepository extends JpaRepository<ConversionRate, Long> {
    // We might need to also consider the year as it can vary over time
    Optional<ConversionRate> findByEmissionTypeIdAndLocationIdAndYear(
            Long emissionTypeId,
            Long locationId,
            int year
    );

    public List<ConversionRate>  findByLocationId(Long locationId);

    public List<ConversionRate>  findByLocationAndYear(Location location, int year);

}