import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';

import Button from '../../components/ui/Button';
import PipelineColumn from './components/PipelineColumn';

import PipelineFilters from './components/PipelineFilters';
import CandidateDetailModal from './components/CandidateDetailModal';
import PipelineStats from './components/PipelineStats';

const ApplicationTrackingPipeline = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    dateRange: 'all',
    skillMatch: 'all',
    source: 'all',
    experience: 'all'
  });
  const [showConfetti, setShowConfetti] = useState(false);

  // Mock pipeline stages
  const pipelineStages = [
    { 
      name: 'Applied', 
      description: 'New applications received',
      color: 'blue'
    },
    { 
      name: 'Screening', 
      description: 'Initial review and screening',
      color: 'yellow'
    },
    { 
      name: 'Interview', 
      description: 'Interview scheduled or completed',
      color: 'purple'
    },
    { 
      name: 'Offer', 
      description: 'Offer extended to candidate',
      color: 'green'
    },
    { 
      name: 'Hired', 
      description: 'Successfully hired candidates',
      color: 'emerald'
    },
    { 
      name: 'Rejected', 
      description: 'Candidates not selected',
      color: 'red'
    }
  ];

  // Mock candidates data
  const mockCandidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Senior Frontend Developer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9e2b8e5?w=150",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      experience: 5,
      education: "BS Computer Science",
      appliedDate: "2024-01-15T10:30:00Z",
      stage: "Applied",
      skillMatch: 92,
      source: "LinkedIn",
      topSkills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
      notes: "Strong technical background with excellent communication skills. Previous experience with React and modern frontend frameworks.",
      rating: 4,
      summary: "Experienced frontend developer with 5+ years of expertise in React ecosystem. Led multiple successful projects and mentored junior developers.",
      workExperience: [
        {
          title: "Senior Frontend Developer",
          company: "TechCorp Inc.",
          duration: "2022 - Present",
          location: "San Francisco, CA",
          description: "Led frontend development for multiple web applications using React, TypeScript, and modern tooling.",
          technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"]
        }
      ],
      skills: [
        { name: "React", level: 95 },
        { name: "TypeScript", level: 88 },
        { name: "Node.js", level: 82 },
        { name: "GraphQL", level: 78 }
      ],
      certifications: [
        { name: "AWS Certified Developer", issuer: "Amazon", date: "2023" },
        { name: "React Professional", issuer: "Meta", date: "2022" }
      ],
      teamFeedback: [
        {
          name: "John Smith",
          role: "Tech Lead",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50",
          date: "2 days ago",
          comment: "Excellent technical skills and great cultural fit. Highly recommend moving forward."
        }
      ],
      timeline: [
        { title: "Application Submitted", date: "Jan 15, 2024", icon: "FileText", description: "Candidate applied through LinkedIn" },
        { title: "Resume Reviewed", date: "Jan 16, 2024", icon: "Eye", description: "Initial screening completed" }
      ]
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Full Stack Developer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      email: "michael.chen@email.com",
      phone: "+1 (555) 234-5678",
      location: "New York, NY",
      experience: 3,
      education: "MS Software Engineering",
      appliedDate: "2024-01-14T14:20:00Z",
      stage: "Screening",
      skillMatch: 85,
      source: "Indeed",
      topSkills: ["Python", "Django", "React", "PostgreSQL"],
      notes: "Good technical foundation, needs more experience with cloud technologies.",
      rating: 3,
      summary: "Full-stack developer with strong backend skills and growing frontend expertise.",
      workExperience: [],
      skills: [
        { name: "Python", level: 90 },
        { name: "Django", level: 85 },
        { name: "React", level: 75 },
        { name: "PostgreSQL", level: 80 }
      ],
      certifications: [],
      teamFeedback: [],
      timeline: [
        { title: "Application Submitted", date: "Jan 14, 2024", icon: "FileText", description: "Applied through Indeed" },
        { title: "Phone Screening", date: "Jan 17, 2024", icon: "Phone", description: "Initial phone interview completed" }
      ]
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      email: "emily.rodriguez@email.com",
      phone: "+1 (555) 345-6789",
      location: "Austin, TX",
      experience: 4,
      education: "BFA Design",
      appliedDate: "2024-01-13T09:15:00Z",
      stage: "Interview",
      skillMatch: 88,
      source: "Company Website",
      topSkills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
      notes: "Excellent design portfolio and strong user-centered design approach.",
      rating: 5,
      summary: "Creative UI/UX designer with strong portfolio and user research background.",
      workExperience: [],
      skills: [
        { name: "Figma", level: 95 },
        { name: "Adobe XD", level: 88 },
        { name: "Prototyping", level: 85 },
        { name: "User Research", level: 82 }
      ],
      certifications: [],
      teamFeedback: [],
      timeline: [
        { title: "Application Submitted", date: "Jan 13, 2024", icon: "FileText", description: "Applied through company website" },
        { title: "Portfolio Review", date: "Jan 16, 2024", icon: "Eye", description: "Design portfolio reviewed" },
        { title: "Technical Interview", date: "Jan 18, 2024", icon: "MessageCircle", description: "Design challenge completed" }
      ]
    },
    {
      id: 4,
      name: "David Kim",
      position: "DevOps Engineer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      email: "david.kim@email.com",
      phone: "+1 (555) 456-7890",
      location: "Seattle, WA",
      experience: 6,
      education: "BS Computer Engineering",
      appliedDate: "2024-01-12T16:45:00Z",
      stage: "Offer",
      skillMatch: 94,
      source: "Referral",
      topSkills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
      notes: "Outstanding DevOps experience with strong automation skills. Perfect fit for our infrastructure needs.",
      rating: 5,
      summary: "Senior DevOps engineer with extensive cloud infrastructure and automation experience.",
      workExperience: [],
      skills: [
        { name: "AWS", level: 95 },
        { name: "Docker", level: 92 },
        { name: "Kubernetes", level: 88 },
        { name: "Terraform", level: 85 }
      ],
      certifications: [
        { name: "AWS Solutions Architect", issuer: "Amazon", date: "2023" },
        { name: "Certified Kubernetes Administrator", issuer: "CNCF", date: "2022" }
      ],
      teamFeedback: [],
      timeline: [
        { title: "Referral Received", date: "Jan 12, 2024", icon: "Users", description: "Referred by current employee" },
        { title: "Technical Interview", date: "Jan 15, 2024", icon: "Code", description: "System design interview completed" },
        { title: "Final Interview", date: "Jan 17, 2024", icon: "MessageCircle", description: "Leadership interview completed" },
        { title: "Offer Extended", date: "Jan 19, 2024", icon: "Gift", description: "Job offer sent to candidate" }
      ]
    },
    {
      id: 5,
      name: "Lisa Wang",
      position: "Product Manager",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150",
      email: "lisa.wang@email.com",
      phone: "+1 (555) 567-8901",
      location: "Los Angeles, CA",
      experience: 7,
      education: "MBA Business",
      appliedDate: "2024-01-10T11:30:00Z",
      stage: "Hired",
      skillMatch: 96,
      source: "LinkedIn",
      topSkills: ["Product Strategy", "Agile", "Data Analysis", "User Research", "Roadmapping"],
      notes: "Exceptional product management experience with proven track record of successful product launches.",
      rating: 5,
      summary: "Senior product manager with 7+ years of experience in B2B SaaS products.",
      workExperience: [],
      skills: [
        { name: "Product Strategy", level: 95 },
        { name: "Agile Methodologies", level: 92 },
        { name: "Data Analysis", level: 88 },
        { name: "User Research", level: 85 }
      ],
      certifications: [
        { name: "Certified Scrum Product Owner", issuer: "Scrum Alliance", date: "2022" },
        { name: "Google Analytics Certified", issuer: "Google", date: "2023" }
      ],
      teamFeedback: [],
      timeline: [
        { title: "Application Submitted", date: "Jan 10, 2024", icon: "FileText", description: "Applied through LinkedIn" },
        { title: "Phone Screening", date: "Jan 12, 2024", icon: "Phone", description: "Initial screening completed" },
        { title: "Product Case Study", date: "Jan 15, 2024", icon: "Presentation", description: "Product strategy presentation" },
        { title: "Final Interview", date: "Jan 17, 2024", icon: "Users", description: "Team interviews completed" },
        { title: "Offer Accepted", date: "Jan 19, 2024", icon: "CheckCircle", description: "Candidate accepted offer" },
        { title: "Hired", date: "Jan 20, 2024", icon: "Trophy", description: "Successfully hired!" }
      ]
    }
  ];

  // Mock stats
  const mockStats = {
    totalApplications: 156,
    inProgress: 42,
    interviewsScheduled: 18,
    offersExtended: 8,
    hiredThisMonth: 12,
    avgTimeToHire: 18
  };

  // Initialize data
  useEffect(() => {
    const timer = setTimeout(() => {
      setCandidates(mockCandidates);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter candidates based on current filters
  const filteredCandidates = candidates.filter(candidate => {
    if (filters.search && !candidate.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !candidate.position.toLowerCase().includes(filters.search.toLowerCase()) &&
        !candidate.topSkills.some(skill => skill.toLowerCase().includes(filters.search.toLowerCase()))) {
      return false;
    }

    if (filters.skillMatch !== 'all') {
      if (filters.skillMatch === 'high' && candidate.skillMatch < 90) return false;
      if (filters.skillMatch === 'medium' && (candidate.skillMatch < 70 || candidate.skillMatch >= 90)) return false;
      if (filters.skillMatch === 'low' && candidate.skillMatch >= 70) return false;
    }

    if (filters.source !== 'all' && candidate.source.toLowerCase() !== filters.source.toLowerCase()) {
      return false;
    }

    if (filters.experience !== 'all') {
      if (filters.experience === 'entry' && candidate.experience > 2) return false;
      if (filters.experience === 'mid' && (candidate.experience < 3 || candidate.experience > 5)) return false;
      if (filters.experience === 'senior' && (candidate.experience < 6 || candidate.experience > 10)) return false;
      if (filters.experience === 'expert' && candidate.experience < 10) return false;
    }

    return true;
  });

  // Group candidates by stage
  const candidatesByStage = pipelineStages.reduce((acc, stage) => {
    acc[stage.name] = filteredCandidates.filter(candidate => candidate.stage === stage.name);
    return acc;
  }, {});

  // Handle candidate movement between stages
  const handleCandidateMove = (candidateId, fromStage, toStage) => {
    setCandidates(prev => prev.map(candidate => 
      candidate.id === candidateId 
        ? { ...candidate, stage: toStage }
        : candidate
    ));

    // Show confetti for successful hires
    if (toStage === 'Hired') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  // Handle candidate selection
  const handleCandidateSelect = (candidate) => {
    if (typeof candidate === 'object') {
      setSelectedCandidate(candidate);
      setIsModalOpen(true);
    } else {
      // Toggle selection for bulk actions
      setSelectedCandidates(prev => 
        prev.includes(candidate)
          ? prev.filter(id => id !== candidate)
          : [...prev, candidate]
      );
    }
  };

  // Handle candidate rejection
  const handleCandidateReject = (candidateId) => {
    setCandidates(prev => prev.map(candidate => 
      candidate.id === candidateId 
        ? { ...candidate, stage: 'Rejected' }
        : candidate
    ));
  };

  // Handle bulk actions
  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} for candidates:`, selectedCandidates);
    
    switch (action) {
      case 'move-screening':
        setCandidates(prev => prev.map(candidate => 
          selectedCandidates.includes(candidate.id)
            ? { ...candidate, stage: 'Screening' }
            : candidate
        ));
        break;
      case 'reject':
        setCandidates(prev => prev.map(candidate => 
          selectedCandidates.includes(candidate.id)
            ? { ...candidate, stage: 'Rejected' }
            : candidate
        ));
        break;
      default:
        break;
    }
    
    setSelectedCandidates([]);
  };

  // Handle saving notes
  const handleSaveNotes = (candidateId, notes, rating) => {
    setCandidates(prev => prev.map(candidate => 
      candidate.id === candidateId 
        ? { ...candidate, notes, rating }
        : candidate
    ));
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-64 pt-16">
        <div className="p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Application Tracking & Pipeline</h1>
              <p className="text-text-secondary mt-2">
                Manage your recruitment pipeline and track candidate progress
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="Download"
                onClick={() => console.log('Export pipeline data')}
              >
                Export Data
              </Button>
              <Button
                variant="primary"
                iconName="Plus"
                onClick={() => console.log('Add new candidate')}
              >
                Add Candidate
              </Button>
            </div>
          </div>

          {/* Pipeline Stats */}
          <PipelineStats stats={mockStats} isLoading={isLoading} />

          {/* Filters */}
          <PipelineFilters
            filters={filters}
            onFiltersChange={setFilters}
            onBulkAction={handleBulkAction}
            selectedCount={selectedCandidates.length}
            totalCandidates={filteredCandidates.length}
          />

          {/* Pipeline Columns */}
          <div className="flex space-x-6 overflow-x-auto pb-6">
            {pipelineStages.map((stage) => (
              <PipelineColumn
                key={stage.name}
                stage={stage}
                candidates={candidatesByStage[stage.name] || []}
                onCandidateMove={handleCandidateMove}
                onCandidateSelect={handleCandidateSelect}
                onCandidateReject={handleCandidateReject}
                selectedCandidates={selectedCandidates}
                isLoading={isLoading}
              />
            ))}
          </div>

          {/* Confetti Animation */}
          <AnimatePresence>
            {showConfetti && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 pointer-events-none z-50"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="text-6xl"
                  >
                    🎉
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Candidate Detail Modal */}
      <CandidateDetailModal
        candidate={selectedCandidate}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCandidate(null);
        }}
        onMove={handleCandidateMove}
        onReject={handleCandidateReject}
        onSaveNotes={handleSaveNotes}
      />
    </div>
  );
};

export default ApplicationTrackingPipeline;