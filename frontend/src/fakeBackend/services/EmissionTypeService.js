import { db } from "../db";
import { generateId } from "../util/generateID";

export const EmissionTypeService = {
  getEmissionType(emissionTypeId) {
    return db.emissionTypes.find(et => et.id === emissionTypeId);
  },

  getAllEmissionTypes() {
    return db.emissionTypes;
  },

  addEmissionType({ name, unit, desc, scope }) {
    const emissionType = {
      id: generateId(),
      name,
      unit,
      scope,
      desc
    };
    db.emissionTypes.push(emissionType);
    return emissionType;
  }
};