import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { motion, AnimatePresence } from 'framer-motion';

const quizData = {
  science: [
    { id: 's1', type: 'binary', question: 'What intrigues you more?', options: ['Exploring the cosmos', 'Understanding the human body'] },
    { id: 's2', type: 'binary', question: 'Would you rather...', options: ['Design a new gadget', 'Discover a new medicine'] },
    { id: 's3', type: 'binary', question: 'Which subject do you enjoy more?', options: ['Physics', 'Biology'] },
    { id: 's4', type: 'binary', question: 'Are you fascinated by...', options: ['How computers work', 'The mysteries of the natural world'] },
    { id: 's5', type: 'binary', question: 'Do you prefer...', options: ['Conducting experiments in a lab', 'Building and testing models'] },
    { id: 's6', type: 'binary', question: 'What kind of problem solving do you like?', options: ['Logical and mathematical', 'Analytical and research-based'] },
    { id: 's7', type: 'binary', question: 'Would you enjoy a career that involves...', options: ['Working with advanced technology', 'Protecting the environment'] },
    { id: 's8', type: 'binary', question: 'Do you like to...', options: ['Understand why things work', 'Create new things from scratch'] },
    { id: 's9', type: 'binary', question: 'Are you interested in...', options: ['The building blocks of matter (Chemistry)', 'The study of life (Biology)'] },
    { id: 's10', type: 'binary', question: 'Which activity sounds more appealing?', options: ['Writing code for an application', 'Analyzing scientific data to find patterns'] }
  ],
  commerce: [
    { id: 'c1', type: 'binary', question: 'Are you more interested in...', options: ['Managing finances', 'Marketing a new product'] },
    { id: 'c2', type: 'binary', question: 'Do you enjoy...', options: ['Tracking market trends', 'Leading a team project'] },
    { id: 'c3', type: 'binary', question: 'Which task sounds more appealing?', options: ['Preparing a budget', 'Negotiating a deal'] },
    { id: 'c4', type: 'binary', question: 'Would you rather...', options: ["Analyze a company's financial health", 'Develop a business strategy'] },
    { id: 'c5', type: 'binary', question: 'Are you good at...', options: ['Spotting business opportunities', 'Persuading others'] },
    { id: 'c6', type: 'binary', question: 'Do you prefer...', options: ['Working with numbers and spreadsheets', 'Interacting with clients and partners'] },
    { id: 'c7', type: 'binary', question: 'What kind of environment suits you?', options: ['A structured corporate setting', 'A fast-paced startup'] },
    { id: 'c8', type: 'binary', question: 'Are you interested in...', options: ['The stock market', 'Global trade and economics'] },
    { id: 'c9', type: 'binary', question: "What's more important to you in a job?", options: ['Financial stability', 'Making a significant impact'] },
    { id: 'c10', type: 'binary', question: 'Do you see yourself as...', options: ['A detail-oriented analyst', 'A charismatic leader'] }
  ],
  arts: [
    { id: 'a1', type: 'binary', question: 'Which activity sparks your interest more?', options: ['Writing a short story', 'Painting a landscape'] },
    { id: 'a2', type: 'binary', question: 'Do you prefer...', options: ['Studying ancient civilizations', 'Analyzing modern media'] },
    { id: 'a3', type: 'binary', question: "What's your ideal way to spend an afternoon?", options: ['In a library reading', 'In a museum exploring art'] },
    { id: 'a4', type: 'binary', question: 'Would you rather...', options: ['Create a documentary film', 'Write investigative journalism pieces'] },
    { id: 'a5', type: 'binary', question: 'Are you passionate about...', options: ['Social justice and activism', 'Preserving cultural heritage'] },
    { id: 'a6', type: 'binary', question: 'Do you express yourself better through...', options: ['Words', 'Visuals'] },
    { id: 'a7', type: 'binary', question: 'Which career sounds more exciting?', options: ['A foreign diplomat', 'A graphic novelist'] },
    { id: 'a8', type: 'binary', question: 'Are you drawn to...', options: ['Understanding human behavior (Psychology)', 'Exploring different cultures (Anthropology)'] },
    { id: 'a9', type: 'binary', question: 'Do you enjoy...', options: ['Public speaking and debate', 'Creative writing and poetry'] },
    { id: 'a10', type: 'binary', question: 'Would you like a job that involves...', options: ['Teaching and mentoring', 'Creating and performing'] }
  ]
};

const streamResults = {
  science: 'Technology & Engineering',
  commerce: 'Business & Finance',
  arts: 'Creative Arts & Humanities'
};

export default function QuizFlow({ stream }) {
  const quizQuestions = quizData[stream];
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const storageKey = `quizAnswers_${stream}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setAnswers(JSON.parse(saved));
    }
  }, [storageKey]);

  const handleAnswer = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    localStorage.setItem(storageKey, JSON.stringify(newAnswers));
  };

  const handleNext = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
      localStorage.removeItem(storageKey);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRetake = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsFinished(false);
  };

  const progress = ((currentStep + 1) / quizQuestions.length) * 100;
  const current = quizQuestions[currentStep];
  const isAnswered = answers[current?.id] !== undefined;

  if (isFinished) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-10"
      >
        <h2 className="text-2xl font-bold font-headline mb-4 text-gray-900 dark:text-white">Quiz Completed!</h2>
        <p className="text-muted-foreground mb-6">Based on your answers, here's your recommended field:</p>
        <p className="font-semibold text-lg text-blue-600 dark:text-blue-400">{streamResults[stream]}</p>
        <Button onClick={handleRetake} className="mt-8">Retake Quiz</Button>
      </motion.div>
    );
  }

  return (
    <div>
      <Progress value={progress} className="mb-6" />
      <AnimatePresence mode="wait">
        <motion.div
          key={current?.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{currentStep + 1}. {current.question}</h3>

          {current.type === 'binary' && (
            <div className="flex flex-col sm:flex-row gap-4">
              {current.options.map((opt) => (
                <Button
                  key={opt}
                  variant={answers[current.id] === opt ? 'default' : 'outline'}
                  onClick={() => handleAnswer(current.id, opt)}
                  className="flex-1 h-auto min-h-[5rem] text-base py-4 transition-all duration-300"
                >
                  {opt}
                </Button>
              ))}
            </div>
          )}

          {current.type === 'multiple-choice' && (
            <RadioGroup
              value={answers[current.id]}
              onValueChange={(value) => handleAnswer(current.id, value)}
              className="space-y-2"
            >
              {current.options.map((opt) => (
                <div key={opt} className="flex items-center space-x-2">
                  <RadioGroupItem value={opt} id={`${current.id}-${opt}`} />
                  <Label htmlFor={`${current.id}-${opt}`}>{opt}</Label>
                </div>
              ))}
            </RadioGroup>
          )}

          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>Back</Button>
            <Button onClick={handleNext} disabled={!isAnswered}>
              {currentStep === quizQuestions.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
