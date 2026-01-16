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
