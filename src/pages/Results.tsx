import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Brain, 
  Code, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Award,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';

interface AssessmentAnswers {
  [questionId: string]: string;
}

interface WiscarScores {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  abilityToLearn: number;
  realWorldAlignment: number;
}

interface AssessmentResults {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: WiscarScores;
  overallScore: number;
  recommendation: 'Yes' | 'Maybe' | 'No';
  strengths: string[];
  improvements: string[];
  careerPaths: string[];
  learningPath: string[];
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers as AssessmentAnswers || {};

  // Calculate scores based on answers
  const calculateResults = (): AssessmentResults => {
    // Psychometric scoring
    const psychometricQuestions = ['interest_1', 'interest_2', 'personality_1', 'personality_2', 'cognitive_1', 'cognitive_2'];
    const psychometricSum = psychometricQuestions.reduce((sum, qId) => {
      return sum + (parseInt(answers[qId]) || 0);
    }, 0);
    const psychometricScore = Math.round((psychometricSum / (psychometricQuestions.length * 5)) * 100);

    // Technical scoring
    const technicalAnswers = {
      'aptitude_1': '7/8',
      'aptitude_2': 'loops',
      'ml_1': 'feedback_type',
      'rl_1': 'feedback_signal',
      'rl_2': 'new_vs_known'
    };
    
    let technicalCorrect = 0;
    Object.entries(technicalAnswers).forEach(([qId, correctAnswer]) => {
      if (answers[qId] === correctAnswer) technicalCorrect++;
    });
    const technicalScore = Math.round((technicalCorrect / Object.keys(technicalAnswers).length) * 100);

    // WISCAR scoring
    const wiscarScores: WiscarScores = {
      will: parseInt(answers['will_1']) * 20 || 0,
      interest: answers['interest_rl'] ? 80 : 60,
      skill: parseInt(answers['skill_python']) * 25 || 0,
      cognitive: answers['cognitive_abstract'] === 'adaptive' ? 90 : 60,
      abilityToLearn: answers['learning_meta'] === 'break_down' || answers['learning_meta'] === 'practice' ? 85 : 60,
      realWorldAlignment: answers['career_alignment'] ? 80 : 60
    };

    const overallScore = Math.round(
      (psychometricScore * 0.3 + technicalScore * 0.4 + 
       Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6 * 0.3)
    );

    let recommendation: 'Yes' | 'Maybe' | 'No' = 'No';
    if (overallScore >= 75) recommendation = 'Yes';
    else if (overallScore >= 55) recommendation = 'Maybe';

    const strengths: string[] = [];
    const improvements: string[] = [];

    if (psychometricScore >= 70) strengths.push('Strong psychological fit for RL work');
    else improvements.push('Develop comfort with uncertainty and iterative processes');

    if (technicalScore >= 70) strengths.push('Solid technical foundation');
    else improvements.push('Strengthen math and programming fundamentals');

    if (wiscarScores.will >= 80) strengths.push('High motivation and persistence');
    if (wiscarScores.skill < 60) improvements.push('Improve Python programming skills');

    const careerPaths = [];
    if (answers['interest_rl'] === 'games') careerPaths.push('Game AI Developer', 'RL Engineer');
    if (answers['interest_rl'] === 'robotics') careerPaths.push('Robotics RL Engineer', 'Autonomous Systems Developer');
    if (answers['interest_rl'] === 'finance') careerPaths.push('Quantitative AI Trader', 'Financial ML Engineer');
    if (answers['interest_rl'] === 'research') careerPaths.push('AI Research Scientist', 'RL Research Engineer');

    const learningPath = [];
    if (technicalScore < 60) {
      learningPath.push('Mathematics for Machine Learning', 'Python Programming Fundamentals');
    }
    learningPath.push('Introduction to Reinforcement Learning', 'OpenAI Gym Projects');
    if (overallScore >= 70) {
      learningPath.push('Deep RL Algorithms', 'Policy Gradient Methods');
    }

    return {
      psychometricScore,
      technicalScore,
      wiscarScores,
      overallScore,
      recommendation,
      strengths,
      improvements,
      careerPaths,
      learningPath
    };
  };

  const results = calculateResults();

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'Yes': return 'success';
      case 'Maybe': return 'warning';
      case 'No': return 'destructive';
      default: return 'secondary';
    }
  };

  const getRecommendationIcon = (rec: string) => {
    switch (rec) {
      case 'Yes': return CheckCircle;
      case 'Maybe': return AlertCircle;
      case 'No': return XCircle;
      default: return AlertCircle;
    }
  };

  const RecommendationIcon = getRecommendationIcon(results.recommendation);

  if (Object.keys(answers).length === 0) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <Card className="max-w-md mx-auto text-center">
          <CardHeader>
            <CardTitle>No Assessment Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Please complete the assessment first to see your results.
            </p>
            <Button onClick={() => navigate('/')} variant="hero">
              Take Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero p-4">
      <div className="max-w-6xl mx-auto">
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your RL Developer Assessment Results
            </h1>
            <p className="text-gray-600">
              Comprehensive analysis of your fit for Reinforcement Learning development
            </p>
          </div>
        </div>

        {/* Overall Recommendation */}
        <Card className="mb-8 shadow-soft border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className={`p-4 rounded-full bg-${getRecommendationColor(results.recommendation)}/10`}>
                <RecommendationIcon className={`w-12 h-12 text-${getRecommendationColor(results.recommendation)}`} />
              </div>
            </div>
            <CardTitle className="text-2xl mb-2">
              Should you learn Reinforcement Learning?
            </CardTitle>
            <Badge variant={getRecommendationColor(results.recommendation) as any} className="text-lg py-2 px-4">
              {results.recommendation}
            </Badge>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {results.overallScore}%
            </div>
            <p className="text-muted-foreground text-lg">
              Overall Readiness Score
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Score Breakdown */}
          <Card className="shadow-soft border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Score Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    Psychological Fit
                  </span>
                  <span className="font-semibold">{results.psychometricScore}%</span>
                </div>
                <Progress value={results.psychometricScore} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Technical Aptitude
                  </span>
                  <span className="font-semibold">{results.technicalScore}%</span>
                </div>
                <Progress value={results.technicalScore} className="h-2" />
              </div>

              <div className="pt-2 border-t">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  WISCAR Dimensions
                </h4>
                <div className="space-y-3">
                  {Object.entries(results.wiscarScores).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="text-sm font-medium">{value}%</span>
                      </div>
                      <Progress value={value} className="h-1" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strengths & Improvements */}
          <Card className="shadow-soft border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-success mb-2">Your Strengths</h4>
                <ul className="space-y-2">
                  {results.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-warning mb-2">Areas for Improvement</h4>
                <ul className="space-y-2">
                  {results.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Target className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Career Paths */}
          <Card className="shadow-soft border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Recommended Career Paths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.careerPaths.map((path, index) => (
                  <div key={index} className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                    <h4 className="font-medium text-primary">{path}</h4>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Learning Path */}
          <Card className="shadow-soft border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Your Learning Path
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.learningPath.map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <span className="text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Button onClick={() => navigate('/assessment')} variant="outline">
            Retake Assessment
          </Button>
          <Button variant="hero">
            Download Detailed Report
          </Button>
          <Button variant="accent">
            Explore Learning Resources
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;