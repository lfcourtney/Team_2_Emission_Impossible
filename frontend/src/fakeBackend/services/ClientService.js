import { db } from "../db";
import { generateId } from "../util/generateID";

export const ClientService = {
  getClient(clientId) {
    return db.clients.find(c => c.id === clientId);
  },

  getAllClients() {
    return db.clients.map(client => {
      const locations = db.locations.filter(loc => loc.clientId === client.id);
      return {
        ...client,
        locationCount: locations.length,
        locations: locations
      };
    });
  },

  addClient(name) {
    const client = {
      id: generateId(),
      name
    };
    db.clients.push(client);
    return client;
  }
};