import React, { useState } from 'react';
import { Search, MapPin, Filter, Navigation, Car, BatteryCharging } from 'lucide-react';
import MapFallback from '../components/MapFallback';
import './Hub.css';

const Hub = () => {
  const [activeTab, setActiveTab] = useState<'EV' | 'PARKING'>('EV');

  // Hardcoded exact data from the screenshot
  const evStations = [
    {
      id: 1,
      title: "REIL",
      badge: "NA/4 AVAIL",
      distance: "6.21 KM",
      subtitle: "Nizamuddin Railway station",
      boxTitle: "Bharat DC 001",
      boxStatus: "NA"
    },
    {
      id: 2,
      title: "REIL",
      badge: "NA/2 AVAIL",
      distance: "7.05 KM",
      subtitle: "Ashram Chowk Mathura Road",
      boxTitle: "Bharat DC 001",
      boxStatus: "NA"
    }
  ];

  return (
    <div className="page-hub">
      <div className="hub-gradient-header">
        <div className="hub-logo">METROGO</div>
        <div className="hub-search-bar">
          <Search size={20} color="white" />
          <span>Search 0+ charge points</span>
        </div>
      </div>

      <div className="map-container-hub">
        <MapFallback height="100%" />
        <div className="hub-floating-actions">
          <button className="hub-float-btn"><Filter size={20} /></button>
          <button className="hub-float-btn"><MapPin size={20} /></button>
        </div>
      </div>

      <div className="hub-bottom-sheet">
        <div className="hub-tabs">
          <button 
            className={`hub-tab-btn ${activeTab === 'EV' ? 'active-ev' : 'inactive'}`}
            onClick={() => setActiveTab('EV')}
          >
            <BatteryCharging size={18} /> EV Stations
          </button>
          <button 
            className={`hub-tab-btn ${activeTab === 'PARKING' ? 'active-ev' : 'inactive'}`}
            onClick={() => setActiveTab('PARKING')}
          >
            Parking Spots
          </button>
        </div>

        {activeTab === 'EV' && (
          <div className="hub-scroll-list">
            {evStations.map(station => (
              <div key={station.id} className="hub-card-item">
                <div className="hc-top-row">
                  <span className="hc-title">{station.title}</span>
                  <span className="hc-badge-green">{station.badge}</span>
                  <span className="hc-badge-red">{station.distance}</span>
                  <Navigation size={16} className="hc-arrow" style={{ transform: 'rotate(45deg)' }} />
                </div>
                <div className="hc-subtitle">{station.subtitle}</div>
                <div className="hc-grey-box">
                  <span className="hc-gb-title">{station.boxTitle}</span>
                  <span className="hc-gb-status">{station.boxStatus}</span>
                </div>
                <div className="hc-supports">
                  Supports: <Car size={16} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hub;
