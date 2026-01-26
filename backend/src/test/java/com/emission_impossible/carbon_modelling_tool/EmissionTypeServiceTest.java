package com.emission_impossible.carbon_modelling_tool;

import com.emission_impossible.carbon_modelling_tool.model.EmissionType;
import com.emission_impossible.carbon_modelling_tool.repository.EmissionTypeRepository;
import com.emission_impossible.carbon_modelling_tool.service.EmissionTypeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * - Getting emission type by ID
 * - Getting all emission types
 * - Adding a new emission type
 * - Exception handling when emission type not found
 */
class EmissionTypeServiceTest extends BaseRepositoryTest {

    @Autowired
    private EmissionTypeService emissionTypeService;

    @Autowired
    private EmissionTypeRepository emissionTypeRepository;

    @Test
    void getEmissionType() {
        EmissionType type = emissionTypeRepository.save(
                new EmissionType("Electricity", "kWh", "Scope 2", "Electric power consumption")
        );

        EmissionType found = emissionTypeService.getEmissionType(type.getId());

        assertNotNull(found);
        assertEquals("Electricity", found.getName());
        assertEquals("kWh", found.getUnit());
        assertEquals("Scope 2", found.getScope());
    }

    @Test
    void getEmissionTypeThrowsExceptionWhenNotFound() {
        assertThrows(RuntimeException.class, () -> emissionTypeService.getEmissionType(999L));
    }

    @Test
    void getAllEmissionTypes() {
        emissionTypeRepository.save(
                new EmissionType("Electricity", "kWh", "Scope 2", "Electric power")
        );
        emissionTypeRepository.save(
                new EmissionType("Natural Gas", "m³", "Scope 1", "Gas consumption")
        );

        List<EmissionType> types = emissionTypeService.getAllEmissionTypes();

        assertTrue(types.size() >= 2);
    }

    @Test
    void addEmissionType() {
        EmissionType newType = emissionTypeService.addEmissionType(
                "Diesel", "L", "Scope 1", "Diesel fuel consumption"
        );

        assertNotNull(newType.getId());
        assertEquals("Diesel", newType.getName());
        assertEquals("L", newType.getUnit());
        assertEquals("Scope 1", newType.getScope());
        assertEquals("Diesel fuel consumption", newType.getDescription());

        EmissionType found = emissionTypeRepository.findById(newType.getId()).orElse(null);
        assertNotNull(found);
    }
}