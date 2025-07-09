import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import FilterSidebar from './components/FilterSidebar';
import SearchHeader from './components/SearchHeader';
import CandidateFeed from './components/CandidateFeed';
import Icon from '../../components/AppIcon';


const CandidateDiscoverySourcing = () => {
  const [filters, setFilters] = useState({
    skills: [],
    experience: [],
    salary: { min: '', max: '' },
    location: { types: [], cities: '' },
    availability: [],
    matchScore: 0
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('match');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [savedSearches, setSavedSearches] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Mock candidates data
  const mockCandidates = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Senior Frontend Developer",
      location: "San Francisco, CA",
      experience: "6 years",
      availability: "2 weeks notice",
      matchScore: 94,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9a1e7e4?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      isShortlisted: false,
      lastActive: "2 hours ago",
      salaryExpectation: "$120k - $150k",
      topSkills: [
        { name: "React", proficiency: 95 },
        { name: "TypeScript", proficiency: 88 },
        { name: "Node.js", proficiency: 82 },
        { name: "GraphQL", proficiency: 78 },
        { name: "AWS", proficiency: 75 }
      ],
      portfolio: [
        {
          name: "E-commerce Platform",
          description: "React-based shopping platform with 1M+ users",
          technologies: ["React", "Redux", "Node.js"]
        },
        {
          name: "Analytics Dashboard",
          description: "Real-time data visualization tool",
          technologies: ["D3.js", "React", "Python"]
        }
      ],
      notes: ""
    },
    {
      id: 2,
      name: "Marcus Johnson",
      title: "Full Stack Engineer",
      location: "Austin, TX",
      experience: "4 years",
      availability: "Immediate",
      matchScore: 87,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      isOnline: false,
      isShortlisted: true,
      lastActive: "1 day ago",
      salaryExpectation: "$95k - $120k",
      topSkills: [
        { name: "JavaScript", proficiency: 92 },
        { name: "Python", proficiency: 85 },
        { name: "Django", proficiency: 80 },
        { name: "PostgreSQL", proficiency: 78 },
        { name: "Docker", proficiency: 72 }
      ],
      portfolio: [
        {
          name: "Task Management App",
          description: "Collaborative project management tool",
          technologies: ["Vue.js", "Django", "PostgreSQL"]
        },
        {
          name: "API Gateway",
          description: "Microservices architecture implementation",
          technologies: ["Node.js", "Docker", "Kubernetes"]
        }
      ],
      notes: "Strong problem-solving skills, good cultural fit"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "DevOps Engineer",
      location: "Remote",
      experience: "5 years",
      availability: "1 month notice",
      matchScore: 91,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      isShortlisted: false,
      lastActive: "30 minutes ago",
      salaryExpectation: "$110k - $140k",
      topSkills: [
        { name: "AWS", proficiency: 94 },
        { name: "Kubernetes", proficiency: 89 },
        { name: "Terraform", proficiency: 86 },
        { name: "Python", proficiency: 83 },
        { name: "Jenkins", proficiency: 81 }
      ],
      portfolio: [
        {
          name: "CI/CD Pipeline",
          description: "Automated deployment system for microservices",
          technologies: ["Jenkins", "Docker", "AWS"]
        },
        {
          name: "Infrastructure as Code",
          description: "Terraform modules for cloud infrastructure",
          technologies: ["Terraform", "AWS", "Ansible"]
        }
      ],
      notes: ""
    },
    {
      id: 4,
      name: "David Kim",
      title: "Backend Developer",
      location: "Seattle, WA",
      experience: "3 years",
      availability: "3 weeks notice",
      matchScore: 79,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      isOnline: false,
      isShortlisted: false,
      lastActive: "3 hours ago",
      salaryExpectation: "$85k - $110k",
      topSkills: [
        { name: "Java", proficiency: 88 },
        { name: "Spring Boot", proficiency: 85 },
        { name: "MongoDB", proficiency: 82 },
        { name: "Redis", proficiency: 78 },
        { name: "Kafka", proficiency: 75 }
      ],
      portfolio: [
        {
          name: "Messaging System",
          description: "High-throughput message processing platform",
          technologies: ["Java", "Kafka", "MongoDB"]
        },
        {
          name: "Payment Gateway",
          description: "Secure payment processing service",
          technologies: ["Spring Boot", "PostgreSQL", "Redis"]
        }
      ],
      notes: ""
    },
    {
      id: 5,
      name: "Lisa Wang",
      title: "UI/UX Designer",
      location: "New York, NY",
      experience: "4 years",
      availability: "2 weeks notice",
      matchScore: 85,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      isShortlisted: false,
      lastActive: "1 hour ago",
      salaryExpectation: "$90k - $115k",
      topSkills: [
        { name: "Figma", proficiency: 95 },
        { name: "Adobe Creative Suite", proficiency: 90 },
        { name: "Prototyping", proficiency: 88 },
        { name: "User Research", proficiency: 85 },
        { name: "HTML/CSS", proficiency: 80 }
      ],
      portfolio: [
        {
          name: "Mobile Banking App",
          description: "Complete UX redesign for financial app",
          technologies: ["Figma", "Principle", "Sketch"]
        },
        {
          name: "Design System",
          description: "Comprehensive component library",
          technologies: ["Figma", "Storybook", "React"]
        }
      ],
      notes: ""
    },
    {
      id: 6,
      name: "Alex Thompson",
      title: "Data Scientist",
      location: "Boston, MA",
      experience: "5 years",
      availability: "1 month notice",
      matchScore: 82,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      isOnline: false,
      isShortlisted: true,
      lastActive: "5 hours ago",
      salaryExpectation: "$105k - $130k",
      topSkills: [
        { name: "Python", proficiency: 93 },
        { name: "Machine Learning", proficiency: 89 },
        { name: "TensorFlow", proficiency: 86 },
        { name: "SQL", proficiency: 84 },
        { name: "R", proficiency: 81 }
      ],
      portfolio: [
        {
          name: "Recommendation Engine",
          description: "ML-powered product recommendation system",
          technologies: ["Python", "TensorFlow", "AWS"]
        },
        {
          name: "Fraud Detection",
          description: "Real-time fraud detection algorithm",
          technologies: ["Python", "Scikit-learn", "Kafka"]
        }
      ],
      notes: "Excellent analytical skills, published researcher"
    }
  ];

  // Mock saved searches
  const mockSavedSearches = [
    {
      name: "Senior React Developers",
      filters: {
        skills: ["React", "TypeScript"],
        experience: ["senior"],
        salary: { min: "100000", max: "150000" },
        location: { types: ["remote"], cities: "" },
        availability: ["immediate", "short"],
        matchScore: 80
      }
    },
    {
      name: "DevOps Engineers",
      filters: {
        skills: ["AWS", "Kubernetes", "Docker"],
        experience: ["mid", "senior"],
        salary: { min: "90000", max: "140000" },
        location: { types: ["remote", "hybrid"], cities: "" },
        availability: ["short", "medium"],
        matchScore: 75
      }
    }
  ];

  // Initialize data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCandidates(mockCandidates);
      setSavedSearches(mockSavedSearches);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter candidates based on current filters and search
  const filteredCandidates = useCallback(() => {
    let filtered = [...mockCandidates];

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(candidate => 
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.topSkills.some(skill => 
          skill.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply skill filters
    if (filters.skills.length > 0) {
      filtered = filtered.filter(candidate =>
        filters.skills.some(skill =>
          candidate.topSkills.some(candidateSkill =>
            candidateSkill.name.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }

    // Apply experience filters
    if (filters.experience.length > 0) {
      filtered = filtered.filter(candidate => {
        const years = parseInt(candidate.experience);
        return filters.experience.some(level => {
          switch (level) {
            case 'entry': return years <= 2;
            case 'mid': return years >= 3 && years <= 5;
            case 'senior': return years >= 6 && years <= 10;
            case 'lead': return years > 10;
            default: return true;
          }
        });
      });
    }

    // Apply match score filter
    if (filters.matchScore > 0) {
      filtered = filtered.filter(candidate => candidate.matchScore >= filters.matchScore);
    }

    // Apply location filters
    if (filters.location.types.length > 0) {
      filtered = filtered.filter(candidate => {
        if (filters.location.types.includes('remote')) {
          return candidate.location.toLowerCase().includes('remote');
        }
        return true; // For simplicity, assume all others match
      });
    }

    // Apply salary filters
    if (filters.salary.min || filters.salary.max) {
      filtered = filtered.filter(candidate => {
        const salaryRange = candidate.salaryExpectation.match(/\$(\d+)k/g);
        if (salaryRange && salaryRange.length >= 2) {
          const minSalary = parseInt(salaryRange[0].replace('$', '').replace('k', '')) * 1000;
          const maxSalary = parseInt(salaryRange[1].replace('$', '').replace('k', '')) * 1000;
          
          const filterMin = filters.salary.min ? parseInt(filters.salary.min) : 0;
          const filterMax = filters.salary.max ? parseInt(filters.salary.max) : Infinity;
          
          return maxSalary >= filterMin && minSalary <= filterMax;
        }
        return true;
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'match':
          return b.matchScore - a.matchScore;
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience);
        case 'activity':
          return new Date(b.lastActive) - new Date(a.lastActive);
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters, searchQuery, sortBy]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleCandidateSelect = (candidateId) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleBulkAction = (action, candidateIds) => {
    console.log(`Bulk action: ${action} for candidates:`, candidateIds);
    
    switch (action) {
      case 'shortlist':
        setCandidates(prev => prev.map(candidate => 
          candidateIds.includes(candidate.id)
            ? { ...candidate, isShortlisted: true }
            : candidate
        ));
        break;
      case 'message':
        // Handle bulk messaging
        break;
      case 'export':
        // Handle export
        break;
      case 'tag':
        // Handle tagging
        break;
    }
    
    setSelectedCandidates([]);
  };

  const handleShortlist = (candidateId, isShortlisted) => {
    setCandidates(prev => prev.map(candidate => 
      candidate.id === candidateId
        ? { ...candidate, isShortlisted }
        : candidate
    ));
  };

  const handleMessage = (candidateId) => {
    console.log('Message candidate:', candidateId);
    // Implement messaging functionality
  };

  const handleRequestProfile = (candidateId) => {
    console.log('Request full profile:', candidateId);
    // Implement profile request functionality
  };

  const handleAddNote = (candidateId, note) => {
    setCandidates(prev => prev.map(candidate => 
      candidate.id === candidateId
        ? { ...candidate, notes: note }
        : candidate
    ));
  };

  const handleSaveSearch = (name, searchFilters) => {
    setSavedSearches(prev => [...prev, { name, filters: searchFilters }]);
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setPage(prev => prev + 1);
      setLoading(false);
    }, 1000);
  };

  const currentCandidates = filteredCandidates();

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      <Sidebar />
      
      <div className="lg:ml-64 pt-16">
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Filter Sidebar */}
          <div className="w-80 p-6 border-r border-white/10 overflow-y-auto">
            <FilterSidebar
              filters={filters}
              onFiltersChange={handleFiltersChange}
              resultCount={currentCandidates.length}
              onSaveSearch={handleSaveSearch}
              savedSearches={savedSearches}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-7xl mx-auto"
            >
              {/* Page Header */}
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Icon name="Users" size={24} color="white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold gradient-text">Candidate Discovery</h1>
                    <p className="text-text-secondary">Find and evaluate potential candidates with AI-powered matching</p>
                  </div>
                </div>
              </div>

              {/* Search Header */}
              <SearchHeader
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                sortBy={sortBy}
                onSortChange={handleSortChange}
                viewMode={viewMode}
                onViewModeChange={handleViewModeChange}
                onBulkAction={handleBulkAction}
                selectedCandidates={selectedCandidates}
                totalResults={currentCandidates.length}
              />

              {/* Candidate Feed */}
              <CandidateFeed
                candidates={currentCandidates}
                loading={loading}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
                viewMode={viewMode}
                selectedCandidates={selectedCandidates}
                onCandidateSelect={handleCandidateSelect}
                onShortlist={handleShortlist}
                onMessage={handleMessage}
                onRequestProfile={handleRequestProfile}
                onAddNote={handleAddNote}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDiscoverySourcing;