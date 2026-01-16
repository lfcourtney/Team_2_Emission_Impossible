import React from 'react';

/**
 * Produces card elements from backend data.
 * @param {*} title - Title for the Card
 * @param {*} children - Children to be rendered inside the Card
 * @param {String} className - Additional class names for the Card (Tailwind CSS)
 */
const Card = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{title}</h3>
      )}
      {children}
    </div>
  );
};

export default Card;
