import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Tooltip component with white styling
function Tooltip({ children, content, position = 'top' }) {
  const [isVisible, setIsVisible] = useState(false)

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-white border-x-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-white border-x-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-white border-y-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-white border-y-transparent border-l-transparent',
  }

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <div
        className={`absolute z-50 ${positionClasses[position]} pointer-events-none transition-all duration-150 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
      >
        <div className="bg-white text-[#111827] text-xs font-semibold rounded-lg px-3 py-1.5 shadow-lg whitespace-nowrap border border-[#e5e7eb]">
          {content}
          <div
            className={`absolute w-0 h-0 border-[5px] ${arrowClasses[position]}`}
          />
        </div>
      </div>
    </div>
  )
}

// Scope segment component with inline tooltip (transparent hover layer)
function ScopeSegment({ percentage, value, color }) {
  const [isHovered, setIsHovered] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const segmentRef = useState(null)[0]

  if (percentage === 0) return null

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPosition({
      top: rect.top - 10,
      left: rect.left + rect.width / 2,
    })
    setIsHovered(true)
  }

  return (
    <>
      <div
        ref={segmentRef}
        className="h-full flex items-center justify-center relative z-10"
        style={{ width: `${percentage}%` }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
      >
        {percentage >= 10 && (
          <span className="text-[10px] font-medium text-white pointer-events-none">{percentage}%</span>
        )}
      </div>
      {/* Tooltip - fixed positioning to avoid clipping */}
      {isHovered && (
        <div
          className="fixed pointer-events-none z-[9999] transition-all duration-150"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="bg-white text-[#111827] text-xs font-semibold rounded-lg px-3 py-1.5 shadow-lg whitespace-nowrap border border-[#e5e7eb] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: color }} />
            {value}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-[5px] border-t-white border-x-transparent border-b-transparent" />
          </div>
        </div>
      )}
    </>
  )
}

// Detailed tooltip component with white styling
function DetailedTooltip({ children, title, items, position = 'right' }) {
  const [isVisible, setIsVisible] = useState(false)

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-white border-x-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-white border-x-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-white border-y-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-white border-y-transparent border-l-transparent',
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <div
        className={`absolute z-50 ${positionClasses[position]} transition-all duration-150 ${isVisible && items && items.length > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
      >
        <div className="bg-white text-[#111827] text-xs rounded-xl p-4 shadow-lg min-w-[200px] border border-[#e5e7eb]">
          {title && (
            <div className="font-semibold text-sm mb-3 pb-2 border-b border-[#e5e7eb] text-[#111827]">
              {title}
            </div>
          )}
          <div className="space-y-2">
            {items?.map((item, index) => (
              <div key={index} className="flex justify-between items-center gap-4">
                <span className="text-[#6b7280] text-xs">{item.label}</span>
                <span className="font-semibold text-[#111827] text-xs">{item.value}</span>
              </div>
            ))}
          </div>
          <div
            className={`absolute w-0 h-0 border-[5px] ${arrowClasses[position]}`}
          />
        </div>
      </div>
    </div>
  )
}

// Comprehensive data model for all lifecycle calculations
const lifecycleData = {
  designSetup: {
    name: 'Design & Setup',
    color: '#00C6C2',
    calculations: {
      cloudEmissions: { label: 'Cloud Emissions', value: 120, unit: 'kg CO₂e' },
      totalCloudEmission: { label: 'Total Cloud Emission', value: 180, unit: 'kg CO₂e' },
      teamEmission: { label: 'Team Emission', value: 95, unit: 'kg CO₂e' },
      totalEmissions: { label: 'Total Emissions', value: 395, unit: 'kg CO₂e' },
    },
    travelEmissions: {
      travelEmissions: { label: 'Travel Emissions', value: 45, unit: 'kg CO₂e' },
      inOfficeTeamTotal: { label: 'In-Office Team Total', value: 85, unit: 'kg CO₂e' },
      remoteTeamTotal: { label: 'Remote Team Total', value: 35, unit: 'kg CO₂e' },
      hybridTotal: { label: 'Hybrid Total', value: 55, unit: 'kg CO₂e' },
      totalInOfficeEmissions: { label: 'Total In-Office Emissions', value: 130, unit: 'kg CO₂e' },
      totalHybridEmissions: { label: 'Total Hybrid Emissions', value: 100, unit: 'kg CO₂e' },
    },
    scopes: { scope1: 10, scope2: 35, scope3: 55 },
  },
  buildDelivery: {
    name: 'Build & Delivery',
    color: '#052831',
    calculations: {
      cloudEmissions: { label: 'Cloud Emissions', value: 450, unit: 'kg CO₂e' },
      totalTeamEmission: { label: 'Total Team Emission', value: 380, unit: 'kg CO₂e' },
      totalCloudEnvironment: { label: 'Total Cloud Environment', value: 520, unit: 'kg CO₂e' },
      totalDeliveryTool: { label: 'Total Delivery Tool', value: 280, unit: 'kg CO₂e' },
      totalPerDayDataEmissions: { label: 'Total Per Day Data Emissions', value: 145, unit: 'kg CO₂e' },
      perStageDataEmissions: { label: 'Per-Stage Data Emissions', value: 320, unit: 'kg CO₂e' },
      totalEmissions: { label: 'Total Emissions', value: 2095, unit: 'kg CO₂e' },
    },
    travelEmissions: {
      travelEmissions: { label: 'Travel Emissions', value: 120, unit: 'kg CO₂e' },
      inOfficeTeamTotal: { label: 'In-Office Team Total', value: 240, unit: 'kg CO₂e' },
      remoteTeamTotal: { label: 'Remote Team Total', value: 95, unit: 'kg CO₂e' },
      hybridTotal: { label: 'Hybrid Total', value: 165, unit: 'kg CO₂e' },
      totalInOfficeEmissions: { label: 'Total In-Office Emissions', value: 360, unit: 'kg CO₂e' },
      totalHybridEmissions: { label: 'Total Hybrid Emissions', value: 285, unit: 'kg CO₂e' },
    },
    scopes: { scope1: 20, scope2: 30, scope3: 50 },
  },
  operations: {
    name: 'Operations',
    color: '#FDF7EA',
    calculations: {
      cloudEmissions: { label: 'Cloud Emissions', value: 890, unit: 'kg CO₂e' },
      totalCloudEmissions: { label: 'Total Cloud Emissions', value: 1250, unit: 'kg CO₂e' },
      teamEmission: { label: 'Team Emission', value: 420, unit: 'kg CO₂e' },
      totalPerDayDataEmission: { label: 'Total Per Day Data Emission', value: 185, unit: 'kg CO₂e' },
      totalCloudEnviroEmission: { label: 'Total Cloud Enviro Emission', value: 680, unit: 'kg CO₂e' },
      totalDeliveryTool: { label: 'Total Delivery Tool', value: 320, unit: 'kg CO₂e' },
      totalEmissions: { label: 'Total Emissions', value: 3745, unit: 'kg CO₂e' },
    },
    travelEmissions: {
      travelEmissions: { label: 'Travel Emissions', value: 180, unit: 'kg CO₂e' },
      inOfficeTeamTotal: { label: 'In-Office Team Total', value: 350, unit: 'kg CO₂e' },
      remoteTeamTotal: { label: 'Remote Team Total', value: 140, unit: 'kg CO₂e' },
      hybridTotal: { label: 'Hybrid Total', value: 245, unit: 'kg CO₂e' },
      totalInOfficeEmissions: { label: 'Total In-Office Emissions', value: 530, unit: 'kg CO₂e' },
      totalHybridEmissions: { label: 'Total Hybrid Emissions', value: 425, unit: 'kg CO₂e' },
    },
    scopes: { scope1: 15, scope2: 40, scope3: 45 },
  },
  endOfLife: {
    name: 'End of Life',
    color: '#E0D6CC',
    calculations: {
      dataStorageCost: { label: 'Data Storage Cost', value: 125, unit: 'kg CO₂e' },
      totalDataStorageCost: { label: 'Total Data Storage Cost', value: 285, unit: 'kg CO₂e' },
      totalDataDeletionCost: { label: 'Total Data Deletion Cost', value: 45, unit: 'kg CO₂e' },
      cloudEmissions: { label: 'Cloud Emissions', value: 180, unit: 'kg CO₂e' },
      totalCloudEmission: { label: 'Total Cloud Emission', value: 245, unit: 'kg CO₂e' },
      totalEmissions: { label: 'Total Emissions', value: 880, unit: 'kg CO₂e' },
    },
    travelEmissions: {
      travelEmissions: { label: 'Travel Emissions', value: 25, unit: 'kg CO₂e' },
      inOfficeTeamTotal: { label: 'In-Office Team Total', value: 45, unit: 'kg CO₂e' },
      remoteTeamTotal: { label: 'Remote Team Total', value: 20, unit: 'kg CO₂e' },
      hybridTotal: { label: 'Hybrid Total', value: 30, unit: 'kg CO₂e' },
      totalInOfficeEmissions: { label: 'Total In-Office Emissions', value: 70, unit: 'kg CO₂e' },
      totalHybridEmissions: { label: 'Total Hybrid Emissions', value: 55, unit: 'kg CO₂e' },
    },
    scopes: { scope1: 5, scope2: 25, scope3: 70 },
  },
}

// Scenarios with green strategies and their effects on calculations
const scenariosData = [
  {
    id: 1,
    name: 'Scenario 1',
    description: 'Cloud Region Optimization',
    totalSaving: 50,
    assumptionsChanged: ['Renewable Energy 80%', 'Region: EU-West', 'Carbon-neutral Datacenters'],
    strategies: [
      {
        name: 'Renewable Energy Migration',
        description: 'Migrate to cloud regions powered by 100% renewable energy',
        reductions: {
          designSetup: { cloudEmissions: 30, totalCloudEmission: 25 },
          buildDelivery: { cloudEmissions: 35, totalCloudEnvironment: 30 },
          operations: { cloudEmissions: 40, totalCloudEmissions: 35 },
          endOfLife: { cloudEmissions: 20, totalCloudEmission: 15 },
        },
      },
      {
        name: 'Green Data Centers',
        description: 'Use data centers with carbon-neutral certification',
        reductions: {
          buildDelivery: { totalDeliveryTool: 20 },
          operations: { totalCloudEnviroEmission: 25, totalDeliveryTool: 20 },
          endOfLife: { totalDataStorageCost: 15 },
        },
      },
    ],
  },
  {
    id: 2,
    name: 'Scenario 2',
    description: 'Team Optimization',
    totalSaving: 35,
    assumptionsChanged: ['Remote-First Policy', '80% Virtual Meetings', 'Hybrid Schedules'],
    strategies: [
      {
        name: 'Remote-First Policy',
        description: 'Reduce office emissions by enabling remote work',
        reductions: {
          designSetup: { travelEmissions: 60, inOfficeTeamTotal: 50, totalInOfficeEmissions: 45 },
          buildDelivery: { travelEmissions: 55, inOfficeTeamTotal: 45, totalInOfficeEmissions: 40 },
          operations: { travelEmissions: 50, inOfficeTeamTotal: 40, totalInOfficeEmissions: 35 },
          endOfLife: { travelEmissions: 40, inOfficeTeamTotal: 35, totalInOfficeEmissions: 30 },
        },
      },
      {
        name: 'Virtual Collaboration Tools',
        description: 'Replace physical meetings with virtual alternatives',
        reductions: {
          designSetup: { teamEmission: 25 },
          buildDelivery: { totalTeamEmission: 20 },
          operations: { teamEmission: 22 },
        },
      },
    ],
  },
  {
    id: 3,
    name: 'Scenario 3',
    description: 'Infrastructure Efficiency',
    totalSaving: 42,
    assumptionsChanged: ['Auto-Scaling Enabled', 'Data Retention Policies', 'Edge Computing 40%'],
    strategies: [
      {
        name: 'Auto-Scaling Implementation',
        description: 'Implement intelligent auto-scaling to reduce idle resources',
        reductions: {
          buildDelivery: { totalPerDayDataEmissions: 35, perStageDataEmissions: 30 },
          operations: { totalPerDayDataEmission: 40, totalCloudEmissions: 25 },
        },
      },
      {
        name: 'Data Lifecycle Management',
        description: 'Archive cold data and implement retention policies',
        reductions: {
          operations: { totalCloudEnviroEmission: 20 },
          endOfLife: { dataStorageCost: 45, totalDataStorageCost: 40, totalDataDeletionCost: 50 },
        },
      },
      {
        name: 'Edge Computing',
        description: 'Process data closer to users to reduce network transfer',
        reductions: {
          buildDelivery: { totalDeliveryTool: 15 },
          operations: { totalDeliveryTool: 18 },
        },
      },
    ],
  },
]

const topDrivers = [
  { name: 'Cloud Computing (AWS)', impact: '42%', trend: 'up' },
  { name: 'Data Storage', impact: '23%', trend: 'stable' },
  { name: 'Network Transfer', impact: '18%', trend: 'down' },
]

const quickInsights = [
  { text: 'Your emissions are 15% lower than industry average' },
  { text: 'Switching to renewable energy could reduce by 30%' },
  { text: 'Peak usage occurs during business hours (9-5)' },
]

function Scenario2() {
  const navigate = useNavigate()
  const [selectedLifecycle, setSelectedLifecycle] = useState(null)
  const [comparedScenario, setComparedScenario] = useState(null)
  const [viewingScenario, setViewingScenario] = useState(null)

  // Calculate total emissions across all lifecycles
  const calculateTotalEmissions = () => {
    return Object.values(lifecycleData).reduce((sum, lifecycle) => {
      return sum + lifecycle.calculations.totalEmissions.value
    }, 0)
  }

  // Calculate reduction for a specific scenario
  const calculateScenarioReduction = (scenarioId) => {
    const scenario = scenariosData.find((s) => s.id === scenarioId)
    if (!scenario) return 0

    let totalReduction = 0

    // Iterate through all lifecycles and all calculations
    Object.entries(lifecycleData).forEach(([lifecycleKey, lifecycle]) => {
      // Check main calculations
      Object.entries(lifecycle.calculations).forEach(([calcKey, calc]) => {
        scenario.strategies.forEach((strategy) => {
          const reductions = strategy.reductions[lifecycleKey]
          if (reductions && reductions[calcKey]) {
            const reductionAmount = (calc.value * reductions[calcKey]) / 100
            totalReduction += reductionAmount
          }
        })
      })

      // Check travel emissions
      Object.entries(lifecycle.travelEmissions).forEach(([calcKey, calc]) => {
        scenario.strategies.forEach((strategy) => {
          const reductions = strategy.reductions[lifecycleKey]
          if (reductions && reductions[calcKey]) {
            const reductionAmount = (calc.value * reductions[calcKey]) / 100
            totalReduction += reductionAmount
          }
        })
      })
    })

    return Math.round(totalReduction)
  }

  // Get savings breakdown by calculation for a scenario
  const getSavingsBreakdown = (scenarioId) => {
    const scenario = scenariosData.find((s) => s.id === scenarioId)
    if (!scenario) return []

    const savingsMap = {}

    // Iterate through all lifecycles and all calculations
    Object.entries(lifecycleData).forEach(([lifecycleKey, lifecycle]) => {
      // Check main calculations
      Object.entries(lifecycle.calculations).forEach(([calcKey, calc]) => {
        scenario.strategies.forEach((strategy) => {
          const reductions = strategy.reductions[lifecycleKey]
          if (reductions && reductions[calcKey]) {
            const reductionAmount = (calc.value * reductions[calcKey]) / 100

            if (!savingsMap[calc.label]) {
              savingsMap[calc.label] = 0
            }
            savingsMap[calc.label] += reductionAmount
          }
        })
      })

      // Check travel emissions
      Object.entries(lifecycle.travelEmissions).forEach(([calcKey, calc]) => {
        scenario.strategies.forEach((strategy) => {
          const reductions = strategy.reductions[lifecycleKey]
          if (reductions && reductions[calcKey]) {
            const reductionAmount = (calc.value * reductions[calcKey]) / 100

            if (!savingsMap[calc.label]) {
              savingsMap[calc.label] = 0
            }
            savingsMap[calc.label] += reductionAmount
          }
        })
      })
    })

    // Convert to array and sort by amount descending
    const totalReduction = calculateScenarioReduction(scenarioId)
    const savingsArray = Object.entries(savingsMap)
      .map(([label, amount]) => ({
        category: label,
        amount: Math.round(amount),
        percentage: totalReduction > 0 ? Math.round((amount / totalReduction) * 100) : 0
      }))
      .sort((a, b) => b.amount - a.amount)

    return savingsArray
  }

  // Calculate displayed total (accounting for compared scenario)
  const getDisplayedTotal = () => {
    const baseTotal = calculateTotalEmissions()
    if (!comparedScenario) return baseTotal

    const reduction = calculateScenarioReduction(comparedScenario)
    return baseTotal - reduction
  }

  // Apply scenario reductions to calculations
  const applyReductions = (value, lifecycleKey, calcKey) => {
    if (!comparedScenario) return value

    const scenario = scenariosData.find((s) => s.id === comparedScenario)
    if (!scenario) return value

    let totalReduction = 0
    scenario.strategies.forEach((strategy) => {
      const reductions = strategy.reductions[lifecycleKey]
      if (reductions && reductions[calcKey]) {
        totalReduction += reductions[calcKey]
      }
    })

    const reducedValue = value * (1 - totalReduction / 100)
    return Math.round(reducedValue)
  }

  // Get reduction percentage for display
  const getReductionPercentage = (lifecycleKey, calcKey) => {
    if (!comparedScenario) return 0

    const scenario = scenariosData.find((s) => s.id === comparedScenario)
    if (!scenario) return 0

    let totalReduction = 0
    scenario.strategies.forEach((strategy) => {
      const reductions = strategy.reductions[lifecycleKey]
      if (reductions && reductions[calcKey]) {
        totalReduction += reductions[calcKey]
      }
    })

    return totalReduction
  }

  // Get calculations to display based on selected lifecycle
  const getDisplayCalculations = () => {
    if (selectedLifecycle) {
      const lifecycle = lifecycleData[selectedLifecycle]
      return {
        [selectedLifecycle]: {
          ...lifecycle,
          calculations: lifecycle.calculations,
          travelEmissions: lifecycle.travelEmissions,
        },
      }
    }
    return lifecycleData
  }

  // Get actionable insights based on compared scenario
  const getActionableInsights = () => {
    if (!comparedScenario) return []

    const scenario = scenariosData.find((s) => s.id === comparedScenario)
    if (!scenario) return []

    return scenario.strategies.map((strategy) => ({
      title: strategy.name,
      description: strategy.description,
    }))
  }

  // Render calculation row with optional reduction and scope stacked bar
  const renderCalculationRow = (lifecycleKey, calcKey, calc) => {
    const originalValue = calc.value
    const reducedValue = applyReductions(originalValue, lifecycleKey, calcKey)
    const reductionPct = getReductionPercentage(lifecycleKey, calcKey)
    const hasReduction = reductionPct > 0

    // Get scope percentages for this lifecycle
    const scopes = lifecycleData[lifecycleKey].scopes
    const displayValue = hasReduction ? reducedValue : originalValue

    // Calculate scope values based on percentages
    const scope1Value = Math.round((displayValue * scopes.scope1) / 100)
    const scope2Value = Math.round((displayValue * scopes.scope2) / 100)
    const scope3Value = Math.round((displayValue * scopes.scope3) / 100)

    return (
      <div key={calcKey} className="py-3 border-b border-[#f3f4f6] last:border-0">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-[#6b7280]">{calc.label}</span>
          <div className="flex items-center gap-2">
            {hasReduction && (
              <>
                <span className="text-sm text-[#9ca3af] line-through">
                  {originalValue.toLocaleString()}
                </span>
                <span className="text-sm font-medium text-green-600">
                  {reducedValue.toLocaleString()} {calc.unit}
                </span>
                <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-700 rounded">-{reductionPct}%</span>
              </>
            )}
            {!hasReduction && (
              <span className="text-sm font-medium text-[#111827]">
                {originalValue.toLocaleString()} {calc.unit}
              </span>
            )}
          </div>
        </div>
        {/* Scope stacked bar with individual tooltips per scope */}
        <div className="flex items-center gap-2 pt-8">
          <div className="flex-1 h-6 rounded-full flex bg-[#FDF7EA] relative">
            <div className="absolute inset-0 rounded-full overflow-hidden flex">
              <div className="h-full bg-[#00C6C2]" style={{ width: `${scopes.scope1}%` }} />
              <div className="h-full bg-[#052831]" style={{ width: `${scopes.scope2}%` }} />
              <div className="h-full bg-[#E0D6CC]" style={{ width: `${scopes.scope3}%` }} />
            </div>
            <div className="absolute inset-0 flex">
              <ScopeSegment
                percentage={scopes.scope1}
                value={`${scope1Value.toLocaleString()} ${calc.unit}`}
                color="#00C6C2"
              />
              <ScopeSegment
                percentage={scopes.scope2}
                value={`${scope2Value.toLocaleString()} ${calc.unit}`}
                color="#052831"
              />
              <ScopeSegment
                percentage={scopes.scope3}
                value={`${scope3Value.toLocaleString()} ${calc.unit}`}
                color="#E0D6CC"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render scope pie chart
  const renderScopePieChart = (scopes) => {
    const total = scopes.scope1 + scopes.scope2 + scopes.scope3
    const [hoveredScope, setHoveredScope] = useState(null)
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })

    // Calculate total emissions for the current view
    const getTotalEmissions = () => {
      if (selectedLifecycle) {
        return lifecycleData[selectedLifecycle].calculations.totalEmissions.value
      }
      return calculateTotalEmissions()
    }

    const totalEmissions = getTotalEmissions()
    const scope1Value = Math.round((totalEmissions * scopes.scope1) / 100)
    const scope2Value = Math.round((totalEmissions * scopes.scope2) / 100)
    const scope3Value = Math.round((totalEmissions * scopes.scope3) / 100)

    const handleMouseEnter = (scope, value, event) => {
      const rect = event.currentTarget.getBoundingClientRect()
      setTooltipPosition({
        top: rect.top + rect.height / 2,
        left: rect.left + rect.width / 2,
      })
      setHoveredScope({ scope, value })
    }

    const handleMouseLeave = () => {
      setHoveredScope(null)
    }

    const getScopeColor = (scope) => {
      if (scope === 'scope1') return '#00C6C2'
      if (scope === 'scope2') return '#052831'
      return '#E0D6CC'
    }

    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[200px]">
        <div className="relative w-40 h-40 sm:w-48 sm:h-48">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="20" />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#00C6C2"
              strokeWidth="20"
              strokeDasharray={`${(scopes.scope1 / total) * 251.2} 251.2`}
              strokeDashoffset="0"
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onMouseEnter={(e) => handleMouseEnter('scope1', `${scope1Value.toLocaleString()} kg CO₂e`, e)}
              onMouseLeave={handleMouseLeave}
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#052831"
              strokeWidth="20"
              strokeDasharray={`${(scopes.scope2 / total) * 251.2} 251.2`}
              strokeDashoffset={`${-((scopes.scope1 / total) * 251.2)}`}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onMouseEnter={(e) => handleMouseEnter('scope2', `${scope2Value.toLocaleString()} kg CO₂e`, e)}
              onMouseLeave={handleMouseLeave}
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#E0D6CC"
              strokeWidth="20"
              strokeDasharray={`${(scopes.scope3 / total) * 251.2} 251.2`}
              strokeDashoffset={`${-(((scopes.scope1 + scopes.scope2) / total) * 251.2)}`}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onMouseEnter={(e) => handleMouseEnter('scope3', `${scope3Value.toLocaleString()} kg CO₂e`, e)}
              onMouseLeave={handleMouseLeave}
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-xs text-[#6b7280] font-medium">Total: 100%</span>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#00C6C2]" />
            <span className="text-sm text-[#6b7280]">S1: {scopes.scope1}%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#052831]" />
            <span className="text-sm text-[#6b7280]">S2: {scopes.scope2}%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#E0D6CC]" />
            <span className="text-sm text-[#6b7280]">S3: {scopes.scope3}%</span>
          </div>
        </div>

        {/* Tooltip */}
        {hoveredScope && (
          <div
            className="fixed pointer-events-none z-[9999]"
            style={{
              top: `${tooltipPosition.top}px`,
              left: `${tooltipPosition.left}px`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="bg-white text-[#111827] text-xs font-semibold rounded-lg px-3 py-1.5 shadow-lg whitespace-nowrap border border-[#e5e7eb] flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: getScopeColor(hoveredScope.scope) }} />
              {hoveredScope.value}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-[5px] border-t-white border-x-transparent border-b-transparent" />
            </div>
          </div>
        )}
      </div>
    )
  }

  // Get aggregated scopes when no lifecycle selected
  const getAggregatedScopes = () => {
    const totals = { scope1: 0, scope2: 0, scope3: 0 }
    Object.values(lifecycleData).forEach((lifecycle) => {
      totals.scope1 += lifecycle.scopes.scope1
      totals.scope2 += lifecycle.scopes.scope2
      totals.scope3 += lifecycle.scopes.scope3
    })
    const count = Object.keys(lifecycleData).length
    return {
      scope1: Math.round(totals.scope1 / count),
      scope2: Math.round(totals.scope2 / count),
      scope3: Math.round(totals.scope3 / count),
    }
  }

  const displayCalculations = getDisplayCalculations()
  const actionableInsights = getActionableInsights()
  const currentScopes = selectedLifecycle ? lifecycleData[selectedLifecycle].scopes : getAggregatedScopes()

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <div className="bg-white border-b border-[#e5e7eb] h-[73px] px-6 sm:px-10 flex items-center">
        <div className="max-w-[1600px] mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827]">Results Summary</h1>
            <span className="text-[#6b7280] text-sm hidden sm:inline">
              Total: {comparedScenario ? (
                <>
                  <span className="text-[#9ca3af] line-through mr-1">{calculateTotalEmissions().toLocaleString()}</span>
                  <span className="font-bold text-green-600">{getDisplayedTotal().toLocaleString()} kg CO₂e</span>
                </>
              ) : (
                <span className="font-bold text-[#111827]">{getDisplayedTotal().toLocaleString()} kg CO₂e</span>
              )}
            </span>
          </div>
          <button
            onClick={() => navigate('/build')}
            className="cursor-pointer px-4 py-2 text-[#6b7280] hover:text-[#111827] text-sm font-medium transition-colors border border-[#e5e7eb] rounded-lg"
          >
            Back
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto p-6 sm:p-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel - Projected Outcomes */}
          <div className="flex-1">
            <h2 className="text-lg font-bold text-[#111827] mb-4">Projected Outcomes</h2>

            {/* Lifecycle Breakdown - Clickable Cards */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#6b7280]">Lifecycle Breakdown</h3>
                {selectedLifecycle && (
                  <button
                    onClick={() => setSelectedLifecycle(null)}
                    className="cursor-pointer text-sm text-[#00C6C2] hover:underline"
                  >
                    Show all lifecycles
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(lifecycleData).map(([key, lifecycle]) => {
                  const originalTotal = calculateTotalEmissions()
                  const originalLifecycleTotal = lifecycle.calculations.totalEmissions.value
                  const originalPercentage = Math.round((originalLifecycleTotal / originalTotal) * 100)
                  const isSelected = selectedLifecycle === key

                  // Calculate reduced values if comparing
                  let reducedLifecycleTotal = originalLifecycleTotal
                  if (comparedScenario) {
                    // Sum up all reductions for this lifecycle
                    Object.keys(lifecycle.calculations).forEach((calcKey) => {
                      const originalValue = lifecycle.calculations[calcKey].value
                      const reducedValue = applyReductions(originalValue, key, calcKey)
                      reducedLifecycleTotal -= (originalValue - reducedValue)
                    })
                    Object.keys(lifecycle.travelEmissions).forEach((calcKey) => {
                      const originalValue = lifecycle.travelEmissions[calcKey].value
                      const reducedValue = applyReductions(originalValue, key, calcKey)
                      reducedLifecycleTotal -= (originalValue - reducedValue)
                    })
                  }

                  // Calculate reduced total emissions across all lifecycles
                  let reducedTotalEmissions = originalTotal
                  if (comparedScenario) {
                    Object.entries(lifecycleData).forEach(([lKey, lData]) => {
                      Object.keys(lData.calculations).forEach((calcKey) => {
                        const originalValue = lData.calculations[calcKey].value
                        const reducedValue = applyReductions(originalValue, lKey, calcKey)
                        reducedTotalEmissions -= (originalValue - reducedValue)
                      })
                      Object.keys(lData.travelEmissions).forEach((calcKey) => {
                        const originalValue = lData.travelEmissions[calcKey].value
                        const reducedValue = applyReductions(originalValue, lKey, calcKey)
                        reducedTotalEmissions -= (originalValue - reducedValue)
                      })
                    })
                  }

                  const reducedPercentage = reducedTotalEmissions > 0
                    ? Math.round((reducedLifecycleTotal / reducedTotalEmissions) * 100)
                    : 0
                  const hasReduction = comparedScenario && reducedLifecycleTotal < originalLifecycleTotal
                  const reductionPct = hasReduction
                    ? Math.round(((originalLifecycleTotal - reducedLifecycleTotal) / originalLifecycleTotal) * 100)
                    : 0

                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedLifecycle(isSelected ? null : key)}
                      className={`cursor-pointer bg-white border rounded-2xl p-5 text-left transition-all ${isSelected
                        ? 'border-[#00C6C2] ring-2 ring-[#00C6C2]/20'
                        : 'border-[#e5e7eb] hover:border-[#00C6C2]/50 hover:shadow-md'
                        }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-[#111827]">{lifecycle.name}</h3>
                        {hasReduction && (
                          <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-700 rounded">
                            -{reductionPct}%
                          </span>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-[#6b7280]">Emissions</span>
                          <div className="text-right">
                            {hasReduction ? (
                              <>
                                <span className="text-[#9ca3af] line-through text-xs mr-1">
                                  {originalLifecycleTotal.toLocaleString()}
                                </span>
                                <span className="font-medium text-green-600">
                                  {Math.round(reducedLifecycleTotal).toLocaleString()} kg CO₂e
                                </span>
                              </>
                            ) : (
                              <span className="font-medium text-[#111827]">
                                {originalLifecycleTotal.toLocaleString()} kg CO₂e
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#6b7280]">Share</span>
                          <div className="text-right">
                            {hasReduction && reducedPercentage !== originalPercentage ? (
                              <>
                                <span className="text-[#9ca3af] line-through text-xs mr-1">
                                  {originalPercentage}%
                                </span>
                                <span className="font-medium text-green-600">{reducedPercentage}%</span>
                              </>
                            ) : (
                              <span className="font-medium text-[#111827]">{originalPercentage}%</span>
                            )}
                          </div>
                        </div>
                        <div className="w-full bg-[#e5e7eb] rounded-full h-2 mt-2">
                          <div
                            className="h-2 rounded-full transition-all"
                            style={{
                              width: `${hasReduction ? reducedPercentage : originalPercentage}%`,
                              backgroundColor: lifecycle.color
                            }}
                          />
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Scope */}
              <div className="bg-white border border-[#e5e7eb] rounded-xl p-5">
                <h3 className="text-sm font-bold text-[#6b7280] mb-4">Scope</h3>
                {renderScopePieChart(currentScopes)}
              </div>

              {/* Calculations */}
              <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 max-h-[350px] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-[#6b7280]">Calculations</h3>
                  <div className="flex gap-3 text-[10px] text-[#6b7280]">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#00C6C2]" />S1
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#052831]" />S2
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#E0D6CC]" />S3
                    </span>
                  </div>
                </div>
                {Object.entries(displayCalculations).map(([lifecycleKey, lifecycle]) => (
                  <div key={lifecycleKey} className="mb-4 last:mb-0">
                    {!selectedLifecycle && (
                      <h4 className="text-xs font-bold text-[#111827] mb-2 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: lifecycle.color }} />
                        {lifecycle.name}
                      </h4>
                    )}
                    <div className="space-y-1">
                      {Object.entries(lifecycle.calculations).map(([calcKey, calc]) =>
                        renderCalculationRow(lifecycleKey, calcKey, calc)
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trajectory Graph */}
            <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 mb-6">
              <h3 className="text-sm font-bold text-[#6b7280] mb-4">Trajectory</h3>
              <div className="bg-[#e5e7eb] rounded-xl h-48 flex items-center justify-center relative overflow-hidden">
                {/* Simple chart visualization */}
                <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#00C6C2" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#00C6C2" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 100 Q 100 90 150 70 T 250 50 T 350 30 L 400 25 L 400 150 L 0 150 Z"
                    fill="url(#gradient)"
                  />
                  <path
                    d="M 0 100 Q 100 90 150 70 T 250 50 T 350 30 L 400 25"
                    fill="none"
                    stroke="#00C6C2"
                    strokeWidth="3"
                  />
                  <circle cx="0" cy="100" r="5" fill="#00C6C2" />
                  <circle cx="400" cy="25" r="5" fill="#00C6C2" />
                </svg>
                <div className="absolute bottom-2 left-4 text-xs text-[#6b7280]">2024</div>
                <div className="absolute bottom-2 right-4 text-xs text-[#6b7280]">2030</div>
              </div>
            </div>

            {/* Travel Emissions Section */}
            <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#6b7280]">Travel & Team Emissions</h3>
                <div className="flex gap-3 text-[10px] text-[#6b7280]">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#00C6C2]" />S1
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#052831]" />S2
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#E0D6CC]" />S3
                  </span>
                </div>
              </div>
              {selectedLifecycle ? (
                // Single lifecycle selected - show in 2-column grid
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(displayCalculations).map(([lifecycleKey, lifecycle]) => (
                    Object.entries(lifecycle.travelEmissions).map(([calcKey, calc]) => (
                      <div key={calcKey}>
                        {renderCalculationRow(lifecycleKey, calcKey, calc)}
                      </div>
                    ))
                  ))}
                </div>
              ) : (
                // All lifecycles - show each in its own card
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[250px] overflow-y-auto">
                  {Object.entries(displayCalculations).map(([lifecycleKey, lifecycle]) => (
                    <div key={lifecycleKey} className="bg-[#f9fafb] rounded-lg p-4">
                      <h4 className="text-xs font-bold text-[#111827] mb-2 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: lifecycle.color }} />
                        {lifecycle.name}
                      </h4>
                      <div className="space-y-1">
                        {Object.entries(lifecycle.travelEmissions).map(([calcKey, calc]) =>
                          renderCalculationRow(lifecycleKey, calcKey, calc)
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Top Drivers & Quick Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {/* Top Drivers */}
              <div className="bg-white border border-[#e5e7eb] rounded-xl p-5">
                <h3 className="text-sm font-bold text-[#6b7280] mb-4">Top Drivers</h3>
                <div className="space-y-3">
                  {topDrivers.map((driver, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-[#f3f4f6] last:border-0">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 bg-[#00C6C2] text-white text-xs font-bold rounded-full flex items-center justify-center">
                          {index + 1}
                        </span>
                        <span className="text-sm text-[#111827]">{driver.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-[#111827]">{driver.impact}</span>
                        {driver.trend === 'up' && (
                          <svg className="w-3 h-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        )}
                        {driver.trend === 'down' && (
                          <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                        {driver.trend === 'stable' && (
                          <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                          </svg>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Insights */}
              <div className="bg-white border border-[#e5e7eb] rounded-xl p-5">
                <h3 className="text-sm font-bold text-[#6b7280] mb-4">Quick Insights</h3>
                <div className="space-y-3">
                  {quickInsights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-2 py-2 border-b border-[#f3f4f6] last:border-0">
                      <span className="w-5 h-5 bg-[#d1fae5] text-[#065f46] text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-sm text-[#111827]">{insight.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actionable Insights */}
              <div className="bg-white border border-[#e5e7eb] rounded-xl p-5">
                <h3 className="text-sm font-bold text-[#6b7280] mb-4">Actionable Insights</h3>
                {actionableInsights.length > 0 ? (
                  <div className="space-y-3">
                    {actionableInsights.map((insight, index) => (
                      <div key={index} className="flex items-start gap-2 py-2 border-b border-[#f3f4f6] last:border-0">
                        <span className="w-5 h-5 bg-[#00C6C2] text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">
                          {index + 1}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-[#111827]">{insight.title}</p>
                          <p className="text-xs text-[#6b7280]">{insight.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-[#6b7280]">
                    <p className="text-sm">No scenario compared</p>
                    <p className="text-xs mt-1">Compare a scenario to see actionable insights</p>
                  </div>
                )}
              </div>
            </div>

            {/* Savings Breakdown & Assumptions Changed - Only show when comparing */}
            {comparedScenario && (() => {
              const scenario = scenariosData.find((s) => s.id === comparedScenario)
              if (!scenario) return null

              const savingsBreakdown = getSavingsBreakdown(comparedScenario)

              return (
                <>
                  {/* Savings Breakdown */}
                  <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 mb-6">
                    <h3 className="text-sm font-bold text-[#6b7280] mb-4">Savings Breakdown</h3>
                    <div className="space-y-3">
                      {savingsBreakdown.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-[#f3f4f6] last:border-0">
                          <span className="text-[#6b7280] text-sm">{item.category}</span>
                          <span className="font-medium text-[#111827] text-sm">-{item.amount.toLocaleString()} kg ({item.percentage}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Assumptions Changed */}
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-[#6b7280] mb-3">Assumptions Changed</h3>
                    <div className="flex flex-wrap gap-2">
                      {scenario.assumptionsChanged.map((assumption, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-[#e5e7eb] text-[#111827] text-sm rounded-lg"
                        >
                          {assumption}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )
            })()}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button className="cursor-pointer px-5 py-2.5 bg-[#00C6C2] hover:bg-[#00B0AC] text-white text-sm font-medium rounded-lg transition-colors">
                Save
              </button>
              <button className="cursor-pointer px-5 py-2.5 bg-white border border-[#e5e7eb] hover:bg-[#f3f4f6] text-[#111827] text-sm font-medium rounded-lg transition-colors">
                Export All
              </button>
              <button className="cursor-pointer px-5 py-2.5 bg-white border border-[#e5e7eb] hover:bg-[#f3f4f6] text-[#111827] text-sm font-medium rounded-lg transition-colors">
                Export Page
              </button>
            </div>
          </div>

          {/* Right Panel - Scenarios */}
          <div className="lg:w-[380px]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#111827]">Scenarios</h2>
              <div className="flex gap-2">
                <button className="cursor-pointer px-3 py-1.5 text-xs font-medium bg-white border border-[#e5e7eb] rounded-lg hover:bg-[#f3f4f6] transition-colors">
                  Levers
                </button>
                <button className="cursor-pointer px-3 py-1.5 text-xs font-medium bg-white border border-[#e5e7eb] rounded-lg hover:bg-[#f3f4f6] transition-colors">
                  Filter
                </button>
                <button className="cursor-pointer px-3 py-1.5 text-xs font-medium bg-white border border-[#e5e7eb] rounded-lg hover:bg-[#f3f4f6] transition-colors">
                  Sort
                </button>
              </div>
            </div>

            {/* Scenario Cards */}
            <div className="space-y-3 max-h-[650px] overflow-y-auto pr-1">
              {scenariosData.map((scenario) => (
                <div
                  key={scenario.id}
                  className={`bg-white border rounded-xl p-4 transition-all ${comparedScenario === scenario.id
                    ? 'border-[#00C6C2] ring-2 ring-[#00C6C2]/20'
                    : 'border-[#e5e7eb]'
                    }`}
                >
                  <div className="mb-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold text-[#111827]">{scenario.name}</h3>
                      <Tooltip
                        content={`${scenario.strategies.length} green strategies`}
                        position="left"
                      >
                        <span className="text-xs px-1.5 py-0.5 bg-green-50 text-green-600 rounded cursor-help">
                          {scenario.strategies.length} strategies
                        </span>
                      </Tooltip>
                    </div>
                    <p className="text-sm text-[#6b7280]">{scenario.description}</p>
                  </div>
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6b7280]">Reduction:</span>
                      <span className="font-medium text-green-600">-{calculateScenarioReduction(scenario.id).toLocaleString()} kg CO₂e</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6b7280]">Total Saving:</span>
                      <span className="font-bold text-green-600">{scenario.totalSaving}%</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setComparedScenario(comparedScenario === scenario.id ? null : scenario.id)}
                      className={`cursor-pointer flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${comparedScenario === scenario.id
                        ? 'bg-[#00C6C2] text-white'
                        : 'bg-white border border-[#e5e7eb] text-[#111827] hover:bg-[#f3f4f6]'
                        }`}
                    >
                      {comparedScenario === scenario.id ? 'Comparing' : 'Compare'}
                    </button>
                    <button
                      onClick={() => setViewingScenario(scenario)}
                      className="cursor-pointer flex-1 px-3 py-2 bg-white border border-[#e5e7eb] text-[#111827] text-sm font-medium rounded-lg hover:bg-[#f3f4f6] transition-colors"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-4">
              <span className="w-2 h-2 rounded-full bg-[#111827]" />
              <span className="w-2 h-2 rounded-full bg-[#d1d5db]" />
              <span className="w-2 h-2 rounded-full bg-[#d1d5db]" />
            </div>
          </div>
        </div>
      </div>

      {/* View Strategies Modal */}
      {viewingScenario && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-[#e5e7eb]">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-[#111827]">{viewingScenario.name}</h2>
                  <p className="text-sm text-[#6b7280] mt-1">{viewingScenario.description}</p>
                </div>
                <button
                  onClick={() => setViewingScenario(null)}
                  className="cursor-pointer p-2 hover:bg-[#f3f4f6] rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <h3 className="text-sm font-bold text-[#6b7280] mb-4">Green Strategies</h3>
              <div className="space-y-4">
                {viewingScenario.strategies.map((strategy, index) => (
                  <div key={index} className="border border-[#e5e7eb] rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <h4 className="font-bold text-[#111827]">{strategy.name}</h4>
                        <p className="text-sm text-[#6b7280] mt-1">{strategy.description}</p>
                        <div className="mt-3">
                          <p className="text-xs font-bold text-[#6b7280] mb-2">Affects:</p>
                          <div className="flex flex-wrap gap-1">
                            {Object.keys(strategy.reductions).map((lifecycle) => (
                              <span
                                key={lifecycle}
                                className="px-2 py-1 bg-[#f3f4f6] text-[#111827] text-xs rounded"
                              >
                                {lifecycleData[lifecycle]?.name || lifecycle}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 border-t border-[#e5e7eb] bg-[#f9fafb]">
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setComparedScenario(viewingScenario.id)
                    setViewingScenario(null)
                  }}
                  className="cursor-pointer flex-1 px-4 py-2.5 bg-[#00C6C2] hover:bg-[#00B0AC] text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Compare This Scenario
                </button>
                <button
                  onClick={() => setViewingScenario(null)}
                  className="cursor-pointer px-4 py-2.5 bg-white border border-[#e5e7eb] text-[#111827] text-sm font-medium rounded-lg hover:bg-[#f3f4f6] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Scenario2
