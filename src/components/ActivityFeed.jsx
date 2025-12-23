import React, { useEffect, useState } from 'react';
import { useCollaboration } from '../context/CollaborationContext';
import { MessageSquare, AlertCircle, FileText, User, Clock, Activity } from 'lucide-react';
import '../styles/ActivityFeed.css';


const ActivityFeed = () => {
    const { activities, currentUser, syncData } = useCollaboration();
    // Ensure we have latest data
    useEffect(() => {
        const interval = setInterval(syncData, 2000);
        return () => clearInterval(interval);
    }, [syncData]);

    const getActivityIcon = (type) => {
        switch (type) {
            case 'comment_added':
                return <MessageSquare size={16} className="icon-blue" />;
            case 'alert_triggered':
                return <AlertCircle size={16} className="icon-red" />;
            case 'export_created':
                return <FileText size={16} className="icon-green" />;
            case 'member_added':
                return <User size={16} className="icon-purple" />;
            default:
                return <Activity size={16} className="icon-gray" />;
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = Math.floor((now - date) / 1000); // seconds

        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="activity-feed-container">
            <div className="feed-header">
                <h3 className="feed-title">Activity Stream</h3>
                <span className="feed-badge">{activities.length}</span>
            </div>

            <div className="feed-list">
                {activities.length === 0 ? (
                    <div className="empty-feed">
                        <Activity size={24} />
                        <p>No recent activity</p>
                    </div>
                ) : (
                    activities.map(activity => (
                        <div key={activity.id} className="feed-item">
                            <div className="feed-icon-wrapper">
                                {getActivityIcon(activity.type)}
                            </div>
                            <div className="feed-content">
                                <div className="feed-top-row">
                                    <span className="feed-user-name">
                                        {activity.user ? activity.user.name : 'System'}
                                    </span>
                                    <span className="feed-time">
                                        <Clock size={10} />
                                        {formatTime(activity.timestamp)}
                                    </span>
                                </div>
                                <p className="feed-description">
                                    {activity.description}
                                </p>
                                {activity.target && (
                                    <div className="feed-target-badge">
                                        {activity.target}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ActivityFeed;
