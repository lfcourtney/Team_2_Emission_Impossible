export const kpiData = [
    { title: 'Total Emissions', value: '1,245', unit: 'tCO2e', trend: '+2.4%', status: 'warning' },
    { title: 'Energy Usage', value: '45.2', unit: 'MWh', trend: '-1.2%', status: 'success' },
    { title: 'Carbon Intensity', value: '245', unit: 'g/kWh', trend: '-5.0%', status: 'success' },
    { title: 'Offset Potential', value: '150', unit: 'tCO2e', trend: 'Neutral', status: 'neutral' },
  ];

  export const emissionsBySource = [
      { source: 'Scope 1 (Direct)', value: '45%', color: '#10B981' }, // Green
      { source: 'Scope 2 (Energy)', value: '35%', color: '#3B82F6' }, // Blue
      { source: 'Scope 3 (Supply)', value: '20%', color: '#F59E0B' }, // Amber
  ];

  export const recentActivity = [
      { id: 1, message: 'High energy consumption detected in Server Room B', time: '10 mins ago', type: 'warning' },
      { id: 2, message: 'Monthly report generated successfully', time: '2 hours ago', type: 'success' },
      { id: 3, message: 'New facility "London HQ" added', time: '1 day ago', type: 'neutral' },
  ];

  // time-series data for charts
  export const initialChartData = [
    { time: '00:00', actual: 400, predicted: 400, baseline: 450 },
    { time: '04:00', actual: 300, predicted: 310, baseline: 350 },
    { time: '08:00', actual: 550, predicted: 540, baseline: 600 },
    { time: '12:00', actual: 800, predicted: 780, baseline: 850 },
    { time: '16:00', actual: 700, predicted: 690, baseline: 750 },
    { time: '20:00', actual: 500, predicted: 490, baseline: 550 },
    { time: '23:59', actual: 450, predicted: 440, baseline: 500 },
  ];
