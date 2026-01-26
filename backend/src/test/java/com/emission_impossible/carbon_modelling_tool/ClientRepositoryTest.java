package com.emission_impossible.carbon_modelling_tool;

import com.emission_impossible.carbon_modelling_tool.model.Client;
import com.emission_impossible.carbon_modelling_tool.repository.ClientRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;


import static org.junit.jupiter.api.Assertions.*;


class ClientRepositoryTest extends BaseRepositoryTest {

    @Autowired
    private ClientRepository clientRepository;

    @Test
    void createClient() {
        Client client = new Client("Test Client");
        Client saved = clientRepository.save(client);

        assertNotNull(saved.getId());
        assertEquals("Test Client", saved.getName());
    }

    @Test
    void updateClient() {
        Client clientA = new Client("Test Client");
        Client saved = clientRepository.save(clientA);


        Client clientB = clientRepository.findAll().get(0);
        clientB.setName("Updated Name");

        Client updated = clientRepository.save(clientB);
        assertEquals("Updated Name", updated.getName());
    }

    @Test
    void deleteClient() {
        Client client = clientRepository.save(new Client("Delete Me"));
        clientRepository.delete(client);

        assertTrue(clientRepository.findById(client.getId()).isEmpty());
    }
}
