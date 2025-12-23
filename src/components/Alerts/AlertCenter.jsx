import React, { useState } from 'react';
import { useCollaboration } from '../../context/CollaborationContext';
import { Bell, Plus, Trash2, Check, AlertTriangle, Info, X } from 'lucide-react';
import '../../styles/AlertCenter.css';

const AlertCenter = ({ onClose }) => {
    const { alerts, alertRules, addAlert, markAlertRead } = useCollaboration();
    const [activeTab, setActiveTab] = useState('notifications');
    const [newRule, setNewRule] = useState({
        metric: 'price',
        condition: 'drops_below',
        value: '',
        competitor: 'all'
    });

    const handleCreateRule = (e) => {
        e.preventDefault();
        // In a real app, this would save to backend. 
        // Here we'll just simulate creating an alert immediately for demonstration
        addAlert({
            title: `Alert Created: ${newRule.metric} ${newRule.condition} ${newRule.value}`,
            description: `Monitoring started for ${newRule.competitor === 'all' ? 'all competitors' : newRule.competitor}`,
            severity: 'info',
            type: 'system'
        });
        // Reset form
        setNewRule({ metric: 'price', condition: 'drops_below', value: '', competitor: 'all' });
        setActiveTab('notifications');
    };

    const NotificationItem = ({ alert }) => (
        <div className={`alert-item ${alert.read ? 'read' : 'unread'} ${alert.severity}`}>
            <div className="alert-icon">
                {alert.severity === 'high' ? <AlertTriangle size={16} /> :
                    alert.severity === 'info' ? <Info size={16} /> : <Bell size={16} />}
            </div>
            <div className="alert-content">
                <div className="alert-header">
                    <span className="alert-title">{alert.title}</span>
                    <span className="alert-time">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                </div>
                <p className="alert-desc">{alert.description}</p>
                {!alert.read && (
                    <button className="mark-read-btn" onClick={() => markAlertRead(alert.id)}>
                        <Check size={12} /> Mark read
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div className="alert-center-overlay">
            <div className="alert-center-panel">
                <div className="panel-top-bar">
                    <h3 className="panel-heading">Notifications</h3>
                    <button className="close-panel-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="alert-tabs">
                    <button
                        className={`alert-tab ${activeTab === 'notifications' ? 'active' : ''}`}
                        onClick={() => setActiveTab('notifications')}
                    >
                        Alerts
                        {alerts.filter(a => !a.read).length > 0 && (
                            <span className="tab-badge">{alerts.filter(a => !a.read).length}</span>
                        )}
                    </button>
                    <button
                        className={`alert-tab ${activeTab === 'rules' ? 'active' : ''}`}
                        onClick={() => setActiveTab('rules')}
                    >
                        Rules
                    </button>
                </div>

                <div className="alert-body">
                    {activeTab === 'notifications' ? (
                        <div className="notifications-list">
                            {alerts.length === 0 ? (
                                <div className="empty-alerts">
                                    <Bell size={32} />
                                    <p>No notifications yet</p>
                                </div>
                            ) : (
                                alerts.map(alert => (
                                    <NotificationItem key={alert.id} alert={alert} />
                                ))
                            )}
                        </div>
                    ) : (
                        <div className="rules-section">
                            <div className="create-rule-card">
                                <h4>Create New Alert Rule</h4>
                                <form onSubmit={handleCreateRule}>
                                    <div className="form-group">
                                        <label>When</label>
                                        <select
                                            value={newRule.competitor}
                                            onChange={e => setNewRule({ ...newRule, competitor: e.target.value })}
                                        >
                                            <option value="all">Any Competitor</option>
                                            <option value="TechNova">TechNova</option>
                                            <option value="DataFlow">DataFlow</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Metric</label>
                                        <select
                                            value={newRule.metric}
                                            onChange={e => setNewRule({ ...newRule, metric: e.target.value })}
                                        >
                                            <option value="price">Price</option>
                                            <option value="market_share">Market Share</option>
                                            <option value="sentiment">Sentiment Score</option>
                                        </select>
                                    </div>

                                    <div className="form-row">
                                        <select
                                            className="condition-select"
                                            value={newRule.condition}
                                            onChange={e => setNewRule({ ...newRule, condition: e.target.value })}
                                        >
                                            <option value="drops_below">Drops below</option>
                                            <option value="increases_by">Increases by</option>
                                            <option value="decreases_by">Decreases by</option>
                                        </select>
                                        <input
                                            type="text"
                                            placeholder="Value"
                                            value={newRule.value}
                                            onChange={e => setNewRule({ ...newRule, value: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="create-rule-btn">
                                        <Plus size={16} /> Create Rule
                                    </button>
                                </form>
                            </div>

                            <div className="active-rules-list">
                                <h4>Active Rules (Simulated)</h4>
                                <div className="rule-item">
                                    <div className="rule-info">
                                        <span className="rule-desc">Market Share drops below 10%</span>
                                        <span className="rule-target">All Competitors</span>
                                    </div>
                                    <button className="delete-rule-btn"><Trash2 size={14} /></button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AlertCenter;
