import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Navigation } from 'lucide-react';
import { getRouteById } from '../data/routes';
import { Route } from '../data/types';
import { useAppContext } from '../context/AppContext';
import './RouteDetails.css';

const RouteDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setSelectedRoute, setSelectedSource, setSelectedDestination } = useAppContext();
  const [route, setRoute] = useState<Route | null>(null);

  useEffect(() => {
    if (id) {
      const found = getRouteById(id);
      if (found) setRoute(found);
    }
  }, [id]);

  if (!route) return <div className="loading">Loading route details...</div>;

  const handleBookTicket = () => {
    setSelectedRoute(route);
    setSelectedSource(null);
    setSelectedDestination(null);
    navigate('/buy');
  };

  // Simulate current time for arrivals
  const now = new Date();
  
  return (
    <div className="page-container page-route-details">
      <div className="route-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h2>Route Details</h2>
      </div>

      <div className="route-info-card card">
        <div className="route-title-row">
          <div className="route-badge-large">{route.routeNumber}</div>
          <div className="route-direction-large">{route.direction}</div>
        </div>
        
        <div className="route-meta">
          <div className="meta-item">
            <Clock size={16} color="var(--primary)"/>
            <span>{route.operatingHours}</span>
          </div>
          <div className="meta-item">
            <Navigation size={16} color="var(--primary)"/>
            <span>Every {route.frequency} mins</span>
          </div>
        </div>
      </div>

      <div className="stops-timeline">
        <h3 className="stops-title">Stops & Simulated Arrivals</h3>
        <div className="timeline-container">
          {route.stops.map((stop, index) => {
            // Calculate a deterministic simulated arrival time
            const arrivalTime = new Date(now.getTime() + stop.arrivalOffset * 60000);
            const timeStr = arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const isFirst = index === 0;
            const isLast = index === route.stops.length - 1;

            return (
              <div key={stop.id} className="timeline-item">
                <div className="timeline-left">
                  <div className="time">{timeStr}</div>
                </div>
                <div className="timeline-center">
                  <div className="line-segment"></div>
                  <div className={`node ${isFirst || isLast ? 'node-primary' : ''}`}></div>
                </div>
                <div className="timeline-right">
                  <div className="stop-name-time">{stop.name}</div>
                  <div className="stop-seq">Stop {stop.sequence}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="book-btn-container">
        <button className="btn btn-primary" onClick={handleBookTicket}>
          Book Ticket
        </button>
      </div>
    </div>
  );
};

export default RouteDetails;
