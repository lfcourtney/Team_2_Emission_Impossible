package com.emission_impossible.carbon_modelling_tool.repository;

import com.emission_impossible.carbon_modelling_tool.model.EmissionType;
import com.emission_impossible.carbon_modelling_tool.model.EmissionsData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmissionsDataRepository extends JpaRepository<EmissionsData, Long> {
    List<EmissionsData> findByLocationId(Long locationId);

    List<EmissionsData> findByLocationIdIn(List<Long> locationIds);

    List<EmissionsData> findByDateBetween(LocalDate start, LocalDate end);

    List<EmissionsData> findByDateBetweenAndLocationId(
            LocalDate start,
            LocalDate end,
            Long locationId
    );
}