package com.emission_impossible.carbon_modelling_tool;

import com.emission_impossible.carbon_modelling_tool.model.EmissionType;
import com.emission_impossible.carbon_modelling_tool.repository.EmissionTypeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class EmissionTypeRepositoryTest extends BaseRepositoryTest {

    @Autowired
    private EmissionTypeRepository emissionTypeRepository;

    @Test
    void createEmissionType() {
        EmissionType type = new EmissionType(
                "Test Type", "kWh", "Scope 2", "Test description"
        );

        EmissionType saved = emissionTypeRepository.save(type);
        assertNotNull(saved.getId());
    }
}

