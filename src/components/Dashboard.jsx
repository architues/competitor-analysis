import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, PieChart, Activity, Download, Search } from 'lucide-react';
import { apiCall } from '../utils/api';
import ActivityFeed from './ActivityFeed';
import InsightCard from './InsightCard';
import ExportModal from './Share/ExportModal';
import '../styles/Dashboard.css';

const StatCard = ({ title, value, change, icon: Icon, color, isLoading }) => (
    <div className="stat-card">
        <div className="stat-header">
            <Icon size={16} color={color} />
            <span>{title}</span>
        </div>
        {isLoading ? (
            <div className="stat-value" style={{ color: 'var(--text-tertiary)' }}>...</div>
        ) : (
            <>
                <div className="stat-value">{value}</div>
                {change && (
                    <div className="stat-footer">
                        <span className={`stat-change ${change.startsWith('+') ? 'positive' : 'negative'}`}>
                            {change}
                        </span>
                        <span className="stat-period">vs last month</span>
                    </div>
                )}
            </>
        )}
    </div>
);

const Dashboard = ({ competitors }) => {
    const [showExport, setShowExport] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [stats, setStats] = useState(null);
    const [statsLoading, setStatsLoading] = useState(true);
    const [statsError, setStatsError] = useState(null);

    // Get recent searches from localStorage or use empty array
    const recentSearches = JSON.parse(localStorage.getItem("okayreport_recent_searches") || "[]");

    // Fetch dashboard stats from API
    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setStatsLoading(true);
            setStatsError(null);
            const data = await apiCall('/dashboard/stats', 'GET');
            setStats(data);
        } catch (err) {
            console.error('Failed to fetch dashboard stats:', err);
            setStatsError(err.message);
            // Set fallback stats so UI doesn't break
            setStats({
                total_competitors: competitors.length,
                avg_market_visibility: 0,
                industry_growth: 0,
                active_campaigns: 0
            });
        } finally {
            setStatsLoading(false);
        }
    };

    return (
        <div className="dashboard-container">
            {/* Top Row: Search & Actions */}
            <div className="dashboard-header-row">
                <div className="dashboard-search">
                    <Search className="search-icon" size={18} />
                    <input
                        type="text"
                        placeholder="Quick analysis: enter competitor or market..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

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
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                    }}
                >
                    <Download size={16} /> Export Report
                </button>
            </div>

            {statsError && (
                <div style={{
                    padding: '12px',
                    background: 'var(--red-50)',
                    border: '1px solid var(--red-200)',
                    borderRadius: '6px',
                    color: 'var(--red-700)',
                    fontSize: '0.875rem',
                    marginBottom: '16px'
                }}>
                    Failed to load stats: {statsError}. Showing fallback data.
                </div>
            )}

            <div className="stats-grid">
                <StatCard
                    title="Total Competitors"
                    value={stats?.total_competitors ?? competitors.length}
                    change={stats?.total_competitors_change}
                    icon={Users}
                    color="#3b82f6"
                    isLoading={statsLoading}
                />
                <StatCard
                    title="Avg Market Visibility"
                    value={stats?.avg_market_visibility ? `${stats.avg_market_visibility}%` : '0%'}
                    change={stats?.avg_market_visibility_change}
                    icon={PieChart}
                    color="#8b5cf6"
                    isLoading={statsLoading}
                />
                <StatCard
                    title="Industry Growth"
                    value={stats?.industry_growth ? `${stats.industry_growth}%` : '0%'}
                    change={stats?.industry_growth_change}
                    icon={TrendingUp}
                    color="#10b981"
                    isLoading={statsLoading}
                />
                <StatCard
                    title="Active Campaigns"
                    value={stats?.active_campaigns ?? 0}
                    change={stats?.active_campaigns_change}
                    icon={Activity}
                    color="#f59e0b"
                    isLoading={statsLoading}
                />
            </div>

            <div className="dashboard-grid">
                {/* Main Content Column */}
                <div className="dashboard-main-col">
                    {/* Removed AI Insights section - will be populated with real data later */}

                    <div className="panel top-competitors">
                        <div className="panel-header">
                            <h3 className="panel-title">Market Leaders</h3>
                        </div>
                        <div className="leaders-list">
                            {competitors.length === 0 ? (
                                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                    No competitors added yet
                                </div>
                            ) : (
                                competitors
                                    .sort((a, b) => (b.market_share || 0) - (a.market_share || 0))
                                    .slice(0, 5)
                                    .map(comp => (
                                        <div key={comp.id} className="leader-item">
                                            <div className="leader-info">
                                                <div className="leader-name">{comp.name}</div>
                                                {comp.website && (
                                                    <div className="leader-website" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                                        {comp.website}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="dashboard-sidebar-col">
                    {/* Recent Analyses Panel */}
                    <div className="panel recent-analyses-panel">
                        <div className="panel-header">
                            <h3 className="panel-title">Recent Analyses</h3>
                        </div>
                        <div className="recent-list-compact">
                            {recentSearches.map(item => (
                                <div key={item.id} className="recent-item-compact">
                                    <div className="recent-icon-bg">
                                        <Search size={14} />
                                    </div>
                                    <div className="recent-info">
                                        <span className="recent-name">{item.name}</span>
                                        <span className="recent-date">{item.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="activity-feed-panel">
                        <ActivityFeed />
                    </div>
                </div>
            </div >

            {showExport && (
                <ExportModal
                    data={{ competitors }}
                    onClose={() => setShowExport(false)}
                />
            )}
        </div >
    );
};

export default Dashboard;
