import React, { useState } from 'react';
import { useCollaboration } from '../../context/CollaborationContext';
import { UserPlus, Trash2, Shield } from 'lucide-react';

const WorkspaceSettings = () => {
    const { activeWorkspace } = useCollaboration();
    const [workspaceName, setWorkspaceName] = useState(activeWorkspace?.name || '');

    return (
        <div className="workspace-settings">
            <div className="settings-section">
                <div className="section-header">
                    <h3 className="section-title">General</h3>
                    <p className="section-desc">Update your workspace details.</p>
                </div>

                <div className="form-group">
                    <label>Workspace Name</label>
                    <input
                        type="text"
                        className="form-input"
                        value={workspaceName}
                        onChange={(e) => setWorkspaceName(e.target.value)}
                    />
                </div>
            </div>

            <div className="settings-section">
                <div className="section-header">
                    <h3 className="section-title">Members</h3>
                    <p className="section-desc">Manage who has access to this workspace.</p>
                </div>

                <div className="members-list">
                    {activeWorkspace?.members.map(member => (
                        <div key={member.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '16px 0',
                            borderBottom: '1px solid var(--border-subtle)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div className="avatar-preview" style={{
                                    width: '40px',
                                    height: '40px',
                                    fontSize: '1rem',
                                    background: member.color || '#3b82f6'
                                }}>
                                    {member.avatar}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{member.name}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{member.role}</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
                                    <Shield size={14} style={{ marginRight: 6 }} /> Role
                                </button>
                                {member.role !== 'Admin' && (
                                    <button className="btn-danger" style={{ padding: '6px' }}>
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <button className="btn-primary" style={{ marginTop: '20px' }}>
                    <UserPlus size={18} /> Invite New Member
                </button>
            </div>
        </div>
    );
};

export default WorkspaceSettings;
