import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

export default function QuizFlow({ stream }) {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [finalResult, setFinalResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (!currentQuestion && !finalResult) {
    fetchNextQuestion({});
  }
}, []);


  const fetchNextQuestion = async (currentAnswers) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stream, answers: currentAnswers })
      });
      const data = await res.json();

      if (data.type === "question") {
        setCurrentQuestion(data);
        setFinalResult(null);
      } else if (data.type === "result") {
        setFinalResult(data.result);
      }
    } catch (err) {
      console.error("Error fetching question:", err);
    }
    setLoading(false);
  };

  const handleAnswer = async (answer) => {
    const newAnswers = { ...answers, [currentQuestion.question]: answer };
    setAnswers(newAnswers);
    await fetchNextQuestion(newAnswers);
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentQuestion(null);
    setFinalResult(null);
    fetchNextQuestion({});
  };

  if (loading) {
    return <p className="text-center py-10 text-gray-600 dark:text-gray-300">Loading...</p>;
  }

  if (finalResult) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-10"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Quiz Completed!</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Here’s your detailed career suggestion:</p>
        <div className="prose prose-blue dark:prose-invert text-left mx-auto">
          <ReactMarkdown>{finalResult}</ReactMarkdown>
        </div>
        <Button onClick={handleRetake} className="mt-8 bg-blue-600 hover:bg-blue-700 text-white">
          Retake Quiz
        </Button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentQuestion?.question}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {currentQuestion.question}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentQuestion.options.map((opt) => (
            <Button
              key={opt}
              onClick={() => handleAnswer(opt)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 rounded-xl transition-all duration-300 h-auto min-h-[4rem] text-base hover:cursor-pointer flex justify-center items-center whitespace-normal break-words"
            >
              {opt}
            </Button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
