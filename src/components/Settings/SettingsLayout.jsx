import React from 'react';
import { User, Building, CreditCard, Bell } from 'lucide-react';
import { useCollaboration } from '../../context/CollaborationContext';
import ProfileSettings from './ProfileSettings';
import WorkspaceSettings from './WorkspaceSettings';
import BillingSettings from './BillingSettings';
import '../../styles/Settings.css';

const SettingsLayout = ({ activeTab = 'profile', onTabChange }) => {
    const { currentUser } = useCollaboration();

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return <ProfileSettings />;
            case 'workspace':
                return <WorkspaceSettings />;
            case 'billing':
                return <BillingSettings />;
            default:
                return <ProfileSettings />;
        }
    };

    const getTitle = () => {
        switch (activeTab) {
            case 'profile': return 'My Profile';
            case 'workspace': return 'Workspace Settings';
            case 'billing': return 'Billing & Usage';
            default: return 'Settings';
        }
    };

    return (
        <div className="settings-container">
            <div className="settings-sidebar">
                <button
                    className={`settings-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => onTabChange('profile')}
                >
                    <User size={18} /> Profile
                </button>
                <button
                    className={`settings-nav-item ${activeTab === 'workspace' ? 'active' : ''}`}
                    onClick={() => onTabChange('workspace')}
                >
                    <Building size={18} /> Workspace
                </button>
                <button
                    className={`settings-nav-item ${activeTab === 'billing' ? 'active' : ''}`}
                    onClick={() => onTabChange('billing')}
                >
                    <CreditCard size={18} /> Billing
                </button>
            </div>

            <div className="settings-content">
                <div className="settings-header">
                    <h2 className="settings-title">{getTitle()}</h2>
                    <p className="settings-subtitle">Manage your account settings and preferences.</p>
                </div>

                {renderContent()}
            </div>
        </div>
    );
};

export default SettingsLayout;
