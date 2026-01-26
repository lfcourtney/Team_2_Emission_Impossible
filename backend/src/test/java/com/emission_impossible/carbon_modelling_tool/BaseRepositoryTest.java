package com.emission_impossible.carbon_modelling_tool;

import jakarta.transaction.Transactional;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

// The class that will be used to run Spring Boot tests.
//
// To run these tests in IntelliJ IDE:
//
// 1. Right-click src/test/java
//
// 2. Click run All Tests
//
// 2.1. Alternate method: generate with code coverage:
//      Click 'More options' then 'Run tests in Java with coverage'
@SpringBootTest
// Limit execution so that this class is only executed on 'test' profile
@ActiveProfiles("test")
// For example, "start a brand new read-only transaction when this method is invoked,
// suspending any existing transaction"
@Transactional
public abstract class BaseRepositoryTest {
}

