@Service
public class ConversionRateService {

    @Autowired
    private ConversionRateRepository conversionRateRepository;

    public ConversionRate updateRate(ConversionRate newRate) {
        // Append previous rate and date ranges to an array/variable?
        return conversionRateRepository.save(newRate);
    }

    public ConversionRate getRateFor(Location location, EmissionType type, int year) {
        return conversionRateRepository.findByLocationAndYear(location, year)
                                       .stream()
                                       .filter(r -> r.getEmissionType().equals(type))
                                       .findFirst()
                                       .orElseThrow(() -> new RuntimeException("No conversion rate found"));
    }
}
