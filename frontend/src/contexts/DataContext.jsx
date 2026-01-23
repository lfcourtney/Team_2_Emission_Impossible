import { createContext, useContext, useState, useEffect } from 'react';
import { ClientService } from '../fakeBackend/services/ClientService';
import { LocationService } from '../fakeBackend/services/LocationService';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [clients, setClients] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedClientId, setSelectedClientId] = useState('');
    const [selectedLocationId, setSelectedLocationId] = useState('all');

    useEffect(() => {
        // Initial Load
        const allClients = ClientService.getAllClients();
        setClients(allClients);
        if (allClients.length > 0) {
            handleClientChange(allClients[0].id);
        }
    }, []);

    const handleClientChange = (cId) => {
        const id = Number(cId);
        setSelectedClientId(id);
        const locs = LocationService.getLocationsForClient(id);
        setLocations(locs);
        setSelectedLocationId('all');
    };

    const handleLocationChange = (lId) => {
        setSelectedLocationId(lId);
    };

    return (
        <DataContext.Provider value={{
            clients,
            locations,
            selectedClientId,
            selectedLocationId,
            handleClientChange,
            handleLocationChange
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
