import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const KPICard = ({ title, value, unit, trend, status }) => {
    const isPositive = trend.includes('+');
    const isNeutral = trend === 'Neutral';

    const statusColor =
        status === 'success' ? 'text-green-500' :
        status === 'warning' ? 'text-red-500' : 'text-gray-500';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden"
        >
            {/* Subtle background glow for 'success' cards */}
            {status === 'success' && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            )}

            <div className="flex justify-between items-start mb-4 relative z-10">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-full bg-gray-50 dark:bg-gray-700/50 ${statusColor}`}>
                    {isNeutral ? <Minus size={12} className="mr-1"/> :
                     isPositive ? <ArrowUpRight size={12} className="mr-1"/> :
                     <ArrowDownRight size={12} className="mr-1"/>}
                    {trend}
                </div>
            </div>

            <div className="flex items-baseline relative z-10">
                {/* Animate the number when it changes */}
                <motion.h2
                    key={value}
                    initial={{ scale: 1.2, color: '#10B981' }}
                    animate={{ scale: 1, color: 'var(--text-color)' }}
                    className="text-3xl font-bold text-gray-900 dark:text-white mr-2"
                >
                    {value}
                </motion.h2>
                <span className="text-sm text-gray-500">{unit}</span>
            </div>
        </motion.div>
    );
};

export default KPICard;
