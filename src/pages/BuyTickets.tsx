import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Circle, MapPin, GitCommit } from 'lucide-react';
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
  const [timeLeft, setTimeLeft] = useState(157); // 02:37 in seconds

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

  const StopSelector = ({ 
    icon, 
    placeholder, 
    value, 
    onChange, 
    options, 
    disabled 
  }: { 
    icon: React.ReactNode, 
    placeholder: string, 
    value: string, 
    onChange: (id: string) => void, 
    options: {id: string, name: string}[],
    disabled?: boolean
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredOptions = options.filter(opt => 
      opt.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const displayValue = options.find(o => o.id === value)?.name || '';

    return (
      <div className={`bwc-input-box ${isOpen ? 'focused' : ''} ${disabled ? 'disabled' : ''}`} style={{ position: 'relative' }}>
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
            setSearchTerm(''); // Clear to show all/search new
          }}
          onBlur={() => {
            // Using a slightly longer timeout in case onMouseDown doesn't fire on some mobile browsers
            setTimeout(() => {
              setIsOpen(false);
              setSearchTerm('');
            }, 250);
          }}
          disabled={disabled}
        />
        {isOpen && (
          <div className="bwc-dropdown">
            {filteredOptions.length > 0 ? (
              filteredOptions.map(opt => (
                <div 
                  key={opt.id} 
                  className="bwc-dropdown-item"
                  onMouseDown={(e) => {
                    e.preventDefault(); // Prevent input onBlur from firing first
                    onChange(opt.id);
                    setIsOpen(false);
                  }}
                  onClick={() => {
                    onChange(opt.id);
                    setIsOpen(false);
                  }}
                >
                  {opt.name}
                </div>
              ))
            ) : (
              <div className="bwc-dropdown-item" style={{ color: 'var(--text-secondary)' }}>No stops found</div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="page-buy">
      <div className="buy-header">
        <button className="buy-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
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
            <GitCommit size={20} className="bwc-icon" style={{ transform: 'rotate(90deg)' }} />
            <div className="bwc-text">
              {selectedRoute.routeNumber}-{selectedRoute.direction.substring(0, 30)}
            </div>
          </div>

          <div className="bwc-section-title" style={{ marginTop: '20px' }}>From - To</div>
          
          <StopSelector
            icon={<Circle size={16} fill="black" className="bwc-icon" />}
            placeholder="Starting Stop"
            value={selectedSource?.id || ''}
            onChange={(id) => handleSourceChange({ target: { value: id } } as any)}
            options={selectedRoute.stops}
          />
          
          <div style={{ marginTop: '8px' }}>
            <StopSelector
              icon={<MapPin size={20} fill="black" stroke="white" strokeWidth={1} className="bwc-icon" />}
              placeholder="Destination Stop"
              value={selectedDestination?.id || ''}
              onChange={(id) => handleDestinationChange({ target: { value: id } } as any)}
              options={validDestinations}
              disabled={!selectedSource}
            />
          </div>

          <div className="bwc-section-title" style={{ marginTop: '20px' }}>Bus Type</div>
          <div className="bwc-bus-type-toggles">
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
            <span className="bbs-price-old">₹{formatFare(fare.original)}</span>
            <span className="bbs-price-new" style={{ color: selectedBusType === 'AC' ? '#D32F2F' : '#F44336' }}>
              ₹{formatFare(fare.discounted)}
            </span>
          </div>
          <div className="bbs-discount-badge">
            {fare.discountPercent.toFixed(1)}% off
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
