import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import MapFallback from '../components/MapFallback';
import { ALL_STOPS } from '../data/routes';
import './BusHome.css';

const BusHome = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'BUS' | 'METRO'>('BUS');

  const handleSearchClick = () => {
    navigate('/search');
  };

  // Get 4 random nearby stops for demo
  const nearbyStops = ALL_STOPS.slice(0, 4);

  return (
    <div className="page-container page-home">
      <div className="search-bar-container" onClick={handleSearchClick}>
        <div className="search-bar">
          <Search size={20} color="var(--text-secondary)" />
          <span className="search-placeholder">Search bus number or route</span>
        </div>
      </div>

      <MapFallback height="220px" />

      <div className="tab-toggle">
        <button 
          className={`tab-btn ${activeTab === 'BUS' ? 'active' : ''}`}
          onClick={() => setActiveTab('BUS')}
        >
          Bus Stop
        </button>
        <button 
          className={`tab-btn ${activeTab === 'METRO' ? 'active' : ''}`}
          onClick={() => setActiveTab('METRO')}
        >
          Metro Stop
        </button>
      </div>

      <div className="stops-container">
        <h3>Nearby Stops</h3>
        {nearbyStops.map((stop, idx) => (
          <div key={idx} className="stop-card card">
            <div className="stop-info">
              <MapPin size={20} color="var(--primary)" />
              <div>
                <div className="stop-name">{stop.name}</div>
                <div className="stop-distance">{(Math.random() * 2 + 0.1).toFixed(1)} km away</div>
              </div>
            </div>
            <button className="btn-outline view-btn" onClick={handleSearchClick}>
              View Buses
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusHome;
