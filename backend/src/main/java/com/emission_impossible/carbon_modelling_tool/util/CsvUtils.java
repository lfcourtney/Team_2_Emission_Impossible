package com.emission_impossible.carbon_modelling_tool.util;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.core.io.ClassPathResource;

import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;

public class CsvUtils {

    public static List<CSVRecord> read(String path) {
        try {
            Reader reader = new InputStreamReader(
                    new ClassPathResource(path).getInputStream()
            );

            CSVParser parser = CSVFormat.DEFAULT.builder()
                    // tells CSV to use the first record as column names
                    .setHeader()
                    // prevents that header row from appearing as a data record
                    .setSkipHeaderRecord(true)
                    .setTrim(true)
                    .build()
                    .parse(reader);

            return parser.getRecords();

        } catch (Exception e) {
            throw new RuntimeException("Failed to read CSV: " + path, e);
        }
    }
}
