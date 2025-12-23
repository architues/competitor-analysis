import React from 'react';
import { Lightbulb, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react';
import '../styles/Insights.css';

const Insights = ({ competitors }) => {
    const generateDeepInsights = () => {
        return [
            {
                type: 'opportunity',
                title: 'Underserved SEO Market',
                desc: 'Competitors are focusing heavily on Social Ads. There is a 35% gap in organic key terms related to "Enterprise Solution" that you can capture.',
                icon: Lightbulb,
                color: 'var(--amber-500)'
            },
            {
                type: 'trend',
                title: 'Shift to Real-time Features',
                desc: 'All top 3 competitors have launched "Real-time Sync" in the last quarter. This is becoming a table-stakes feature.',
                icon: TrendingUp,
                color: 'var(--emerald-500)'
            },
            {
                type: 'risk',
                title: 'Pricing Pressure',
                desc: 'DataFlow reduced pricing by 20%. Expect higher churn risk for price-sensitive customers.',
                icon: AlertTriangle,
                color: 'var(--red-500)'
            }
        ];
    };

    const insights = generateDeepInsights();

    return (
        <div className="insights-container">
            <div className="insights-header">
                <h2 className="section-title">AI Strategic Insights</h2>
                <p className="section-subtitle">Market intelligence and automated recommendations</p>
            </div>

            <div className="insights-grid">
                {insights.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                        <div key={idx} className="insight-card panel" style={{ '--accent-color': item.color }}>
                            <div className="card-top">
                                <div className="icon-box">
                                    <Icon size={20} />
                                </div>
                                <span className="insight-type">{item.type.toUpperCase()}</span>
                            </div>
                            <h3 className="insight-title">{item.title}</h3>
                            <p className="insight-desc">{item.desc}</p>
                            <div className="card-footer">
                                <button className="action-link">
                                    View Data Source <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Insights;
