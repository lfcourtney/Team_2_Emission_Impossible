package com.emission_impossible.carbon_modelling_tool.service;

import com.emission_impossible.carbon_modelling_tool.Employee;
import com.emission_impossible.carbon_modelling_tool.repository.EmployeeRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository){
        this.employeeRepository = employeeRepository;
    }

    public boolean addNewUser(Employee employee){
        Optional<Employee> foundEmployee = this.employeeRepository.findById(employee.getId());
        if(foundEmployee.isPresent()){
            return false;
        } else {
            this.employeeRepository.save(employee);
            return true;
        }
    }

    public Optional<Employee> getUserById(int id){

        return this.employeeRepository.findById(id);
    }

    public List<Employee> getAllUsers(){
        return this.employeeRepository.findAll();
    }




}
