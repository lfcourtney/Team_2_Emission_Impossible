import jakarta.persistence.*;
import java.util.List;

/**
 * Location for a client where emissions data is collected.
 * Depending on region, different conversion rates may apply.
 */
@Entity
@Table(name = "locations")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String region;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL)
    private List<ConversionRate> conversionRates;

    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL)
    private List<EmissionsData> emissionsData;

    // Reflection constructor
    protected Location() {}

    // Public constructor
    public Location(String name, String region, Client client) {
        this.name = name;
        this.region = region;
        this.client = client;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }

    public Client getClient() { return client; }
    public void setClient(Client client) { this.client = client; }

    public List<ConversionRate> getConversionRates() { return conversionRates; }
    public void setConversionRates(List<ConversionRate> conversionRates) { this.conversionRates = conversionRates; }

    public List<EmissionsData> getEmissionsData() { return emissionsData; }
    public void setEmissionsData(List<EmissionsData> emissionsData) { this.emissionsData = emissionsData; }
}
