package com.emission_impossible.carbon_modelling_tool.service;

import com.emission_impossible.carbon_modelling_tool.dto.EmissionsDataDTO;
import com.emission_impossible.carbon_modelling_tool.dto.EmissionsSummaryDTO;
import com.emission_impossible.carbon_modelling_tool.model.ConversionRate;
import com.emission_impossible.carbon_modelling_tool.model.EmissionType;
import com.emission_impossible.carbon_modelling_tool.model.EmissionsData;
import com.emission_impossible.carbon_modelling_tool.model.Location;
import com.emission_impossible.carbon_modelling_tool.repository.ConversionRateRepository;
import com.emission_impossible.carbon_modelling_tool.repository.EmissionsDataRepository;
import com.emission_impossible.carbon_modelling_tool.repository.LocationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmissionsDataService {

    private final EmissionsDataRepository emissionsDataRepository;

    private final ConversionRateRepository conversionRateRepository;

    private final LocationRepository locationRepository;

    public EmissionsDataService(EmissionsDataRepository emissionsDataRepository, ConversionRateRepository conversionRateRepository, LocationRepository locationRepository){
        this.emissionsDataRepository = emissionsDataRepository;
        this.conversionRateRepository = conversionRateRepository;
        this.locationRepository = locationRepository;
    }

    public double calculateCO2e(EmissionsData emissionsData){
        int emissionsDataYear = emissionsData.getDate().getYear();

        ConversionRate conversionRate = this.conversionRateRepository.findByEmissionTypeIdAndLocationIdAndYear(emissionsData.getEmissionType().getId(), emissionsData.getLocation().getId(), emissionsDataYear)
                .orElseThrow(() -> new RuntimeException(String.format("No conversion rate found for emission type %d at location %d for year %d", emissionsData.getEmissionType().getId(),  emissionsData.getLocation().getId(), emissionsDataYear)));

        return emissionsData.getValue() * conversionRate.getRate();
    }

    public EmissionsData addEmission(Long emissionTypeId, Long locationId, LocalDate date, double value){

        int emissionsDataYear = date.getYear();


        ConversionRate conversionRate = this.conversionRateRepository.findByEmissionTypeIdAndLocationIdAndYear(emissionTypeId, locationId, emissionsDataYear)
                .orElseThrow(() -> new RuntimeException(String.format("No conversion rate found for emission type %d at location %d for year %d", emissionTypeId,  locationId, emissionsDataYear)));


        EmissionsData newEmissionData = new EmissionsData(date, value, conversionRate.getEmissionType(), conversionRate.getLocation());

        this.emissionsDataRepository.save(newEmissionData);

        return newEmissionData;
    }

    public List<EmissionsDataDTO> getEmissionsForLocation(Long locationId) {
        return emissionsDataRepository.findByLocationId(locationId)
                .stream()
                // Use collection of EmissionsData objects.
                // Each object will map to an instance of EmissionsDataDTO.
                // Return this new collection.
                .map(this::mapToDTO)
                .toList();
    }

    public List<EmissionsDataDTO> getEmissionsForClient(Long clientId) {

        List<Long> locationIds = locationRepository.findByClientId(clientId)
                .stream()
                .map(Location::getId)
                .toList();

        return emissionsDataRepository.findByLocationIdIn(locationIds)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    public List<EmissionsDataDTO> getAllEmissions() {
        return emissionsDataRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    public List<EmissionsDataDTO> getEmissionsByDateRange(
            LocalDate startDate,
            LocalDate endDate,
            Long locationId
    ) {

        List<EmissionsData> emissions;

        if (locationId != null) {
            emissions = emissionsDataRepository
                    .findByDateBetweenAndLocationId(startDate, endDate, locationId);
        } else {
            emissions = emissionsDataRepository
                    .findByDateBetween(startDate, endDate);
        }

        return emissions.stream()
                .map(this::mapToDTO)
                .toList();
    }

    public double getTotalCO2eForLocation(Long locationId) {
        return getEmissionsForLocation(locationId)
                .stream()
                .mapToDouble(EmissionsDataDTO::getCo2e)
                .sum();
    }

    public double getTotalCO2eForClient(Long clientId) {
        return getEmissionsForClient(clientId)
                .stream()
                .mapToDouble(EmissionsDataDTO::getCo2e)
                .sum();
    }

    // Find all the Emission Data records related to the given location id.
    // Create an overall emission data summary HashMap. Each key value pair will be an overall summary of the emission data, the key for each summary being the emissionTypeName.
    // Return the overall emission data summary HashMap.
    public Map<String, EmissionsSummaryDTO> getEmissionsSummaryByType(Long locationId) {

        // Store final results in this HashMap. Will be returned.
        Map<String, EmissionsSummaryDTO> summary = new HashMap<>();

        // Use given location. Loop through all emission records belonging
        // to the location
        for (EmissionsDataDTO _emissionsDataDTO : getEmissionsForLocation(locationId)) {

            // Using the emissionsTypeName as the key to find the emissions summary,
            // create a new emissions summary if the key does not correspond to an existing
            // emissions summary. Otherwise, do nothing and keep the existing emissions summary
            // associated with the given key.
            summary.computeIfAbsent(
                    _emissionsDataDTO.getEmissionTypeName(),
                    key -> {
                        EmissionsSummaryDTO esDTO = new EmissionsSummaryDTO();
                        esDTO.setUnit(_emissionsDataDTO.getUnit());

                        // Set emissions summary
                        return esDTO;
                    }
            );

            // Get emissions summary from the overall emissions summary Map.
            //
            //This object was possibly just created and added to the
            // overall emissions summary Map. Would have happened if the
            // emissionTypeName could not find an existing emissions summary
            // DTO object in the summary map.
            EmissionsSummaryDTO extractedEmissionsSummaryDto = summary.get(_emissionsDataDTO.getEmissionTypeName());

            // Add this record's value to the running total
            // (for example: total fuel used, total gas emitted, etc.)
            extractedEmissionsSummaryDto.setTotalValue(extractedEmissionsSummaryDto.getTotalValue() + _emissionsDataDTO.getValue());

            // Add this record's CO2 equivalent to the running total
            // (this is the climate impact number, accumulated over all records)
            extractedEmissionsSummaryDto.setTotalCO2e(extractedEmissionsSummaryDto.getTotalCO2e() + _emissionsDataDTO.getCo2e());



            // Increase the count by 1
            // This tracks how many individual records were combined
            extractedEmissionsSummaryDto.setCount(extractedEmissionsSummaryDto.getCount() + 1);
        }


        // Return the finished emissions summary:
        // A map where:
        //  - the key = emission type name (like "Electricity", "Fuel", "Gas")
        //  - the value = combined totals for that type
        return summary;
    }



    // Central mapper; keeps logic consistent.
    // Takes EmissionsData.
    // Will take all the data from EmissionsData and map it to a newly created EmissionsDataDTO object.
    // Will return that EmissionsDataDTO object.
    private EmissionsDataDTO mapToDTO(EmissionsData emissionsData) {


        // DTO (Data Transfer Object). The purpose is to reduce boilerplate code
        // and to increase security, since access is controlled, per encapsulation OOP principle.
        EmissionsDataDTO emissionsDataDTO = new EmissionsDataDTO();


        emissionsDataDTO.setId(emissionsData.getId());
        emissionsDataDTO.setDate(emissionsData.getDate());
        emissionsDataDTO.setValue(emissionsData.getValue());

        Location location = emissionsData.getLocation();
        emissionsDataDTO.setLocationId(location.getId());
        emissionsDataDTO.setLocationName(location.getName());
        emissionsDataDTO.setLocationRegion(location.getRegion());

        EmissionType emissionType = emissionsData.getEmissionType();
        emissionsDataDTO.setEmissionTypeId(emissionType.getId());

        // Set properties unique to EmissionsDataDTO object
        double co2e = calculateCO2e(emissionsData);
        emissionsDataDTO.setCo2e(co2e);

        emissionsDataDTO.setEmissionTypeName(emissionType.getName());
        emissionsDataDTO.setUnit(emissionType.getUnit());
        emissionsDataDTO.setScope(emissionType.getScope());

        return emissionsDataDTO;
    }


}
