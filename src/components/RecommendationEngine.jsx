import React from 'react';
import { AlertCircle, TrendingUp, Target, Zap } from 'lucide-react';
import '../styles/RecommendationEngine.css';

const RecommendationEngine = ({ company }) => {
    const getPriorityIcon = (priority) => {
        if (priority === 'high') return <AlertCircle size={18} />;
        if (priority === 'medium') return <TrendingUp size={18} />;
        return <Target size={18} />;
    };

    const getPriorityColor = (priority) => {
        if (priority === 'high') return 'priority-high';
        if (priority === 'medium') return 'priority-medium';
        return 'priority-low';
    };

    // Group by priority
    const groupedRecs = {
        high: company.recommendations.filter(r => r.priority === 'high'),
        medium: company.recommendations.filter(r => r.priority === 'medium'),
        low: company.recommendations.filter(r => r.priority === 'low')
    };

    return (
        <div className="recommendations-container">
            <div className="recommendations-header">
                <div>
                    <h3 className="subsection-title">AI-Powered Recommendations</h3>
                    <p className="subsection-desc">Actionable strategies to improve {company.name}'s market position</p>
                </div>
                <div className="rec-summary">
                    <Zap size={16} />
                    <span>{company.recommendations.length} recommendations</span>
                </div>
            </div>

            <div className="recommendations-list">
                {['high', 'medium', 'low'].map(priority => (
                    groupedRecs[priority].length > 0 && (
                        <div key={priority} className="priority-section">
                            <div className="priority-header">
                                <span className={`priority-badge ${getPriorityColor(priority)}`}>
                                    {getPriorityIcon(priority)}
                                    {priority.toUpperCase()} PRIORITY
                                </span>
                                <span className="priority-count">{groupedRecs[priority].length} items</span>
                            </div>

                            <div className="rec-cards">
                                {groupedRecs[priority].map((rec, idx) => (
                                    <div key={idx} className="rec-card panel">
                                        <div className="rec-card-header">
                                            <span className="rec-category">{rec.category}</span>
                                        </div>
                                        <div className="rec-action">{rec.action}</div>
                                        <div className="rec-impact">
                                            <span className="impact-label">Expected Impact:</span>
                                            <span className="impact-value">{rec.impact}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default RecommendationEngine;
