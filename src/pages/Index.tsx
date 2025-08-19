import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Code, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Play,
  CheckCircle,
  Clock,
  Award
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: 'Psychological Assessment',
      description: 'Evaluate your compatibility with RL work patterns and mindset'
    },
    {
      icon: Code,
      title: 'Technical Aptitude',
      description: 'Test your math, programming, and ML fundamentals'
    },
    {
      icon: Target,
      title: 'WISCAR Framework',
      description: '6-dimensional analysis of your learning readiness'
    },
    {
      icon: TrendingUp,
      title: 'Personalized Results',
      description: 'Get detailed scores and improvement recommendations'
    }
  ];

  const outcomes = [
    {
      icon: CheckCircle,
      title: 'Clear Recommendation',
      description: 'Yes/Maybe/No decision with confidence score'
    },
    {
      icon: BookOpen,
      title: 'Learning Roadmap',
      description: 'Customized curriculum based on your skill gaps'
    },
    {
      icon: Users,
      title: 'Career Matching',
      description: 'Specific RL roles that fit your profile'
    },
    {
      icon: Award,
      title: 'Actionable Insights',
      description: 'Concrete next steps for your RL journey'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
              P.O.L.I.C.Y. Assessment Framework
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Should I Learn
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Reinforcement Learning?
              </span>
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover if you're ready to become a Reinforcement Learning developer with our comprehensive 
              AI-powered assessment that evaluates your psychological fit, technical aptitude, and learning readiness.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                size="lg" 
                variant="hero"
                onClick={() => navigate('/assessment')}
                className="text-lg px-8 py-4 h-auto"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Assessment
              </Button>
              
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>20-30 minutes</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
              <div>
                <div className="text-3xl font-bold text-primary">16</div>
                <div className="text-sm text-gray-600">Total Questions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">6</div>
                <div className="text-sm text-gray-600">Assessment Dimensions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-success">5</div>
                <div className="text-sm text-gray-600">Career Paths</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What is RL Section */}
      <div className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What is Reinforcement Learning?
            </h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Reinforcement Learning is a subfield of machine learning where agents learn to make decisions 
              by receiving feedback from their environment. It powers intelligent systems like robotics, 
              game AI, self-driving vehicles, and financial decision-making agents.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="shadow-soft border-0 bg-white/80 backdrop-blur-sm hover:shadow-primary transition-smooth">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto p-3 bg-gradient-primary rounded-lg w-fit mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Assessment Process */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What You'll Get
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our comprehensive assessment provides detailed insights into your readiness 
              for a career in Reinforcement Learning development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {outcomes.map((outcome, index) => {
              const Icon = outcome.icon;
              return (
                <Card key={index} className="shadow-soft border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto p-3 bg-accent/10 rounded-lg w-fit mb-4">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <CardTitle className="text-lg">{outcome.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {outcome.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Discover Your RL Potential?
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Take the assessment now and get personalized insights into your readiness 
            for a career in Reinforcement Learning development.
          </p>
          
          <Button 
            size="lg" 
            variant="hero"
            onClick={() => navigate('/assessment')}
            className="text-lg px-8 py-4 h-auto"
          >
            <Play className="w-5 h-5 mr-2" />
            Begin Your Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
