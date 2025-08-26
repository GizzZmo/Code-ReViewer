
import React, { useEffect, useState, useRef } from 'react';
import { Loader } from './Loader';
import { RobotIcon } from './icons/RobotIcon';

declare global {
  interface Window {
    marked: {
      parse(markdown: string): string;
    };
    DOMPurify: {
      sanitize(html: string): string;
    };
  }
}

interface ReviewOutputProps {
  review: string;
  isLoading: boolean;
  error: string;
}

const renderMarkdown = (markdown: string): string => {
  if (window.marked && window.DOMPurify) {
    const rawHtml = window.marked.parse(markdown);
    return window.DOMPurify.sanitize(rawHtml);
  }
  return markdown;
};

export const ReviewOutput: React.FC<ReviewOutputProps> = ({ review, isLoading, error }) => {
  const [sanitizedHtml, setSanitizedHtml] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (review) {
      setSanitizedHtml(renderMarkdown(review));
    }
  }, [review]);

  useEffect(() => {
    if (contentRef.current) {
        contentRef.current.scrollTop = 0;
    }
  }, [sanitizedHtml, isLoading, error]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
          <Loader />
          <p className="text-lg">Analyzing your code...</p>
          <p className="text-sm text-gray-500">The AI is thinking hard!</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-red-400 p-4">
          <h3 className="text-xl font-semibold mb-2">An Error Occurred</h3>
          <p className="text-center bg-red-900/50 p-3 rounded-md">{error}</p>
        </div>
      );
    }

    if (review) {
      return (
        <div
          className="prose prose-invert prose-sm sm:prose-base max-w-none p-6"
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
        <RobotIcon className="w-16 h-16 mb-4" />
        <h3 className="text-xl font-semibold text-gray-400">Awaiting Analysis</h3>
        <p className="text-center mt-2">Paste your code in the editor and click "Review Code" to see the AI's feedback here.</p>
      </div>
    );
  };
  
  return (
    <div className="w-full h-full flex flex-col bg-gray-800 rounded-lg border border-gray-700 shadow-2xl">
      <div className="flex items-center p-3 bg-gray-700/50 rounded-t-lg border-b border-gray-600">
        <RobotIcon className="w-5 h-5 mr-2 text-indigo-400" />
        <h2 className="text-lg font-semibold text-gray-300">AI Review</h2>
      </div>
      <div ref={contentRef} className="flex-grow overflow-y-auto"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#4f46e5 #374151'
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
};
