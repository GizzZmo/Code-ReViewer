
import React from 'react';
import { CodeIcon } from './icons/CodeIcon';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode }) => {
  return (
    <div className="w-full h-full flex flex-col bg-gray-800 rounded-lg border border-gray-700 shadow-2xl">
      <div className="flex items-center p-3 bg-gray-700/50 rounded-t-lg border-b border-gray-600">
        <CodeIcon className="w-5 h-5 mr-2 text-gray-400" />
        <h2 className="text-lg font-semibold text-gray-300">Your Code</h2>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder={`// Paste your code here to get a review...\n\nfunction example() {\n  console.log("Hello, World!");\n}`}
        className="flex-grow w-full p-4 bg-transparent text-gray-300 font-mono text-sm resize-none focus:outline-none placeholder-gray-500"
        spellCheck="false"
      />
    </div>
  );
};
