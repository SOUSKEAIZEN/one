import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Settings, Crosshair, Bus as BusIcon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { ALL_ROUTES } from '../data/routes';
import './BusHome.css';

const BusHome = () => {
  const navigate = useNavigate();
  const { setSelectedRoute, setSelectedSource, setSelectedDestination } = useAppContext();
  const [activeTab, setActiveTab] = useState<'BUS' | 'METRO'>('BUS');

  const handleSearchClick = () => {
    navigate('/search');
  };

  const handleBuyClick = () => {
    // Pre-select the 774 route to allow the user to immediately enter the buy flow
    const route = ALL_ROUTES.find(r => r.id === 'r-774-fwd');
    if (route) {
      setSelectedRoute(route);
      setSelectedSource(null);
      setSelectedDestination(null);
      navigate('/buy');
    }
  };

  return (
    <div className="page-home">
      
      {/* 1. Map Container Area */}
      <div className="map-container-home">
        {/* User Location */}
        <div className="map-user-location"></div>

        {/* Fake map markers to mimic screenshot precisely */}
        <div className="map-fake-marker mfm-green" style={{ top: '22%', left: '40%' }}>
          <BusIcon size={10} /> 774
        </div>
        <div className="map-fake-marker mfm-green" style={{ top: '25%', left: '42%' }}>
          <BusIcon size={10} /> 433
        </div>
        <div className="map-fake-marker mfm-blue" style={{ top: '28%', left: '44%' }}>
          <BusIcon size={10} /> 425
        </div>
        
        <div className="map-fake-marker mfm-grey" style={{ top: '38%', left: '58%' }}>
          <BusIcon size={10} /> 74
        </div>
        <div className="map-fake-marker mfm-blue" style={{ top: '42%', left: '60%' }}>
          <BusIcon size={10} /> 433
        </div>
        <div className="map-fake-marker mfm-orange" style={{ top: '45%', left: '62%' }}>
          <BusIcon size={10} /> 511A
        </div>

        <div className="map-fake-marker mfm-blue" style={{ top: '48%', left: '64%' }}>
          <BusIcon size={10} /> 47A
        </div>

        <div className="map-fake-marker mfm-grey" style={{ top: '65%', left: '80%' }}>
          <BusIcon size={10} /> D-8...
        </div>

        {/* Circular Map Buttons */}
        <div className="map-floating-buttons">
          <div className="mfb-btn">
            <BusIcon size={20} />
          </div>
          <div className="mfb-btn">
            <Crosshair size={20} />
          </div>
        </div>
      </div>

      {/* 2. Geometric Header (Overlays the map) */}
      <div className="home-geometric-header">
        <div className="hgh-top-row">
          <div className="hgh-logo">
            METROGO<span className="hgh-logo-flair">DELHI</span>
          </div>
          <Settings size={20} className="hgh-settings" onClick={() => navigate('/settings')} />
        </div>
        
        <div className="hgh-search-row">
          <div className="hgh-search-bar" onClick={handleSearchClick}>
            <Search size={18} />
            <span className="hgh-search-text">Search 500+ Route</span>
          </div>
          <div className="hgh-bell-btn">
            <Bell size={20} />
          </div>
        </div>
      </div>

      {/* 3. Bottom Sheet */}
      <div className="home-bottom-sheet">
        <div className="drag-handle"></div>
        
        <div className="hbs-tabs">
          <button 
            className={`hbs-tab-pill ${activeTab === 'BUS' ? 'active' : 'inactive'}`}
            onClick={() => setActiveTab('BUS')}
          >
            Bus Stop
          </button>
          <button 
            className={`hbs-tab-pill ${activeTab === 'METRO' ? 'active' : 'inactive'}`}
            onClick={() => setActiveTab('METRO')}
          >
            Metro Stop
          </button>
        </div>

        <div className="hbs-nearby-title">Nearby Stops</div>

        <div className="stop-list">
          <div className="stop-list-item">
            <div className="stop-item-left">
              <span className="stop-item-title">Ram Puri Gali No 13</span>
              <span className="stop-item-subtitle">towards Govindpuri Extn Gali No. 16</span>
            </div>
            <button className="view-buses-btn" onClick={handleBuyClick}>
              View Buses
            </button>
          </div>
          <div className="stop-list-item">
            <div className="stop-item-left">
              <span className="stop-item-title">CLal Chowk</span>
              <span className="stop-item-subtitle">towards Kalkaji Depot</span>
            </div>
            <button className="view-buses-btn" onClick={handleBuyClick}>
              View Buses
            </button>
          </div>
          <div className="stop-list-item">
            <div className="stop-item-left">
              <span className="stop-item-title">Govindpuri</span>
              <span className="stop-item-subtitle">towards Nehru Place</span>
            </div>
            <button className="view-buses-btn" onClick={handleBuyClick}>
              View Buses
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default BusHome;
