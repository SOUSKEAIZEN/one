import React from 'react';
import { MapPin } from 'lucide-react';
import './MapFallback.css';

const MapFallback = ({ height = '200px' }: { height?: string }) => {
  return (
    <div className="map-fallback" style={{ height }}>
      <div className="map-grid">
        <div className="map-marker m1"><MapPin size={24} color="var(--primary)" fill="white"/></div>
        <div className="map-marker m2"><MapPin size={24} color="var(--primary)" fill="white"/></div>
        <div className="map-marker m3"><MapPin size={24} color="var(--primary)" fill="white"/></div>
        <div className="map-marker m4 bus-marker">
          <div className="bus-dot"></div>
        </div>
      </div>
      <div className="map-overlay-text">Live Map Demo Area</div>
    </div>
  );
};

export default MapFallback;
