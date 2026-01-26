import { db } from "../db";
import { generateId } from "../util/generateID";
import { ConversionRateService } from "./ConversionRateService";

export const CalculatedEmissionsService = {
  // Helper function to calculate CO2e for an emission
  calculateCO2e(emission) {
    const year = new Date(emission.date).getFullYear();
    const rate = ConversionRateService.getRate({
      emissionTypeId: emission.emissionTypeId,
      locationId: emission.locationId,
      year
    });

    if (!rate) {
      console.warn(`No conversion rate found for emission ${emission.id}`);
      return null;
    }

    return emission.value * rate.rate;
  },

  // Add a new emission entry
  addEmission({ emissionTypeId, locationId, date, value }) {
    const emission = {
      id: generateId(),
      emissionTypeId,
      locationId,
      date,
      value
    };

    // Validate that conversion rate exists before adding
    const year = new Date(date).getFullYear();
    const rate = ConversionRateService.getRate({
      emissionTypeId,
      locationId,
      year
    });

    if (!rate) {
      throw new Error(
        `No conversion rate found for emission type ${emissionTypeId} at location ${locationId} for year ${year}`
      );
    }

    db.emissionsData.push(emission);
    return emission;
  },

  // Get all emissions for a specific location with calculated CO2e
  getEmissionsForLocation(locationId) {
    return db.emissionsData
      .filter(e => e.locationId === locationId)
      .map(e => {
        const emissionType = db.emissionTypes.find(et => et.id === e.emissionTypeId);
        const co2e = this.calculateCO2e(e);
        
        return { 
          ...e, 
          co2e,
          emissionTypeName: emissionType?.name,
          unit: emissionType?.unit,
          scope: emissionType?.scope
        };
      });
  },

  // Get all emissions for a client (across all their locations) with calculated CO2e
  getEmissionsForClient(clientId) {
    // Get all locations for this client
    const clientLocations = db.locations
      .filter(loc => loc.clientId === clientId)
      .map(loc => loc.id);
    
    // Get all emissions for those locations
    return db.emissionsData
      .filter(e => clientLocations.includes(e.locationId))
      .map(e => {
        const location = db.locations.find(loc => loc.id === e.locationId);
        const emissionType = db.emissionTypes.find(et => et.id === e.emissionTypeId);
        const co2e = this.calculateCO2e(e);
        
        return { 
          ...e, 
          co2e,
          locationName: location?.name,
          emissionTypeName: emissionType?.name,
          unit: emissionType?.unit,
          scope: emissionType?.scope
        };
      });
  },

  // Get all emissions with calculated CO2e
  getAllEmissions() {
    return db.emissionsData.map(e => {
      const location = db.locations.find(loc => loc.id === e.locationId);
      const emissionType = db.emissionTypes.find(et => et.id === e.emissionTypeId);
      const co2e = this.calculateCO2e(e);
      
      return { 
        ...e, 
        co2e,
        locationName: location?.name,
        locationRegion: location?.region,
        emissionTypeName: emissionType?.name,
        unit: emissionType?.unit,
      };
    });
  },

  // Get emissions filtered by date range
  getEmissionsByDateRange(startDate, endDate, locationId = null) {
    let filtered = db.emissionsData.filter(e => {
      const emissionDate = new Date(e.date);
      return emissionDate >= new Date(startDate) && emissionDate <= new Date(endDate);
    });

    if (locationId) {
      filtered = filtered.filter(e => e.locationId === locationId);
    }

    return filtered.map(e => {
      const location = db.locations.find(loc => loc.id === e.locationId);
      const emissionType = db.emissionTypes.find(et => et.id === e.emissionTypeId);
      const co2e = this.calculateCO2e(e);
      
      return { 
        ...e, 
        co2e,
        locationName: location?.name,
        emissionTypeName: emissionType?.name,
        unit: emissionType?.unit
      };
    });
  },

  // Calculate total CO2e for a location
  getTotalCO2eForLocation(locationId) {
    const emissions = this.getEmissionsForLocation(locationId);
    return emissions.reduce((total, e) => total + (e.co2e || 0), 0);
  },

  // Calculate total CO2e for a client
  getTotalCO2eForClient(clientId) {
    const emissions = this.getEmissionsForClient(clientId);
    return emissions.reduce((total, e) => total + (e.co2e || 0), 0);
  },

  // Get emissions summary by type for a location
  getEmissionsSummaryByType(locationId) {
    const emissions = this.getEmissionsForLocation(locationId);
    const summary = {};

    emissions.forEach(e => {
      if (!summary[e.emissionTypeName]) {
        summary[e.emissionTypeName] = {
          totalValue: 0,
          totalCO2e: 0,
          unit: e.unit,
          count: 0
        };
      }
      summary[e.emissionTypeName].totalValue += e.value;
      summary[e.emissionTypeName].totalCO2e += e.co2e || 0;
      summary[e.emissionTypeName].count += 1;
    });

    return summary;
  }
};