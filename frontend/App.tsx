
import React, { useState, useEffect, useCallback } from 'react';
import { SLIDE_DATA } from './constants';
import SlidePresenter from './components/SlidePresenter';
import Navigation from './components/Navigation';

const App: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNext = useCallback(() => {
        setCurrentSlide(prev => (prev < SLIDE_DATA.length - 1 ? prev + 1 : prev));
    }, []);

    const handlePrev = () => {
        setCurrentSlide(prev => (prev > 0 ? prev - 1 : prev));
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight') {
                handleNext();
            } else if (event.key === 'ArrowLeft') {
                handlePrev();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleNext]);

    return (
        <div className="w-screen h-screen bg-background text-secondary flex flex-col items-center justify-center p-4 lg:p-8 overflow-hidden font-lato">
            <main className="w-full h-full max-w-6xl max-h-[720px] aspect-video bg-white shadow-2xl rounded-lg relative flex flex-col">
                <SlidePresenter slide={SLIDE_DATA[currentSlide]} key={currentSlide} />
                <Navigation 
                    onPrev={handlePrev} 
                    onNext={handleNext} 
                    current={currentSlide} 
                    total={SLIDE_DATA.length} 
                />
            </main>
             <footer className="text-center mt-4 text-gray-500 text-sm">
                Use Left/Right arrow keys to navigate
            </footer>
        </div>
    );
};

export default App;
