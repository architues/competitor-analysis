import React, { useState } from 'react';
import { LayoutDashboard, Users, BarChart3, Settings, Lightbulb, PanelLeftClose, PanelLeftOpen, Search, Bell, Share2, MonitorPlay } from 'lucide-react';
import WorkspaceSwitcher from './WorkspaceSwitcher';
import AlertCenter from './Alerts/AlertCenter';
import ShareModal from './Share/ShareModal';
import PresentationMode from './Presentation/PresentationMode';
import { useCollaboration } from '../context/CollaborationContext';
import '../styles/Layout.css';

import { useNavigate } from 'react-router-dom';

const Layout = ({ children, currentView, onNavigate, onBack }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showAlerts, setShowAlerts] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showPresentation, setShowPresentation] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { unreadAlertCount } = useCollaboration();

  const handleLogout = () => {
    localStorage.removeItem('okayreport_token');
    localStorage.removeItem('okayreport_ws');
    navigate('/login');
  };

  const handleUserNavigate = (view) => {
    onNavigate(view);
    setShowUserMenu(false);
  };
  // ... (rest of code before the return)

  // ... inside JSX ...
  // Find the Log Out button and replace onClick:
  // ...
  <div className="dropdown-footer">
    <button
      className="dropdown-action"
      style={{ color: 'var(--red-500)' }}
      onClick={handleLogout}
    >
      <span>Log Out</span>
    </button>
  </div>
  // ...

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'competitors', label: 'Competitors', icon: Users },
    { id: 'analysis', label: 'Analysis', icon: BarChart3 },
    { id: 'insights', label: 'AI Insights', icon: Lightbulb },
    { id: 'feature-matrix', label: 'Feature Matrix', icon: Settings },
  ];

  const getPageTitle = () => {
    if (currentView.startsWith('settings')) return 'Settings';
    const item = navItems.find(i => i.id === currentView);
    return item ? item.label : 'Dashboard';
  };

  if (showPresentation) {
    return <PresentationMode onClose={() => setShowPresentation(false)} />;
  }

  return (
    <div className="layout-container">
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          {isSidebarOpen && (
            <div className="logo">
              <span className="logo-icon">⚡</span>
              <span className="logo-text">CompetitorAI</span>
            </div>
          )}
          <button className="toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${currentView === item.id ? 'active' : ''} `}
                onClick={() => onNavigate(item.id)}
              >
                <Icon size={18} />
                {isSidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
        <div className="sidebar-footer" style={{ padding: '8px', borderTop: '1px solid var(--border-subtle)', marginTop: 'auto' }}>
          <button
            className="nav-item"
            onClick={onBack}
          >
            <Search size={18} />
            {isSidebarOpen && <span>New Search</span>}
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-header">
          <div className="header-left">
            <h1 className="page-title">{getPageTitle()}</h1>
          </div>
          <div className="header-right">
            <WorkspaceSwitcher onNavigate={onNavigate} />

            <button
              className="presentation-btn"
              onClick={() => setShowPresentation(true)}
              title="Presentation Mode"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '6px',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              <MonitorPlay size={18} />
            </button>

            <button
              className="share-btn"
              onClick={() => setShowShare(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '6px',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              <Share2 size={16} />
              Share
            </button>

            <div style={{ position: 'relative' }}>
              <button
                className={`alert-bell ${showAlerts ? 'active' : ''}`}
                onClick={() => setShowAlerts(!showAlerts)}
              >
                <Bell size={18} />
                {unreadAlertCount > 0 && <span className="alert-badge">{unreadAlertCount}</span>}
              </button>
              {showAlerts && (
                <AlertCenter onClose={() => setShowAlerts(false)} />
              )}
            </div>

            <div className="user-profile" style={{ position: 'relative' }}>
              <div
                className="user-avatar"
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{ cursor: 'pointer' }}
              >
                DU
              </div>

              {showUserMenu && (
                <>
                  <div className="workspace-overlay" onClick={() => setShowUserMenu(false)} style={{ zIndex: 90 }} />
                  <div className="workspace-dropdown" style={{ right: 0, top: '100%', marginTop: '8px', width: '200px', zIndex: 100 }}>
                    <div className="dropdown-header">
                      <span className="dropdown-title">Demo User</span>
                    </div>
                    <div className="workspace-list">
                      <button className="workspace-item" onClick={() => handleUserNavigate('settings-profile')}>
                        <div className="workspace-item-info">Profile Settings</div>
                      </button>
                      <button className="workspace-item" onClick={() => handleUserNavigate('settings-billing')}>
                        <div className="workspace-item-info">Billing & Plans</div>
                      </button>
                    </div>
                    <div className="dropdown-footer">
                      <button
                        className="dropdown-action"
                        style={{ color: 'var(--red-500)' }}
                        onClick={handleLogout}
                      >
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>
        <div className="content-scroll">
          {children}
        </div>

        {showShare && (
          <ShareModal onClose={() => setShowShare(false)} />
        )}
      </main>
    </div>
  );
};

export default Layout;
