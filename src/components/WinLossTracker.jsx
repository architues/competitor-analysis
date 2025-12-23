import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Trophy, Target } from 'lucide-react';
import '../styles/WinLossTracker.css';

const WinLossTracker = ({ competitors }) => {
    const winLossData = competitors.map(comp => ({
        name: comp.name,
        winRate: comp.winLoss.winRate,
        wins: comp.winLoss.wins,
        losses: comp.winLoss.losses,
        avgDealSize: comp.winLoss.avgDealSize
    })).sort((a, b) => b.winRate - a.winRate);

    const colors = {
        'TechNova': '#3b82f6',
        'DataFlow': '#8b5cf6',
        'MetricMaster': '#10b981'
    };

    return (
        <div className="winloss-container">
            <div className="winloss-header">
                <h3 className="subsection-title">Win/Loss Analysis</h3>
                <p className="subsection-desc">Competitive deal outcomes and success rates</p>
            </div>

            <div className="winloss-chart">
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={winLossData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="var(--text-tertiary)"
                            tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                        />
                        <YAxis
                            stroke="var(--text-tertiary)"
                            tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                            unit="%"
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--bg-surface)',
                                borderColor: 'var(--border-subtle)',
                                borderRadius: '8px',
                                boxShadow: 'var(--shadow-md)'
                            }}
                        />
                        <Bar dataKey="winRate" radius={[4, 4, 0, 0]} barSize={60}>
                            {winLossData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[entry.name]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="winloss-details">
                {competitors.map(comp => (
                    <div key={comp.id} className="winloss-card panel">
                        <div className="winloss-card-header">
                            <span className="winloss-name">{comp.name}</span>
                            <div className="winloss-rate">
                                <Trophy size={16} />
                                <span>{comp.winLoss.winRate.toFixed(1)}%</span>
                            </div>
                        </div>

                        <div className="winloss-stats">
                            <div className="stat-group">
                                <div className="stat-item-large wins">
                                    <span className="stat-value-large">{comp.winLoss.wins}</span>
                                    <span className="stat-label">Wins</span>
                                </div>
                                <div className="stat-item-large losses">
                                    <span className="stat-value-large">{comp.winLoss.losses}</span>
                                    <span className="stat-label">Losses</span>
                                </div>
                            </div>
                            <div className="deal-size">
                                <Target size={14} />
                                <span>Avg Deal: ${(comp.winLoss.avgDealSize / 1000).toFixed(0)}K</span>
                            </div>
                        </div>

                        <div className="win-reasons">
                            <div className="reasons-section">
                                <span className="reasons-title">Top Win Reasons</span>
                                <ul className="reasons-list">
                                    {comp.winLoss.topWinReasons.slice(0, 2).map((reason, idx) => (
                                        <li key={idx}>{reason}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="reasons-section">
                                <span className="reasons-title">Top Loss Reasons</span>
                                <ul className="reasons-list loss">
                                    {comp.winLoss.topLossReasons.slice(0, 2).map((reason, idx) => (
                                        <li key={idx}>{reason}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WinLossTracker;
