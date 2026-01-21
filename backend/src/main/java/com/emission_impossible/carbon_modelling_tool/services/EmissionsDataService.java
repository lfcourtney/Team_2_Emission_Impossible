@Service
public class EmissionsDataService {

    @Autowired
    private EmissionsDataRepository emissionsDataRepository;

    @Autowired
    private ConversionRateService conversionRateService;

}
