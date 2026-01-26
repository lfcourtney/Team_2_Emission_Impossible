package com.emission_impossible.carbon_modelling_tool.util;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.core.io.ClassPathResource;

import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;


/**
 * Utility class for reading CSV files from the application classpath.
 *
 *
 * <p>The returned {@link CSVRecord} objects can be accessed by column
 * name or index.</p>
 */
public class CsvUtils {


    /**
     * Reads a CSV file from the classpath and returns its records.
     *
     * <p>The CSV is expected to have a header row, which will be used
     * as column names and excluded from the returned data records.</p>
     */
    public static List<CSVRecord> read(String path) {
        try {

            // Load the CSV file from the classpath
            Reader reader = new InputStreamReader(
                    new ClassPathResource(path).getInputStream()
            );

            // Configure the CSV parser:
            // - use the first row as headers
            // - skip the header row in the returned records
            // - trim surrounding whitespace from values
            CSVParser parser = CSVFormat.DEFAULT.builder()
                    // tells CSV to use the first record as column names
                    .setHeader()
                    // prevents that header row from appearing as a data record
                    .setSkipHeaderRecord(true)
                    .setTrim(true)
                    .build()
                    .parse(reader);

            // Parse and return all records
            return parser.getRecords();

        } catch (Exception e) {
            // Wrap any IO or parsing exceptions in a runtime exception
            throw new RuntimeException("Failed to read CSV: " + path, e);
        }
    }
}
