import React, { useState } from 'react';
import { Search, Zap, ParkingCircle, Navigation } from 'lucide-react';
import { EV_STATIONS, PARKING_SPOTS } from '../data/faqs';
import MapFallback from '../components/MapFallback';
import './Hub.css';

const Hub = () => {
  const [activeTab, setActiveTab] = useState<'EV' | 'PARKING'>('EV');

  return (
    <div className="page-container page-hub">
      <MapFallback height="180px" />
      
      <div className="tab-toggle">
        <button 
          className={`tab-btn ${activeTab === 'EV' ? 'active' : ''}`}
          onClick={() => setActiveTab('EV')}
        >
          <Zap size={16} className="inline-icon" /> EV Stations
        </button>
        <button 
          className={`tab-btn ${activeTab === 'PARKING' ? 'active' : ''}`}
          onClick={() => setActiveTab('PARKING')}
        >
          <ParkingCircle size={16} className="inline-icon" /> Parking Spots
        </button>
      </div>

      <div className="hub-content">
        <div className="search-input-wrapper mb-4">
          <Search size={20} color="var(--text-secondary)" />
          <input
            type="text"
            className="search-input"
            placeholder={`Search ${activeTab === 'EV' ? 'EV charging points' : 'parking locations'}`}
          />
        </div>

        {activeTab === 'EV' ? (
          <div className="list-container">
            {EV_STATIONS.map(station => (
              <div key={station.id} className="hub-card card">
                <div className="hub-card-top">
                  <div className="hub-title">{station.name}</div>
                  <div className="hub-distance">{station.distance}</div>
                </div>
                <div className="hub-card-middle">
                  <span className={`availability ${station.availability.includes('available') ? 'available' : 'occupied'}`}>
                    {station.availability}
                  </span>
                </div>
                <div className="hub-card-bottom">
                  <div>Type: {station.type}</div>
                  <div>Support: {station.support}</div>
                </div>
                <button className="btn-outline hub-nav-btn mt-3">
                  <Navigation size={16} /> Navigate
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="list-container">
            {PARKING_SPOTS.map(spot => (
              <div key={spot.id} className="hub-card card">
                <div className="hub-card-top">
                  <div className="hub-title">{spot.name}</div>
                  <div className="hub-distance">{spot.distance}</div>
                </div>
                <div className="hub-card-middle">
                  <span className="availability available">
                    {spot.slots} slots available
                  </span>
                </div>
                <div className="hub-card-bottom">
                  <div>Price: {spot.price}</div>
                </div>
                <button className="btn-outline hub-nav-btn mt-3">
                  <Navigation size={16} /> Navigate
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hub;
