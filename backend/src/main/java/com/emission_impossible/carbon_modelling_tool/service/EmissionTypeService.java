package com.emission_impossible.carbon_modelling_tool.service;

import com.emission_impossible.carbon_modelling_tool.model.EmissionType;
import com.emission_impossible.carbon_modelling_tool.repository.EmissionTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmissionTypeService {

    private final EmissionTypeRepository emissionTypeRepository;

    public EmissionTypeService(EmissionTypeRepository emissionTypeRepository){
        this.emissionTypeRepository = emissionTypeRepository;
    }

    public EmissionType getEmissionType(Long emissionTypeId){

        return this.emissionTypeRepository.findById(emissionTypeId)
                .orElseThrow(() -> new RuntimeException(String.format("No emission type found for id %d", emissionTypeId)));
    }

    public List<EmissionType> getAllEmissionTypes(){
        return this.emissionTypeRepository.findAll();
    }

    public EmissionType addEmissionType(String name, String unit, String scope, String description){
        EmissionType emissionType = new EmissionType(name, unit, scope, description);

        this.emissionTypeRepository.save(emissionType);

        return emissionType;
    }
}
