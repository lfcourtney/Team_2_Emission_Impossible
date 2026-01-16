import React from 'react';
import { motion } from 'framer-motion';
import { Settings, CloudLightning, Clock, Server, Globe } from 'lucide-react';

const SimulationPanel = ({ params, setParams, isOpen, togglePanel }) => {
  const handleChange = (key, value) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed right-0 top-16 bottom-0 w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-2xl z-20 overflow-y-auto"
    >
      <div className="p-6 space-y-8">
        <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center gap-2 dark:text-white">
                <Settings className="w-5 h-5 text-green-500" />
                Impact Simulator
            </h2>
            <button onClick={togglePanel} className="text-gray-400 hover:text-gray-600">×</button>
        </div>

        {/* Lever 1: Right Sizing (Energy Efficiency) */}
        <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <Server className="w-4 h-4 text-blue-500" />
                <span>Resource Optimization</span>
            </div>
            <p className="text-xs text-gray-500">Eliminate idle resources and right-size instances.</p>
            <div className="flex items-center justify-between">
                <span className="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded dark:text-white">
                    {params.rightSizing}% Aggressiveness
                </span>
            </div>
            <input
                type="range" min="0" max="100"
                value={params.rightSizing}
                onChange={(e) => handleChange('rightSizing', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-500"
            />
        </div>

        {/* Lever 2: Time Shifting (Carbon Awareness) */}
        <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <Clock className="w-4 h-4 text-purple-500" />
                <span>Temporal Shifting</span>
            </div>
            <p className="text-xs text-gray-500">Delay flexible workloads to low-carbon windows.</p>
            <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm dark:text-gray-300">Enable Carbon-Aware Scheduling</span>
                <input
                    type="checkbox"
                    checked={params.timeShifting}
                    onChange={(e) => handleChange('timeShifting', e.target.checked)}
                    className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
            </label>
        </div>

        {/* Lever 3: Region Shifting */}
        <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <Globe className="w-4 h-4 text-teal-500" />
                <span>Spatial Shifting</span>
            </div>
            <p className="text-xs text-gray-500">Route traffic to regions with >90% renewable energy.</p>
            <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm dark:text-gray-300">Green Region Failover</span>
                <input
                    type="checkbox"
                    checked={params.regionShifting}
                    onChange={(e) => handleChange('regionShifting', e.target.checked)}
                    className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-500"></div>
            </label>
        </div>

        {/* Calculated Savings Summary */}
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-800 mt-8">
            <h3 className="text-sm font-bold text-green-800 dark:text-green-400 mb-2">Projected Impact</h3>
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-xs text-green-600 dark:text-green-300">Total Reduction</p>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                        {Math.round((params.rightSizing * 0.4) + (params.timeShifting ? 15 : 0) + (params.regionShifting ? 25 : 0))}%
                    </p>
                </div>
                <CloudLightning className="w-8 h-8 text-green-500 opacity-50" />
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SimulationPanel;
