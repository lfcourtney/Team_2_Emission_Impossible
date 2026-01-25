package com.emission_impossible.carbon_modelling_tool.dto;

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
