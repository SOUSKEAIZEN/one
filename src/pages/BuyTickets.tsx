import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getFareDetails } from '../data/fares';
import { Stop } from '../data/types';
import './BuyTickets.css';

const BuyTickets = () => {
  const navigate = useNavigate();
  const { 
    selectedRoute, 
    selectedSource, 
    setSelectedSource, 
    selectedDestination, 
    setSelectedDestination,
    selectedBusType,
    setSelectedBusType,
    ticketQuantity,
    setTicketQuantity
  } = useAppContext();

  const [fare, setFare] = useState({ original: 0, discounted: 0, discountPercent: 0 });

  useEffect(() => {
    if (!selectedRoute) {
      navigate('/');
    }
  }, [selectedRoute, navigate]);

  useEffect(() => {
    if (selectedSource && selectedDestination) {
      const idx1 = selectedSource.sequence;
      const idx2 = selectedDestination.sequence;
      const fareInfo = getFareDetails(idx1, idx2, selectedBusType, ticketQuantity);
      setFare(fareInfo);
    } else {
      setFare({ original: 0, discounted: 0, discountPercent: 0 });
    }
  }, [selectedSource, selectedDestination, selectedBusType, ticketQuantity]);

  if (!selectedRoute) return null;

  const validDestinations = selectedSource 
    ? selectedRoute.stops.filter(s => s.sequence > selectedSource.sequence)
    : selectedRoute.stops;

  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stop = selectedRoute.stops.find(s => s.id === e.target.value);
    setSelectedSource(stop || null);
    // Reset destination if it's now invalid (before or same as new source)
    if (stop && selectedDestination && selectedDestination.sequence <= stop.sequence) {
      setSelectedDestination(null);
    }
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stop = selectedRoute.stops.find(s => s.id === e.target.value);
    setSelectedDestination(stop || null);
  };

  const canProceed = selectedSource && selectedDestination;

  return (
    <div className="page-container page-buy">
      <div className="route-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h2>Buy Tickets</h2>
      </div>

      <div className="buy-content">
        <div className="route-summary-card card">
          <div className="route-summary-top">
            <span className="route-num">{selectedRoute.routeNumber}</span>
            <span className="route-dir">{selectedRoute.direction}</span>
          </div>
          
          <div className="form-group">
            <label className="input-label">Starting Stop</label>
            <div className="select-wrapper">
              <select 
                className="input-field select-field" 
                value={selectedSource?.id || ''} 
                onChange={handleSourceChange}
              >
                <option value="" disabled>Select Starting Stop</option>
                {selectedRoute.stops.map(stop => (
                  <option key={stop.id} value={stop.id}>{stop.name}</option>
                ))}
              </select>
              <ChevronDown className="select-icon" size={20} />
            </div>
          </div>

          <div className="form-group">
            <label className="input-label">Destination Stop</label>
            <div className="select-wrapper">
              <select 
                className="input-field select-field" 
                value={selectedDestination?.id || ''} 
                onChange={handleDestinationChange}
                disabled={!selectedSource}
              >
                <option value="" disabled>Select Destination</option>
                {validDestinations.map(stop => (
                  <option key={stop.id} value={stop.id}>{stop.name}</option>
                ))}
              </select>
              <ChevronDown className="select-icon" size={20} />
            </div>
          </div>
        </div>

        <div className="card">
          <label className="input-label">Bus Type</label>
          <div className="segmented-control">
            <button 
              className={`segment-btn ${selectedBusType === 'NON_AC' ? 'active' : ''}`}
              onClick={() => setSelectedBusType('NON_AC')}
            >
              Non-AC
            </button>
            <button 
              className={`segment-btn ${selectedBusType === 'AC' ? 'active' : ''}`}
              onClick={() => setSelectedBusType('AC')}
              disabled={selectedRoute.busType === 'NON_AC'}
            >
              AC
            </button>
          </div>
        </div>

        <div className="card">
          <label className="input-label">Number of Tickets</label>
          <div className="segmented-control tickets-qty">
            {[1, 2, 3].map(qty => (
              <button 
                key={qty}
                className={`segment-btn ${ticketQuantity === qty ? 'active' : ''}`}
                onClick={() => setTicketQuantity(qty)}
              >
                {qty}
              </button>
            ))}
          </div>
        </div>

        {canProceed && (
          <div className="fare-breakdown-card card">
            <div className="fare-row">
              <span className="fare-label">Amount Payable</span>
              <span className="fare-original">₹{fare.original.toFixed(1)}</span>
            </div>
            <div className="fare-row discount-row">
              <span className="fare-discount-badge">{fare.discountPercent}% OFF</span>
              <span className="fare-discounted">₹{fare.discounted.toFixed(1)}</span>
            </div>
          </div>
        )}

      </div>
      
      <div className="bottom-action-bar">
        <button 
          className="btn btn-primary btn-large" 
          disabled={!canProceed}
          onClick={() => navigate('/checkout')}
        >
          BUY DEMO TICKET
        </button>
      </div>
    </div>
  );
};

export default BuyTickets;
