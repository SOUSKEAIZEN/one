import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Settings, Crosshair, Filter, Bus as BusIcon } from 'lucide-react';
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

  // Exact stops from your screenshot
  const nearbyStops = [
    { title: 'Ram Puri Gali No 13', subtitle: 'towards Govindpuri Extn Gali No. 16' },
    { title: 'CLal Chowk', subtitle: 'towards Kalkaji Depot' },
    { title: 'Rampuri Gali No 13', subtitle: 'towards Govindpuri Gali No 5' },
    { title: 'CLal Chowk', subtitle: 'towards CRPF Camp / Crown Plaza' },
    { title: 'Govindpuri Extn Gali No. 16', subtitle: 'towards DDA Market Kalkaji' },
    { title: 'Okhla Industrial Area', subtitle: 'towards CLal Chowk' },
  ];

  return (
    <div className="page-home">
      
      {/* 1. Map Container Area */}
      <div className="map-container-home">
        {/* User Location */}
        <div className="map-user-location"></div>

        {/* Map markers precisely styled like the screenshot */}
        <div className="map-fake-marker mfm-green" style={{ top: '22%', left: '40%' }}>
          <BusIcon size={12} /> 774
        </div>
        <div className="map-fake-marker mfm-green" style={{ top: '26%', left: '42%' }}>
          <BusIcon size={12} /> 433
        </div>
        <div className="map-fake-marker mfm-blue" style={{ top: '30%', left: '44%' }}>
          <BusIcon size={12} /> 425
        </div>
        <div className="map-fake-marker mfm-blue" style={{ top: '34%', left: '44%' }}>
          <BusIcon size={12} /> 425
        </div>
        
        <div className="map-fake-marker mfm-grey" style={{ top: '39%', left: '60%' }}>
          <BusIcon size={12} /> 74
        </div>
        <div className="map-fake-marker mfm-blue" style={{ top: '44%', left: '62%' }}>
          <BusIcon size={12} /> 433
        </div>
        <div className="map-fake-marker mfm-orange" style={{ top: '49%', left: '62%' }}>
          <BusIcon size={12} /> 511A
        </div>

        <div className="map-fake-marker mfm-blue" style={{ top: '49%', left: '70%' }}>
          <BusIcon size={12} /> 47A
        </div>
        <div className="map-fake-marker mfm-blue" style={{ top: '54%', left: '70%' }}>
          <BusIcon size={12} /> 425
        </div>

        <div className="map-fake-marker mfm-orange" style={{ top: '53%', left: '22%' }}>
          <BusIcon size={12} /> 8...
        </div>

        {/* Circular Map Buttons on the right */}
        <div className="map-floating-buttons">
          <div className="mfb-btn">
            <Filter size={20} />
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
             {/* Custom SVG to replicate the 'ONE' Delhi logo exactly */}
             <svg viewBox="0 0 100 40" className="one-logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold" fontFamily="sans-serif" letterSpacing="-1">ONE</text>
              <text x="50%" y="90%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="6" fontWeight="normal" fontFamily="sans-serif" letterSpacing="1">ONE DELHI ONE RIDE</text>
              <circle cx="29" cy="22" r="10" stroke="white" strokeWidth="1.5" strokeDasharray="2 2" />
            </svg>
          </div>
          <Settings size={22} className="hgh-settings" onClick={() => navigate('/settings')} />
        </div>
        
        <div className="hgh-search-row">
          <div className="hgh-search-bar" onClick={handleSearchClick}>
            <Search size={20} />
            <span className="hgh-search-text">Search 500+ Route</span>
          </div>
          <div className="hgh-bell-btn">
            <Bell size={20} fill="white" />
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

        <div className="stop-list">
          {nearbyStops.map((stop, index) => (
            <div className="stop-list-item" key={index}>
              <div className="stop-item-left">
                <span className="stop-item-title">{stop.title}</span>
                <span className="stop-item-subtitle">{stop.subtitle}</span>
              </div>
              <button className="view-buses-btn" onClick={handleBuyClick}>
                View Buses
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default BusHome;