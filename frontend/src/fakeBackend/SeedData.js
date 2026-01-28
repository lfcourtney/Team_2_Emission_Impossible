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
  
  
  const birminghamOfficeId = generateId();
  db.locations.push({
    id: birminghamOfficeId,
    clientId,
    name: "Birmingham Office",
    region: "UK"
  });

  const sydneyOfficeId = generateId();
  db.locations.push({
    id: sydneyOfficeId,
    clientId,
    name: "Sydney Office",
    region: "AU"
  });

  const newYorkOfficeId = generateId();
  db.locations.push({
    id: newYorkOfficeId,
    clientId,
    name: "New York Office",
    region: "US"
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

  const businessTravelId = generateId();
  db.emissionTypes.push({
    id: businessTravelId,
    name: "Business Travel",
    unit: "km",
    scope: '3',
    desc: "Air and rail travel for business purposes"
  });

  const wasteId = generateId();
  db.emissionTypes.push({
    id: wasteId,
    name: "Waste",
    unit: "kg",
    scope: '3',
    desc: "Waste disposal and treatment"
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
    locationId: birminghamOfficeId,
    year: 2024,
    rate: 0.19,
    unit: "kgCO2e/kWh",
    desc: "UK grid electricity factor 2024"
  });

  db.conversionRates.push({
    id: generateId(),
    emissionTypeId: electricityId,
    locationId: sydneyOfficeId,
    year: 2024,
    rate: 0.75,
    unit: "kgCO2e/kWh",
    desc: "Australia grid electricity factor 2024"
  });

  db.conversionRates.push({
    id: generateId(),
    emissionTypeId: electricityId,
    locationId: newYorkOfficeId,
    year: 2024,
    rate: 0.38,
    unit: "kgCO2e/kWh",
    desc: "New York grid electricity factor 2024"
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
    locationId: birminghamOfficeId,
    year: 2024,
    rate: 2.01,
    unit: "kgCO2e/m³",
    desc: "Natural gas emission factor 2024"
  });

  db.conversionRates.push({
    id: generateId(),
    emissionTypeId: gasId,
    locationId: sydneyOfficeId,
    year: 2024,
    rate: 2.00,
    unit: "kgCO2e/m³",
    desc: "Natural gas emission factor 2024"
  });

  db.conversionRates.push({
    id: generateId(),
    emissionTypeId: gasId,
    locationId: newYorkOfficeId,
    year: 2024,
    rate: 2.05,
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
    locationId: birminghamOfficeId,
    year: 2024,
    rate: 2.20,
    unit: "kgCO2e/litre",
    desc: "Petrol/diesel average emission factor"
  });

  db.conversionRates.push({
    id: generateId(),
    emissionTypeId: fuelId,
    locationId: sydneyOfficeId,
    year: 2024,
    rate: 2.28,
    unit: "kgCO2e/litre",
    desc: "Petrol/diesel average emission factor"
  });

  db.conversionRates.push({
    id: generateId(),
    emissionTypeId: fuelId,
    locationId: newYorkOfficeId,
    year: 2024,
    rate: 2.35,
    unit: "kgCO2e/litre",
    desc: "Petrol/diesel average emission factor"
  });

  // Business Travel conversion rates
  db.conversionRates.push({
    id: generateId(),
    emissionTypeId: businessTravelId,
    locationId: dublinOfficeId,
    year: 2024,
    rate: 0.18,
    unit: "kgCO2e/km",
    desc: "Average business travel emission factor"
  });

  db.conversionRates.push({
    id: generateId(),
    emissionTypeId: businessTravelId,
    locationId: birminghamOfficeId,
    year: 2024,
    rate: 0.18,
    unit: "kgCO2e/km",
    desc: "Average business travel emission factor"
  });

  db.conversionRates.push({
    id: generateId(),
    emissionTypeId: businessTravelId,
    locationId: sydneyOfficeId,
    year: 2024,
    rate: 0.19,
    unit: "kgCO2e/km",
    desc: "Average business travel emission factor"
  });

  db.conversionRates.push({
    id: generateId(),
    emissionTypeId: businessTravelId,
    locationId: newYorkOfficeId,
    year: 2024,
    rate: 0.17,
    unit: "kgCO2e/km",
    desc: "Average business travel emission factor"
  });

  // Waste conversion rates
  db.conversionRates.push({
    id: generateId(),
    emissionTypeId: wasteId,
    locationId: dublinOfficeId,
    year: 2024,
    rate: 0.45,
    unit: "kgCO2e/kg",
    desc: "Waste disposal emission factor"
  });

  db.conversionRates.push({
    id: generateId(),
    emissionTypeId: wasteId,
    locationId: birminghamOfficeId,
    year: 2024,
    rate: 0.43,
    unit: "kgCO2e/kg",
    desc: "Waste disposal emission factor"
  });

  db.conversionRates.push({
    id: generateId(),
    emissionTypeId: wasteId,
    locationId: sydneyOfficeId,
    year: 2024,
    rate: 0.52,
    unit: "kgCO2e/kg",
    desc: "Waste disposal emission factor"
  });

  db.conversionRates.push({
    id: generateId(),
    emissionTypeId: wasteId,
    locationId: newYorkOfficeId,
    year: 2024,
    rate: 0.48,
    unit: "kgCO2e/kg",
    desc: "Waste disposal emission factor"
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

  // Dublin Office - Business Travel
  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: businessTravelId,
    locationId: dublinOfficeId,
    date: '2024-01-15',
    value: 2500 // km → 450 kg CO2e
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: businessTravelId,
    locationId: dublinOfficeId,
    date: '2024-02-15',
    value: 3200 // km → 576 kg CO2e
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: businessTravelId,
    locationId: dublinOfficeId,
    date: '2024-03-15',
    value: 2800 // km → 504 kg CO2e
  });

  // Dublin Office - Waste
  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: wasteId,
    locationId: dublinOfficeId,
    date: '2024-01-15',
    value: 350 // kg → 157.5 kg CO2e
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: wasteId,
    locationId: dublinOfficeId,
    date: '2024-02-15',
    value: 420 // kg → 189 kg CO2e
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: wasteId,
    locationId: dublinOfficeId,
    date: '2024-03-15',
    value: 380 // kg → 171 kg CO2e
  });

  // Birmingham Office - Electricity
  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: electricityId,
    locationId: birminghamOfficeId,
    date: '2024-01-15',
    value: 800 // kWh → 152 kg CO2e
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: electricityId,
    locationId: birminghamOfficeId,
    date: '2024-02-15',
    value: 900 // kWh → 171 kg CO2e
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: electricityId,
    locationId: birminghamOfficeId,
    date: '2024-03-15',
    value: 750 // kWh → 142.5 kg CO2e
  });

  // Birmingham Office - Vehicle Fuel
  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: fuelId,
    locationId: birminghamOfficeId,
    date: '2024-01-15',
    value: 200 // litres → 440 kg CO2e
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: fuelId,
    locationId: birminghamOfficeId,
    date: '2024-02-15',
    value: 220 // litres → 484 kg CO2e
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: fuelId,
    locationId: birminghamOfficeId,
    date: '2024-03-15',
    value: 190 // litres → 418 kg CO2e
  });

  // Birmingham Office - Business Travel
  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: businessTravelId,
    locationId: birminghamOfficeId,
    date: '2024-01-15',
    value: 1800 // km → 324 kg CO2e
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: businessTravelId,
    locationId: birminghamOfficeId,
    date: '2024-02-15',
    value: 2100 // km → 378 kg CO2e
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: businessTravelId,
    locationId: birminghamOfficeId,
    date: '2024-03-15',
    value: 1950 // km → 351 kg CO2e
  });

  // Sydney Office - Electricity
  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: electricityId,
    locationId: sydneyOfficeId,
    date: '2024-01-15',
    value: 1100 // kWh → 825 kg CO2e
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: electricityId,
    locationId: sydneyOfficeId,
    date: '2024-02-15',
    value: 1250 // kWh → 937.5 kg CO2e
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: electricityId,
    locationId: sydneyOfficeId,
    date: '2024-03-15',
    value: 1050 // kWh → 787.5 kg CO2e
  });

  // Sydney Office - Gas
  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: gasId,
    locationId: sydneyOfficeId,
    date: '2024-01-15',
    value: 300 // m³ → 600 kg CO2e
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: gasId,
    locationId: sydneyOfficeId,
    date: '2024-02-15',
    value: 250 // m³ → 500 kg CO2e
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: gasId,
    locationId: sydneyOfficeId,
    date: '2024-03-15',
    value: 280 // m³ → 560 kg CO2e
  });

  // Sydney Office - Waste
  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: wasteId,
    locationId: sydneyOfficeId,
    date: '2024-01-15',
    value: 450 // kg → 234 kg CO2e
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: wasteId,
    locationId: sydneyOfficeId,
    date: '2024-02-15',
    value: 520 // kg → 270.4 kg CO2e
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: wasteId,
    locationId: sydneyOfficeId,
    date: '2024-03-15',
    value: 480 // kg → 249.6 kg CO2e
  });

  // New York Office - Electricity
  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: electricityId,
    locationId: newYorkOfficeId,
    date: '2024-01-15',
    value: 1400 // kWh → 532 kg CO2e
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: electricityId,
    locationId: newYorkOfficeId,
    date: '2024-02-15',
    value: 1550 // kWh → 589 kg CO2e
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: electricityId,
    locationId: newYorkOfficeId,
    date: '2024-03-15',
    value: 1300 // kWh → 494 kg CO2e
  });

  // New York Office - Gas
  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: gasId,
    locationId: newYorkOfficeId,
    date: '2024-01-15',
    value: 700 // m³ → 1435 kg CO2e
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: gasId,
    locationId: newYorkOfficeId,
    date: '2024-02-15',
    value: 850 // m³ → 1742.5 kg CO2e
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: gasId,
    locationId: newYorkOfficeId,
    date: '2024-03-15',
    value: 600 // m³ → 1230 kg CO2e
  });

  // New York Office - Vehicle Fuel
  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: fuelId,
    locationId: newYorkOfficeId,
    date: '2024-01-15',
    value: 280 // litres → 658 kg CO2e
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: fuelId,
    locationId: newYorkOfficeId,
    date: '2024-02-15',
    value: 310 // litres → 728.5 kg CO2e
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: fuelId,
    locationId: newYorkOfficeId,
    date: '2024-03-15',
    value: 290 // litres → 681.5 kg CO2e
  });

  // New York Office - Business Travel
  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: businessTravelId,
    locationId: newYorkOfficeId,
    date: '2024-01-15',
    value: 4500 // km → 765 kg CO2e
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: businessTravelId,
    locationId: newYorkOfficeId,
    date: '2024-02-15',
    value: 5200 // km → 884 kg CO2e
  });

  db.emissionsData.push({
    id: generateId(),
    emissionTypeId: businessTravelId,
    locationId: newYorkOfficeId,
    date: '2024-03-15',
    value: 4800 // km → 816 kg CO2e
  });

}
  