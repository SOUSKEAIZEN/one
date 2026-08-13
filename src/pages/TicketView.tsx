import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useAppContext } from '../context/AppContext';
import './TicketView.css';

const TicketView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tickets } = useAppContext();
  
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [isExpired, setIsExpired] = useState(false);

  const ticket = tickets.find(t => t.id === id);

  useEffect(() => {
    if (!ticket) return;

    const updateTimer = () => {
      const now = Date.now();
      const diff = ticket.expiresAt - now;

      if (diff <= 0) {
        setIsExpired(true);
        setTimeLeft('00:00:00');
        return;
      }

      setIsExpired(false);
      
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      const format = (val: number) => val.toString().padStart(2, '0');
      setTimeLeft(`${format(h)}:${format(m)}:${format(s)}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [ticket]);

  if (!ticket) {
    return (
      <div className="page-container page-ticket-view">
        <div className="route-header">
          <button className="back-btn" onClick={() => navigate('/tickets')}>
            <ArrowLeft size={24} />
          </button>
          <h2>Ticket Details</h2>
        </div>
        <div className="ticket-view-content flex flex-col items-center justify-center mt-12" style={{ textAlign: 'center' }}>
          <div style={{ margin: '32px 0', color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: '18px', fontWeight: 600 }}>Ticket Unavailable</p>
            <p style={{ marginTop: '8px' }}>This ticket has expired and been automatically deleted, or it does not exist.</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Book a New Ticket
          </button>
        </div>
      </div>
    );
  }

  const formatDateTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + 
           ' | ' + 
           d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="page-container page-ticket-view">
      <div className="route-header">
        <button className="back-btn" onClick={() => navigate('/tickets')}>
          <ArrowLeft size={24} />
        </button>
        <h2>Ticket Details</h2>
      </div>

      <div className="ticket-view-content">
        <div className={`ticket-card ${isExpired ? 'expired' : 'valid'}`}>
          <div className="ticket-brand">
            <h3>MetroGo Delhi</h3>
            <div className="demo-warning-ticket">DEMO TICKET — NOT VALID FOR TRAVEL</div>
          </div>
          
          <div className="ticket-status-bar">
            {isExpired ? 'EXPIRED DEMO' : 'VALID DEMO'}
          </div>

          <div className="ticket-details">
            <div className="t-row t-route">
              <span>Route:</span>
              <span className="font-bold">{ticket.routeNumber}</span>
            </div>
            <div className="t-row t-path">
              <span>From:</span>
              <span className="font-bold text-right">{ticket.fromStop}</span>
            </div>
            <div className="t-row t-path">
              <span>To:</span>
              <span className="font-bold text-right">{ticket.toStop}</span>
            </div>
            
            <div className="t-row">
              <span>Bus Type:</span>
              <span className="font-bold">{ticket.busType}</span>
            </div>
            <div className="t-row">
              <span>Tickets:</span>
              <span className="font-bold">{ticket.ticketsCount}</span>
            </div>
            <div className="t-row">
              <span>Fare:</span>
              <span className="font-bold">₹{ticket.farePaid.toFixed(2)}</span>
            </div>

            <div className="t-divider"></div>

            <div className="t-row t-time">
              <span>Booking time:</span>
              <span>{formatDateTime(ticket.purchaseTime)}</span>
            </div>
            <div className="t-row t-time">
              <span>Valid until:</span>
              <span>{formatDateTime(ticket.expiresAt)}</span>
            </div>
            
            <div className="t-row t-id">
              <span>Ticket ID:</span>
              <span>{ticket.id}</span>
            </div>
          </div>

          <div className="ticket-qr-section">
            {!isExpired ? (
              <>
                <div className="qr-container">
                  <QRCodeSVG value={ticket.qrPayload} size={150} level="M" includeMargin={false} />
                </div>
                <div className="timer-display">
                  Valid for <span>{timeLeft}</span>
                </div>
              </>
            ) : (
              <div className="expired-qr-placeholder">
                <RefreshCw size={32} className="mb-2 opacity-50" />
                <p>QR Code Expired</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketView;
