import React, { useState } from 'react';
import { calculateInsights } from '../data/mockData';
import { TrendingUp, Users, PieChart, Activity, Download } from 'lucide-react';
import ActivityFeed from './ActivityFeed';
import InsightCard from './InsightCard';
import ExportModal from './Share/ExportModal';
import '../styles/Dashboard.css';

const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="stat-card">
        <div className="stat-header">
            <Icon size={16} color={color} />
            <span>{title}</span>
        </div>
        <div className="stat-value">{value}</div>
        <div className="stat-footer">
            <span className={`stat-change ${change.startsWith('+') ? 'positive' : 'negative'}`}>
                {change}
            </span>
            <span className="stat-period">vs last month</span>
        </div>
    </div>
);

const Dashboard = ({ competitors }) => {
    const insights = calculateInsights();
    const totalMarketShare = competitors.reduce((acc, curr) => acc + curr.marketShare, 0);
    const [showExport, setShowExport] = useState(false);

    return (
        <div className="dashboard-container">
            <div className="dashboard-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div></div>
                <button
                    className="export-report-btn"
                    onClick={() => setShowExport(true)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 12px',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '6px',
                        color: 'var(--text-secondary)',
                        fontSize: '0.85rem',
                        fontWeight: '500',
                        cursor: 'pointer'
                    }}
                >
                    <Download size={16} /> Export Report
                </button>
            </div>

            <div className="stats-grid">
                <StatCard
                    title="Total Competitors"
                    value={competitors.length}
                    change="+1"
                    icon={Users}
                    color="#3b82f6"
                />
                <StatCard
                    title="Avg Market Visibility"
                    value={`${Math.round(totalMarketShare / competitors.length)}%`}
                    change="+5%"
                    icon={PieChart}
                    color="#8b5cf6"
                />
                <StatCard
                    title="Industry Growth"
                    value="18%"
                    change="+2.4%"
                    icon={TrendingUp}
                    color="#10b981"
                />
                <StatCard
                    title="Active Campaigns"
                    value="12"
                    change="-3"
                    icon={Activity}
                    color="#f59e0b"
                />
            </div>

            <div className="dashboard-grid">
                <div className="panel recent-activity">
                    <div className="panel-header">
                        <h3 className="panel-title">AI Insights</h3>
                        <span className="badge-new">3 New</span>
                    </div>
                    <div className="insights-list" style={{ padding: '16px' }}>
                        {insights.map((insight) => (
                            <InsightCard key={insight.id} insight={insight} />
                        ))}
                    </div>
                </div>

                <div className="panel top-competitors">
                    <div className="panel-header">
                        <h3 className="panel-title">Market Leaders</h3>
                    </div>
                    <div className="leaders-list">
                        {competitors.sort((a, b) => b.marketShare - a.marketShare).map(comp => (
                            <div key={comp.id} className="leader-item">
                                <div className="leader-info">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <img src={comp.logo} alt={comp.name} className="leader-logo" />
                                        <span className="leader-name">{comp.name}</span>
                                    </div>
                                </div>
                                <div className="leader-share">
                                    <div className="share-bar-bg">
                                        <div
                                            className="share-bar-fill"
                                            style={{ width: `${comp.marketShare}%`, backgroundColor: comp.marketShare > 30 ? 'var(--blue-500)' : 'var(--violet-500)' }}
                                        ></div>
                                    </div>
                                    <span className="share-text">{comp.marketShare}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="activity-feed-panel">
                    <ActivityFeed />
                </div>
            </div>

            {showExport && (
                <ExportModal
                    data={{ competitors, insights }}
                    onClose={() => setShowExport(false)}
                />
            )}
        </div>
    );
};



export default Dashboard;
