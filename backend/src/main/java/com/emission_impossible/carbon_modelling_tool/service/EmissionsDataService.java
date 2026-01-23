package com.emission_impossible.carbon_modelling_tool.service;

import com.emission_impossible.carbon_modelling_tool.repository.EmissionsDataRepository;
import org.springframework.stereotype.Service;

@Service
public class EmissionsDataService {

    private final EmissionsDataRepository emissionsDataRepository;

    private final ConversionRateService conversionRateService;

    public EmissionsDataService(EmissionsDataRepository emissionsDataRepository, ConversionRateService conversionRateService){
        this.emissionsDataRepository = emissionsDataRepository;
        this.conversionRateService = conversionRateService;
    }

}
