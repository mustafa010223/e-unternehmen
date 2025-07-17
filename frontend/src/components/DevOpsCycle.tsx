import React, { useState, useEffect, useMemo } from 'react';
import { Stage } from '../types';

interface DevOpsCycleProps {
    activeStage: Stage;
    description?: string;
    isFaded?: boolean;
    showSecurity?: boolean;
    showAI?: boolean;
}

const STAGE_POSITIONS: Record<Stage | 'null', { cx: number; cy: number }> = {
    Plan: { cx: 125, cy: 150 },
    Code: { cx: 200, cy: 75 },
    Build: { cx: 300, cy: 75 },
    Test: { cx: 400, cy: 75 },
    Release: { cx: 475, cy: 150 },
    Deploy: { cx: 400, cy: 225 },
    Operate: { cx: 300, cy: 225 },
    Monitor: { cx: 200, cy: 225 },
    End: { cx: 125, cy: 150 },
    null: { cx: 125, cy: 150 },
};

const DevOpsCycle: React.FC<DevOpsCycleProps> = ({ activeStage, description, isFaded = false, showSecurity = false, showAI = false }) => {
    const [circlePos, setCirclePos] = useState(STAGE_POSITIONS['Plan']);
    const [showCircle, setShowCircle] = useState(false);

    const stages = useMemo(() => [
        { name: 'Plan' as Stage, pos: STAGE_POSITIONS['Plan'] },
        { name: 'Code' as Stage, pos: STAGE_POSITIONS['Code'] },
        { name: 'Build' as Stage, pos: STAGE_POSITIONS['Build'] },
        { name: 'Test' as Stage, pos: STAGE_POSITIONS['Test'] },
        { name: 'Release' as Stage, pos: STAGE_POSITIONS['Release'] },
        { name: 'Deploy' as Stage, pos: STAGE_POSITIONS['Deploy'] },
        { name: 'Operate' as Stage, pos: STAGE_POSITIONS['Operate'] },
        { name: 'Monitor' as Stage, pos: STAGE_POSITIONS['Monitor'] },
    ], []);

    useEffect(() => {
        if (activeStage) {
            setShowCircle(true);
            setCirclePos(STAGE_POSITIONS[activeStage]);
            if (activeStage === 'End') {
                setTimeout(() => setShowCircle(false), 500);
            }
        } else {
            setShowCircle(false);
        }
    }, [activeStage]);
    
    const isActiveStage = (stageName: string) => activeStage === stageName;

    return (
        <div className={`relative w-full h-full flex flex-col items-center justify-center ${isFaded ? 'opacity-20' : ''}`}>
            <svg viewBox="0 0 600 300" className="w-full max-w-2xl">
                <path
                    d="M 200,75
                       A 75,75 0 1 1 200,225
                       L 400,75
                       A 75,75 0 1 0 400,225
                       L 200,75 Z"
                    fill="none"
                    strokeWidth="3"
                    className="stroke-secondary animate-draw"
                />

                {/* Stages */}
                {stages.map(stage => (
                    <g key={stage.name}>
                        <text
                            x={stage.pos.cx}
                            y={stage.pos.cy - 15}
                            textAnchor="middle"
                            fontSize="14"
                            fontWeight={isActiveStage(stage.name) ? "bold" : "normal"}
                            className={`transition-all duration-500 ${isActiveStage(stage.name) ? 'fill-accent' : 'fill-secondary'}`}
                        >
                            {stage.name}
                        </text>
                    </g>
                ))}

                {/* Animated Circle */}
                {activeStage && (
                  <circle
                    cx={circlePos.cx}
                    cy={circlePos.cy}
                    r="10"
                    className="fill-accent transition-all duration-1000 ease-in-out"
                    style={{ opacity: showCircle ? 1 : 0 }}
                  />
                )}
                
                {/* DevSecOps Addons */}
                {showSecurity && (
                    <>
                     <text x={125} y={110} textAnchor="middle" fontSize="12" className="fill-primary font-bold animate-pop-in">Threat Modeling</text>
                     <text x={200} y={45} textAnchor="middle" fontSize="12" className="fill-primary font-bold animate-pop-in" style={{animationDelay: '0.2s'}}>SAST</text>
                     <text x={400} y={45} textAnchor="middle" fontSize="12" className="fill-primary font-bold animate-pop-in" style={{animationDelay: '0.4s'}}>DAST</text>
                    </>
                )}

                {/* AIOps Addons */}
                 {showAI && (
                    <>
                        <path d="M 300 20 L 400 60" strokeWidth="1" strokeDasharray="5,5" className="stroke-primary animate-fade-in" />
                        <text x={410} y={55} fontSize="12" className="fill-primary font-bold animate-pop-in" style={{animationDelay: '0.2s'}}>Tahmine Dayalı Hata Tespiti</text>
                        
                        <path d="M 300 20 L 410 210" strokeWidth="1" strokeDasharray="5,5" className="stroke-primary animate-fade-in" style={{animationDelay: '0.4s'}}/>
                        <text x={420} y={210} fontSize="12" className="fill-primary font-bold animate-pop-in" style={{animationDelay: '0.6s'}}>Akıllı Dağıtım Zamanlaması</text>
                        
                        <path d="M 300 20 L 190 210" strokeWidth="1" strokeDasharray="5,5" className="stroke-primary animate-fade-in" style={{animationDelay: '0.8s'}}/>
                        <text x={100} y={210} fontSize="12" className="fill-primary font-bold animate-pop-in" style={{animationDelay: '1s'}}>Otomatik Sorun Giderme</text>
                    </>
                )}

            </svg>
            {description && (
                <div className="absolute bottom-1/4 transform translate-y-1/2 w-full text-center">
                    <p className="inline-block bg-white p-4 rounded-lg shadow-lg text-lg font-semibold text-primary animate-pop-in">
                        {description}
                    </p>
                </div>
            )}
        </div>
    );
};

export default DevOpsCycle;