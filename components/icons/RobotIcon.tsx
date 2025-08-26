
import React from 'react';

interface IconProps {
    className?: string;
}

export const RobotIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        <circle cx="12" cy="5" r="1"></circle>
        <path d="M8 16h.01"></path>
        <path d="M16 16h.01"></path>
    </svg>
);
