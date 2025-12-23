import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/TrendCharts.css';

const TrendCharts = ({ company }) => {
    const [selectedMetric, setSelectedMetric] = useState('visibility');

    const metrics = [
        { id: 'visibility', label: 'Visibility', color: '#3b82f6', unit: '%' },
        { id: 'sentiment', label: 'Sentiment', color: '#8b5cf6', unit: '' },
        { id: 'marketShare', label: 'Market Share', color: '#10b981', unit: '%' }
    ];

    const currentMetric = metrics.find(m => m.id === selectedMetric);
    const trendData = company.trends[selectedMetric];

    return (
        <div className="trends-container">
            <div className="trends-header">
                <h3 className="subsection-title">Performance Trends</h3>
                <div className="metric-selector">
                    {metrics.map(metric => (
                        <button
                            key={metric.id}
                            className={`metric-btn ${selectedMetric === metric.id ? 'active' : ''}`}
                            onClick={() => setSelectedMetric(metric.id)}
                        >
                            {metric.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="trend-chart-wrapper">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                        <XAxis
                            dataKey="month"
                            stroke="var(--text-tertiary)"
                            tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                            axisLine={{ stroke: 'var(--border-subtle)' }}
                            tickLine={false}
                        />
                        <YAxis
                            stroke="var(--text-tertiary)"
                            tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            unit={currentMetric.unit}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--bg-surface)',
                                borderColor: 'var(--border-subtle)',
                                color: 'var(--text-main)',
                                borderRadius: '8px',
                                boxShadow: 'var(--shadow-md)'
                            }}
                            labelStyle={{ color: 'var(--text-secondary)' }}
                        />
                        <Legend
                            wrapperStyle={{ paddingTop: '20px' }}
                            iconType="line"
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            name={currentMetric.label}
                            stroke={currentMetric.color}
                            strokeWidth={3}
                            dot={{ fill: currentMetric.color, r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="trend-summary">
                <div className="summary-item">
                    <span className="summary-label">Current</span>
                    <span className="summary-value">{trendData[trendData.length - 1].value}{currentMetric.unit}</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">6-Month Avg</span>
                    <span className="summary-value">
                        {Math.round(trendData.reduce((acc, d) => acc + d.value, 0) / trendData.length)}{currentMetric.unit}
                    </span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Change</span>
                    <span className={`summary-value ${trendData[trendData.length - 1].value > trendData[0].value ? 'positive' : 'negative'}`}>
                        {trendData[trendData.length - 1].value > trendData[0].value ? '+' : ''}
                        {trendData[trendData.length - 1].value - trendData[0].value}{currentMetric.unit}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TrendCharts;
