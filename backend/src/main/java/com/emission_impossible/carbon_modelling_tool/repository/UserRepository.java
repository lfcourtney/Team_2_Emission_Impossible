package com.emission_impossible.carbon_modelling_tool.repository;

import com.emission_impossible.carbon_modelling_tool.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByEmail(String email);

    Optional<User> findById(int id);

}