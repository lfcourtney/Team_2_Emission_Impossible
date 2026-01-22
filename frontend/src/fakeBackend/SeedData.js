import { db } from "./db";
import { generateId, resetIdCounter } from "./util/generateID";

export function seedDatabase() {
  // Reset to ensure consistent IDs on each seed
  resetIdCounter();

  // Clear array data to prevent duplication on multiple seeds

  // CREATE CLIENTS
  const clientId = generateId();
  db.clients.push({
    id: clientId,
    name: "Version 1"
  });

  // CREATE LOCATIONS
  const dublinOfficeId = generateId();
  db.locations.push({
    id: dublinOfficeId,
    clientId,
    name: "Dublin Office",
    region: "EU"
  });

  const londonOfficeId = generateId();
  db.locations.push({
    id: londonOfficeId,
    clientId,
    name: "London Office",
    region: "UK"
  });

  // CREATE EMISSION TYPES - What do we currently track?
  const electricityId = generateId();
  db.emissionTypes.push({
    id: electricityId,
    name: "Electricity",
    unit: "kWh",
    scope: '2',
    desc: "Grid electricity consumption"
  });

  const gasId = generateId();
  db.emissionTypes.push({
    id: gasId,
    name: "Natural Gas",
    unit: "m³",
    scope: '1',
    desc: "Natural gas consumption for heating"
  });

  const fuelId = generateId();
  db.emissionTypes.push({
    id: fuelId,
    name: "Vehicle Fuel",
    unit: "litres",
    scope: '3',
    desc: "Petrol/diesel for company vehicles"
  });

  // CONVERSION RATES (Per location and emission type)
  db.conversionRates.push({
    id: generateId(),
    emissionTypeId: electricityId,
    locationId: dublinOfficeId,
    year: 2024,
    rate: 0.42,
    unit: "kgCO2e/kWh",
    desc: "Ireland grid electricity factor 2024"
  });

  db.conversionRates.push({
    id: generateId(),
    emissionTypeId: electricityId,
    locationId: londonOfficeId,
    year: 2024,
    rate: 0.19,
    unit: "kgCO2e/kWh",
    desc: "UK grid electricity factor 2024"
  });

  db.conversionRates.push({
    id: generateId(),
    emissionTypeId: gasId,
    locationId: dublinOfficeId,
    year: 2024,
    rate: 2.03,
    unit: "kgCO2e/m³",
    desc: "Natural gas emission factor 2024"
  });

  db.conversionRates.push({
    id: generateId(),
    emissionTypeId: gasId,
    locationId: londonOfficeId,
    year: 2024,
    rate: 2.01,
    unit: "kgCO2e/m³",
    desc: "Natural gas emission factor 2024"
  });

  db.conversionRates.push({
    id: generateId(),
    emissionTypeId: fuelId,
    locationId: dublinOfficeId,
    year: 2024,
    rate: 2.31,
    unit: "kgCO2e/litre",
    desc: "Petrol/diesel average emission factor"
  });

  db.conversionRates.push({
    id: generateId(),
    emissionTypeId: fuelId,
    locationId: londonOfficeId,
    year: 2024,
    rate: 2.20,
    unit: "kgCO2e/litre",
    desc: "Petrol/diesel average emission factor"
  });

  // CALCULATED EMISSIONS DATA FOR EACH LOCATION

  // Dublin Office - Electricity
  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: electricityId,
    locationId: dublinOfficeId,
    date: '2024-01-15',
    value: 1000 // kWh → 420 kg CO2e (1000 * 0.42)
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: electricityId,
    locationId: dublinOfficeId,
    date: '2024-02-15',
    value: 1200 // kWh → 504 kg CO2e (1200 * 0.42)
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: electricityId,
    locationId: dublinOfficeId,
    date: '2024-03-15',
    value: 950 // kWh → 399 kg CO2e (950 * 0.42)
  });

  // Dublin Office - Natural Gas
  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: gasId,
    locationId: dublinOfficeId,
    date: '2024-01-15',
    value: 500 // m³ → 1015 kg CO2e (500 * 2.03)
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: gasId,
    locationId: dublinOfficeId,
    date: '2024-02-15',
    value: 650 // m³ → 1319.5 kg CO2e (650 * 2.03)
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: gasId,
    locationId: dublinOfficeId,
    date: '2024-03-15',
    value: 400 // m³ → 812 kg CO2e (400 * 2.03)
  });

  // Dublin Office - Vehicle Fuel
  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: fuelId,
    locationId: dublinOfficeId,
    date: '2024-01-15',
    value: 150 // litres → 346.5 kg CO2e (150 * 2.31)
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: fuelId,
    locationId: dublinOfficeId,
    date: '2024-02-15',
    value: 180 // litres → 415.8 kg CO2e (180 * 2.31)
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: fuelId,
    locationId: dublinOfficeId,
    date: '2024-03-15',
    value: 160 // litres → 369.6 kg CO2e (160 * 2.31)
  });

  // London Office - Electricity
  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: electricityId,
    locationId: londonOfficeId,
    date: '2024-01-15',
    value: 800 // kWh → 152 kg CO2e (800 * 0.19)
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: electricityId,
    locationId: londonOfficeId,
    date: '2024-02-15',
    value: 900 // kWh → 171 kg CO2e (900 * 0.19)
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: electricityId,
    locationId: londonOfficeId,
    date: '2024-03-15',
    value: 750 // kWh → 142.5 kg CO2e (750 * 0.19)
  });

  // London Office - Vehicle Fuel
  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: fuelId,
    locationId: londonOfficeId,
    date: '2024-01-15',
    value: 200 // litres → 462 kg CO2e (200 * 2.31)
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: fuelId,
    locationId: londonOfficeId,
    date: '2024-02-15',
    value: 220 // litres → 508.2 kg CO2e (220 * 2.31)
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: fuelId,
    locationId: londonOfficeId,
    date: '2024-03-15',
    value: 190 // litres → 438.9 kg CO2e (190 * 2.31)
  });

}
  