package com.emission_impossible.carbon_modelling_tool.dto;


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
public class EmissionsSummaryDTO {

    private double totalValue;
    private double totalCO2e;
    private String unit;
    private int count;

    public EmissionsSummaryDTO() {}

    public EmissionsSummaryDTO(double totalValue, double totalCO2e, String unit, int count) {
        this.totalValue = totalValue;
        this.totalCO2e = totalCO2e;
        this.unit = unit;
        this.count = count;
    }

    // getters and setters


    public double getTotalValue() {
        return totalValue;
    }

    public void setTotalValue(double totalValue) {
        this.totalValue = totalValue;
    }

    public double getTotalCO2e() {
        return totalCO2e;
    }

    public void setTotalCO2e(double totalCO2e) {
        this.totalCO2e = totalCO2e;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    @Override
    public String toString() {
        return "EmissionsSummaryDTO{" +
                "totalValue=" + totalValue +
                ", totalCO2e=" + totalCO2e +
                ", unit='" + unit + '\'' +
                ", count=" + count +
                '}';
    }
}
