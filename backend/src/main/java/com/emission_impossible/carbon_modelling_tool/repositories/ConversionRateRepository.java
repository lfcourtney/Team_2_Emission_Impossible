@Repository
public interface ConversionRateRepository extends JpaRepository<ConversionRate, Long> {
    // We might need to also consider the year as it can vary over time
    List<ConversionRate> findByEmissionTypeIdAndLocationId(Long emissionTypeId, Long locationId);
}