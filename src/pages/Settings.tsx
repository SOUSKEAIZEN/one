import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, Bell, MapPin, Moon, Shield, Info, Trash2 } from 'lucide-react';
import './Settings.css';

const Settings = () => {
  const navigate = useNavigate();

  const handleClearData = () => {
    if (window.confirm("Are you sure you want to clear all demo tickets and data?")) {
      localStorage.removeItem('metrogo_tickets');
      window.location.reload();
    }
  };

  return (
    <div className="page-container page-settings">
      <div className="route-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h2>Settings</h2>
      </div>

      <div className="settings-content">
        <div className="settings-group card">
          <div className="settings-item">
            <div className="s-icon"><Globe size={20} /></div>
            <div className="s-text">Language</div>
            <div className="s-val">English</div>
          </div>
          <div className="settings-item">
            <div className="s-icon"><Bell size={20} /></div>
            <div className="s-text">Notifications</div>
            <div className="s-val">On</div>
          </div>
          <div className="settings-item">
            <div className="s-icon"><MapPin size={20} /></div>
            <div className="s-text">Location Permission</div>
            <div className="s-val">While Using</div>
          </div>
          <div className="settings-item">
            <div className="s-icon"><Moon size={20} /></div>
            <div className="s-text">Theme</div>
            <div className="s-val">Light</div>
          </div>
        </div>

        <div className="settings-group card">
          <div className="settings-item">
            <div className="s-icon"><Info size={20} /></div>
            <div className="s-text">About MetroGo</div>
          </div>
          <div className="settings-item">
            <div className="s-icon"><Shield size={20} /></div>
            <div className="s-text">Privacy & Terms</div>
          </div>
        </div>

        <button className="btn btn-outline btn-clear-data" onClick={handleClearData}>
          <Trash2 size={18} className="mr-2" /> Clear Demo Data
        </button>

        <div className="demo-disclaimer mt-6">
          <p><strong>DISCLAIMER</strong></p>
          <p>This is an independent demonstration prototype and is not affiliated with any transport authority.</p>
          <p>App Version: 1.0.0 (Demo)</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
