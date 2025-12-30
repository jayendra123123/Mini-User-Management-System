
import React from 'react';

const DotBackground = () => {
  return (
    <div 
      className="absolute inset-0 z-0 opacity-40 dark:opacity-20 pointer-events-none" 
      style={{
        backgroundImage: 'radial-gradient(#137fec 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }}
      aria-hidden="true"
    />
  );
};

export default DotBackground;
