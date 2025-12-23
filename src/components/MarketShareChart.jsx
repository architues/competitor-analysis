import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import '../styles/MarketShareChart.css';

const MarketShareChart = ({ competitors }) => {
    const marketShareData = competitors.map(comp => ({
        name: comp.name,
        value: comp.marketShare,
        growth: comp.revenue.growth
    }));

    const colors = {
        'TechNova': '#3b82f6',
        'DataFlow': '#8b5cf6',
        'MetricMaster': '#10b981'
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0];
            return (
                <div className="market-tooltip">
                    <div className="tooltip-title">{data.name}</div>
                    <div className="tooltip-row">
                        <span>Market Share:</span>
                        <span className="tooltip-value">{data.value}%</span>
                    </div>
                    <div className="tooltip-row">
                        <span>Growth:</span>
                        <span className={`tooltip-value ${data.payload.growth > 0 ? 'positive' : 'negative'}`}>
                            {data.payload.growth > 0 ? '+' : ''}{data.payload.growth}%
                        </span>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="market-share-container">
            <div className="market-share-header">
                <h3 className="subsection-title">Market Share Distribution</h3>
                <p className="subsection-desc">Current market positioning and growth trends</p>
            </div>

            <div className="market-share-content">
                <div className="chart-section">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={marketShareData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, value }) => `${name}: ${value}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {marketShareData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[entry.name]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="market-stats">
                    {competitors.map(comp => (
                        <div key={comp.id} className="market-stat-card">
                            <div className="stat-header">
                                <div className="stat-dot" style={{ backgroundColor: colors[comp.name] }}></div>
                                <span className="stat-name">{comp.name}</span>
                            </div>
                            <div className="stat-value">{comp.marketShare}%</div>
                            <div className="stat-growth">
                                {comp.revenue.growth > 0 ? (
                                    <TrendingUp size={14} className="trend-up" />
                                ) : (
                                    <TrendingDown size={14} className="trend-down" />
                                )}
                                <span className={comp.revenue.growth > 0 ? 'growth-positive' : 'growth-negative'}>
                                    {comp.revenue.growth > 0 ? '+' : ''}{comp.revenue.growth}% YoY
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MarketShareChart;
