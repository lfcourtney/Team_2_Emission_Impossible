package com.emission_impossible.carbon_modelling_tool.dto;

import java.time.LocalDate;


/**
 * A Data Transfer Object (DTO).
 *
 * <p>
 * A DTO is a simple object whose only job is to carry data from one part of an
 * application to another. In a Spring Boot application, DTOs are most commonly
 * used to move data between:
 * </p>
 *
 * <ul>
 *   <li>The backend (server) and the frontend (user interface)</li>
 *   <li>The database layer and the API layer</li>
 *   <li>Different internal layers of the application</li>
 * </ul>
 *
 * <p>
 * Why DTOs are useful:
 * </p>
 *
 * <ul>
 *   <li>
 *     <b>Safety:</b> DTOs prevent sensitive or internal data from being exposed.
 *     Only the fields you explicitly choose are shared.
 *   </li>
 *   <li>
 *     <b>Simplicity:</b> They contain only plain data, making them easy to send
 *     over the network (for example as JSON in an API response).
 *   </li>
 *   <li>
 *     <b>Separation of concerns:</b> DTOs keep your internal database models
 *     separate from what the outside world sees, allowing each to change
 *     independently.
 *   </li>
 *   <li>
 *     <b>Stability:</b> If your database structure changes, your API does not
 *     necessarily have to break, as long as the DTO stays the same.
 *   </li>
 * </ul>
 *
 * <p>
 * In short: this class acts as a clean, controlled container for emissions-related
 * data when it is being transferred between different parts of the system.
 * </p>
 */
public class EmissionsDataDTO {
    private Long id;
    private LocalDate date;
    private double value;
    private double co2e;

    private Long locationId;
    private String locationName;
    private String locationRegion;

    private Long emissionTypeId;
    private String emissionTypeName;
    private String unit;
    private String scope;

    public EmissionsDataDTO() {}

    public EmissionsDataDTO(Long id, LocalDate date, double value, double co2e, Long locationId, String locationName, String locationRegion, Long emissionTypeId, String emissionTypeName, String unit, String scope) {
        this.id = id;
        this.date = date;
        this.value = value;
        this.co2e = co2e;
        this.locationId = locationId;
        this.locationName = locationName;
        this.locationRegion = locationRegion;
        this.emissionTypeId = emissionTypeId;
        this.emissionTypeName = emissionTypeName;
        this.unit = unit;
        this.scope = scope;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public double getCo2e() {
        return co2e;
    }

    public void setCo2e(double co2e) {
        this.co2e = co2e;
    }

    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public String getLocationRegion() {
        return locationRegion;
    }

    public void setLocationRegion(String locationRegion) {
        this.locationRegion = locationRegion;
    }

    public Long getEmissionTypeId() {
        return emissionTypeId;
    }

    public void setEmissionTypeId(Long emissionTypeId) {
        this.emissionTypeId = emissionTypeId;
    }

    public String getEmissionTypeName() {
        return emissionTypeName;
    }

    public void setEmissionTypeName(String emissionTypeName) {
        this.emissionTypeName = emissionTypeName;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    @Override
    public String toString() {
        return "EmissionsDataDTO{" +
                "id=" + id +
                ", date=" + date +
                ", value=" + value +
                ", co2e=" + co2e +
                ", locationId=" + locationId +
                ", locationName='" + locationName + '\'' +
                ", locationRegion='" + locationRegion + '\'' +
                ", emissionTypeId=" + emissionTypeId +
                ", emissionTypeName='" + emissionTypeName + '\'' +
                ", unit='" + unit + '\'' +
                ", scope='" + scope + '\'' +
                '}';
    }
}
