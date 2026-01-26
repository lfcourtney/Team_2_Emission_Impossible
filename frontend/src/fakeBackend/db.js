export const db = {
  clients: [],              // Each Client (e.g Version 1)
  locations: [],            // Each Location (e.g Dublin Office, Birmingham Office)
  emissionTypes: [],        // Each Emission Type (e.g Electricity, Natural Gas)
  conversionRates: [],      // Conversion rate for that emission type, at that location (CO2e)
  emissionsData: [],        // Calculated emissions date entires (For each location and client)
};