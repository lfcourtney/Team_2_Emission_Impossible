package com.emission_impossible.carbon_modelling_tool.model;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "emissions_data")
public class EmissionsData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private double value;

    @ManyToOne
    @JoinColumn(name = "emission_type_id")
    private EmissionType emissionType;

    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;

    protected EmissionsData() {}

    // Constructor
    public EmissionsData(LocalDate date, double value, EmissionType emissionType, Location location) {
        this.date = date;
        this.value = value;
        this.emissionType = emissionType;
        this.location = location;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public double getValue() { return value; }
    public void setValue(double value) { this.value = value; }

    public EmissionType getEmissionType() { return emissionType; }
    public void setEmissionType(EmissionType emissionType) { this.emissionType = emissionType; }

    public Location getLocation() { return location; }
    public void setLocation(Location location) { this.location = location; }
}
