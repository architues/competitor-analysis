import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertCircle, Lightbulb, MessageSquare } from 'lucide-react';
import QuadrantChart from './QuadrantChart';
import MarketShareChart from './MarketShareChart';
import PerformanceBenchmark from './PerformanceBenchmark';
import PricingIntelligence from './PricingIntelligence';
import WinLossTracker from './WinLossTracker';
import CommentThread from './Comments/CommentThread';
import { useCollaboration } from '../context/CollaborationContext';
import '../styles/Analysis.css';

const CommentButton = ({ onClick, count }) => (
    <button
        className="comment-trigger-btn"
        onClick={(e) => {
            e.stopPropagation();
            onClick();
        }}
        title="Discussion"
    >
        <MessageSquare size={16} />
        {count > 0 && <span className="comment-count-badge">{count}</span>}
    </button>
);

const Analysis = ({ competitors }) => {
    const [selectedView, setSelectedView] = useState('overview');
    const [activeThread, setActiveThread] = useState(null);
    const { getComments } = useCollaboration();

    const channelData = [
        { name: 'SEO', ...competitors.reduce((acc, comp) => ({ ...acc, [comp.name]: comp.channels.seo }), {}) },
        { name: 'Social', ...competitors.reduce((acc, comp) => ({ ...acc, [comp.name]: comp.channels.social }), {}) },
        { name: 'Ads', ...competitors.reduce((acc, comp) => ({ ...acc, [comp.name]: comp.channels.ads }), {}) },
        { name: 'Email', ...competitors.reduce((acc, comp) => ({ ...acc, [comp.name]: comp.channels.email }), {}) },
    ];

    // Revenue trends for all competitors
    const revenueTrends = competitors[0].revenue.trends.map((_, idx) => {
        const dataPoint = { month: competitors[0].revenue.trends[idx].month };
        competitors.forEach(comp => {
            dataPoint[comp.name] = comp.revenue.trends[idx].value / 1000000; // Convert to millions
        });
        return dataPoint;
    });

    const colors = ['#3b82f6', '#8b5cf6', '#10b981'];

    // Generate strategic insights
    const insights = [
        {
            type: 'opportunity',
            title: 'DataFlow Price Drop Creating Opening',
            description: 'DataFlow\'s 20% price reduction may indicate market pressure. Consider competitive pricing strategy.',
            impact: 'High'
        },
        {
            type: 'threat',
            title: 'MetricMaster Declining Sentiment',
            description: 'MetricMaster showing declining review scores. Monitor for potential market share gains.',
            impact: 'Medium'
        },
        {
            type: 'insight',
            title: 'SEO Remains Dominant Channel',
            description: 'All competitors investing heavily in organic search. Maintain SEO leadership position.',
            impact: 'High'
        }
    ];

    const views = [
        { id: 'overview', label: 'Overview' },
        { id: 'market', label: 'Market Share' },
        { id: 'performance', label: 'Performance' },
        { id: 'pricing', label: 'Pricing' },
        { id: 'winloss', label: 'Win/Loss' },
        { id: 'positioning', label: 'Positioning' }
    ];

    const getCommentCount = (targetId) => {
        return getComments('analysis', targetId).length;
    };

    const openComments = (targetId, title) => {
        setActiveThread({
            targetType: 'analysis',
            targetId,
            title
        });
    };

    return (
        <div className="analysis-container">
            <div className="analysis-header">
                <div>
                    <h2 className="section-title">Competitive Analysis</h2>
                    <p className="section-subtitle">Comprehensive intelligence across market, performance, and strategy</p>
                </div>
            </div>

            <div className="analysis-tabs">
                {views.map(view => (
                    <button
                        key={view.id}
                        className={`analysis-tab ${selectedView === view.id ? 'active' : ''}`}
                        onClick={() => setSelectedView(view.id)}
                    >
                        {view.label}
                    </button>
                ))}
            </div>

            <div className="analysis-content">
                {selectedView === 'overview' && (
                    <div className="overview-grid">
                        {/* Strategic Insights */}
                        <div className="insights-panel panel">
                            <div className="panel-header-row">
                                <h3 className="panel-title">Strategic Insights</h3>
                                <CommentButton
                                    count={getCommentCount('strategic-insights')}
                                    onClick={() => openComments('strategic-insights', 'Strategic Insights')}
                                />
                            </div>
                            <div className="insights-list">
                                {insights.map((insight, idx) => (
                                    <div key={idx} className={`insight-item insight-${insight.type}`}>
                                        <div className="insight-icon">
                                            {insight.type === 'opportunity' && <TrendingUp size={18} />}
                                            {insight.type === 'threat' && <AlertCircle size={18} />}
                                            {insight.type === 'insight' && <Lightbulb size={18} />}
                                        </div>
                                        <div className="insight-content">
                                            <div className="insight-header">
                                                <span className="insight-title">{insight.title}</span>
                                                <span className={`insight-impact impact-${insight.impact.toLowerCase()}`}>{insight.impact}</span>
                                            </div>
                                            <p className="insight-desc">{insight.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Revenue Trends */}
                        <div className="chart-card">
                            <div className="chart-header-row">
                                <h3 className="chart-title">Revenue Trends (6 Months)</h3>
                                <CommentButton
                                    count={getCommentCount('revenue-trends')}
                                    onClick={() => openComments('revenue-trends', 'Revenue Trends')}
                                />
                            </div>
                            <div className="chart-container">
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={revenueTrends}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                                        <XAxis dataKey="month" stroke="var(--text-tertiary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                                        <YAxis stroke="var(--text-tertiary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} unit="M" />
                                        <Tooltip contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', borderRadius: '8px' }} />
                                        <Legend iconType="circle" />
                                        {competitors.map((comp, index) => (
                                            <Line key={comp.id} type="monotone" dataKey={comp.name} stroke={colors[index]} strokeWidth={2} dot={{ r: 4 }} />
                                        ))}
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Channel Performance */}
                        <div className="chart-card">
                            <div className="chart-header-row">
                                <h3 className="chart-title">Channel Performance</h3>
                                <CommentButton
                                    count={getCommentCount('channel-performance')}
                                    onClick={() => openComments('channel-performance', 'Channel Performance')}
                                />
                            </div>
                            <div className="chart-container">
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={channelData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                                        <XAxis dataKey="name" stroke="var(--text-tertiary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                                        <YAxis stroke="var(--text-tertiary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                                        <Tooltip contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', borderRadius: '8px' }} />
                                        <Legend iconType="circle" />
                                        {competitors.map((comp, index) => (
                                            <Bar key={comp.id} dataKey={comp.name} fill={colors[index]} radius={[4, 4, 0, 0]} barSize={32} />
                                        ))}
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}

                {selectedView === 'market' && <MarketShareChart competitors={competitors} />}
                {selectedView === 'performance' && <PerformanceBenchmark competitors={competitors} />}
                {selectedView === 'pricing' && <PricingIntelligence competitors={competitors} />}
                {selectedView === 'winloss' && <WinLossTracker competitors={competitors} />}
                {selectedView === 'positioning' && <QuadrantChart competitors={competitors} />}
            </div>

            {activeThread && (
                <CommentThread
                    targetType={activeThread.targetType}
                    targetId={activeThread.targetId}
                    title={activeThread.title}
                    onClose={() => setActiveThread(null)}
                />
            )}
        </div>
    );
};

export default Analysis;

