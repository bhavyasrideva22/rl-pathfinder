import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, Brain, Code, Target } from 'lucide-react';

type AssessmentSection = 'psychometric' | 'technical' | 'wiscar';

interface Question {
  id: string;
  text: string;
  options: { value: string; label: string }[];
  section: AssessmentSection;
  category?: string;
}

interface AssessmentAnswers {
  [questionId: string]: string;
}

const Assessment = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState<AssessmentSection>('psychometric');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>({});

  const questions: Question[] = [
    // Psychometric Section
    {
      id: 'interest_1',
      text: 'I enjoy solving problems that involve decision-making over time.',
      options: [
        { value: '1', label: 'Strongly Disagree' },
        { value: '2', label: 'Disagree' },
        { value: '3', label: 'Neutral' },
        { value: '4', label: 'Agree' },
        { value: '5', label: 'Strongly Agree' },
      ],
      section: 'psychometric',
      category: 'Interest Scale'
    },
    {
      id: 'interest_2',
      text: 'I like building systems that learn through interaction.',
      options: [
        { value: '1', label: 'Strongly Disagree' },
        { value: '2', label: 'Disagree' },
        { value: '3', label: 'Neutral' },
        { value: '4', label: 'Agree' },
        { value: '5', label: 'Strongly Agree' },
      ],
      section: 'psychometric',
      category: 'Interest Scale'
    },
    {
      id: 'personality_1',
      text: 'I prefer to work on projects where I can experiment and iterate.',
      options: [
        { value: '1', label: 'Never' },
        { value: '2', label: 'Rarely' },
        { value: '3', label: 'Sometimes' },
        { value: '4', label: 'Often' },
        { value: '5', label: 'Always' },
      ],
      section: 'psychometric',
      category: 'Personality Compatibility'
    },
    {
      id: 'personality_2',
      text: 'I am comfortable with uncertainty and delayed feedback.',
      options: [
        { value: '1', label: 'Very Uncomfortable' },
        { value: '2', label: 'Uncomfortable' },
        { value: '3', label: 'Neutral' },
        { value: '4', label: 'Comfortable' },
        { value: '5', label: 'Very Comfortable' },
      ],
      section: 'psychometric',
      category: 'Personality Compatibility'
    },
    {
      id: 'cognitive_1',
      text: 'I prefer learning through trial-and-error rather than following strict instructions.',
      options: [
        { value: '1', label: 'Strongly Prefer Instructions' },
        { value: '2', label: 'Prefer Instructions' },
        { value: '3', label: 'No Preference' },
        { value: '4', label: 'Prefer Trial-and-Error' },
        { value: '5', label: 'Strongly Prefer Trial-and-Error' },
      ],
      section: 'psychometric',
      category: 'Cognitive Style'
    },
    {
      id: 'cognitive_2',
      text: 'I work better independently rather than in teams.',
      options: [
        { value: '1', label: 'Much Better in Teams' },
        { value: '2', label: 'Better in Teams' },
        { value: '3', label: 'Equal' },
        { value: '4', label: 'Better Independently' },
        { value: '5', label: 'Much Better Independently' },
      ],
      section: 'psychometric',
      category: 'Work Preferences'
    },

    // Technical Section
    {
      id: 'aptitude_1',
      text: 'If you flip a fair coin 3 times, what is the probability of getting at least one head?',
      options: [
        { value: '1/8', label: '1/8' },
        { value: '3/8', label: '3/8' },
        { value: '1/2', label: '1/2' },
        { value: '7/8', label: '7/8' },
      ],
      section: 'technical',
      category: 'Probability'
    },
    {
      id: 'aptitude_2',
      text: 'Which programming concept is most important for implementing iterative learning algorithms?',
      options: [
        { value: 'recursion', label: 'Recursion' },
        { value: 'loops', label: 'Loops and state management' },
        { value: 'functions', label: 'Function definitions' },
        { value: 'classes', label: 'Class inheritance' },
      ],
      section: 'technical',
      category: 'Programming'
    },
    {
      id: 'ml_1',
      text: 'What distinguishes reinforcement learning from supervised learning?',
      options: [
        { value: 'data_size', label: 'RL uses larger datasets' },
        { value: 'feedback_type', label: 'RL learns from reward/penalty feedback, not labeled examples' },
        { value: 'algorithms', label: 'RL uses different mathematical algorithms' },
        { value: 'computing_power', label: 'RL requires more computing power' },
      ],
      section: 'technical',
      category: 'ML Fundamentals'
    },
    {
      id: 'rl_1',
      text: 'What is a reward function in reinforcement learning?',
      options: [
        { value: 'error_measure', label: 'A measure of prediction error' },
        { value: 'feedback_signal', label: 'A signal that tells the agent how good its action was' },
        { value: 'optimization_target', label: 'The function the agent tries to minimize' },
        { value: 'learning_rate', label: 'A parameter that controls learning speed' },
      ],
      section: 'technical',
      category: 'RL Concepts'
    },
    {
      id: 'rl_2',
      text: 'What is the exploration vs exploitation dilemma?',
      options: [
        { value: 'speed_vs_accuracy', label: 'Choosing between fast or accurate algorithms' },
        { value: 'new_vs_known', label: 'Choosing between trying new actions or using known good actions' },
        { value: 'simple_vs_complex', label: 'Choosing between simple or complex models' },
        { value: 'local_vs_global', label: 'Choosing between local or global optimization' },
      ],
      section: 'technical',
      category: 'RL Concepts'
    },

    // WISCAR Section
    {
      id: 'will_1',
      text: 'How motivated are you to spend 6+ months learning complex mathematical concepts?',
      options: [
        { value: '1', label: 'Not motivated at all' },
        { value: '2', label: 'Slightly motivated' },
        { value: '3', label: 'Moderately motivated' },
        { value: '4', label: 'Highly motivated' },
        { value: '5', label: 'Extremely motivated' },
      ],
      section: 'wiscar',
      category: 'Will'
    },
    {
      id: 'interest_rl',
      text: 'Which RL application interests you most?',
      options: [
        { value: 'games', label: 'Game AI and strategy' },
        { value: 'robotics', label: 'Robotics and autonomous systems' },
        { value: 'finance', label: 'Trading and financial optimization' },
        { value: 'research', label: 'Pure research and algorithm development' },
      ],
      section: 'wiscar',
      category: 'Interest'
    },
    {
      id: 'skill_python',
      text: 'How would you rate your Python programming skills?',
      options: [
        { value: '1', label: 'Beginner - can write basic scripts' },
        { value: '2', label: 'Intermediate - comfortable with classes and libraries' },
        { value: '3', label: 'Advanced - can build complex applications' },
        { value: '4', label: 'Expert - can optimize and architect systems' },
      ],
      section: 'wiscar',
      category: 'Skill'
    },
    {
      id: 'cognitive_abstract',
      text: 'You have a maze with changing walls. How would you approach finding the optimal path?',
      options: [
        { value: 'memorize', label: 'Memorize all possible paths' },
        { value: 'adaptive', label: 'Use an adaptive strategy that learns from experience' },
        { value: 'random', label: 'Try random paths until one works' },
        { value: 'systematic', label: 'Systematically explore all options' },
      ],
      section: 'wiscar',
      category: 'Cognitive Readiness'
    },
    {
      id: 'learning_meta',
      text: 'When you encounter a difficult concept, what do you typically do?',
      options: [
        { value: 'give_up', label: 'Move on to something easier' },
        { value: 'ask_help', label: 'Ask for help immediately' },
        { value: 'break_down', label: 'Break it into smaller parts and research each' },
        { value: 'practice', label: 'Find multiple examples and practice extensively' },
      ],
      section: 'wiscar',
      category: 'Ability to Learn'
    },
    {
      id: 'career_alignment',
      text: 'In 2-3 years, where do you see yourself working?',
      options: [
        { value: 'tech_company', label: 'AI team at a tech company' },
        { value: 'research_lab', label: 'Research lab or academia' },
        { value: 'startup', label: 'AI startup or founding one' },
        { value: 'consulting', label: 'AI consulting or freelancing' },
      ],
      section: 'wiscar',
      category: 'Real-World Alignment'
    },
  ];

  const sectionQuestions = questions.filter(q => q.section === currentSection);
  const currentQuestion = sectionQuestions[currentQuestionIndex];
  const totalProgress = ((Object.keys(answers).length / questions.length) * 100);

  const sectionTitles = {
    psychometric: 'Psychological Assessment',
    technical: 'Technical Aptitude',
    wiscar: 'WISCAR Framework'
  };

  const sectionIcons = {
    psychometric: Brain,
    technical: Code,
    wiscar: Target
  };

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < sectionQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Move to next section or finish
      if (currentSection === 'psychometric') {
        setCurrentSection('technical');
        setCurrentQuestionIndex(0);
      } else if (currentSection === 'technical') {
        setCurrentSection('wiscar');
        setCurrentQuestionIndex(0);
      } else {
        // Assessment complete, navigate to results
        navigate('/results', { state: { answers } });
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      // Move to previous section
      if (currentSection === 'technical') {
        setCurrentSection('psychometric');
        const psychQuestions = questions.filter(q => q.section === 'psychometric');
        setCurrentQuestionIndex(psychQuestions.length - 1);
      } else if (currentSection === 'wiscar') {
        setCurrentSection('technical');
        const techQuestions = questions.filter(q => q.section === 'technical');
        setCurrentQuestionIndex(techQuestions.length - 1);
      }
    }
  };

  const canProceed = answers[currentQuestion?.id];
  const Icon = sectionIcons[currentSection];

  return (
    <div className="min-h-screen bg-gradient-hero p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {sectionTitles[currentSection]}
                </h1>
                <p className="text-gray-600">
                  Question {currentQuestionIndex + 1} of {sectionQuestions.length}
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Overall Progress</span>
                <span>{Math.round(totalProgress)}% Complete</span>
              </div>
              <Progress value={totalProgress} className="h-2" />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <Card className="shadow-soft border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">
                {currentQuestion?.category && (
                  <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-3 inline-block">
                    {currentQuestion.category}
                  </span>
                )}
              </CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <h2 className="text-xl font-medium text-gray-800 leading-relaxed">
              {currentQuestion?.text}
            </h2>
            
            <RadioGroup
              value={answers[currentQuestion?.id] || ''}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {currentQuestion?.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label 
                    htmlFor={option.value}
                    className="cursor-pointer text-gray-700 hover:text-gray-900 flex-1 py-2"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentSection === 'psychometric' && currentQuestionIndex === 0}
            className="min-w-24"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            variant="hero"
            className="min-w-24"
          >
            {currentSection === 'wiscar' && currentQuestionIndex === sectionQuestions.length - 1 ? 'Finish' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;