import { db } from "../db";
import { generateId } from "../util/generateID";

export const LocationService = {
  getLocation(locationId) {
    return db.locations.find(loc => loc.id === locationId);
  },

  getLocationsForClient(clientId) {
    return db.locations.filter(loc => loc.clientId === clientId);
  },

  getAllLocations() {
    return db.locations.map(location => {
      const client = db.clients.find(c => c.id === location.clientId);
      return {
        ...location,
        clientName: client?.name
      };
    });
  },

  addLocation({ clientId, name, region }) {
    const location = {
      id: generateId(),
      clientId,
      name,
      region
    };
    db.locations.push(location);
    return location;
  }
};