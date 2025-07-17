import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface NavigationProps {
    onPrev: () => void;
    onNext: () => void;
    current: number;
    total: number;
}

const Navigation: React.FC<NavigationProps> = ({ onPrev, onNext, current, total }) => {
    const progress = ((current + 1) / total) * 100;

    return (
        <div className="absolute bottom-0 left-0 w-full p-4 bg-white/80 backdrop-blur-sm rounded-b-lg">
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                <div 
                    className="h-1.5 rounded-full transition-all duration-300 bg-primary"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className="flex justify-between items-center">
                <button
                    onClick={onPrev}
                    disabled={current === 0}
                    className="p-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                    aria-label="Previous Slide"
                >
                    <FaArrowLeft className="text-secondary" />
                </button>
                <span className="text-sm font-medium text-secondary">
                    {current + 1} / {total}
                </span>
                <button
                    onClick={onNext}
                    disabled={current === total - 1}
                    className="p-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                    aria-label="Next Slide"
                >
                    <FaArrowRight className="text-secondary" />
                </button>
            </div>
        </div>
    );
};

export default Navigation;
