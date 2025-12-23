import React, { useState } from 'react';
import { ChevronDown, Plus, Settings, Users, Folder } from 'lucide-react';
import { useCollaboration } from '../context/CollaborationContext';
import '../styles/WorkspaceSwitcher.css';

const WorkspaceSwitcher = ({ onNavigate }) => {
    const { workspaces, activeWorkspace, switchWorkspace, createWorkspace } = useCollaboration();
    const [isOpen, setIsOpen] = useState(false);
    const [showNewWorkspace, setShowNewWorkspace] = useState(false);
    const [newWorkspaceName, setNewWorkspaceName] = useState('');

    const handleSwitchWorkspace = (workspaceId) => {
        switchWorkspace(workspaceId);
        setIsOpen(false);
    };

    const handleSettingsClick = () => {
        if (onNavigate) {
            onNavigate('settings-workspace');
        }
        setIsOpen(false);
    };

    const handleCreateWorkspace = (e) => {
        e.preventDefault();
        if (newWorkspaceName.trim()) {
            createWorkspace({
                name: newWorkspaceName,
                description: '',
                members: activeWorkspace.members // Copy current members
            });
            setNewWorkspaceName('');
            setShowNewWorkspace(false);
            setIsOpen(false);
        }
    };

    return (
        <div className="workspace-switcher">
            <button
                className="workspace-trigger"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="workspace-info">
                    <Folder size={16} />
                    <span className="workspace-name">{activeWorkspace?.name || 'Select Workspace'}</span>
                </div>
                <ChevronDown size={16} className={`chevron ${isOpen ? 'open' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div className="workspace-overlay" onClick={() => setIsOpen(false)} />
                    <div className="workspace-dropdown">
                        <div className="dropdown-header">
                            <span className="dropdown-title">Workspaces</span>
                            <button
                                className="btn-icon"
                                onClick={() => setShowNewWorkspace(true)}
                                title="New Workspace"
                            >
                                <Plus size={16} />
                            </button>
                        </div>

                        {showNewWorkspace && (
                            <form className="new-workspace-form" onSubmit={handleCreateWorkspace}>
                                <input
                                    type="text"
                                    placeholder="Workspace name..."
                                    value={newWorkspaceName}
                                    onChange={(e) => setNewWorkspaceName(e.target.value)}
                                    autoFocus
                                    className="workspace-input"
                                />
                                <div className="form-actions">
                                    <button type="submit" className="btn-create">Create</button>
                                    <button
                                        type="button"
                                        className="btn-cancel"
                                        onClick={() => {
                                            setShowNewWorkspace(false);
                                            setNewWorkspaceName('');
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}

                        <div className="workspace-list">
                            {workspaces.map(workspace => (
                                <button
                                    key={workspace.id}
                                    className={`workspace-item ${workspace.id === activeWorkspace?.id ? 'active' : ''}`}
                                    onClick={() => handleSwitchWorkspace(workspace.id)}
                                >
                                    <div className="workspace-item-info">
                                        <div className="workspace-item-name">{workspace.name}</div>
                                        {workspace.description && (
                                            <div className="workspace-item-desc">{workspace.description}</div>
                                        )}
                                    </div>
                                    <div className="workspace-item-meta">
                                        <Users size={12} />
                                        <span>{workspace.members.length}</span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="dropdown-footer">
                            <button className="dropdown-action" onClick={handleSettingsClick}>
                                <Settings size={14} />
                                <span>Workspace Settings</span>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default WorkspaceSwitcher;
