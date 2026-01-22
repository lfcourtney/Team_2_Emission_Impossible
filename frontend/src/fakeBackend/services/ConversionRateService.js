import { db } from "../db";
import { generateId } from "../util/generateID";

export const ConversionRateService = {
  getRate({ emissionTypeId, locationId, year }) {
    return db.conversionRates.find(
      r =>
        r.emissionTypeId === emissionTypeId &&
        r.locationId === locationId &&
        r.year === year
    );
  },

  getRatesForLocation(locationId) {
    return db.conversionRates.filter(r => r.locationId === locationId);
  },

  getAllRates() {
    return db.conversionRates.map(rate => {
      const location = db.locations.find(loc => loc.id === rate.locationId);
      const emissionType = db.emissionTypes.find(et => et.id === rate.emissionTypeId);
      
      return {
        ...rate,
        locationName: location?.name,
        emissionTypeName: emissionType?.name,
        emissionTypeUnit: emissionType?.unit
      };
    });
  },

  updateRate(newRate) {
    const existing = db.conversionRates.find(
      r =>
        r.emissionTypeId === newRate.emissionTypeId &&
        r.locationId === newRate.locationId &&
        r.year === newRate.year
    );

    if (existing) {
      // emulate audit trail by keeping old record
      db.conversionRates.push({
        ...existing,
        id: generateId(),
        supersededBy: new Date().toISOString()
      });

      existing.rate = newRate.rate;
      existing.unit = newRate.unit;
      existing.desc = newRate.desc;
    } else {
      db.conversionRates.push({
        id: generateId(),
        ...newRate
      });
    }
  }
};