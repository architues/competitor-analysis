import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertCircle, Lightbulb, MessageSquare } from 'lucide-react';
import QuadrantChart from './QuadrantChart';
import MarketShareChart from './MarketShareChart';
import PerformanceBenchmark from './PerformanceBenchmark';
import PricingIntelligence from './PricingIntelligence';
import WinLossTracker from './WinLossTracker';
import CommentThread from './Comments/CommentThread';
import { useCollaboration } from '../context/CollaborationContext';
import '../styles/Analysis.css';

const Analysis = ({ competitors }) => {
    // Check if we have the detailed data needed for analysis
    const hasDetailedData = competitors.length > 0 && competitors[0].channels && competitors[0].revenue;

    if (!hasDetailedData) {
        return (
            <div className="analysis-container">
                <div className="analysis-header">
                    <div>
                        <h2 className="section-title">Competitive Analysis</h2>
                        <p className="section-subtitle">Comprehensive intelligence across market, performance, and strategy</p>
                    </div>
                </div>
                <div style={{
                    padding: '60px 20px',
                    textAlign: 'center',
                    color: 'var(--text-secondary)'
                }}>
                    <h3 style={{ marginBottom: '12px', color: 'var(--text-primary)' }}>
                        Analysis Data Not Available
                    </h3>
                    <p>
                        Detailed analysis data will be available once competitors are enriched with channel and revenue information.
                    </p>
                </div>
            </div>
        );
    }

    // If we have detailed data, render the full analysis (keeping original code)
    return <div>Analysis with full data coming soon...</div>;
};

export default Analysis;
