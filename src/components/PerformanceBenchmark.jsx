import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import '../styles/PerformanceBenchmark.css';

const PerformanceBenchmark = ({ competitors }) => {
    // Calculate composite performance scores
    const benchmarkData = competitors.map(comp => {
        const avgReviewScore = (comp.reviews.g2.rating + comp.reviews.capterra.rating + comp.reviews.trustpilot.rating) / 3;
        const performanceScore = (
            (comp.marketShare / 100 * 25) +
            (comp.customerMetrics.nps / 100 * 25) +
            (avgReviewScore / 5 * 25) +
            (comp.customerMetrics.retentionRate / 100 * 25)
        );

        return {
            name: comp.name,
            score: Math.round(performanceScore),
            marketShare: comp.marketShare,
            nps: comp.customerMetrics.nps,
            satisfaction: comp.customerMetrics.satisfaction,
            retention: comp.customerMetrics.retentionRate,
            winRate: comp.winLoss.winRate
        };
    }).sort((a, b) => b.score - a.score);

    const colors = {
        'TechNova': '#3b82f6',
        'DataFlow': '#8b5cf6',
        'MetricMaster': '#10b981'
    };

    return (
        <div className="benchmark-container">
            <div className="benchmark-header">
                <h3 className="subsection-title">Performance Benchmark</h3>
                <p className="subsection-desc">Composite score based on market share, NPS, reviews, and retention</p>
            </div>

            <div className="benchmark-chart">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={benchmarkData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" horizontal={false} />
                        <XAxis type="number" domain={[0, 100]} stroke="var(--text-tertiary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                        <YAxis type="category" dataKey="name" stroke="var(--text-tertiary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} width={100} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--bg-surface)',
                                borderColor: 'var(--border-subtle)',
                                borderRadius: '8px',
                                boxShadow: 'var(--shadow-md)'
                            }}
                        />
                        <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={32}>
                            {benchmarkData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[entry.name]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="benchmark-details">
                {benchmarkData.map((comp, idx) => (
                    <div key={idx} className="benchmark-card panel">
                        <div className="benchmark-rank">#{idx + 1}</div>
                        <div className="benchmark-name">{comp.name}</div>
                        <div className="benchmark-score-large">{comp.score}/100</div>
                        <div className="benchmark-metrics">
                            <div className="metric-item">
                                <span className="metric-label">Market Share</span>
                                <span className="metric-value">{comp.marketShare}%</span>
                            </div>
                            <div className="metric-item">
                                <span className="metric-label">NPS</span>
                                <span className="metric-value">{comp.nps}</span>
                            </div>
                            <div className="metric-item">
                                <span className="metric-label">Win Rate</span>
                                <span className="metric-value">{comp.winRate.toFixed(1)}%</span>
                            </div>
                            <div className="metric-item">
                                <span className="metric-label">Retention</span>
                                <span className="metric-value">{comp.retention}%</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PerformanceBenchmark;
