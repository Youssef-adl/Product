'use client';

import React, { useEffect, useState } from 'react';

export default function DataRain() {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const generateLines = () => {
      const newLineCount = 20;
      const newLines = Array.from({ length: newLineCount }).map(() => ({
        id: Math.random(),
        left: `${Math.random() * 100}%`,
        duration: `${2 + Math.random() * 3}s`,
        delay: `${Math.random() * 5}s`,
      }));
      setLines(newLines);
    };

    generateLines();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="data-rain-container h-full w-full relative">
        {lines.map((line) => (
          <div
            key={line.id}
            className="data-line"
            style={{
              left: line.left,
              animationDuration: line.duration,
              animationDelay: line.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
