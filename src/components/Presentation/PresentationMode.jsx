import React, { useState, useEffect } from 'react';
import { useCollaboration } from '../../context/CollaborationContext';
import { X, ChevronLeft, ChevronRight, Play, Pause, Maximize, Minimize } from 'lucide-react';
import { calculateInsights } from '../../data/mockData';
import '../../styles/PresentationMode.css';

const PresentationMode = ({ onClose }) => {
    const { data } = useCollaboration();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const competitors = data.workspaces.find(w => w.id === data.activeWorkspace)?.competitors || [];
    // Fallback if no competitors in workspace (mock for now)
    const displayCompetitors = competitors.length > 0 ? competitors : [
        { name: "TechNova", marketShare: 45, revenue: { annual: 50, growth: 12 } },
        { name: "DataFlow", marketShare: 25, revenue: { annual: 28, growth: 8 } },
        { name: "CloudScale", marketShare: 15, revenue: { annual: 18, growth: 25 } }
    ];

    const insights = calculateInsights();

    const slides = [
        {
            id: 'intro',
            title: 'Executive Summary',
            content: (
                <div className="slide-content intro">
                    <h1>Q4 Competitor Analysis</h1>
                    <p className="subtitle">Strategic Overview & Market Positioning</p>
                    <div className="intro-stats">
                        <div className="stat-box">
                            <span className="stat-label">Market Leaders</span>
                            <span className="stat-val">{displayCompetitors.length}</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-label">Key Insights</span>
                            <span className="stat-val">{insights.length}</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'market-share',
            title: 'Market Share Distribution',
            content: (
                <div className="slide-content chart-slide">
                    <div className="chart-container">
                        {/* Simple CSS Bar Chart for Presentation */}
                        <div className="bar-chart">
                            {displayCompetitors.map((comp, i) => (
                                <div key={i} className="chart-bar-wrapper">
                                    <div
                                        className="chart-bar"
                                        style={{ height: `${comp.marketShare * 4}px`, background: i === 0 ? 'var(--blue-500)' : 'var(--violet-400)' }}
                                    >
                                        <span className="bar-value">{comp.marketShare}%</span>
                                    </div>
                                    <span className="bar-label">{comp.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="slide-notes">
                        <h3>Analysis</h3>
                        <p>{displayCompetitors[0]?.name} maintains dominant market position with {displayCompetitors[0]?.marketShare}% share.</p>
                    </div>
                </div>
            )
        },
        {
            id: 'insights',
            title: 'Strategic Insights',
            content: (
                <div className="slide-content list-slide">
                    <ul>
                        {insights.slice(0, 4).map((insight, i) => (
                            <li key={i}>{insight}</li>
                        ))}
                    </ul>
                </div>
            )
        }
    ];

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % slides.length);
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, slides.length]);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    return (
        <div className="presentation-mode">
            <div className="presentation-toolbar">
                <div className="toolbar-left">
                    <span className="slide-counter">Slide {currentSlide + 1} / {slides.length}</span>
                </div>
                <div className="toolbar-center">
                    <button className="control-btn" onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}><ChevronLeft size={20} /></button>
                    <button className="control-btn play" onClick={() => setIsPlaying(!isPlaying)}>
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    <button className="control-btn" onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}><ChevronRight size={20} /></button>
                </div>
                <div className="toolbar-right">
                    <button className="control-btn" onClick={toggleFullscreen}>
                        {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                    </button>
                    <button className="close-presentation" onClick={onClose}><X size={24} /></button>
                </div>
            </div>

            <div className="slide-viewport">
                <div className="slide-header">
                    <h2>{slides[currentSlide].title}</h2>
                </div>
                <div className="slide-body">
                    {slides[currentSlide].content}
                </div>
            </div>
        </div>
    );
};

export default PresentationMode;
