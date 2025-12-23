import React, { useState } from 'react';
import { useCollaboration } from '../../context/CollaborationContext';
import { X, Copy, Mail, UserPlus, Check, Link } from 'lucide-react';
import '../../styles/ShareModal.css';

const ShareModal = ({ onClose }) => {
    const { activeWorkspace, addActivity } = useCollaboration();
    const [activeTab, setActiveTab] = useState('invite');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('viewer');
    const [copied, setCopied] = useState(false);
    const [inviteSent, setInviteSent] = useState(false);

    const handleCopyLink = () => {
        // Simulate copying link
        const link = `https://app.competitorai.com/w/${activeWorkspace.id}`;
        navigator.clipboard.writeText(link).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);

            addActivity({
                type: 'link_copied',
                description: `Copied invite link for ${activeWorkspace.name}`,
                target: 'Workspace',
                metadata: { workspaceId: activeWorkspace.id }
            });
        });
    };

    const handleInvite = (e) => {
        e.preventDefault();
        if (!email) return;

        // Simulate sending invite
        setInviteSent(true);

        addActivity({
            type: 'invite_sent',
            description: `Invited ${email} as ${role}`,
            target: 'Workspace',
            metadata: { email, role, workspaceId: activeWorkspace.id }
        });

        setTimeout(() => {
            setInviteSent(false);
            setEmail('');
        }, 3000);
    };

    return (
        <div className="share-modal-overlay">
            <div className="share-modal">
                <div className="share-header">
                    <h3>Share "{activeWorkspace?.name}"</h3>
                    <button className="close-btn" onClick={onClose}><X size={20} /></button>
                </div>

                <div className="share-tabs">
                    <button
                        className={`share-tab ${activeTab === 'invite' ? 'active' : ''}`}
                        onClick={() => setActiveTab('invite')}
                    >
                        <Mail size={16} /> Invite
                    </button>
                    <button
                        className={`share-tab ${activeTab === 'link' ? 'active' : ''}`}
                        onClick={() => setActiveTab('link')}
                    >
                        <Link size={16} /> Copy Link
                    </button>
                </div>

                <div className="share-content">
                    {activeTab === 'invite' ? (
                        <div className="invite-section">
                            <form onSubmit={handleInvite}>
                                <div className="invite-input-group">
                                    <input
                                        type="email"
                                        placeholder="Enter email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                                        <option value="viewer">Viewer</option>
                                        <option value="editor">Editor</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    <button type="submit" className="invite-btn" disabled={inviteSent}>
                                        {inviteSent ? <Check size={16} /> : <UserPlus size={16} />}
                                        {inviteSent ? 'Sent' : 'Invite'}
                                    </button>
                                </div>
                            </form>

                            <div className="members-list">
                                <h4>Current Members</h4>
                                {activeWorkspace?.members.map(member => (
                                    <div key={member.id} className="member-item">
                                        <div className="member-info">
                                            <div className="member-avatar" style={{ backgroundColor: member.color || '#3b82f6' }}>
                                                {member.avatar}
                                            </div>
                                            <div className="member-details">
                                                <span className="member-name">{member.name}</span>
                                                <span className="member-role">{member.role}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="link-section">
                            <p className="link-description">
                                Anyone with this link can view this workspace based on your organization settings.
                            </p>
                            <div className="link-box">
                                <input
                                    type="text"
                                    readOnly
                                    value={`https://app.competitorai.com/w/${activeWorkspace?.id}`}
                                />
                                <button
                                    className={`copy-btn ${copied ? 'copied' : ''}`}
                                    onClick={handleCopyLink}
                                >
                                    {copied ? <Check size={16} /> : <Copy size={16} />}
                                    {copied ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                            <div className="link-settings">
                                <label>
                                    <input type="checkbox" defaultChecked />
                                    Allow viewers to comment
                                </label>
                                <label>
                                    <input type="checkbox" />
                                    Password protect link
                                </label>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShareModal;
