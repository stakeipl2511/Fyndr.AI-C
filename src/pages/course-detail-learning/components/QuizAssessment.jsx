import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuizAssessment = ({ isOpen, onClose, lessonData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isSubmitting, setIsSubmitting] = useState(false);

  const quizData = {
    title: "React 18 Fundamentals Quiz",
    description: "Test your understanding of React 18's core concepts and new features.",
    timeLimit: 600, // 10 minutes
    passingScore: 70,
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What is the main benefit of React 18's automatic batching feature?",
        options: [
          "It automatically splits code into smaller bundles",
          "It groups multiple state updates into a single re-render for better performance",
          "It automatically handles error boundaries",
          "It provides better TypeScript support"
        ],
        correctAnswer: 1,
        explanation: "Automatic batching in React 18 groups multiple state updates into a single re-render, which improves performance by reducing the number of renders."
      },
      {
        id: 2,
        type: "multiple-choice",
        question: "Which hook is new in React 18?",
        options: [
          "useEffect",
          "useState",
          "useId",
          "useContext"
        ],
        correctAnswer: 2,
        explanation: "useId is a new hook in React 18 that generates unique IDs for accessibility attributes and other use cases."
      },
      {
        id: 3,
        type: "true-false",
        question: "Suspense can only be used for code splitting in React 18.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. In React 18, Suspense can be used for both code splitting and data fetching, making it more versatile."
      },
      {
        id: 4,
        type: "multiple-select",
        question: "Which of the following are concurrent features in React 18? (Select all that apply)",
        options: [
          "Automatic batching",
          "Suspense for data fetching",
          "useTransition hook",
          "Class components"
        ],
        correctAnswers: [0, 1, 2],
        explanation: "Automatic batching, Suspense for data fetching, and useTransition are all concurrent features in React 18. Class components are not a new feature."
      },
      {
        id: 5,
        type: "code",
        question: "What will be the output of this React 18 code?",
        code: `function App() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
  };
  
  return <button onClick={handleClick}>{count}</button>;
}`,
        options: [
          "Count increases by 2 on each click",
          "Count increases by 1 on each click",
          "Code throws an error",
          "Count stays at 0"
        ],
        correctAnswer: 1,
        explanation: "Due to closure, both setCount calls use the same 'count' value, so the count only increases by 1. To increase by 2, you should use the functional update form: setCount(prev => prev + 1)."
      }
    ]
  };

  useEffect(() => {
    if (isOpen && !showResults) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen, showResults]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId, answerIndex, isMultiSelect = false) => {
    setSelectedAnswers(prev => {
      if (isMultiSelect) {
        const currentAnswers = prev[questionId] || [];
        const newAnswers = currentAnswers.includes(answerIndex)
          ? currentAnswers.filter(a => a !== answerIndex)
          : [...currentAnswers, answerIndex];
        return { ...prev, [questionId]: newAnswers };
      } else {
        return { ...prev, [questionId]: answerIndex };
      }
    });
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    
    quizData.questions.forEach(question => {
      const userAnswer = selectedAnswers[question.id];
      
      if (question.type === 'multiple-select') {
        const correctAnswersList = question.correctAnswers.sort();
        const userAnswers = (userAnswer || []).sort();
        if (JSON.stringify(correctAnswersList) === JSON.stringify(userAnswers)) {
          correctAnswers++;
        }
      } else {
        if (userAnswer === question.correctAnswer) {
          correctAnswers++;
        }
      }
    });
    
    return Math.round((correctAnswers / quizData.questions.length) * 100);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const finalScore = calculateScore();
    setScore(finalScore);
    setShowResults(true);
    setIsSubmitting(false);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
    setTimeLeft(quizData.timeLimit);
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  const currentQ = quizData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;
  const isLastQuestion = currentQuestion === quizData.questions.length - 1;
  const hasAnswered = selectedAnswers[currentQ?.id] !== undefined;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-1000 flex items-center justify-center p-4">
      <div className="glass-card border border-white/20 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {!showResults ? (
          <>
            {/* Quiz Header */}
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-text-primary">{quizData.title}</h2>
                  <p className="text-sm text-text-secondary mt-1">{quizData.description}</p>
                </div>
                <Button
                  variant="ghost"
                  onClick={onClose}
                  iconName="X"
                  className="h-8 w-8 p-0"
                />
              </div>

              {/* Progress and Timer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-text-secondary">
                    Question {currentQuestion + 1} of {quizData.questions.length}
                  </span>
                  <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                  timeLeft < 60 ? 'bg-error/20 text-error' : 'bg-primary/20 text-primary'
                }`}>
                  <Icon name="Clock" size={16} />
                  <span className="text-sm font-mono">{formatTime(timeLeft)}</span>
                </div>
              </div>
            </div>

            {/* Question Content */}
            <div className="p-6 flex-1 overflow-y-auto">
              {currentQ && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-text-primary mb-4">
                      {currentQ.question}
                    </h3>
                    
                    {currentQ.code && (
                      <div className="bg-black/50 rounded-lg p-4 mb-4 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-400">{currentQ.code}</pre>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {currentQ.options.map((option, index) => {
                      const isSelected = currentQ.type === 'multiple-select' 
                        ? (selectedAnswers[currentQ.id] || []).includes(index)
                        : selectedAnswers[currentQ.id] === index;

                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(currentQ.id, index, currentQ.type === 'multiple-select')}
                          className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                            isSelected
                              ? 'border-primary bg-primary/20 text-primary' :'border-white/20 hover:border-white/40 hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              isSelected ? 'border-primary bg-primary' : 'border-white/40'
                            }`}>
                              {isSelected && (
                                <Icon name="Check" size={12} className="text-white" />
                              )}
                            </div>
                            <span className="text-sm">{option}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="p-6 border-t border-white/20">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  iconName="ChevronLeft"
                  iconPosition="left"
                >
                  Previous
                </Button>

                <div className="flex items-center space-x-3">
                  {isLastQuestion ? (
                    <Button
                      variant="primary"
                      onClick={handleSubmit}
                      disabled={!hasAnswered || isSubmitting}
                      loading={isSubmitting}
                      iconName="Send"
                      iconPosition="right"
                    >
                      Submit Quiz
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={handleNext}
                      disabled={!hasAnswered}
                      iconName="ChevronRight"
                      iconPosition="right"
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Results Screen */
          <div className="p-6">
            <div className="text-center mb-8">
              <div className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center ${
                score >= quizData.passingScore ? 'bg-success/20' : 'bg-error/20'
              }`}>
                <Icon 
                  name={score >= quizData.passingScore ? 'Trophy' : 'AlertCircle'} 
                  size={40} 
                  className={score >= quizData.passingScore ? 'text-success' : 'text-error'}
                />
              </div>
              
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                {score >= quizData.passingScore ? 'Congratulations!' : 'Keep Learning!'}
              </h2>
              
              <p className="text-text-secondary mb-4">
                {score >= quizData.passingScore 
                  ? 'You passed the quiz successfully!' :'You need 70% to pass. Review the material and try again.'}
              </p>

              <div className="text-4xl font-bold gradient-text mb-2">{score}%</div>
              <p className="text-sm text-text-secondary">
                {Math.round((score / 100) * quizData.questions.length)} out of {quizData.questions.length} correct
              </p>
            </div>

            {/* Detailed Results */}
            <div className="space-y-4 mb-8 max-h-60 overflow-y-auto">
              {quizData.questions.map((question, index) => {
                const userAnswer = selectedAnswers[question.id];
                const isCorrect = question.type === 'multiple-select'
                  ? JSON.stringify((userAnswer || []).sort()) === JSON.stringify(question.correctAnswers.sort())
                  : userAnswer === question.correctAnswer;

                return (
                  <div key={question.id} className={`p-4 rounded-lg border ${
                    isCorrect ? 'border-success/30 bg-success/10' : 'border-error/30 bg-error/10'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <Icon 
                        name={isCorrect ? 'CheckCircle' : 'XCircle'} 
                        size={20} 
                        className={isCorrect ? 'text-success' : 'text-error'}
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-text-primary mb-2">
                          Question {index + 1}: {question.question}
                        </h4>
                        <p className="text-sm text-text-secondary">{question.explanation}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="outline"
                onClick={resetQuiz}
                iconName="RotateCcw"
              >
                Retake Quiz
              </Button>
              <Button
                variant="primary"
                onClick={onClose}
                iconName="ArrowRight"
                iconPosition="right"
              >
                Continue Learning
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizAssessment;