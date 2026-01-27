import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const steps = [
  { id: 1, name: 'Project & Service' },
  { id: 2, name: 'Tech & Cloud' },
  { id: 3, name: 'AI / Compute Intensity' },
  { id: 4, name: 'Team & Delivery' },
  { id: 5, name: 'Region & Location' },
  { id: 6, name: 'Duration & Usage' },
]

function BuildScenario({ onLogout }) {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Project & Service
    projectName: '',
    serviceStages: {
      designSetup: false,
      buildDelivery: false,
      operation: false,
      endOfLife: false,
    },
    notes: '',

    // Step 2: Tech & Cloud
    cloudProvider: '',
    cloudRegion: '',
    envDevTestStaging: false,
    envDevTestStagingDays: '',
    envDataMigration: false,
    envDataMigrationDays: '',
    deliveryToolCICD: false,
    deliveryToolCICDDays: '',
    deliveryToolBuildServer: false,
    deliveryToolBuildServerDays: '',
    storageClass: 'live',
    dataDeletionMB: '',

    // Step 3: AI / Compute Intensity
    modelTrainingUsed: false,
    trainingActivityDays: '',
    trainingRegionOverride: '',

    // Step 4: Team & Delivery
    teamSize: '',
    workingPattern: 'office',
    inOfficeDaysPerWeek: '',
    wfhFootprintOverride: '',
    officeEquipmentUse: '',
    softwareRationalisationDays: '',

    // Step 5: Region & Location
    primaryOffice: '',
    travelModeCar: '',
    travelModeTrain: '',
    travelModeBus: '',
    travelModeTube: '',
    commuteDistanceSource: 'office-average',
    customCommuteDistance: '',

    // Step 6: Duration & Usage
    designSetupDuration: '',
    buildDeliveryDuration: '',
    operationDurationYears: '',
    retentionPolicyYears: '',
    retentionPolicyMonths: '',
    estimatedDataStoredMB: '',
    avgDailyDataProcessedMB: '',
    dataToDeleteMB: '',
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleStageChange = (stage) => {
    setFormData((prev) => ({
      ...prev,
      serviceStages: {
        ...prev.serviceStages,
        [stage]: !prev.serviceStages[stage],
      },
    }))
  }

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log('Form submitted:', formData)
    navigate('/outcome')
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-[#111827] text-base font-bold mb-3">
                Project Name
              </label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                placeholder="Enter project name"
                className="w-full h-14 bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-xl px-5 text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00C6C2] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#111827] text-base font-bold mb-4">
                Service Stage(s) in Scope
              </label>
              <div className="space-y-3">
                <div className="bg-white border-2 border-[#e5e7eb] rounded-xl p-5">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={formData.serviceStages.designSetup}
                      onChange={() => handleStageChange('designSetup')}
                      className="cursor-pointer w-5 h-5 rounded border-2 border-[#e5e7eb] text-[#00C6C2] focus:ring-[#00C6C2]"
                    />
                    <label className="text-[#111827] text-base font-medium">
                      Design & Set-up (DS)
                    </label>
                  </div>
                </div>
                <div className="bg-white border-2 border-[#e5e7eb] rounded-xl p-5">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={formData.serviceStages.buildDelivery}
                      onChange={() => handleStageChange('buildDelivery')}
                      className="cursor-pointer w-5 h-5 rounded border-2 border-[#e5e7eb] text-[#00C6C2] focus:ring-[#00C6C2]"
                    />
                    <label className="text-[#111827] text-base font-medium">
                      Build & Delivery (BD)
                    </label>
                  </div>
                </div>
                <div className="bg-white border-2 border-[#e5e7eb] rounded-xl p-5">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={formData.serviceStages.operation}
                      onChange={() => handleStageChange('operation')}
                      className="cursor-pointer w-5 h-5 rounded border-2 border-[#e5e7eb] text-[#00C6C2] focus:ring-[#00C6C2]"
                    />
                    <label className="text-[#111827] text-base font-medium">
                      Operation (O)
                    </label>
                  </div>
                </div>
                <div className="bg-white border-2 border-[#e5e7eb] rounded-xl p-5">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={formData.serviceStages.endOfLife}
                      onChange={() => handleStageChange('endOfLife')}
                      className="cursor-pointer w-5 h-5 rounded border-2 border-[#e5e7eb] text-[#00C6C2] focus:ring-[#00C6C2]"
                    />
                    <label className="text-[#111827] text-base font-medium">
                      End of Life (EL)
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[#111827] text-base font-bold mb-3">
                Notes / Assumptions
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Enter notes and assumptions for this project"
                rows={6}
                className="w-full bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-xl px-5 py-4 text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00C6C2] transition-colors resize-none"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-[#111827] text-base font-bold mb-3">
                Primary Cloud Provider
              </label>
              <select
                name="cloudProvider"
                value={formData.cloudProvider}
                onChange={handleInputChange}
                className="cursor-pointer w-full h-14 bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-xl px-5 text-base text-[#111827] focus:outline-none focus:border-[#00C6C2] transition-colors"
              >
                <option value="" >Select cloud provider</option>
                <option value="azure" >Azure</option>
                <option value="aws" >AWS</option>
                <option value="other" >Other</option>
              </select>
            </div>

            <div>
              <label className="block text-[#111827] text-base font-bold mb-3">
                Cloud Region
              </label>
              <select
                name="cloudRegion"
                value={formData.cloudRegion}
                onChange={handleInputChange}
                className="cursor-pointer w-full h-14 bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-xl px-5 text-base text-[#111827] focus:outline-none focus:border-[#00C6C2] transition-colors"
              >
                <option value="" >Select cloud region</option>
                <option value="uk" >UK</option>
                <option value="ireland" >Ireland</option>
                <option value="west-europe" >West Europe</option>
                <option value="north-europe" >North Europe</option>
                <option value="us-avg" >US – Avg</option>
                <option value="us-west" >US – West</option>
                <option value="canada" >Canada</option>
                <option value="australia" >Australia</option>
                <option value="india" >India</option>
              </select>
            </div>

            <div>
              <label className="block text-[#111827] text-base font-bold mb-4">
                Environments Used (Per Stage)
              </label>
              <div className="space-y-4">
                <div className="bg-white border-2 border-[#e5e7eb] rounded-xl p-5">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      name="envDevTestStaging"
                      checked={formData.envDevTestStaging}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded border-2 border-[#e5e7eb] text-[#00C6C2] focus:ring-[#00C6C2]"
                    />
                    <label className=" flex-1 text-[#111827] text-base font-medium">
                      Dev/Test/Staging
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        name="envDevTestStagingDays"
                        value={formData.envDevTestStagingDays}
                        onChange={handleInputChange}
                        placeholder="0"
                        disabled={!formData.envDevTestStaging}
                        className=" w-24 h-12 bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-lg px-3 text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00C6C2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      <span className="text-[#6b7280] text-sm">days</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-[#e5e7eb] rounded-xl p-5">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      name="envDataMigration"
                      checked={formData.envDataMigration}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded border-2 border-[#e5e7eb] text-[#00C6C2] focus:ring-[#00C6C2]"
                    />
                    <label className="flex-1 text-[#111827] text-base font-medium">
                      Data Migration
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        name="envDataMigrationDays"
                        value={formData.envDataMigrationDays}
                        onChange={handleInputChange}
                        placeholder="0"
                        disabled={!formData.envDataMigration}
                        className="w-24 h-12 bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-lg px-3 text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00C6C2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      <span className="text-[#6b7280] text-sm">days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[#111827] text-base font-bold mb-4">
                Delivery Tools (Per Stage)
              </label>
              <div className="space-y-4">
                <div className="bg-white border-2 border-[#e5e7eb] rounded-xl p-5">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      name="deliveryToolCICD"
                      checked={formData.deliveryToolCICD}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded border-2 border-[#e5e7eb] text-[#00C6C2] focus:ring-[#00C6C2]"
                    />
                    <label className="flex-1 text-[#111827] text-base font-medium">
                      CI/CD Pipeline
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        name="deliveryToolCICDDays"
                        value={formData.deliveryToolCICDDays}
                        onChange={handleInputChange}
                        placeholder="0"
                        disabled={!formData.deliveryToolCICD}
                        className="w-24 h-12 bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-lg px-3 text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00C6C2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      <span className="text-[#6b7280] text-sm">days</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-[#e5e7eb] rounded-xl p-5">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      name="deliveryToolBuildServer"
                      checked={formData.deliveryToolBuildServer}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded border-2 border-[#e5e7eb] text-[#00C6C2] focus:ring-[#00C6C2]"
                    />
                    <label className="flex-1 text-[#111827] text-base font-medium">
                      Build Server
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        name="deliveryToolBuildServerDays"
                        value={formData.deliveryToolBuildServerDays}
                        onChange={handleInputChange}
                        placeholder="0"
                        disabled={!formData.deliveryToolBuildServer}
                        className="w-24 h-12 bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-lg px-3 text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00C6C2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      <span className="text-[#6b7280] text-sm">days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[#111827] text-base font-bold mb-4">
                Storage Class
              </label>
              <div className="space-y-3">
                <div className="bg-white border-2 border-[#e5e7eb] rounded-xl p-5">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="storageClass"
                      value="live"
                      checked={formData.storageClass === 'live'}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-[#00C6C2] focus:ring-[#00C6C2]"
                    />
                    <label className="text-[#111827] text-base font-medium">
                      Live
                    </label>
                  </div>
                </div>
                <div className="bg-white border-2 border-[#e5e7eb] rounded-xl p-5">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="storageClass"
                      value="cold"
                      checked={formData.storageClass === 'cold'}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-[#00C6C2] focus:ring-[#00C6C2]"
                    />
                    <label className="text-[#111827] text-base font-medium">
                      Cold
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[#111827] text-base font-bold mb-3">
                Data Deletion Policy (MB to Delete at EoL)
              </label>
              <input
                type="number"
                name="dataDeletionMB"
                value={formData.dataDeletionMB}
                onChange={handleInputChange}
                placeholder="Enter MB"
                className="w-full h-14 bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-xl px-5 text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00C6C2] transition-colors"
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-[#111827] text-base font-bold mb-4">
                Model Training Used
              </label>
              <div className="flex items-center gap-4 bg-white border-2 border-[#e5e7eb] rounded-xl p-5">
                <input
                  type="checkbox"
                  name="modelTrainingUsed"
                  checked={formData.modelTrainingUsed}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-2 border-[#e5e7eb] text-[#00C6C2] focus:ring-[#00C6C2]"
                />
                <label className="text-[#111827] text-base font-medium">
                  Enable AI Compute Block
                </label>
              </div>
            </div>

            {formData.modelTrainingUsed && (
              <>
                <div>
                  <label className="block text-[#111827] text-base font-bold mb-3">
                    Training Activity (Days)
                  </label>
                  <input
                    type="number"
                    name="trainingActivityDays"
                    value={formData.trainingActivityDays}
                    onChange={handleInputChange}
                    placeholder="Enter number of days"
                    className="w-full h-14 bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-xl px-5 text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00C6C2] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[#111827] text-base font-bold mb-3">
                    Training Region Override (Optional)
                  </label>
                  <select
                    name="trainingRegionOverride"
                    value={formData.trainingRegionOverride}
                    onChange={handleInputChange}
                    className="w-full h-14 bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-xl px-5 text-base text-[#111827] focus:outline-none focus:border-[#00C6C2] transition-colors"
                  >
                    <option value="">Use main cloud region</option>
                    <option value="uk">UK</option>
                    <option value="ireland">Ireland</option>
                    <option value="west-europe">West Europe</option>
                    <option value="north-europe">North Europe</option>
                    <option value="us-avg">US – Avg</option>
                    <option value="us-west">US – West</option>
                    <option value="canada">Canada</option>
                    <option value="australia">Australia</option>
                    <option value="india">India</option>
                  </select>
                </div>
              </>
            )}
          </div>
        )

      case 4:
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-[#111827] text-base font-bold mb-3">
                Team Size (People)
              </label>
              <input
                type="number"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleInputChange}
                placeholder="Enter team size"
                className="w-full h-14 bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-xl px-5 text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00C6C2] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#111827] text-base font-bold mb-4">
                Working Pattern
              </label>
              <div className="space-y-3">
                <div className="bg-white border-2 border-[#e5e7eb] rounded-xl p-5">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="workingPattern"
                      value="office"
                      checked={formData.workingPattern === 'office'}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-[#00C6C2] focus:ring-[#00C6C2]"
                    />
                    <label className="text-[#111827] text-base font-medium">
                      Office
                    </label>
                  </div>
                </div>
                <div className="bg-white border-2 border-[#e5e7eb] rounded-xl p-5">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="workingPattern"
                      value="remote"
                      checked={formData.workingPattern === 'remote'}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-[#00C6C2] focus:ring-[#00C6C2]"
                    />
                    <label className="text-[#111827] text-base font-medium">
                      Remote
                    </label>
                  </div>
                </div>
                <div className="bg-white border-2 border-[#e5e7eb] rounded-xl p-5">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="workingPattern"
                      value="hybrid"
                      checked={formData.workingPattern === 'hybrid'}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-[#00C6C2] focus:ring-[#00C6C2]"
                    />
                    <label className="text-[#111827] text-base font-medium">
                      Hybrid
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {(formData.workingPattern === 'office' || formData.workingPattern === 'hybrid') && (
              <div>
                <label className="block text-[#111827] text-base font-bold mb-3">
                  In-Office Days Per Week (0-5)
                </label>
                <input
                  type="number"
                  name="inOfficeDaysPerWeek"
                  value={formData.inOfficeDaysPerWeek}
                  onChange={handleInputChange}
                  placeholder="Enter days (0-5)"
                  min="0"
                  max="5"
                  className="w-full h-14 bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-xl px-5 text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00C6C2] transition-colors"
                />
              </div>
            )}

            {(formData.workingPattern === 'remote' || formData.workingPattern === 'hybrid') && (
              <div>
                <label className="block text-[#111827] text-base font-bold mb-3">
                  WFH Footprint Override (Optional, kgCO₂e/person/day)
                </label>
                <input
                  type="number"
                  name="wfhFootprintOverride"
                  value={formData.wfhFootprintOverride}
                  onChange={handleInputChange}
                  placeholder="Leave blank for default"
                  step="0.01"
                  className="w-full h-14 bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-xl px-5 text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00C6C2] transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block text-[#111827] text-base font-bold mb-3">
                Office Equipment Use (kgCO₂e/person/day)
              </label>
              <input
                type="number"
                name="officeEquipmentUse"
                value={formData.officeEquipmentUse}
                onChange={handleInputChange}
                placeholder="Enter equipment footprint"
                step="0.01"
                className="w-full h-14 bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-xl px-5 text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00C6C2] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#111827] text-base font-bold mb-3">
                Software Rationalisation Activity (Days)
              </label>
              <input
                type="number"
                name="softwareRationalisationDays"
                value={formData.softwareRationalisationDays}
                onChange={handleInputChange}
                placeholder="Enter number of days"
                className="w-full h-14 bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-xl px-5 text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00C6C2] transition-colors"
              />
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-[#111827] text-base font-bold mb-3">
                Primary Office
              </label>
              <select
                name="primaryOffice"
                value={formData.primaryOffice}
                onChange={handleInputChange}
                className="cursor-pointer w-full h-14 bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-xl px-5 text-base text-[#111827] focus:outline-none focus:border-[#00C6C2] transition-colors"
              >
                <option value="">Select primary office</option>
                <option value="birmingham">Birmingham</option>
                <option value="london">London</option>
                <option value="newcastle">Newcastle</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-[#111827] text-base font-bold mb-4">
                Travel Mode Mix (Total must equal 100%)
              </label>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="w-24 text-[#111827] text-base font-medium">Car</label>
                  <input
                    type="number"
                    name="travelModeCar"
                    value={formData.travelModeCar}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    max="100"
                    className="flex-1 h-12 bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-lg px-4 text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00C6C2] transition-colors"
                  />
                  <span className="text-[#6b7280] text-sm">%</span>
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-24 text-[#111827] text-base font-medium">Train</label>
                  <input
                    type="number"
                    name="travelModeTrain"
                    value={formData.travelModeTrain}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    max="100"
                    className="flex-1 h-12 bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-lg px-4 text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00C6C2] transition-colors"
                  />
                  <span className="text-[#6b7280] text-sm">%</span>
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-24 text-[#111827] text-base font-medium">Bus</label>
                  <input
                    type="number"
                    name="travelModeBus"
                    value={formData.travelModeBus}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    max="100"
                    className="flex-1 h-12 bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-lg px-4 text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00C6C2] transition-colors"
                  />
                  <span className="text-[#6b7280] text-sm">%</span>
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-24 text-[#111827] text-base font-medium">Tube</label>
                  <input
                    type="number"
                    name="travelModeTube"
                    value={formData.travelModeTube}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    max="100"
                    disabled={formData.primaryOffice !== 'london'}
                    className="flex-1 h-12 bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-lg px-4 text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00C6C2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <span className="text-[#6b7280] text-sm">%</span>
                  {formData.primaryOffice !== 'london' && (
                    <span className="text-xs text-[#6b7280]">(London only)</span>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[#111827] text-base font-bold mb-4">
                Commute Distance Source
              </label>
              <div className="space-y-3">
                <div className="bg-white border-2 border-[#e5e7eb] rounded-xl p-5">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="commuteDistanceSource"
                      value="office-average"
                      checked={formData.commuteDistanceSource === 'office-average'}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-[#00C6C2] focus:ring-[#00C6C2]"
                    />
                    <label className="text-[#111827] text-base font-medium">
                      Use Office Average
                    </label>
                  </div>
                </div>
                <div className="bg-white border-2 border-[#e5e7eb] rounded-xl p-5">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="commuteDistanceSource"
                      value="custom"
                      checked={formData.commuteDistanceSource === 'custom'}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-[#00C6C2] focus:ring-[#00C6C2]"
                    />
                    <label className="text-[#111827] text-base font-medium">
                      Provide Custom Average Distance
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {formData.commuteDistanceSource === 'custom' && (
              <div>
                <label className="block text-[#111827] text-base font-bold mb-3">
                  Custom Commute Distance (km/person/day)
                </label>
                <input
                  type="number"
                  name="customCommuteDistance"
                  value={formData.customCommuteDistance}
                  onChange={handleInputChange}
                  placeholder="Enter km per person per day"
                  step="0.1"
                  className="w-full h-14 bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-xl px-5 text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00C6C2] transition-colors"
                />
              </div>
            )}
          </div>
        )

      case 6:
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-[#111827] text-base font-bold mb-3">
                Design & Set-up Duration (Days)
              </label>
              <input
                type="number"
                name="designSetupDuration"
                value={formData.designSetupDuration}
                onChange={handleInputChange}
                placeholder="Enter number of days"
                className="w-full h-14 bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-xl px-5 text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00C6C2] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#111827] text-base font-bold mb-3">
                Build & Delivery Duration (Days)
              </label>
              <input
                type="number"
                name="buildDeliveryDuration"
                value={formData.buildDeliveryDuration}
                onChange={handleInputChange}
                placeholder="Enter number of days"
                className="w-full h-14 bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-xl px-5 text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00C6C2] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#111827] text-base font-bold mb-3">
                Operation Duration (Years)
              </label>
              <input
                type="number"
                name="operationDurationYears"
                value={formData.operationDurationYears}
                onChange={handleInputChange}
                placeholder="Enter number of years"
                step="0.1"
                className="w-full h-14 bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-xl px-5 text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00C6C2] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#111827] text-base font-bold mb-4">
                Retention Policy (Data Storage Time)
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#6b7280] text-sm font-medium mb-2">Years</label>
                  <input
                    type="number"
                    name="retentionPolicyYears"
                    value={formData.retentionPolicyYears}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full h-12 bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-lg px-4 text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00C6C2] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#6b7280] text-sm font-medium mb-2">Months</label>
                  <input
                    type="number"
                    name="retentionPolicyMonths"
                    value={formData.retentionPolicyMonths}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    max="11"
                    className="w-full h-12 bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-lg px-4 text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00C6C2] transition-colors"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[#111827] text-base font-bold mb-3">
                Estimated Data Stored (MB)
              </label>
              <input
                type="number"
                name="estimatedDataStoredMB"
                value={formData.estimatedDataStoredMB}
                onChange={handleInputChange}
                placeholder="Enter MB"
                className="w-full h-14 bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-xl px-5 text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00C6C2] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#111827] text-base font-bold mb-3">
                Average Daily Data Processed (MB/day) (Optional)
              </label>
              <input
                type="number"
                name="avgDailyDataProcessedMB"
                value={formData.avgDailyDataProcessedMB}
                onChange={handleInputChange}
                placeholder="Leave blank if not applicable"
                className="w-full h-14 bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-xl px-5 text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00C6C2] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#111827] text-base font-bold mb-3">
                Data to Delete at End of Life (MB)
              </label>
              <input
                type="number"
                name="dataToDeleteMB"
                value={formData.dataToDeleteMB}
                onChange={handleInputChange}
                placeholder="Enter MB"
                className="w-full h-14 bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-xl px-5 text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00C6C2] transition-colors"
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-[#e5e7eb] h-[73px] px-6 sm:px-10 flex items-center">
        <div className="max-w-[1600px] mx-auto w-full flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111827]">Build Scenario</h1>
          <span className="text-[#6b7280] text-base">
            Step <span className="text-[#111827] font-bold">{currentStep}</span> of <span className="font-bold">6</span>
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row">
        {/* Sidebar - Steps */}
        <div className="lg:w-80 border-b lg:border-b-0 lg:border-r border-[#e5e7eb] p-6 sm:p-10">
          <h2 className="text-base font-bold text-[#6b7280] uppercase tracking-wide mb-6 border-b border-[#e5e7eb] pb-3">
            Steps
          </h2>
          <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`cursor-pointer flex-shrink-0 lg:flex-shrink lg:w-full px-5 py-4 rounded-xl text-left text-base font-medium transition-all ${currentStep === step.id
                  ? 'bg-[#00C6C2] text-white'
                  : step.id < currentStep
                    ? 'bg-[#d1fae5] text-[#065f46]'
                    : 'bg-[#f3f4f6] text-[#6b7280] hover:bg-[#e5e7eb]'
                  }`}
              >
                <span className="hidden sm:inline">{step.id}. </span>{step.name}
              </button>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 p-6 sm:p-12">
          <h2 className="text-2xl font-bold text-[#111827] mb-8 border-b border-[#e5e7eb] pb-3">
            {steps[currentStep - 1].name}
          </h2>

          {/* Form Area */}
          <div className="bg-[#fafafa] border border-[#e5e7eb] rounded-2xl p-8 sm:p-10 min-h-[400px] max-h-[600px] overflow-y-auto">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`cursor-pointer px-8 py-4 rounded-xl text-base font-medium transition-colors ${currentStep === 1
                ? 'bg-[#f3f4f6] text-[#9ca3af] cursor-not-allowed'
                : 'bg-[#f3f4f6] text-[#111827] hover:bg-[#e5e7eb]'
                }`}
            >
              ← Back
            </button>
            {currentStep < 6 ? (
              <button
                onClick={handleNext}
                className="px-8 py-4 bg-[#00C6C2] hover:bg-[#00B0AC] text-white rounded-xl text-base font-medium transition-colors"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-8 py-4 bg-[#00C6C2] hover:bg-[#00B0AC] text-white rounded-xl text-base font-medium transition-colors"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuildScenario
