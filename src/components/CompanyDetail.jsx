import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import TrendCharts from './TrendCharts';
import PromptAnalysis from './PromptAnalysis';
import CitationTracker from './CitationTracker';
import RecommendationEngine from './RecommendationEngine';
import '../styles/CompanyDetail.css';

const CompanyDetail = ({ company, onBack }) => {
    const [activeTab, setActiveTab] = useState('overview');

    if (!company) return null;

    const getTrendIcon = (trend) => {
        if (trend.startsWith('+')) return <TrendingUp size={14} className="trend-up" />;
        if (trend.startsWith('-')) return <TrendingDown size={14} className="trend-down" />;
        return <Minus size={14} className="trend-neutral" />;
    };

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'prompts', label: 'Prompts' },
        { id: 'citations', label: 'Citations' },
        { id: 'trends', label: 'Trends' },
        { id: 'recommendations', label: 'Recommendations' }
    ];

    return (
        <div className="company-detail-container">
            <div className="detail-header">
                <button className="back-btn" onClick={onBack}>
                    <ArrowLeft size={20} />
                    Back to Competitors
                </button>
            </div>

            <div className="company-hero">
                <img src={company.logo} alt={company.name} className="company-logo-large" />
                <div className="company-hero-info">
                    <h1 className="company-name-large">{company.name}</h1>
                    <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" className="company-website-link">
                        {company.website} <ExternalLink size={16} />
                    </a>
                    <div className="company-meta">
                        <span className="meta-item">Market Share: {company.marketShare}%</span>
                        <span className="meta-divider">•</span>
                        <span className="meta-item">{company.recentActivity}</span>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="detail-tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === 'overview' && (
                    <div className="metrics-grid">
                        {/* Web Traffic Section */}
                        <div className="metrics-section">
                            <h2 className="section-title">Web Traffic</h2>
                            <div className="metrics-cards">
                                <div className="metric-card">
                                    <span className="metric-label">Monthly Visitors</span>
                                    <span className="metric-value">{(company.webTraffic.monthlyVisitors / 1000000).toFixed(1)}M</span>
                                </div>
                                <div className="metric-card">
                                    <span className="metric-label">Bounce Rate</span>
                                    <span className="metric-value">{company.webTraffic.bounceRate}%</span>
                                </div>
                                <div className="metric-card">
                                    <span className="metric-label">Avg Session</span>
                                    <span className="metric-value">{company.webTraffic.avgSessionDuration}</span>
                                </div>
                                <div className="metric-card">
                                    <span className="metric-label">Page Views</span>
                                    <span className="metric-value">{(company.webTraffic.pageViews / 1000000).toFixed(1)}M</span>
                                </div>
                            </div>

                            <div className="traffic-sources panel">
                                <h3 className="subsection-title">Traffic Sources</h3>
                                <div className="sources-list">
                                    {Object.entries(company.webTraffic.sources).map(([source, percentage]) => (
                                        <div key={source} className="source-item">
                                            <div className="source-header">
                                                <span className="source-name">{source.charAt(0).toUpperCase() + source.slice(1)}</span>
                                                <span className="source-percentage">{percentage}%</span>
                                            </div>
                                            <div className="source-bar">
                                                <div className="source-bar-fill" style={{ width: `${percentage}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className="metrics-section">
                            <h2 className="section-title">Reviews & Ratings</h2>
                            <div className="review-platforms">
                                {Object.entries(company.reviews).map(([platform, data]) => (
                                    <div key={platform} className="review-card panel">
                                        <div className="review-header">
                                            <span className="platform-name">{platform.toUpperCase()}</span>
                                            <span className={`sentiment-badge ${data.sentiment}`}>{data.sentiment}</span>
                                        </div>
                                        <div className="review-rating">
                                            <span className="rating-value">{data.rating}</span>
                                            <span className="rating-max">/5.0</span>
                                            <div className="rating-trend">
                                                {getTrendIcon(data.recentTrend)}
                                                <span>{data.recentTrend}</span>
                                            </div>
                                        </div>
                                        <div className="review-count">{data.count} reviews</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Social Media Section */}
                        <div className="metrics-section">
                            <h2 className="section-title">Social Media</h2>
                            <div className="social-platforms">
                                {Object.entries(company.socialMedia).map(([platform, data]) => (
                                    <div key={platform} className="social-card panel">
                                        <div className="social-header">
                                            <span className="platform-name">{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                                            <span className="growth-badge">{data.growth}</span>
                                        </div>
                                        <div className="social-stats">
                                            <div className="stat-item">
                                                <span className="stat-label">Followers</span>
                                                <span className="stat-value">{(data.followers / 1000).toFixed(0)}K</span>
                                            </div>
                                            <div className="stat-item">
                                                <span className="stat-label">Engagement</span>
                                                <span className="stat-value">{data.engagement}%</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Actionable Insights Section */}
                        <div className="metrics-section full-width">
                            <h2 className="section-title">Actionable Insights</h2>
                            <div className="insights-grid">
                                <div className="insight-category panel">
                                    <h3 className="insight-title">💪 Strengths</h3>
                                    <ul className="insight-list">
                                        {company.insights.strengths.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="insight-category panel">
                                    <h3 className="insight-title">⚠️ Weaknesses</h3>
                                    <ul className="insight-list">
                                        {company.insights.weaknesses.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="insight-category panel">
                                    <h3 className="insight-title">🎯 Opportunities</h3>
                                    <ul className="insight-list">
                                        {company.insights.opportunities.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="insight-category panel">
                                    <h3 className="insight-title">🚨 Threats</h3>
                                    <ul className="insight-list">
                                        {company.insights.threats.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'prompts' && (
                    <div className="panel" style={{ padding: '24px' }}>
                        <PromptAnalysis company={company} />
                    </div>
                )}

                {activeTab === 'citations' && (
                    <div className="panel" style={{ padding: '24px' }}>
                        <CitationTracker company={company} />
                    </div>
                )}

                {activeTab === 'trends' && (
                    <div className="panel" style={{ padding: '24px' }}>
                        <TrendCharts company={company} />
                    </div>
                )}

                {activeTab === 'recommendations' && (
                    <div className="panel" style={{ padding: '24px' }}>
                        <RecommendationEngine company={company} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompanyDetail;
