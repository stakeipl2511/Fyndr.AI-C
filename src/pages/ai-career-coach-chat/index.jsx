import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ChatMessage from './components/ChatMessage';
import SuggestionChips from './components/SuggestionChips';
import ChatInput from './components/ChatInput';
import ChatHistory from './components/ChatHistory';
import StatusIndicator from './components/StatusIndicator';
import WelcomeMessage from './components/WelcomeMessage';

const AICareerCoachChat = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [aiStatus, setAiStatus] = useState('online');
  const [currentConversationId, setCurrentConversationId] = useState(null);
  
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Mock conversation history
  const [conversations] = useState([
    {
      id: 1,
      title: 'Resume Review Session',
      category: 'resume-review',
      preview: 'Discussed improvements for software developer resume, focusing on technical skills and project descriptions.',
      lastActivity: new Date(Date.now() - 86400000), // 1 day ago
      messageCount: 12,
      hasActionItems: true
    },
    {
      id: 2,
      title: 'Interview Preparation',
      category: 'interview-prep',
      preview: 'Practiced behavioral questions and discussed STAR method for answering interview questions.',
      lastActivity: new Date(Date.now() - 172800000), // 2 days ago
      messageCount: 8,
      hasActionItems: false
    },
    {
      id: 3,
      title: 'Career Transition Planning',
      category: 'career-advice',
      preview: 'Explored transition from marketing to UX design, discussed required skills and learning path.',
      lastActivity: new Date(Date.now() - 604800000), // 1 week ago
      messageCount: 15,
      hasActionItems: true
    }
  ]);

  // Suggestion chips data
  const suggestions = [
    { text: 'Review my resume', icon: 'FileText' },
    { text: 'Salary negotiation tips', icon: 'DollarSign' },
    { text: 'Interview preparation', icon: 'MessageCircle' },
    { text: 'Career change advice', icon: 'Compass' },
    { text: 'Skill development plan', icon: 'TrendingUp' },
    { text: 'LinkedIn optimization', icon: 'Users' },
    { text: 'Job search strategy', icon: 'Search' },
    { text: 'Work-life balance', icon: 'Scale' }
  ];

  // Mock AI responses
  const getAIResponse = (userMessage) => {
    const responses = {
      'resume': {
        content: `I'd be happy to help you review your resume! Here are some key areas I can assist with:\n\n• **Content optimization** - Ensuring your experience highlights achievements with quantifiable results\n• **ATS compatibility** - Making sure your resume passes through applicant tracking systems\n• **Industry-specific keywords** - Incorporating relevant terms for your target role\n• **Format and structure** - Organizing information for maximum impact\n\nTo get started, you can upload your current resume or tell me about your target role and experience level. What specific aspect would you like to focus on first?`,
        actionItems: [
          'Upload current resume for detailed review','Identify target job descriptions for keyword analysis','Quantify achievements with specific metrics'
        ]
      },
      'salary': {
        content: `Great question! Salary negotiation is a crucial skill. Here's my strategic approach:\n\n• **Research thoroughly** - Use sites like Glassdoor, PayScale, and industry reports to understand market rates\n• **Document your value** - Prepare specific examples of your contributions and achievements\n• **Time it right** - Best to negotiate after receiving an offer, not during initial interviews\n• **Consider the full package** - Benefits, PTO, flexible work, professional development\n\nThe key is to frame it as a collaborative discussion about fair compensation based on market value and your contributions. Would you like me to help you prepare for a specific negotiation scenario?`,
        actionItems: [
          'Research salary ranges for your role and location',
          'Prepare 3-5 specific achievement examples',
          'Practice negotiation conversation'
        ]
      },
      'interview': {
        content: `Interview preparation is essential for success! Let me help you get ready:\n\n• **Common questions practice** - Behavioral, technical, and situational questions\n• **STAR method** - Structure your answers with Situation, Task, Action, Result\n• **Company research** - Understanding their culture, values, and recent developments\n• **Questions to ask** - Showing genuine interest and engagement\n\nI can conduct mock interviews, help you craft compelling stories, or focus on specific interview types (phone, video, panel, technical). What type of interview are you preparing for?`,
        actionItems: [
          'Practice 10 common behavioral questions',
          'Research company culture and recent news',
          'Prepare 5 thoughtful questions to ask interviewer'
        ]
      },
      'default': {
        content: `I'm here to help with all aspects of your career development! As your AI Career Coach, I can assist with:\n\n• **Resume and LinkedIn optimization**\n• **Interview preparation and practice**\n• **Career planning and goal setting**\n• **Skill development recommendations**\n• **Job search strategies**\n• **Salary negotiation guidance**\n• **Professional networking tips**\n• **Work-life balance advice**\n\nWhat specific area would you like to explore today? I'm here to provide personalized guidance based on your unique situation and goals.`
      }
    };

    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('resume')) return responses.resume;
    if (lowerMessage.includes('salary') || lowerMessage.includes('negotiation')) return responses.salary;
    if (lowerMessage.includes('interview')) return responses.interview;
    return responses.default;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText) => {
    const userMessage = {
      id: Date.now(),
      content: messageText,
      timestamp: new Date(),
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setShowSuggestions(false);
    setIsTyping(true);
    setAiStatus('processing');

    // Simulate AI processing delay
    setTimeout(() => {
      const aiResponse = getAIResponse(messageText);
      const aiMessage = {
        id: Date.now() + 1,
        content: aiResponse.content,
        timestamp: new Date(),
        isUser: false,
        actionItems: aiResponse.actionItems
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      setAiStatus('online');
    }, 1500);
  };

  const handleSuggestionClick = (suggestionText) => {
    handleSendMessage(suggestionText);
  };

  const handleQuickStart = (type) => {
    const quickStartMessages = {
      'resume-review': 'I need help reviewing my resume. Can you guide me through the process?',
      'interview-prep': 'I have an upcoming interview and need help preparing. What should I focus on?',
      'career-planning': 'I want to discuss my career goals and create a plan for advancement.',
      'skill-assessment': 'Can you help me identify which skills I should develop for my career goals?'
    };

    handleSendMessage(quickStartMessages[type] || quickStartMessages['career-planning']);
  };

  const handleFeedback = (messageId, feedbackType) => {
    console.log(`Message ${messageId} feedback: ${feedbackType}`);
    // Handle feedback logic here
  };

  const handleResumeConversation = (conversationId) => {
    console.log('Resuming conversation:', conversationId);
    setCurrentConversationId(conversationId);
    setIsHistoryOpen(false);
    // Load conversation messages here
  };

  const handleDeleteConversation = (conversationId) => {
    console.log('Deleting conversation:', conversationId);
    // Handle conversation deletion here
  };

  const handleExportChat = () => {
    const chatData = {
      conversationId: currentConversationId,
      messages: messages,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(chatData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `career-coach-chat-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-64 pt-16">
        <div className="max-w-4xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
          {/* Chat Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-4 border-b border-white/10 glass-card"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Bot" size={20} color="white" />
              </div>
              <div>
                <h1 className="font-semibold text-text-primary">AI Career Coach</h1>
                <StatusIndicator status={aiStatus} />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={() => setIsHistoryOpen(true)}
                iconName="History"
                className="h-9 w-9 p-0"
              />
              <Button
                variant="ghost"
                onClick={handleExportChat}
                iconName="Download"
                className="h-9 w-9 p-0"
                disabled={messages.length === 0}
              />
              <Button
                variant="ghost"
                onClick={() => {
                  setMessages([]);
                  setShowSuggestions(true);
                  setCurrentConversationId(null);
                }}
                iconName="RotateCcw"
                className="h-9 w-9 p-0"
              />
            </div>
          </motion.div>
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence mode="wait">
              {messages.length === 0 ? (
                <WelcomeMessage onQuickStart={handleQuickStart} userName="John" />
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      message={message}
                      isUser={message.isUser}
                      onFeedback={handleFeedback}
                    />
                  ))}
                  
                  {isTyping && (
                    <ChatMessage isTyping={true} />
                  )}
                </div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat Input Area */}
          <div className="p-4 border-t border-white/10 glass-card">
            <SuggestionChips
              suggestions={suggestions}
              onSuggestionClick={handleSuggestionClick}
              isVisible={showSuggestions && messages.length === 0}
            />
            
            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={isTyping}
              placeholder={isTyping ? "AI is thinking..." : "Ask me anything about your career..."}
            />
          </div>
        </div>
      </main>
      
      {/* Chat History Panel */}
      <ChatHistory
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        conversations={conversations}
        onResumeConversation={handleResumeConversation}
        onDeleteConversation={handleDeleteConversation}
      />
    </div>
  );
};

export default AICareerCoachChat;