import React, { createContext, useContext, useState, useEffect } from 'react';
import * as storage from '../utils/storage';

const CollaborationContext = createContext();

export const useCollaboration = () => {
    const context = useContext(CollaborationContext);
    if (!context) {
        throw new Error('useCollaboration must be used within CollaborationProvider');
    }
    return context;
};

export const CollaborationProvider = ({ children }) => {
    const [data, setData] = useState(storage.getData());
    const [currentUser] = useState(data.workspaces[0]?.members[0] || {
        id: 'u1',
        name: 'Demo User',
        avatar: 'DU',
        color: '#3b82f6'
    });

    // Sync with localStorage
    const syncData = () => {
        setData(storage.getData());
    };

    useEffect(() => {
        // Listen for storage changes from other tabs
        const handleStorageChange = (e) => {
            if (e.key === 'competitorai_data') {
                syncData();
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Workspace operations
    const activeWorkspace = data.workspaces.find(ws => ws.id === data.activeWorkspace);

    const switchWorkspace = (workspaceId) => {
        storage.setActiveWorkspace(workspaceId);
        syncData();
    };

    const createWorkspace = (workspace) => {
        const newWorkspace = storage.createWorkspace(workspace);
        syncData();
        return newWorkspace;
    };

    // Comment operations
    const addComment = (comment) => {
        const newComment = storage.addComment({
            ...comment,
            author: currentUser
        });
        syncData();
        return newComment;
    };

    const getComments = (targetType, targetId) => {
        return storage.getComments(targetType, targetId);
    };

    const addReply = (commentId, content) => {
        const reply = storage.addReply(commentId, {
            content,
            author: currentUser
        });
        syncData();
        return reply;
    };

    const toggleReaction = (commentId, reactionType) => {
        storage.toggleReaction(commentId, reactionType, currentUser);
        syncData();
    };

    // Alert operations
    const addAlert = (alert) => {
        const newAlert = storage.addAlert(alert);
        syncData();
        return newAlert;
    };

    const markAlertRead = (alertId) => {
        storage.markAlertRead(alertId);
        syncData();
    };

    const unreadAlertCount = storage.getUnreadAlertCount();

    // Activity operations
    const addActivity = (activity) => {
        const newActivity = storage.addActivity({
            ...activity,
            user: currentUser
        });
        syncData();
        return newActivity;
    };

    const activities = storage.getActivities();

    const value = {
        // State
        data,
        currentUser,
        activeWorkspace,
        workspaces: data.workspaces,
        comments: data.comments,
        alerts: data.alerts,
        alertRules: data.alertRules,
        activities,
        unreadAlertCount,

        // Actions
        switchWorkspace,
        createWorkspace,
        addComment,
        getComments,
        addReply,
        toggleReaction,
        addAlert,
        markAlertRead,
        addActivity,
        syncData
    };

    return (
        <CollaborationContext.Provider value={value}>
            {children}
        </CollaborationContext.Provider>
    );
};

export default CollaborationContext;
