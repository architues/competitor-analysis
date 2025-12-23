import { Folder, Search, Clock } from 'lucide-react';
import React, { useState } from 'react';
import '../styles/SearchLanding.css';

const SearchLanding = ({ onSearch, recentSearches }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <div className="search-landing-container">
            <div className="search-landing-content">
                <div className="search-branding">
                    <div className="search-logo">⚡</div>
                    <h1 className="search-title">CompetitorAI</h1>
                    <p className="search-subtitle">Comprehensive competitive intelligence at your fingertips</p>
                </div>

                <div className="search-box-container">
                    <form className="search-box" onSubmit={handleSearch}>
                        <div className="search-icon-wrapper">
                            <Search size={20} />
                        </div>
                        <input
                            type="text"
                            className="search-input-large"
                            placeholder="Search for competitors, markets, or trends..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoFocus
                        />
                    </form>
                    <button type="submit" className="search-button" onClick={handleSearch}>
                        Search
                    </button>
                </div>

                <div className="recent-workspaces">
                    <h3 className="recent-header">
                        <Clock size={14} /> Recent Workspaces
                    </h3>
                    <div className="workspaces-grid">
                        {recentSearches.map((folder) => (
                            <button
                                key={folder.id}
                                className="workspace-folder"
                                onClick={() => onSearch(folder.name)}
                            >
                                <div className="folder-icon">
                                    <Folder size={20} />
                                </div>
                                <div className="folder-name">{folder.name}</div>
                                <div className="folder-meta">{folder.count} items • {folder.date}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchLanding;
