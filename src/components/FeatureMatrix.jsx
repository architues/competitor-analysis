import React from 'react';
import { Check, X, Info } from 'lucide-react';
import '../styles/FeatureMatrix.css';

const FeatureMatrix = ({ competitors }) => {
    const allFeatures = Array.from(new Set(competitors.flatMap(c => c.features))).sort();

    const standardFeatures = [
        "AI Analytics", "Custom Reports", "API Access", "Real-time Sync",
        "Team Collaboration", "SLA Support", "Mobile App"
    ];

    const comparisonFeatures = Array.from(new Set([...standardFeatures, ...allFeatures]));

    return (
        <div className="matrix-container">
            <div className="matrix-header">
                <h2 className="section-title">Feature Comparison</h2>
                <p className="section-subtitle">Detailed capability breakdown</p>
            </div>

            <div className="matrix-wrapper">
                <table className="feature-table">
                    <thead>
                        <tr>
                            <th className="feature-col">Feature</th>
                            {competitors.map(comp => (
                                <th key={comp.id} className="competitor-col">
                                    <div className="th-content">
                                        <img src={comp.logo} alt={comp.name} className="th-logo" />
                                        <span>{comp.name}</span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {comparisonFeatures.map((feature, idx) => (
                            <tr key={idx}>
                                <td className="feature-col feature-name">
                                    {feature}
                                    {/* <Info size={14} className="info-icon" /> */}
                                </td>
                                {competitors.map(comp => {
                                    const hasFeature = comp.features.includes(feature);
                                    return (
                                        <td key={comp.id} className="status-col">
                                            {hasFeature ? (
                                                <div className="status-badge yes">
                                                    <Check size={16} strokeWidth={3} />
                                                </div>
                                            ) : (
                                                <div className="status-badge no">
                                                    <X size={16} />
                                                </div>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FeatureMatrix;
