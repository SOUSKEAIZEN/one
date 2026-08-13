import React, { useState } from 'react';
import { ArrowUpDown, Search, MapPin, Navigation } from 'lucide-react';
import './TripPlanner.css';

const TripPlanner = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [results, setResults] = useState(false);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearch = () => {
    if (from && to) setResults(true);
  };

  return (
    <div className="page-container page-trip-planner">
      <div className="route-header">
        <h2>Trip Planner</h2>
      </div>

      <div className="trip-planner-content">
        <div className="planner-card card">
          <div className="planner-inputs">
            <div className="input-with-icon">
              <MapPin size={20} color="var(--primary)" />
              <input 
                type="text" 
                placeholder="Where from?" 
                value={from}
                onChange={e => { setFrom(e.target.value); setResults(false); }}
              />
            </div>
            
            <button className="swap-btn" onClick={handleSwap}>
              <ArrowUpDown size={18} />
            </button>
            
            <div className="input-with-icon">
              <Navigation size={20} color="var(--success)" />
              <input 
                type="text" 
                placeholder="Where to?" 
                value={to}
                onChange={e => { setTo(e.target.value); setResults(false); }}
              />
            </div>
          </div>
          
          <button className="btn btn-primary mt-4" onClick={handleSearch} disabled={!from || !to}>
            <Search size={18} className="mr-2" /> Find Routes
          </button>
        </div>

        {results && (
          <div className="planner-results">
            <h3>Suggested Routes</h3>
            
            <div className="route-result-card card">
              <div className="planner-route-badges">
                <span className="route-badge">433</span>
                <span className="route-badge text-muted">&rarr;</span>
                <span className="route-badge">511A</span>
              </div>
              <div className="planner-route-details">
                <div>Est. Time: 45 mins</div>
                <div>1 interchange</div>
              </div>
            </div>
            
            <div className="route-result-card card">
              <div className="planner-route-badges">
                <span className="route-badge">774</span>
              </div>
              <div className="planner-route-details">
                <div>Est. Time: 52 mins</div>
                <div>Direct route</div>
              </div>
            </div>
            
            <div className="demo-warning-card mt-4">
              <p>Demo routing data. Real-time connections are not computed.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripPlanner;
