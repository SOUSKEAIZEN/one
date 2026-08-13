import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getFareDetails } from '../data/fares';
import { ALL_ROUTES } from '../data/routes';
import './BuyTickets.css';

// Custom Icons
const RouteIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="bwc-icon" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 7V13C8 15.2091 9.79086 17 12 17h0c2.2091 0 4-1.7909 4-4V7" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="8" cy="5" r="2" fill="black"/><circle cx="16" cy="5" r="2" fill="black"/>
  </svg>
);

const DotIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" className="bwc-icon">
    <circle cx="12" cy="12" r="5" fill="black" />
  </svg>
);

const PinIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="black" className="bwc-icon" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" />
  </svg>
);

const BuyTickets = () => {
  const navigate = useNavigate();
  const { 
    selectedRoute, 
    setSelectedRoute,
    selectedSource, 
    setSelectedSource, 
    selectedDestination, 
    setSelectedDestination,
    selectedBusType,
    setSelectedBusType,
    ticketQuantity,
    setTicketQuantity
  } = useAppContext();

  const [fare, setFare] = useState({ original: 0, discounted: 0, discountPercent: 10 });
  const [timeLeft, setTimeLeft] = useState(170); // 02:50 timer

  // Default to first route if none selected
  useEffect(() => {
    if (!selectedRoute && ALL_ROUTES.length > 0) {
      setSelectedRoute(ALL_ROUTES[0]);
    }
  }, [selectedRoute, setSelectedRoute]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Recalculate Fare dynamically using strict pricing rules
  useEffect(() => {
    if (selectedSource && selectedDestination) {
      const fareInfo = getFareDetails(selectedRoute.routeNumber, selectedBusType, ticketQuantity);
      setFare(fareInfo);
    }
  }, [selectedRoute, selectedBusType, ticketQuantity]);

  if (!selectedRoute) return null;

  // Filter destination stops to only show stops after the selected source stop
  const validDestinations = selectedSource 
    ? selectedRoute.stops.filter(s => s.sequence > selectedSource.sequence)
    : selectedRoute.stops;

  const handleRouteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const route = ALL_ROUTES.find(r => r.id === e.target.value);
    if (route) {
      setSelectedRoute(route);
      setSelectedSource(null);
      setSelectedDestination(null);
    }
  };

  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stop = selectedRoute.stops.find(s => s.id === e.target.value);
    setSelectedSource(stop || null);
    if (stop && selectedDestination && selectedDestination.sequence <= stop.sequence) {
      setSelectedDestination(null);
    }
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stop = selectedRoute.stops.find(s => s.id === e.target.value);
    setSelectedDestination(stop || null);
  };

  const canProceed = selectedSource && selectedDestination;
  const formatFare = (num: number) => num.toFixed(1);

  return (
    <div className="page-buy">
      <div className="buy-header">
        <button className="buy-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} color="white" />
        </button>
        <div className="buy-title">Buy tickets</div>
      </div>

      <div className="buy-timer-container">
        <div className="buy-timer-pill">Pay within {formatTime(timeLeft)}</div>
      </div>

      <div className="buy-card-container">
        <div className="buy-white-card">
          {/* Route Selector */}
          <div className="bwc-section-title">Route Info</div>
          <div className="bwc-input-box">
            <RouteIcon />
            <select 
              className="bwc-select" 
              value={selectedRoute.id} 
              onChange={handleRouteChange}
            >
              {ALL_ROUTES.map(r => (
                <option key={r.id} value={r.id}>
                  {r.routeNumber} - {r.direction}
                </option>
              ))}
            </select>
          </div>

          <div className="bwc-section-title" style={{ marginTop: '20px' }}>From - To</div>
          
          {/* Source Stop Selector */}
          <div className="bwc-input-box">
            <DotIcon />
            <select 
              className="bwc-select" 
              value={selectedSource?.id || ''} 
              onChange={handleSourceChange}
            >
              <option value="" disabled hidden>Source Stop</option>
              {selectedRoute.stops.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          
          {/* Destination Stop Selector */}
          <div className="bwc-input-box" style={{ marginTop: '12px' }}>
            <PinIcon />
            <select 
              className="bwc-select" 
              value={selectedDestination?.id || ''} 
              onChange={handleDestinationChange}
              disabled={!selectedSource}
            >
              <option value="" disabled hidden>
                {!selectedSource ? 'Select Source First' : 'Destination Stop'}
              </option>
              {validDestinations.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* AC / Non-AC Toggles */}
          <div className="bwc-section-title" style={{ marginTop: '24px' }}>Bus Type</div>
          <div className="bwc-bus-type-container">
            <button 
              type="button"
              className={`bwc-bt-btn ${selectedBusType === 'AC' ? 'active-ac' : ''}`}
              onClick={() => setSelectedBusType('AC')}
            >
              AC
            </button>
            <button 
              type="button"
              className={`bwc-bt-btn ${selectedBusType === 'NON_AC' ? 'active-nonac' : ''}`}
              onClick={() => setSelectedBusType('NON_AC')}
            >
              Non-AC
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom Action Sheet */}
      <div className="buy-bottom-sheet">
        <div className="bbs-section-title">Number of tickets</div>
        <div className="bbs-qty-toggles">
          {[1, 2, 3].map(qty => (
            <button 
              key={qty}
              className={`bbs-qty-btn ${ticketQuantity === qty ? 'active' : ''}`}
              onClick={() => setTicketQuantity(qty)}
            >
              {qty}
            </button>
          ))}
        </div>

        <div className="bbs-section-title">Amount Payable</div>
        <div className="bbs-price-row">
          <div className="bbs-price-left">
            <span className="bbs-price-old">₹{formatFare(fare.original)}</span>
            <span className="bbs-price-new">₹{formatFare(fare.discounted)}</span>
          </div>
          <div className="bbs-discount-badge">
            10.0% off
          </div>
        </div>

        <div className="bbs-buy-action-row">
          <button 
            className="bbs-buy-btn" 
            disabled={!canProceed}
            onClick={() => navigate('/checkout')}
          >
            BUY
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyTickets;