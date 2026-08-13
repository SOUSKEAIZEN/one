import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getFareDetails } from '../data/fares';
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
  const [timeLeft, setTimeLeft] = useState(178); // 02:58 in seconds

  useEffect(() => {
    if (!selectedRoute) {
      navigate('/');
    }
  }, [selectedRoute, navigate]);

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

  const handleSourceChange = (id: string) => {
    const stop = selectedRoute.stops.find(s => s.id === id);
    setSelectedSource(stop || null);
    if (stop && selectedDestination && selectedDestination.sequence <= stop.sequence) {
      setSelectedDestination(null);
    }
  };

  const handleDestinationChange = (id: string) => {
    const stop = selectedRoute.stops.find(s => s.id === id);
    setSelectedDestination(stop || null);
  };

  const canProceed = selectedSource && selectedDestination;
  const formatFare = (num: number) => num.toFixed(1);

  // Custom SVGs matching the app
  const RouteIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="bwc-icon" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 7V13C8 15.2091 9.79086 17 12 17h0c2.2091 0 4-1.7909 4-4V7" stroke="black" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="8" cy="5" r="2" fill="black"/><circle cx="16" cy="5" r="2" fill="black"/>
    </svg>
  );

  const DotIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" className="bwc-icon">
      <circle cx="12" cy="12" r="5" fill="black" />
    </svg>
  );

  const PinIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="black" className="bwc-icon" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" />
    </svg>
  );

  const StopSelector = ({ icon, placeholder, value, onChange, options, disabled }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredOptions = options.filter((opt: any) => 
      opt.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const displayValue = options.find((o: any) => o.id === value)?.name || '';

    return (
      <div className={`bwc-input-box ${isOpen ? 'focused' : ''} ${disabled ? 'disabled' : ''}`}>
        {icon}
        <input 
          type="text"
          className="bwc-custom-input"
          placeholder={placeholder}
          value={isOpen ? searchTerm : displayValue}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            if (disabled) return;
            setIsOpen(true);
            setSearchTerm('');
          }}
          onBlur={() => setTimeout(() => { setIsOpen(false); setSearchTerm(''); }, 200)}
          disabled={disabled}
        />
        {isOpen && (
          <div className="bwc-dropdown">
            {filteredOptions.map((opt: any) => (
              <div 
                key={opt.id} 
                className="bwc-dropdown-item"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onChange(opt.id);
                  setIsOpen(false);
                }}
              >
                {opt.name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="page-buy">
      <div className="buy-header">
        <button className="buy-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} color="white" />
        </button>
        <div className="buy-title">Buy tickets</div>
      </div>

      <div className="buy-timer-container">
        <div className="buy-timer-pill">
          Pay within {formatTime(timeLeft)}
        </div>
      </div>

      <div className="buy-card-container">
        <div className="buy-white-card">
          <div className="bwc-section-title">Route Info</div>
          <div className="bwc-input-box">
            <RouteIcon />
            <input 
              type="text" 
              className="bwc-custom-input" 
              value={`${selectedRoute.routeNumber}-${selectedRoute.direction}`}
              readOnly
            />
          </div>

          <div className="bwc-section-title" style={{ marginTop: '20px' }}>From - To</div>
          
          <StopSelector
            icon={<DotIcon />}
            placeholder="Source Stop"
            value={selectedSource?.id || ''}
            onChange={handleSourceChange}
            options={selectedRoute.stops}
          />
          
          <div style={{ marginTop: '12px' }}>
            <StopSelector
              icon={<PinIcon />}
              placeholder="Destination Stop"
              value={selectedDestination?.id || ''}
              onChange={handleDestinationChange}
              options={validDestinations}
              disabled={!selectedSource}
            />
          </div>

          <div className="bwc-section-title" style={{ marginTop: '24px' }}>Bus Type</div>
          <div className="bwc-bus-type-container">
            <button 
              className={`bwc-bt-btn ${selectedBusType === 'AC' ? 'active-ac' : ''}`}
              onClick={() => setSelectedBusType('AC')}
              disabled={selectedRoute.busType === 'NON_AC'}
            >
              AC
            </button>
            <button 
              className={`bwc-bt-btn ${selectedBusType === 'NON_AC' ? 'active-nonac' : ''}`}
              onClick={() => setSelectedBusType('NON_AC')}
            >
              Non-AC
            </button>
          </div>
        </div>
      </div>
      
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
            {canProceed && (
              <>
                <span className="bbs-price-old">₹{formatFare(fare.original)}</span>
                <span className="bbs-price-new">₹{formatFare(fare.discounted)}</span>
              </>
            )}
          </div>
          {canProceed && fare.discountPercent > 0 && (
            <div className="bbs-discount-badge">
              {fare.discountPercent.toFixed(1)}% off
            </div>
          )}
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