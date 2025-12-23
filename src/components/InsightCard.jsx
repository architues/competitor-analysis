import React from 'react';
import { TrendingUp, TrendingDown, Minus, Search, Megaphone, Mail, AlertCircle } from 'lucide-react';

const InsightCard = ({ insight }) => {
    const getIcon = (category) => {
        switch (category) {
            case 'SEO': return Search;
            case 'Advertising': return Megaphone;
            case 'Email': return Mail;
            default: return AlertCircle;
        }
    };

    const getImpactColor = (impact) => {
        switch (impact) {
            case 'high': return 'var(--red-500)';
            case 'medium': return 'var(--fuchsia-500)'; // More premium purple/pink
            case 'low': return 'var(--blue-500)';
            default: return 'var(--text-secondary)';
        }
    };

    const getImpactBg = (impact) => {
        switch (impact) {
            case 'high': return 'rgba(239, 68, 68, 0.1)';
            case 'medium': return 'rgba(217, 70, 239, 0.1)';
            case 'low': return 'rgba(59, 130, 246, 0.1)';
            default: return 'var(--bg-canvas)';
        }
    };

    const Icon = getIcon(insight.category);
    const impactColor = getImpactColor(insight.impact);
    const impactBg = getImpactBg(insight.impact);

    return (
        <div className="insight-card">
            <div className="insight-header">
                <div className="insight-icon-wrapper" style={{ color: impactColor, background: impactBg }}>
                    <Icon size={18} />
                </div>
                <div className="insight-meta">
                    <span className="insight-category">{insight.category}</span>
                    <span className="insight-date">2h ago</span>
                </div>
                {insight.impact === 'high' && (
                    <span className="impact-badge">High Impact</span>
                )}
            </div>

            <div className="insight-body">
                <h4 className="insight-title">{insight.title}</h4>
                <p className="insight-desc">{insight.description}</p>
            </div>

            <div className="insight-footer">
                <div className="insight-metric">
                    <span className="metric-label">Key Signal</span>
                    <span className="metric-value">{insight.metric}</span>
                </div>
                <button className="btn-action">
                    Take Action
                </button>
            </div>
        </div>
    );
};

export default InsightCard;
