import { NavLink } from 'react-router-dom';
import { Bus, Ticket, Zap, Map, HelpCircle } from 'lucide-react';
import './BottomNavigation.css';

const BottomNavigation = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Bus size={24} />
        <span>Bus</span>
      </NavLink>
      <NavLink to="/tickets" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Ticket size={24} />
        <span>Tickets</span>
      </NavLink>
      <NavLink to="/hub" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Zap size={24} />
        <span>Hub</span>
      </NavLink>
      <NavLink to="/trip-plan" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Map size={24} />
        <span>Trip Plan</span>
      </NavLink>
      <NavLink to="/help" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <HelpCircle size={24} />
        <span>Help</span>
      </NavLink>
    </nav>
  );
};

export default BottomNavigation;
