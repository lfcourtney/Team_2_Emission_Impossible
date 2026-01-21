import jakarta.persistence.*;
import java.util.List;

/**
 * Client entity representing a client in the carbon modelling tool.
 * Each client will have multiple associated locations.
 */
@Entity
@Table(name = "clients")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;

    // A client has multiple locations (e.g Dublin, Birmingham, London etc)
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private List<Location> locations;

    // Reflection constructor
    protected Client() {}

    // Public constructor
    public Client(String name) {
        this.name = name;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public List<Location> getLocations() { return locations; }
    public void setLocations(List<Location> locations) { this.locations = locations; }
}
