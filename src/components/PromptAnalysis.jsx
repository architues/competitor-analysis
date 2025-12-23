import React, { useState } from 'react';
import { Search, TrendingUp, Plus } from 'lucide-react';
import '../styles/PromptAnalysis.css';

const PromptAnalysis = ({ company }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('volume');

    const filteredPrompts = company.prompts
        .filter(p => p.query.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === 'volume') return b.volume - a.volume;
            if (sortBy === 'visibility') return b.visibility - a.visibility;
            if (sortBy === 'position') return a.position - b.position;
            return 0;
        });

    const getPositionColor = (position) => {
        if (position <= 2) return 'position-excellent';
        if (position <= 4) return 'position-good';
        return 'position-needs-work';
    };

    return (
        <div className="prompt-analysis-container">
            <div className="prompt-header">
                <div>
                    <h3 className="subsection-title">Prompt Performance</h3>
                    <p className="subsection-desc">Track how {company.name} ranks for key search queries</p>
                </div>
                <button className="btn-add-prompt">
                    <Plus size={16} />
                    Track New Prompt
                </button>
            </div>

            <div className="prompt-controls">
                <div className="search-bar-small">
                    <Search size={16} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search prompts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className="sort-selector">
                    <label>Sort by:</label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
                        <option value="volume">Volume</option>
                        <option value="visibility">Visibility</option>
                        <option value="position">Position</option>
                    </select>
                </div>
            </div>

            <div className="prompts-table">
                <div className="table-header">
                    <div className="col-query">Query</div>
                    <div className="col-metric">Visibility</div>
                    <div className="col-metric">Position</div>
                    <div className="col-metric">Sentiment</div>
                    <div className="col-metric">Volume</div>
                </div>
                {filteredPrompts.map((prompt, idx) => (
                    <div key={idx} className="table-row">
                        <div className="col-query">
                            <span className="query-text">{prompt.query}</span>
                        </div>
                        <div className="col-metric">
                            <div className="visibility-bar-container">
                                <div className="visibility-bar" style={{ width: `${prompt.visibility}%` }}></div>
                                <span className="visibility-text">{prompt.visibility}%</span>
                            </div>
                        </div>
                        <div className="col-metric">
                            <span className={`position-badge ${getPositionColor(prompt.position)}`}>
                                #{prompt.position}
                            </span>
                        </div>
                        <div className="col-metric">
                            <span className="sentiment-score">{prompt.sentiment}/100</span>
                        </div>
                        <div className="col-metric">
                            <span className="volume-text">{(prompt.volume / 1000).toFixed(1)}K</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PromptAnalysis;
