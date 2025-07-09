import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Image from '../../../components/AppImage';

const DiscussionThread = ({ lessonId }) => {
  const [discussions, setDiscussions] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [expandedComments, setExpandedComments] = useState(new Set());
  const textareaRef = useRef(null);

  const mockDiscussions = [
    {
      id: 1,
      user: {
        name: "Alex Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
        role: "Student",
        level: "Intermediate"
      },
      content: "Great explanation of automatic batching! I\'m curious about how this affects performance in larger applications. Has anyone tested this with complex state management?",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      likes: 12,
      dislikes: 1,
      isLiked: false,
      isDisliked: false,
      replies: [
        {
          id: 11,
          user: {
            name: "Sarah Chen",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c5e8b1?w=50&h=50&fit=crop&crop=face",
            role: "Instructor",
            level: "Expert"
          },
          content: "Excellent question! In larger applications, automatic batching can significantly improve performance by reducing unnecessary re-renders. I'll cover this in more detail in the next module.",
          timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
          likes: 8,
          dislikes: 0,
          isLiked: true,
          isDisliked: false,
          isInstructor: true
        },
        {
          id: 12,
          user: {
            name: "Mike Johnson",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
            role: "Student",
            level: "Advanced"
          },
          content: "I've been using React 18 in production and the performance improvements are noticeable, especially with forms that have multiple state updates.",
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          likes: 5,
          dislikes: 0,
          isLiked: false,
          isDisliked: false
        }
      ]
    },
    {
      id: 2,
      user: {
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
        role: "Student",
        level: "Beginner"
      },
      content: "I'm having trouble understanding the difference between automatic batching in React 18 vs React 17. Could someone explain this with a simple example?",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      likes: 6,
      dislikes: 0,
      isLiked: false,
      isDisliked: false,
      replies: [
        {
          id: 21,
          user: {
            name: "David Kim",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
            role: "Student",
            level: "Advanced"
          },
          content: `Here's a simple example:\n\nReact 17: Multiple setState calls in setTimeout would cause multiple renders\nReact 18: They're automatically batched into one render\n\nThis makes apps faster!`,
          timestamp: new Date(Date.now() - 3.5 * 60 * 60 * 1000),
          likes: 9,
          dislikes: 0,
          isLiked: false,
          isDisliked: false
        }
      ]
    },
    {
      id: 3,
      user: {
        name: "Lisa Rodriguez",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face",
        role: "Student",
        level: "Intermediate"
      },
      content: "The code examples in this lesson are really helpful! I appreciate how you break down complex concepts into digestible pieces.",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      likes: 4,
      dislikes: 0,
      isLiked: true,
      isDisliked: false,
      replies: []
    }
  ];

  useEffect(() => {
    setDiscussions(mockDiscussions);
  }, [lessonId]);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const handleLike = (commentId, isReply = false, parentId = null) => {
    setDiscussions(prev => prev.map(discussion => {
      if (isReply && discussion.id === parentId) {
        return {
          ...discussion,
          replies: discussion.replies.map(reply => {
            if (reply.id === commentId) {
              return {
                ...reply,
                likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                dislikes: reply.isDisliked ? reply.dislikes - 1 : reply.dislikes,
                isLiked: !reply.isLiked,
                isDisliked: false
              };
            }
            return reply;
          })
        };
      } else if (!isReply && discussion.id === commentId) {
        return {
          ...discussion,
          likes: discussion.isLiked ? discussion.likes - 1 : discussion.likes + 1,
          dislikes: discussion.isDisliked ? discussion.dislikes - 1 : discussion.dislikes,
          isLiked: !discussion.isLiked,
          isDisliked: false
        };
      }
      return discussion;
    }));
  };

  const handleDislike = (commentId, isReply = false, parentId = null) => {
    setDiscussions(prev => prev.map(discussion => {
      if (isReply && discussion.id === parentId) {
        return {
          ...discussion,
          replies: discussion.replies.map(reply => {
            if (reply.id === commentId) {
              return {
                ...reply,
                dislikes: reply.isDisliked ? reply.dislikes - 1 : reply.dislikes + 1,
                likes: reply.isLiked ? reply.likes - 1 : reply.likes,
                isDisliked: !reply.isDisliked,
                isLiked: false
              };
            }
            return reply;
          })
        };
      } else if (!isReply && discussion.id === commentId) {
        return {
          ...discussion,
          dislikes: discussion.isDisliked ? discussion.dislikes - 1 : discussion.dislikes + 1,
          likes: discussion.isLiked ? discussion.likes - 1 : discussion.likes,
          isDisliked: !discussion.isDisliked,
          isLiked: false
        };
      }
      return discussion;
    }));
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      user: {
        name: "You",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face",
        role: "Student",
        level: "Intermediate"
      },
      content: newComment,
      timestamp: new Date(),
      likes: 0,
      dislikes: 0,
      isLiked: false,
      isDisliked: false,
      replies: []
    };

    setDiscussions(prev => [comment, ...prev]);
    setNewComment('');
  };

  const handleSubmitReply = (parentId) => {
    if (!replyText.trim()) return;

    const reply = {
      id: Date.now(),
      user: {
        name: "You",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face",
        role: "Student",
        level: "Intermediate"
      },
      content: replyText,
      timestamp: new Date(),
      likes: 0,
      dislikes: 0,
      isLiked: false,
      isDisliked: false
    };

    setDiscussions(prev => prev.map(discussion => {
      if (discussion.id === parentId) {
        return {
          ...discussion,
          replies: [...discussion.replies, reply]
        };
      }
      return discussion;
    }));

    setReplyText('');
    setReplyingTo(null);
  };

  const toggleExpanded = (commentId) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const sortedDiscussions = [...discussions].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return a.timestamp - b.timestamp;
      case 'popular':
        return (b.likes - b.dislikes) - (a.likes - a.dislikes);
      default: // newest
        return b.timestamp - a.timestamp;
    }
  });

  const filteredDiscussions = sortedDiscussions.filter(discussion => {
    switch (filterBy) {
      case 'instructor':
        return discussion.user.role === 'Instructor' || discussion.replies.some(reply => reply.isInstructor);
      case 'questions':
        return discussion.content.includes('?');
      default: // all
        return true;
    }
  });

  return (
    <div className="glass-card border border-white/20 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="MessageSquare" size={24} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Discussion</h3>
          <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
            {discussions.reduce((total, d) => total + 1 + d.replies.length, 0)} comments
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-sm text-text-primary"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="popular">Most Popular</option>
          </select>

          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-sm text-text-primary"
          >
            <option value="all">All Comments</option>
            <option value="instructor">Instructor Only</option>
            <option value="questions">Questions</option>
          </select>
        </div>
      </div>

      {/* New Comment */}
      <div className="mb-6">
        <div className="flex items-start space-x-3">
          <Image
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face"
            alt="Your avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ask a question or share your thoughts..."
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-text-primary placeholder-text-tertiary resize-none focus:outline-none focus:border-primary transition-colors"
              rows="3"
            />
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  iconName="Bold"
                  className="h-8 w-8 p-0 text-text-secondary hover:text-text-primary"
                />
                <Button
                  variant="ghost"
                  iconName="Italic"
                  className="h-8 w-8 p-0 text-text-secondary hover:text-text-primary"
                />
                <Button
                  variant="ghost"
                  iconName="Code"
                  className="h-8 w-8 p-0 text-text-secondary hover:text-text-primary"
                />
                <Button
                  variant="ghost"
                  iconName="Link"
                  className="h-8 w-8 p-0 text-text-secondary hover:text-text-primary"
                />
              </div>
              <Button
                variant="primary"
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
                iconName="Send"
                iconPosition="right"
              >
                Post Comment
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="space-y-6">
        {filteredDiscussions.map((discussion) => (
          <div key={discussion.id} className="space-y-4">
            {/* Main Comment */}
            <div className="flex items-start space-x-3">
              <Image
                src={discussion.user.avatar}
                alt={discussion.user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              
              <div className="flex-1">
                <div className="glass-surface p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-text-primary">{discussion.user.name}</span>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        discussion.user.role === 'Instructor' ?'bg-primary/20 text-primary' :'bg-secondary/20 text-secondary'
                      }`}>
                        {discussion.user.role}
                      </span>
                      <span className="text-xs text-text-tertiary">{discussion.user.level}</span>
                    </div>
                    <span className="text-xs text-text-tertiary">{formatTimeAgo(discussion.timestamp)}</span>
                  </div>
                  
                  <p className="text-text-secondary leading-relaxed whitespace-pre-wrap">
                    {discussion.content}
                  </p>
                </div>

                {/* Comment Actions */}
                <div className="flex items-center space-x-4 mt-3">
                  <button
                    onClick={() => handleLike(discussion.id)}
                    className={`flex items-center space-x-1 text-sm transition-colors ${
                      discussion.isLiked ? 'text-primary' : 'text-text-tertiary hover:text-text-secondary'
                    }`}
                  >
                    <Icon name="ThumbsUp" size={16} />
                    <span>{discussion.likes}</span>
                  </button>

                  <button
                    onClick={() => handleDislike(discussion.id)}
                    className={`flex items-center space-x-1 text-sm transition-colors ${
                      discussion.isDisliked ? 'text-error' : 'text-text-tertiary hover:text-text-secondary'
                    }`}
                  >
                    <Icon name="ThumbsDown" size={16} />
                    <span>{discussion.dislikes}</span>
                  </button>

                  <button
                    onClick={() => setReplyingTo(replyingTo === discussion.id ? null : discussion.id)}
                    className="flex items-center space-x-1 text-sm text-text-tertiary hover:text-text-secondary transition-colors"
                  >
                    <Icon name="Reply" size={16} />
                    <span>Reply</span>
                  </button>

                  {discussion.replies.length > 0 && (
                    <button
                      onClick={() => toggleExpanded(discussion.id)}
                      className="flex items-center space-x-1 text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      <Icon name={expandedComments.has(discussion.id) ? 'ChevronUp' : 'ChevronDown'} size={16} />
                      <span>{discussion.replies.length} replies</span>
                    </button>
                  )}
                </div>

                {/* Reply Form */}
                {replyingTo === discussion.id && (
                  <div className="mt-4 ml-4 flex items-start space-x-3">
                    <Image
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face"
                      alt="Your avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply..."
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-text-primary placeholder-text-tertiary resize-none focus:outline-none focus:border-primary transition-colors"
                        rows="2"
                      />
                      <div className="flex items-center justify-end space-x-2 mt-2">
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyText('');
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => handleSubmitReply(discussion.id)}
                          disabled={!replyText.trim()}
                          iconName="Send"
                          iconPosition="right"
                        >
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Replies */}
                {expandedComments.has(discussion.id) && discussion.replies.length > 0 && (
                  <div className="mt-4 ml-4 space-y-3">
                    {discussion.replies.map((reply) => (
                      <div key={reply.id} className="flex items-start space-x-3">
                        <Image
                          src={reply.user.avatar}
                          alt={reply.user.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        
                        <div className="flex-1">
                          <div className="glass-surface p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-text-primary text-sm">{reply.user.name}</span>
                                {reply.isInstructor && (
                                  <span className="px-2 py-0.5 text-xs rounded-full bg-primary/20 text-primary">
                                    Instructor
                                  </span>
                                )}
                                <span className="text-xs text-text-tertiary">{reply.user.level}</span>
                              </div>
                              <span className="text-xs text-text-tertiary">{formatTimeAgo(reply.timestamp)}</span>
                            </div>
                            
                            <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                              {reply.content}
                            </p>
                          </div>

                          <div className="flex items-center space-x-4 mt-2">
                            <button
                              onClick={() => handleLike(reply.id, true, discussion.id)}
                              className={`flex items-center space-x-1 text-xs transition-colors ${
                                reply.isLiked ? 'text-primary' : 'text-text-tertiary hover:text-text-secondary'
                              }`}
                            >
                              <Icon name="ThumbsUp" size={14} />
                              <span>{reply.likes}</span>
                            </button>

                            <button
                              onClick={() => handleDislike(reply.id, true, discussion.id)}
                              className={`flex items-center space-x-1 text-xs transition-colors ${
                                reply.isDisliked ? 'text-error' : 'text-text-tertiary hover:text-text-secondary'
                              }`}
                            >
                              <Icon name="ThumbsDown" size={14} />
                              <span>{reply.dislikes}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDiscussions.length === 0 && (
        <div className="text-center py-12">
          <Icon name="MessageSquare" size={48} className="text-text-tertiary mx-auto mb-4" />
          <h4 className="text-lg font-medium text-text-primary mb-2">No discussions yet</h4>
          <p className="text-text-secondary">Be the first to start a conversation about this lesson!</p>
        </div>
      )}
    </div>
  );
};

export default DiscussionThread;