package com.emission_impossible.carbon_modelling_tool;

import com.emission_impossible.carbon_modelling_tool.model.Client;
import com.emission_impossible.carbon_modelling_tool.repository.ClientRepository;
import com.emission_impossible.carbon_modelling_tool.service.ClientService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * - Getting a client by ID
 * - Getting all clients
 * - Adding a new client
 * - Exception handling when client not found
 */
class ClientServiceTest extends BaseRepositoryTest {

    @Autowired
    private ClientService clientService;

    @Autowired
    private ClientRepository clientRepository;

    @Test
    void getClient() {
        Client client = clientRepository.save(new Client("Test Client"));

        Client found = clientService.getClient(client.getId());

        assertNotNull(found);
        assertEquals("Test Client", found.getName());
    }

    @Test
    void getClientThrowsExceptionWhenNotFound() {
        assertThrows(RuntimeException.class, () -> clientService.getClient(999L));
    }

    @Test
    void getAllClients() {
        clientRepository.save(new Client("Client A"));
        clientRepository.save(new Client("Client B"));

        List<Client> clients = clientService.getAllClients();

        assertTrue(clients.size() >= 2);
    }

    @Test
    void addClient() {
        Client newClient = clientService.addClient("New Client");

        assertNotNull(newClient.getId());
        assertEquals("New Client", newClient.getName());

        Client found = clientRepository.findById(newClient.getId()).orElse(null);
        assertNotNull(found);
    }
}
