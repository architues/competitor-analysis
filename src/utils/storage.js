// LocalStorage utility for managing collaboration data
const STORAGE_KEY = 'competitorai_data';
const STORAGE_VERSION = '1.0';

// Initialize default data structure
const getDefaultData = () => ({
    version: STORAGE_VERSION,
    workspaces: [
        {
            id: 'ws_default',
            name: 'CRM Market Q4',
            description: 'Q4 2024 CRM competitive analysis',
            members: [
                { id: 'u1', name: 'Demo User', role: 'owner', avatar: 'DU', color: '#3b82f6' },
                { id: 'u2', name: 'Sarah Chen', role: 'editor', avatar: 'SC', color: '#8b5cf6' },
                { id: 'u3', name: 'Mike Johnson', role: 'viewer', avatar: 'MJ', color: '#10b981' }
            ],
            createdAt: new Date().toISOString(),
            lastModified: new Date().toISOString()
        }
    ],
    activeWorkspace: 'ws_default',
    comments: [],
    alerts: [],
    alertRules: [],
    activities: [],
    shares: [],
    preferences: {
        theme: 'light',
        notifications: {
            inApp: true,
            email: false
        }
    }
});

// Get all data from localStorage
export const getData = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            const defaultData = getDefaultData();
            setData(defaultData);
            return defaultData;
        }
        const data = JSON.parse(stored);

        // Version migration if needed
        if (data.version !== STORAGE_VERSION) {
            return migrateData(data);
        }

        return data;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return getDefaultData();
    }
};

// Save all data to localStorage
export const setData = (data) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Error writing to localStorage:', error);
    }
};

// Update specific section
export const updateSection = (section, value) => {
    const data = getData();
    data[section] = value;
    data.lastModified = new Date().toISOString();
    setData(data);
    return data;
};

// Workspace operations
export const getActiveWorkspace = () => {
    const data = getData();
    return data.workspaces.find(ws => ws.id === data.activeWorkspace);
};

export const setActiveWorkspace = (workspaceId) => {
    const data = getData();
    data.activeWorkspace = workspaceId;
    setData(data);
};

export const createWorkspace = (workspace) => {
    const data = getData();
    const newWorkspace = {
        ...workspace,
        id: `ws_${Date.now()}`,
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString()
    };
    data.workspaces.push(newWorkspace);
    setData(data);
    return newWorkspace;
};

// Comment operations
export const addComment = (comment) => {
    const data = getData();
    const newComment = {
        ...comment,
        id: `cmt_${Date.now()}`,
        timestamp: new Date().toISOString(),
        workspaceId: data.activeWorkspace,
        replies: [],
        reactions: {}
    };
    data.comments.push(newComment);

    // Add activity directly to avoid race condition
    const newActivity = {
        type: 'comment_added',
        user: comment.author,
        target: comment.targetType,
        description: `Added comment on ${comment.targetTitle || comment.targetType}`,
        metadata: { commentId: newComment.id },
        id: `act_${Date.now()}`,
        timestamp: new Date().toISOString(),
        workspaceId: data.activeWorkspace
    };
    data.activities.unshift(newActivity);

    // Keep only last 100 activities
    if (data.activities.length > 100) {
        data.activities = data.activities.slice(0, 100);
    }

    setData(data);
    return newComment;
};

export const getComments = (targetType, targetId) => {
    const data = getData();
    return data.comments.filter(
        c => c.workspaceId === data.activeWorkspace &&
            c.targetType === targetType &&
            c.targetId === targetId
    );
};

export const addReply = (commentId, reply) => {
    const data = getData();
    const comment = data.comments.find(c => c.id === commentId);
    if (comment) {
        const newReply = {
            ...reply,
            id: `reply_${Date.now()}`,
            timestamp: new Date().toISOString()
        };
        comment.replies.push(newReply);
        setData(data);
        return newReply;
    }
};

export const toggleReaction = (commentId, reactionType, user) => {
    const data = getData();
    const comment = data.comments.find(c => c.id === commentId);
    if (comment) {
        if (!comment.reactions[reactionType]) {
            comment.reactions[reactionType] = [];
        }
        const index = comment.reactions[reactionType].indexOf(user.id);
        if (index > -1) {
            comment.reactions[reactionType].splice(index, 1);
        } else {
            comment.reactions[reactionType].push(user.id);
        }
        setData(data);
    }
};

// Alert operations
export const addAlert = (alert) => {
    const data = getData();
    const newAlert = {
        ...alert,
        id: `alert_${Date.now()}`,
        timestamp: new Date().toISOString(),
        read: false,
        workspaceId: data.activeWorkspace
    };
    data.alerts.unshift(newAlert); // Add to beginning

    // Add activity directly to avoid race condition
    const newActivity = {
        type: 'alert_triggered',
        severity: alert.severity,
        description: alert.title,
        metadata: { alertId: newAlert.id },
        id: `act_${Date.now()}`,
        timestamp: new Date().toISOString(),
        workspaceId: data.activeWorkspace
    };
    data.activities.unshift(newActivity);

    // Keep only last 100 activities
    if (data.activities.length > 100) {
        data.activities = data.activities.slice(0, 100);
    }

    setData(data);
    return newAlert;
};

export const markAlertRead = (alertId) => {
    const data = getData();
    const alert = data.alerts.find(a => a.id === alertId);
    if (alert) {
        alert.read = true;
        setData(data);
    }
};

export const getUnreadAlertCount = () => {
    const data = getData();
    return data.alerts.filter(a => !a.read && a.workspaceId === data.activeWorkspace).length;
};

// Activity operations
export const addActivity = (activity) => {
    const data = getData();
    const newActivity = {
        ...activity,
        id: `act_${Date.now()}`,
        timestamp: new Date().toISOString(),
        workspaceId: data.activeWorkspace
    };
    data.activities.unshift(newActivity); // Add to beginning

    // Keep only last 100 activities
    if (data.activities.length > 100) {
        data.activities = data.activities.slice(0, 100);
    }

    setData(data);
    return newActivity;
};


export const getActivities = (limit = 20) => {
    const data = getData();
    return data.activities
        .filter(a => a.workspaceId === data.activeWorkspace)
        .slice(0, limit);
};

// Export data
export const exportData = () => {
    return getData();
};

// Import data
export const importData = (data) => {
    setData(data);
};

// Clear all data (reset)
export const clearData = () => {
    localStorage.removeItem(STORAGE_KEY);
    return getDefaultData();
};

// Migration helper
const migrateData = (oldData) => {
    const newData = getDefaultData();
    // Merge old data with new structure
    return { ...newData, ...oldData, version: STORAGE_VERSION };
};

export default {
    getData,
    setData,
    updateSection,
    getActiveWorkspace,
    setActiveWorkspace,
    createWorkspace,
    addComment,
    getComments,
    addReply,
    toggleReaction,
    addAlert,
    markAlertRead,
    getUnreadAlertCount,
    addActivity,
    getActivities,
    exportData,
    importData,
    clearData
};
