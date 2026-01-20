package com.emission_impossible.carbon_modelling_tool;

import com.emission_impossible.carbon_modelling_tool.service.EmployeeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService){
        this.employeeService = employeeService;
    }

    @PostMapping("/add_new_user")
    public String addNewUser(@RequestBody Employee employee){
        Boolean wasAdded = this.employeeService.addNewUser(employee);
        if(wasAdded){
            return String.format("Employee with id %d added successfully", employee.getId());
        }else{
            return String.format("User was not added. User with the id %d already exists", employee.getId());
        }
    }

    @GetMapping("/get_all_users")
    public List<Employee> getAllUsers(){
        return this.employeeService.getAllUsers();
    }

    @GetMapping("/get_user_by_id/{id}")
    public String getUserById(@PathVariable int id){
        Optional<Employee> e = this.employeeService.getUserById(id);

        if(e.isEmpty()){
            return String.format("User of id %d does not exist", id);
        }else{
            return e.toString();
        }
    }


}
