
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { CodeEditor } from './components/CodeEditor';
import { ReviewOutput } from './components/ReviewOutput';
import { Loader } from './components/Loader';
import { reviewCode } from './services/geminiService';
import { RobotIcon } from './components/icons/RobotIcon';

const App: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [review, setReview] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleReviewCode = useCallback(async () => {
    if (!code.trim()) {
      setError('Please enter some code to review.');
      return;
    }
    setIsLoading(true);
    setError('');
    setReview('');
    try {
      const feedback = await reviewCode(code);
      setReview(feedback);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setReview('');
    } finally {
      setIsLoading(false);
    }
  }, [code]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col md:flex-row p-4 gap-4">
        <div className="flex-1 flex flex-col h-[calc(100vh-120px)] md:h-auto">
          <CodeEditor code={code} setCode={setCode} />
        </div>
        <div className="flex items-center justify-center">
            <button
                onClick={handleReviewCode}
                disabled={isLoading}
                className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center gap-2 transform hover:scale-105 disabled:scale-100"
            >
                {isLoading ? (
                    <>
                        <Loader />
                        Reviewing...
                    </>
                ) : (
                    <>
                        <RobotIcon />
                        Review Code
                    </>
                )}
            </button>
        </div>
        <div className="flex-1 flex flex-col h-[calc(100vh-120px)] md:h-auto">
          <ReviewOutput review={review} isLoading={isLoading} error={error} />
        </div>
      </main>
    </div>
  );
};

export default App;
