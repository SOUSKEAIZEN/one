import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './TopBar.css';

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <header className="top-bar">
      <div className="top-bar-left"></div>
      
      <div className="logo-container" onClick={() => navigate('/')}>
        {/* Custom SVG to replicate the 'ONE' Delhi logo */}
        <svg viewBox="0 0 100 40" className="one-logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold" fontFamily="sans-serif" letterSpacing="-1">ONE</text>
          <text x="50%" y="90%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="6" fontWeight="normal" fontFamily="sans-serif" letterSpacing="1">ONE DELHI ONE RIDE</text>
          {/* Decorative gear/circle elements for the O */}
          <circle cx="29" cy="22" r="10" stroke="white" strokeWidth="1.5" strokeDasharray="2 2" />
        </svg>
      </div>

      <div className="top-actions">
        <button className="icon-btn" onClick={() => navigate('/settings')}>
          <Settings size={24} color="white" />
        </button>
      </div>
    </header>
  );
};

export default TopBar;