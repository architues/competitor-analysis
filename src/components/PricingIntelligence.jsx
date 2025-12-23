import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ZAxis } from 'recharts';
import { DollarSign } from 'lucide-react';
import '../styles/PricingIntelligence.css';

const PricingIntelligence = ({ competitors }) => {
    const pricingData = competitors.map(comp => ({
        name: comp.name,
        price: comp.pricing.averagePrice,
        value: comp.customerMetrics.satisfaction * 20, // Scale to 0-100
        marketShare: comp.marketShare,
        tier: comp.pricing.tier
    }));

    const colors = {
        'TechNova': '#3b82f6',
        'DataFlow': '#8b5cf6',
        'MetricMaster': '#10b981'
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="pricing-tooltip">
                    <div className="tooltip-title">{data.name}</div>
                    <div className="tooltip-row">
                        <span>Avg Price:</span>
                        <span className="tooltip-value">${data.price}/mo</span>
                    </div>
                    <div className="tooltip-row">
                        <span>Value Score:</span>
                        <span className="tooltip-value">{data.value.toFixed(0)}/100</span>
                    </div>
                    <div className="tooltip-row">
                        <span>Tier:</span>
                        <span className="tooltip-value">{data.tier}</span>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="pricing-container">
            <div className="pricing-header">
                <h3 className="subsection-title">Pricing Intelligence</h3>
                <p className="subsection-desc">Price positioning vs perceived value</p>
            </div>

            <div className="pricing-chart-wrapper">
                <ResponsiveContainer width="100%" height={350}>
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                        <XAxis
                            type="number"
                            dataKey="price"
                            name="Price"
                            unit="$"
                            stroke="var(--text-tertiary)"
                            tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                            label={{ value: 'Average Price ($/month)', position: 'insideBottom', offset: -10, fill: 'var(--text-secondary)' }}
                        />
                        <YAxis
                            type="number"
                            dataKey="value"
                            name="Value"
                            domain={[0, 100]}
                            stroke="var(--text-tertiary)"
                            tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                            label={{ value: 'Value Score', angle: -90, position: 'insideLeft', fill: 'var(--text-secondary)' }}
                        />
                        <ZAxis type="number" dataKey="marketShare" range={[400, 1000]} />
                        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter name="Competitors" data={pricingData}>
                            {pricingData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[entry.name]} />
                            ))}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>
            </div>

            <div className="pricing-cards">
                {competitors.map(comp => (
                    <div key={comp.id} className="pricing-card panel">
                        <div className="pricing-card-header">
                            <span className="pricing-name">{comp.name}</span>
                            <span className={`pricing-tier tier-${comp.pricing.tier}`}>{comp.pricing.tier}</span>
                        </div>
                        <div className="pricing-amount">
                            <DollarSign size={20} />
                            <span className="price-value">{comp.pricing.averagePrice}</span>
                            <span className="price-period">/month</span>
                        </div>
                        <div className="pricing-range">
                            Starting at ${comp.pricing.startingPrice}
                        </div>
                        <div className="pricing-metrics">
                            <div className="pricing-metric">
                                <span className="metric-label">Satisfaction</span>
                                <span className="metric-value">{comp.customerMetrics.satisfaction}/5.0</span>
                            </div>
                            <div className="pricing-metric">
                                <span className="metric-label">Market Share</span>
                                <span className="metric-value">{comp.marketShare}%</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PricingIntelligence;
