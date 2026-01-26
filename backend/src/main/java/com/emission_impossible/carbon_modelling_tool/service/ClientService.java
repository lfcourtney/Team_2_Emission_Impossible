package com.emission_impossible.carbon_modelling_tool.service;

import com.emission_impossible.carbon_modelling_tool.model.Client;
import com.emission_impossible.carbon_modelling_tool.repository.ClientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {

    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository){
        this.clientRepository = clientRepository;
    }

    public Client getClient(Long clientId){
        return this.clientRepository.findById(clientId)
                .orElseThrow(() -> new RuntimeException(String.format("No client found for client id %d", clientId)));
    }

    public List<Client> getAllClients(){
        return this.clientRepository.findAll();
    }

    public Client addClient(String name){

        Client newClient = new Client(name);

        this.clientRepository.save(newClient);

        return newClient;
    }


}
