package com.emission_impossible.carbon_modelling_tool;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.jdbc.autoconfigure.DataSourceAutoConfiguration;

//TODO: Remove exclude property. Has been added since there is no database yet.
@SpringBootApplication()
public class CarbonModellingToolApplication {

	public static void main(String[] args) {

		SpringApplication.run(CarbonModellingToolApplication.class, args);
	}

}
