import React, { useState, useEffect, useRef } from 'react';
import { X, Send, MoreHorizontal, MessageSquare, ThumbsUp, Heart } from 'lucide-react';
import { useCollaboration } from '../../context/CollaborationContext';
import '../../styles/CommentThread.css';

const CommentThread = ({ targetType, targetId, onClose, title }) => {
    const { getComments, addComment, addReply, toggleReaction, currentUser } = useCollaboration();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replyText, setReplyText] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Load initial comments
        const loadComments = () => {
            setComments(getComments(targetType, targetId));
        };
        loadComments();

        // Poll for updates (since we're using localStorage events in context, this might be redundant but good for safety)
        const interval = setInterval(loadComments, 1000);
        return () => clearInterval(interval);
    }, [targetType, targetId, getComments]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [comments]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            addComment({
                targetType,
                targetId,
                content: newComment,
                targetTitle: title
            });
            setNewComment('');
        }
    };

    const handleReply = (commentId) => {
        if (replyText.trim()) {
            addReply(commentId, replyText);
            setReplyText('');
            setReplyingTo(null);
        }
    };

    const CommentItem = ({ comment }) => (
        <div className="comment-item">
            <div className="comment-header">
                <div className="comment-author-avatar" style={{ backgroundColor: comment.author.color || '#3b82f6' }}>
                    {comment.author.avatar}
                </div>
                <div className="comment-meta">
                    <span className="comment-author-name">{comment.author.name}</span>
                    <span className="comment-time">{new Date(comment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </div>

            <div className="comment-content">{comment.content}</div>

            <div className="comment-actions">
                <button
                    className="action-btn"
                    onClick={() => toggleReaction(comment.id, 'thumbsUp')}
                >
                    <ThumbsUp size={12} className={comment.reactions?.thumbsUp?.includes(currentUser.id) ? 'active-reaction' : ''} />
                    <span>{comment.reactions?.thumbsUp?.length || 0}</span>
                </button>
                <button
                    className="action-btn"
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                >
                    Reply
                </button>
            </div>

            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
                <div className="replies-list">
                    {comment.replies.map(reply => (
                        <div key={reply.id} className="reply-item">
                            <div className="reply-header">
                                <span className="reply-author">{reply.author.name}</span>
                                <span className="reply-time">{new Date(reply.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <div className="reply-content">{reply.content}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* Reply Input */}
            {replyingTo === comment.id && (
                <div className="reply-input-container">
                    <input
                        type="text"
                        className="reply-input"
                        placeholder="Write a reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleReply(comment.id)}
                        autoFocus
                    />
                </div>
            )}
        </div>
    );

    return (
        <div className="comment-thread-overlay">
            <div className="comment-thread-panel">
                <div className="thread-header">
                    <div className="thread-title-group">
                        <MessageSquare size={18} />
                        <span className="thread-title">Comments</span>
                        <span className="thread-subtitle">on {title}</span>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="thread-content">
                    {comments.length === 0 ? (
                        <div className="empty-state">
                            <MessageSquare size={48} className="empty-icon" />
                            <h3>No comments yet</h3>
                            <p>Start the discussion about this metric.</p>
                        </div>
                    ) : (
                        comments.map(comment => (
                            <CommentItem key={comment.id} comment={comment} />
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form className="thread-footer" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="main-comment-input"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button type="submit" className="send-btn" disabled={!newComment.trim()}>
                        <Send size={16} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CommentThread;
