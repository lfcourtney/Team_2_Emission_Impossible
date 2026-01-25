package com.emission_impossible.carbon_modelling_tool.model;
import jakarta.persistence.*;
import java.util.List;

/**
 * This table defines a type of emission we are tracking, e.g., "Electricity", "Natural Gas", etc.
 */
@Entity
@Table(name = "emission_types")
public class EmissionType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String unit;
    private String scope;
    private String description;

    @OneToMany(mappedBy = "emissionType", cascade = CascadeType.ALL)
    private List<ConversionRate> conversionRates;

    @OneToMany(mappedBy = "emissionType", cascade = CascadeType.ALL)
    private List<EmissionsData> emissionsData;

    protected EmissionType() {}

    // Constructor
    public EmissionType(String name, String unit, String scope, String description) {
        this.name = name;
        this.unit = unit;
        this.scope = scope;
        this.description = description;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<ConversionRate> getConversionRates() { return conversionRates; }
    public void setConversionRates(List<ConversionRate> conversionRates) { this.conversionRates = conversionRates; }

    public List<EmissionsData> getEmissionsData() { return emissionsData; }
    public void setEmissionsData(List<EmissionsData> emissionsData) { this.emissionsData = emissionsData; }
}
