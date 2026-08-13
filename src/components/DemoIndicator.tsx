import React from 'react';
import { useLocation } from 'react-router-dom';
import './DemoIndicator.css';

const DemoIndicator = () => {
  const location = useLocation();
  
  // Only show the top banner indicator on certain pages if needed
  // Alternatively, just a global floating pill
  
  return (
    <div className="demo-indicator-global">
      DEMO &bull; NOT VALID FOR TRAVEL
    </div>
  );
};

export default DemoIndicator;
