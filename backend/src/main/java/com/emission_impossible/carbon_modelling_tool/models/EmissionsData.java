import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "emissions_data")
public class EmissionsData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private double value;

    @ManyToOne
    @JoinColumn(name = "emission_type_id")
    private EmissionType emissionType;

    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;

    // Optionally link to precomputed CO2e
    @OneToMany(mappedBy = "emissionsData", cascade = CascadeType.ALL)
    private java.util.List<ComputedEmission> computedEmissions;

    protected EmissionsData() {}

    // Constructor
    public EmissionsData(LocalDate date, double value, EmissionType emissionType, Location location) {
        this.date = date;
        this.value = value;
        this.emissionType = emissionType;
        this.location = location;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public double getValue() { return value; }
    public void setValue(double value) { this.value = value; }

    public EmissionType getEmissionType() { return emissionType; }
    public void setEmissionType(EmissionType emissionType) { this.emissionType = emissionType; }

    public Location getLocation() { return location; }
    public void setLocation(Location location) { this.location = location; }

    public java.util.List<ComputedEmission> getComputedEmissions() { return computedEmissions; }
    public void setComputedEmissions(java.util.List<ComputedEmission> computedEmissions) { this.computedEmissions = computedEmissions; }
}
