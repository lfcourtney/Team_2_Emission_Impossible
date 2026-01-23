package com.emission_impossible.carbon_modelling_tool.service;

import com.emission_impossible.carbon_modelling_tool.model.ConversionRate;
import com.emission_impossible.carbon_modelling_tool.model.EmissionType;
import com.emission_impossible.carbon_modelling_tool.model.Location;
import com.emission_impossible.carbon_modelling_tool.repository.ConversionRateRepository;
import org.springframework.stereotype.Service;

@Service
public class ConversionRateService {

    private final ConversionRateRepository conversionRateRepository;

    public ConversionRateService(ConversionRateRepository conversionRateRepository){
        this.conversionRateRepository = conversionRateRepository;
    }

    public ConversionRate updateRate(ConversionRate newRate) {
        // Append previous rate and date ranges to an array/variable?
        return conversionRateRepository.save(newRate);
    }

    public ConversionRate getRateFor(Location location, EmissionType type, int year) {
        return conversionRateRepository.findByLocationAndYear(location, year)
                                       .stream()
                                       .filter(r -> r.getEmissionType().equals(type))
                                       .findFirst()
                                       .orElseThrow(() -> new RuntimeException("No conversion rate found"));
    }
}
