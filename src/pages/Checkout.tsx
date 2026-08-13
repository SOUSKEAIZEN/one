import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getFareDetails } from '../data/fares';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { 
    selectedRoute, 
    selectedSource, 
    selectedDestination, 
    selectedBusType, 
    ticketQuantity,
    addTicket 
  } = useAppContext();

  useEffect(() => {
    if (!selectedRoute || !selectedSource || !selectedDestination) {
      navigate('/');
    }
  }, [selectedRoute, selectedSource, selectedDestination, navigate]);

  if (!selectedRoute || !selectedSource || !selectedDestination) return null;

  const fare = getFareDetails(selectedSource.sequence, selectedDestination.sequence, selectedBusType, ticketQuantity);

  const handleConfirmPurchase = () => {
    // Generate synthetic Ticket ID
    const generateId = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return `MG-${new Date().toISOString().slice(0,10).replace(/-/g, '')}-${result}`;
    };
    
    const ticketId = generateId();
    const purchaseTime = Date.now();
    const expiresAt = purchaseTime + 90 * 60 * 1000; // 90 minutes

    const qrPayload = `DEMO|${ticketId}|${selectedRoute.routeNumber}|${selectedSource.name.replace(/\s+/g, '-').toUpperCase()}|${selectedDestination.name.replace(/\s+/g, '-').toUpperCase()}|${selectedBusType}`;

    const newTicket = {
      id: ticketId,
      routeId: selectedRoute.id,
      routeNumber: selectedRoute.routeNumber,
      fromStop: selectedSource.name,
      toStop: selectedDestination.name,
      busType: selectedBusType,
      ticketsCount: ticketQuantity,
      farePaid: fare.discounted,
      purchaseTime,
      expiresAt,
      qrPayload
    };

    addTicket(newTicket);
    navigate(`/ticket/${ticketId}`, { replace: true });
  };

  return (
    <div className="page-container page-checkout">
      <div className="route-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h2>Demo Payment</h2>
      </div>

      <div className="checkout-content">
        <div className="secure-badge">
          <ShieldCheck size={24} color="var(--success)" />
          <span>Secure Demo Environment</span>
        </div>

        <div className="checkout-summary card">
          <h3>Booking Summary</h3>
          
          <div className="summary-row">
            <span className="summary-label">Route</span>
            <span className="summary-value font-bold">{selectedRoute.routeNumber}</span>
          </div>
          
          <div className="summary-row">
            <span className="summary-label">From</span>
            <span className="summary-value text-right">{selectedSource.name}</span>
          </div>
          
          <div className="summary-row">
            <span className="summary-label">To</span>
            <span className="summary-value text-right">{selectedDestination.name}</span>
          </div>
          
          <div className="summary-row">
            <span className="summary-label">Bus Type</span>
            <span className="summary-value">{selectedBusType === 'AC' ? 'AC' : 'Non-AC'}</span>
          </div>
          
          <div className="summary-row">
            <span className="summary-label">Tickets</span>
            <span className="summary-value">{ticketQuantity}</span>
          </div>
          
          <div className="summary-divider"></div>
          
          <div className="summary-row total-row">
            <span className="summary-label">Total Amount</span>
            <span className="summary-value total-amount">₹{fare.discounted.toFixed(2)}</span>
          </div>
        </div>

        <div className="demo-warning-card">
          <p>This is a simulated payment gateway. No real money will be deducted.</p>
        </div>

        <button className="btn btn-primary btn-large btn-pay" onClick={handleConfirmPurchase}>
          <CreditCard size={20} className="mr-2" />
          Confirm Demo Purchase
        </button>
      </div>
    </div>
  );
};

export default Checkout;
