
import React from 'react';
import { RobotIcon } from './icons/RobotIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm p-4 border-b border-gray-700 shadow-lg">
      <div className="container mx-auto flex items-center gap-3">
        <RobotIcon className="w-8 h-8 text-indigo-400" />
        <h1 className="text-2xl font-bold text-white tracking-wider">
          Gemini Code Reviewer
        </h1>
      </div>
    </header>
  );
};
