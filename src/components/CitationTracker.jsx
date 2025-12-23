import React from 'react';
import { ExternalLink, TrendingUp, MessageCircle, FileText } from 'lucide-react';
import '../styles/CitationTracker.css';

const CitationTracker = ({ company }) => {
    const getImpactColor = (impact) => {
        if (impact === 'high') return 'impact-high';
        if (impact === 'medium') return 'impact-medium';
        return 'impact-low';
    };

    const getCategoryIcon = (category) => {
        if (category === 'review') return <TrendingUp size={16} />;
        if (category === 'social') return <MessageCircle size={16} />;
        if (category === 'media') return <FileText size={16} />;
        return <ExternalLink size={16} />;
    };

    const getCategoryLabel = (category) => {
        return category.charAt(0).toUpperCase() + category.slice(1);
    };

    // Sort by count descending
    const sortedCitations = [...company.citations].sort((a, b) => b.count - a.count);

    return (
        <div className="citation-tracker-container">
            <div className="citation-header">
                <h3 className="subsection-title">Citation Sources</h3>
                <p className="subsection-desc">Where {company.name} is being mentioned and referenced</p>
            </div>

            <div className="citations-grid">
                {sortedCitations.map((citation, idx) => (
                    <div key={idx} className="citation-card panel">
                        <div className="citation-card-header">
                            <div className="source-info">
                                <div className="source-icon">{getCategoryIcon(citation.category)}</div>
                                <div>
                                    <div className="source-name">{citation.source}</div>
                                    <div className="source-category">{getCategoryLabel(citation.category)}</div>
                                </div>
                            </div>
                            <span className={`impact-badge ${getImpactColor(citation.impact)}`}>
                                {citation.impact} impact
                            </span>
                        </div>
                        <div className="citation-stats">
                            <div className="stat-large">
                                <span className="stat-value-large">{citation.count}</span>
                                <span className="stat-label-small">Citations</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="citation-insights panel">
                <h4 className="insight-title">💡 Key Insights</h4>
                <ul className="insight-list-compact">
                    <li>
                        <strong>{sortedCitations[0]?.source}</strong> is your top citation source with {sortedCitations[0]?.count} mentions
                    </li>
                    <li>
                        {company.citations.filter(c => c.impact === 'high').length} high-impact sources are driving visibility
                    </li>
                    <li>
                        Focus on maintaining presence in review platforms and community discussions
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default CitationTracker;
