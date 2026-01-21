import jakarta.persistence.*;

@Entity
@Table(name = "conversion_rates")
public class ConversionRate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int year;
    private double rate;
    private String unit;

    @ManyToOne
    @JoinColumn(name = "emission_type_id")
    private EmissionType emissionType;

    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;

    protected ConversionRate() {}

    // Constructor
    public ConversionRate(int year, double rate, String unit, EmissionType emissionType, Location location) {
        this.year = year;
        this.rate = rate;
        this.unit = unit;
        this.emissionType = emissionType;
        this.location = location;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public double getRate() { return rate; }
    public void setRate(double rate) { this.rate = rate; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public EmissionType getEmissionType() { return emissionType; }
    public void setEmissionType(EmissionType emissionType) { this.emissionType = emissionType; }

    public Location getLocation() { return location; }
    public void setLocation(Location location) { this.location = location; }
}
