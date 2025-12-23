import React, { useState } from 'react';
import { Plus, Search, Trash2, ExternalLink } from 'lucide-react';
import '../styles/CompetitorList.css';

const CompetitorList = ({ competitors, onAdd, onDelete, onViewCompany }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCompetitors = competitors.filter(comp =>
        comp.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="competitors-container">
            <div className="competitors-header">
                <div className="header-left">
                    <h2 className="section-title">Competitors</h2>
                    <p className="section-subtitle">Manage and track market players</p>
                </div>
                <button className="btn-primary" onClick={onAdd}>
                    <Plus size={16} />
                    Add Competitor
                </button>
            </div>

            <div className="search-bar">
                <Search size={18} className="search-icon" />
                <input
                    type="text"
                    placeholder="Search for companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="competitors-grid">
                {filteredCompetitors.map(comp => (
                    <div
                        key={comp.id}
                        className="competitor-card"
                        onClick={() => onViewCompany && onViewCompany(comp)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="card-header">
                            <img src={comp.logo} alt={comp.name} className="comp-logo" />
                            <div className="comp-actions">
                                <button
                                    className="action-btn text-red"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(comp.id);
                                    }}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="comp-info">
                            <h3 className="comp-name">{comp.name}</h3>
                            <a href="#" className="comp-website">
                                attio.com/company <ExternalLink size={12} />
                            </a>
                        </div>

                        <div className="comp-stats">
                            <div className="stat-row">
                                <span className="stat-label">Market Share</span>
                                <span className="stat-val">{comp.marketShare}%</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">Growth</span>
                                <span className="stat-val text-green">+12%</span>
                            </div>
                        </div>

                        <div className="comp-tags">
                            {comp.features.slice(0, 3).map((feature, idx) => (
                                <span key={idx} className="tag">{feature}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompetitorList;
