
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

  // The 'baseline' is BAU (Business As Usual)
  export const initialChartData = [
    { time: '00:00', actual: 400, baseline: 420 },
    { time: '04:00', actual: 300, baseline: 350 },
    { time: '08:00', actual: 550, baseline: 580 },
    { time: '12:00', actual: 800, baseline: 850 },
    { time: '16:00', actual: 700, baseline: 750 },
    { time: '20:00', actual: 500, baseline: 550 },
    { time: '23:59', actual: 450, baseline: 480 },
  ];

  // SCI = (Energy * Intensity) + Embodied
  export const kpiData = [
      { title: 'SCI Score', value: '245', unit: 'gCO2e/R', trend: '-5.0%', status: 'success' }, // Replaced 'Carbon Intensity'
      { title: 'Total Emissions', value: '1,245', unit: 'tCO2e', trend: '+2.4%', status: 'warning' },
      { title: 'Energy Usage', value: '45.2', unit: 'MWh', trend: '-1.2%', status: 'success' },
      { title: 'Cost Efficiency', value: '$12.4k', unit: 'Saved', trend: '+8.2%', status: 'success' },
  ];
