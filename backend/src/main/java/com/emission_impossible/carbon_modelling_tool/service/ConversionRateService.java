package com.emission_impossible.carbon_modelling_tool.service;

import com.emission_impossible.carbon_modelling_tool.model.ConversionRate;
import com.emission_impossible.carbon_modelling_tool.model.EmissionType;
import com.emission_impossible.carbon_modelling_tool.model.Location;
import com.emission_impossible.carbon_modelling_tool.repository.ConversionRateRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConversionRateService {

    private final ConversionRateRepository conversionRateRepository;

    public ConversionRateService(ConversionRateRepository conversionRateRepository){
        this.conversionRateRepository = conversionRateRepository;
    }

    public ConversionRate getRate(Long emissionTypeId, Long locationId, int year){
        return this.conversionRateRepository.findByEmissionTypeIdAndLocationIdAndYear(emissionTypeId, locationId, year)
                .orElseThrow(() -> new RuntimeException("Conversion rate not found"));
    }

    public List<ConversionRate> getRatesForLocation(Long locationId){
        return this.conversionRateRepository.findByLocationId(locationId);
    }

    public List<ConversionRate> getAllRates(){
        return this.conversionRateRepository.findAll();
    }

    // @Transactional ensures:
    //
    //Updates are flushed automatically
    //
    //No accidental partial writes
    //
    //JPA tracks existingRate as a managed entity
    //
    //No need to call save() after updating fields
    //
    //Logic is atomic and readable
    @Transactional
    public ConversionRate updateRate(ConversionRate newRate) {

        if (newRate.getEmissionType() == null || newRate.getLocation() == null) {
            throw new IllegalArgumentException("EmissionType and Location must be provided");
        }

        Long emissionTypeId = newRate.getEmissionType().getId();
        Long locationId = newRate.getLocation().getId();
        int year = newRate.getYear();

        return conversionRateRepository
                .findByEmissionTypeIdAndLocationIdAndYear(
                        emissionTypeId,
                        locationId,
                        year
                )
                .map(existingRate -> {
                    // Update fields
                    existingRate.setRate(newRate.getRate());
                    existingRate.setUnit(newRate.getUnit());
                    existingRate.setDescription(newRate.getDescription());

                    return existingRate;
                })
                // Add new rate if rate already exists
                .orElseGet(() -> conversionRateRepository.save(newRate));
    }

    public ConversionRate getRateFor(Location location, EmissionType type, int year) {
        return conversionRateRepository.findByLocationAndYear(location, year)
                                       .stream()
                                       .filter(r -> r.getEmissionType().equals(type))
                                       .findFirst()
                                       .orElseThrow(() -> new RuntimeException("No conversion rate found"));
    }
}
