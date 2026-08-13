import { Settings, Bell, CircleDot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './TopBar.css';

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <header className="top-bar">
      <div className="logo-container" onClick={() => navigate('/')}>
        <div className="logo-icon">
          <CircleDot size={20} color="white" />
        </div>
        <span className="logo-text">MetroGo Delhi</span>
      </div>
      <div className="top-actions">
        <button className="icon-btn">
          <Bell size={22} />
        </button>
        <button className="icon-btn" onClick={() => navigate('/settings')}>
          <Settings size={22} />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
