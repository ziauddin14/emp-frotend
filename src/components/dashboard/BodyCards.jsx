import React, { useEffect, useRef, useState } from "react";

const useCountUp = (target = 0, durationMs = 1000) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / durationMs);
      setValue(Math.floor(target * progress));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);
  return value;
};

const BodyCards = ({ icons, text, number, color, description }) => {
  const value = useCountUp(Number(number) || 0, 1200);
  
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          {/* Icon */}
          <div className={`${color} text-white p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <div className="text-2xl">
              {icons}
            </div>
          </div>
          
          {/* Number */}
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              {value.toLocaleString()}
            </div>
            {description && (
              <div className="text-sm text-gray-500 dark:text-gray-300 font-medium">
                {description}
              </div>
            )}
          </div>
        </div>
        
        {/* Title */}
        <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {text}
        </div>
        
        {/* Decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </div>
    </div>
  );
};

export default BodyCards;
