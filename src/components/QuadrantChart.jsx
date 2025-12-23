import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import '../styles/QuadrantChart.css';

const QuadrantChart = ({ competitors }) => {
    // Transform data for scatter chart
    const chartData = competitors.map(comp => ({
        name: comp.name,
        visibility: comp.visibility,
        sentiment: comp.sentiment,
        id: comp.id
    }));

    const colors = {
        1: '#3b82f6', // TechNova - Blue
        2: '#8b5cf6', // DataFlow - Violet
        3: '#10b981'  // MetricMaster - Green
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="quadrant-tooltip">
                    <div className="tooltip-title">{data.name}</div>
                    <div className="tooltip-row">
                        <span>Visibility:</span>
                        <span className="tooltip-value">{data.visibility}%</span>
                    </div>
                    <div className="tooltip-row">
                        <span>Sentiment:</span>
                        <span className="tooltip-value">{data.sentiment}/100</span>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="quadrant-container">
            <div className="quadrant-header">
                <h2 className="section-title">Competitive Positioning</h2>
                <p className="section-subtitle">Visibility vs Sentiment Analysis</p>
            </div>

            <div className="quadrant-chart-wrapper">
                <ResponsiveContainer width="100%" height={500}>
                    <ScatterChart margin={{ top: 20, right: 80, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                        <XAxis
                            type="number"
                            dataKey="visibility"
                            name="Visibility"
                            unit="%"
                            domain={[0, 100]}
                            stroke="var(--text-tertiary)"
                            tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                            label={{ value: 'Visibility (%)', position: 'insideBottom', offset: -10, fill: 'var(--text-secondary)' }}
                        />
                        <YAxis
                            type="number"
                            dataKey="sentiment"
                            name="Sentiment"
                            domain={[0, 100]}
                            stroke="var(--text-tertiary)"
                            tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                            label={{ value: 'Sentiment Score', angle: -90, position: 'insideLeft', fill: 'var(--text-secondary)' }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />

                        {/* Reference lines for quadrants */}
                        <ReferenceLine x={50} stroke="var(--border-strong)" strokeWidth={2} />
                        <ReferenceLine y={50} stroke="var(--border-strong)" strokeWidth={2} />

                        <Scatter name="Competitors" data={chartData} fill="#8884d8">
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[entry.id]} />
                            ))}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>

                {/* Quadrant Labels */}
                <div className="quadrant-labels">
                    <div className="quadrant-label niche-players">Niche Players</div>
                    <div className="quadrant-label leaders">Leaders</div>
                    <div className="quadrant-label laggers">Laggers</div>
                    <div className="quadrant-label controversial">Controversial</div>
                </div>
            </div>

            <div className="quadrant-legend">
                {competitors.map(comp => (
                    <div key={comp.id} className="legend-item">
                        <div className="legend-dot" style={{ backgroundColor: colors[comp.id] }}></div>
                        <span className="legend-name">{comp.name}</span>
                        <span className="legend-stats">{comp.visibility}% visibility • {comp.sentiment} sentiment</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuadrantChart;
