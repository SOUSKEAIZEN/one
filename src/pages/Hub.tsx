import React, { useState } from 'react';
import { Search, MapPin, Filter, Car, Plug } from 'lucide-react';
import MapFallback from '../components/MapFallback';
import './Hub.css';

const Hub = () => {
  const [activeTab, setActiveTab] = useState<'EV' | 'PARKING'>('EV');

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

  // Custom marker component to match the screenshot's green map pins
  const EVMarker = ({ top, left }: { top: string, left: string }) => (
    <div className="ev-map-marker" style={{ top, left }}>
      <div className="ev-marker-inner">
        <Plug size={12} color="white" />
      </div>
    </div>
  );

  return (
    <div className="page-hub">
      <div className="hub-geometric-header">
        <div className="hgh-logo">
           <svg viewBox="0 0 100 40" className="one-logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold" fontFamily="sans-serif" letterSpacing="-1">ONE</text>
            <text x="50%" y="90%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="6" fontWeight="normal" fontFamily="sans-serif" letterSpacing="1">ONE DELHI ONE RIDE</text>
            <circle cx="29" cy="22" r="10" stroke="white" strokeWidth="1.5" strokeDasharray="2 2" />
          </svg>
        </div>
        <div className="hub-search-bar">
          <Search size={18} color="white" />
          <span>Search 0+ charge points</span>
        </div>
      </div>

      <div className="map-container-hub">
        <MapFallback height="100%" />
        
        {/* Fake Map Markers matching the cluster in the screenshot */}
        <EVMarker top="35%" left="40%" />
        <EVMarker top="32%" left="45%" />
        <EVMarker top="38%" left="42%" />
        <EVMarker top="25%" left="38%" />
        <EVMarker top="45%" left="30%" />
        <EVMarker top="42%" left="35%" />
        <EVMarker top="48%" left="50%" />
        <EVMarker top="30%" left="60%" />
        <EVMarker top="34%" left="70%" />
        <EVMarker top="38%" left="68%" />
        <EVMarker top="42%" left="72%" />
        
        <div className="hub-floating-actions">
          <button className="hub-float-btn"><Filter size={20} /></button>
          <button className="hub-float-btn"><MapPin size={20} /></button>
        </div>
      </div>

      <div className="hub-bottom-sheet">
        <div className="drag-handle"></div>
        <div className="hub-tabs">
          <button 
            className={`hub-tab-btn ${activeTab === 'EV' ? 'active-ev' : 'inactive'}`}
            onClick={() => setActiveTab('EV')}
          >
            <Plug size={18} /> EV Stations
          </button>
          <button 
            className={`hub-tab-btn ${activeTab === 'PARKING' ? 'active-ev' : 'inactive'}`}
            onClick={() => setActiveTab('PARKING')}
          >
            <span className="parking-icon">P</span> Parking Spots
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
                  {/* Custom directional arrow */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="hc-arrow" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="hc-subtitle">{station.subtitle}</div>
                <div className="hc-grey-box">
                  <span className="hc-gb-title">{station.boxTitle}</span>
                  <span className="hc-gb-status">{station.boxStatus}</span>
                </div>
                <div className="hc-supports">
                  Supports: <Car size={16} color="#666" />
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