import React, { useState, useEffect } from 'react';
import { SlideData, SlideLayout, TableRow } from '../types';
import DevOpsCycle from './DevOpsCycle';
import { FaCalendarAlt, FaStopwatch, FaLink, FaUndo, FaBrain, FaCode, FaServer, FaArrowRight, FaCubes, FaTimes, FaUsers, FaCogs, FaRobot } from 'react-icons/fa';
import { SiGit, SiKubernetes } from 'react-icons/si';

interface SlidePresenterProps {
    slide: SlideData;
}

const Table: React.FC<{ headers: string[], rows: TableRow[], categoryHighlight?: any }> = ({ headers, rows, categoryHighlight }) => (
    <div className="w-full h-full overflow-auto p-4 animate-fade-in">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
                <tr>
                    {headers.map((h, i) => <th key={i} className="whitespace-nowrap px-4 py-3 font-medium text-secondary text-left">{h}</th>)}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className={`hover:bg-gray-100 transition-colors ${categoryHighlight && row[categoryHighlight.columnIndex] !== categoryHighlight.value ? categoryHighlight.color : 'bg-white'}`}>
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="whitespace-pre-wrap px-4 py-3 font-lato text-secondary align-top">
                                {typeof cell === 'string' ? cell : <div className="flex items-center gap-2">{cell.icon}{cell.text}</div>}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);


const SlidePresenter: React.FC<SlidePresenterProps> = ({ slide }) => {
    
    const [wallState, setWallState] = useState(slide.shouldAnimateWall === 'build' ? 'initial' : 'destroyed');

    useEffect(() => {
        if (slide.shouldAnimateWall) {
            if (slide.shouldAnimateWall === 'build') {
                setWallState('building');
                setTimeout(() => setWallState('built'), 1000);
            } else if (slide.shouldAnimateWall === 'destroy') {
                setWallState('destroying');
                setTimeout(() => setWallState('destroyed'), 1000);
            }
        }
    }, [slide.shouldAnimateWall]);

    const renderLayout = () => {
        switch (slide.layout) {
            case SlideLayout.Title:
                return (
                    <div className="flex flex-col items-center justify-center text-center h-full bg-[radial-gradient(circle,_#27788410,_transparent_60%)]">
                        <h1 className="text-5xl font-montserrat animate-rise text-primary">{slide.title}</h1>
                        <p className="text-2xl mt-4 max-w-3xl animate-fade-in text-secondary" style={{ animationDelay: '0.5s' }}>{slide.subtitle}</p>
                    </div>
                );
            case SlideLayout.Agenda:
            case SlideLayout.Summary:
                return (
                    <div className="p-12">
                        <h2 className="text-4xl font-montserrat mb-8 animate-pan-in text-primary">{slide.title}</h2>
                        <ul className="space-y-4">
                            {slide.listItems?.map((item, index) => (
                                <li key={index} className="flex items-center text-2xl animate-rise" style={{ animationDelay: `${0.2 * (index + 1)}s` }}>
                                    {item.icon}
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case SlideLayout.CenteredGraphic:
                return (
                     <div className="p-12 text-center flex flex-col justify-center items-center h-full">
                        <h2 className="text-4xl font-montserrat mb-8 animate-rise text-primary">{slide.title}</h2>
                        <div className="border-4 border-accent p-8 rounded-lg animate-pop-in">
                            <h3 className="text-3xl font-montserrat mb-4">{slide.graphic?.data.title}</h3>
                            <p className="text-xl max-w-2xl">{slide.graphic?.data.text}</p>
                        </div>
                    </div>
                );
            case SlideLayout.Waterfall:
                return (
                    <div className="p-12 flex flex-col items-center h-full">
                         <h2 className="text-4xl font-montserrat mb-8 animate-pan-in text-primary">{slide.title}</h2>
                         <div className="flex items-center gap-8">
                            <div className="space-y-2">
                                {['Requirements', 'Design', 'Development', 'Testing', 'Deployment'].map((step, i) => (
                                    <div key={step} className="flex items-center animate-rise" style={{ animationDelay: `${i * 0.2}s` }}>
                                        <div className="bg-primary text-white font-bold py-2 px-4 rounded-lg">{step}</div>
                                        {i < 4 && <FaArrowRight className="text-2xl mx-2 text-accent" />}
                                    </div>
                                ))}
                            </div>
                            <p className="text-lg max-w-sm p-4 bg-gray-100 rounded-lg animate-fade-in" style={{ animationDelay: '1.2s' }}>{slide.text}</p>
                         </div>
                    </div>
                );
            case SlideLayout.WallOfConfusion:
                const wallClasses: { [key: string]: string } = {
                    initial: 'opacity-0 scale-y-0',
                    building: 'animate-build',
                    built: 'opacity-100 scale-y-100',
                    destroying: 'animate-shatter',
                    destroyed: 'opacity-0 scale-y-0'
                };
                return (
                    <div className="p-12 flex flex-col items-center justify-center h-full">
                         <h2 className="text-4xl font-montserrat mb-8 animate-rise text-primary">{slide.title}</h2>
                         <div className="flex justify-around items-center w-full">
                            <div className="text-center animate-pan-in">
                                <FaCode className="text-6xl mx-auto text-secondary"/>
                                <h3 className="text-2xl font-bold mt-2">DEVELOPMENT</h3>
                                {wallState !== 'destroyed' && <p className="mt-2 p-2 bg-blue-100 rounded-lg animate-pop-in">"Değişim istiyoruz!"</p>}
                            </div>
                            <div className="relative h-48 w-1/3">
                                {wallState !== 'destroyed' && <div className={`absolute inset-0 bg-orange-200 border-4 border-accent transform origin-bottom ${wallClasses[wallState]} transition-all duration-1000`}><span className="text-xl font-bold text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Wall of Confusion</span></div> }
                                {wallState === 'destroyed' && <div className="text-center text-primary animate-pop-in space-y-2"><p className="text-xl font-bold">İletişim</p><p className="text-xl font-bold">İşbirliği</p><p className="text-xl font-bold">Entegrasyon</p></div>}
                            </div>
                            <div className="text-center animate-pan-in" style={{animationDelay: '0.2s'}}>
                                <FaServer className="text-6xl mx-auto text-secondary"/>
                                <h3 className="text-2xl font-bold mt-2">OPERATIONS</h3>
                                 {wallState !== 'destroyed' && <p className="mt-2 p-2 bg-green-100 rounded-lg animate-pop-in">"İstikrar istiyoruz!"</p>}
                            </div>
                         </div>
                    </div>
                );
            case SlideLayout.DevOpsWhatIs:
                 return (
                    <div className="p-12 flex flex-col h-full">
                         <h2 className="text-4xl font-montserrat mb-8 text-center animate-rise text-primary">{slide.title}</h2>
                         <div className="flex-grow grid grid-cols-2 gap-8 items-center">
                            <div className="text-center p-6 border-r-2 border-gray-200">
                                <h3 className="text-3xl font-montserrat mb-6 text-red-600">DevOps NE DEĞİLDİR?</h3>
                                <div className="space-y-4">
                                    <div className="relative inline-block m-2 animate-pop-in" title="Bir Araç Değil"><FaCubes className="text-6xl text-secondary"/><FaTimes className="absolute -top-2 -right-2 text-4xl text-red-500 animate-stamp" style={{animationDelay: '0.5s'}}/></div>
                                    <div className="relative inline-block m-2 animate-pop-in" title="Bir Rol Değil" style={{animationDelay: '0.2s'}}><FaCogs className="text-6xl text-secondary"/><FaTimes className="absolute -top-2 -right-2 text-4xl text-red-500 animate-stamp" style={{animationDelay: '0.7s'}}/></div>
                                    <div className="relative inline-block m-2 animate-pop-in" title="Bir Takım Değil" style={{animationDelay: '0.4s'}}><FaUsers className="text-6xl text-secondary"/><FaTimes className="absolute -top-2 -right-2 text-4xl text-red-500 animate-stamp" style={{animationDelay: '0.9s'}}/></div>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-3xl font-montserrat mb-6 text-primary">DevOps NEDİR?</h3>
                                <p className="text-xl animate-rise">Geliştirme (Dev) ve Operasyonları (Ops) birleştiren bir dizi uygulama ve kültürel bir felsefedir.</p>
                            </div>
                         </div>
                    </div>
                );
            case SlideLayout.DevOpsCycle:
                return (
                    <div className="flex flex-col h-full justify-center p-8">
                       {slide.title && <h2 className="text-4xl font-montserrat text-center mb-4 animate-rise text-primary">{slide.title}</h2>}
                        <div className="flex-grow relative">
                             {/* Faded background for animated slides */}
                             {slide.animatedCycle && slide.animatedCycle.stage && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <DevOpsCycle activeStage={null} isFaded={true} />
                                </div>
                             )}
                            <DevOpsCycle activeStage={slide.animatedCycle?.stage || null} description={slide.animatedCycle?.description}/>
                        </div>
                        {slide.text && <p className="text-center text-lg mt-4 max-w-3xl mx-auto animate-fade-in">{slide.text}</p>}
                    </div>
                );
            case SlideLayout.CIvsCD:
                return (
                     <div className="p-12 text-center flex flex-col items-center h-full">
                        <h2 className="text-4xl font-montserrat mb-4 animate-rise text-primary">{slide.title}</h2>
                        <p className="text-lg max-w-3xl mb-8 animate-fade-in" style={{animationDelay: '0.3s'}}>{slide.text}</p>
                        <div className="flex gap-8">
                             <div className="p-6 border-2 border-primary rounded-lg animate-pan-in">
                                <h3 className="text-2xl font-bold">Continuous Integration (CI)</h3>
                                <p>Otomatik Yapı ve Test</p>
                            </div>
                             <div className="p-6 border-2 border-secondary rounded-lg animate-pan-in" style={{animationDelay: '0.2s'}}>
                                <h3 className="text-2xl font-bold">Continuous Delivery/Deployment (CD)</h3>
                                <p>Otomatik Yayın ve Dağıtım</p>
                            </div>
                        </div>
                    </div>
                )
             case SlideLayout.DeploymentStrategy:
                return (
                     <div className="p-12 text-center flex flex-col items-center h-full">
                        <h2 className="text-4xl font-montserrat mb-4 animate-rise text-primary">{slide.title}</h2>
                        <div className="flex justify-around w-full items-start mt-8">
                            <div className="w-2/5 p-4 bg-gray-50 rounded-lg animate-pop-in">
                                <h3 className="text-xl font-bold mb-4">{slide.twoColumn?.left.title}</h3>
                                {slide.twoColumn?.left.icon}
                                <p className="mt-4 text-base">{typeof slide.twoColumn?.left.content === 'string' ? slide.twoColumn?.left.content : ''}</p>
                            </div>
                             <div className="w-2/5 p-4 bg-gray-50 rounded-lg animate-pop-in" style={{animationDelay: '0.3s'}}>
                                <h3 className="text-xl font-bold mb-4">{slide.twoColumn?.right.title}</h3>
                                {slide.twoColumn?.right.icon}
                                <p className="mt-4 text-base">{typeof slide.twoColumn?.right.content === 'string' ? slide.twoColumn?.right.content : ''}</p>
                            </div>
                        </div>
                        <p className="text-lg mt-8 font-semibold animate-fade-in" style={{animationDelay: '0.6s'}}>{slide.text}</p>
                     </div>
                )
            case SlideLayout.ToolsTable:
            case SlideLayout.DoraTable:
            case SlideLayout.ComparisonTable:
                return (
                    <div className="p-8 h-full flex flex-col">
                        <h2 className="text-3xl font-montserrat text-center mb-4 flex-shrink-0 animate-rise text-primary">{slide.title}</h2>
                        <div className="flex-grow overflow-hidden">
                           {slide.tableData && <Table headers={slide.tableData.headers} rows={slide.tableData.rows} categoryHighlight={slide.tableData.categoryHighlight}/>}
                        </div>
                    </div>
                );
            case SlideLayout.DoraMetrics:
                return (
                    <div className="p-12">
                         <h2 className="text-4xl font-montserrat mb-4 animate-rise text-primary">{slide.title}</h2>
                         <p className="text-lg max-w-4xl mb-8 animate-fade-in" style={{animationDelay: '0.3s'}}>{slide.text}</p>
                         <div className="grid grid-cols-2 gap-6 text-xl">
                            <div className="flex items-center p-4 bg-blue-50 rounded-lg animate-pop-in" style={{animationDelay: '0.5s'}}><FaCalendarAlt className="text-4xl mr-4 text-blue-500"/> Deployment Frequency</div>
                            <div className="flex items-center p-4 bg-blue-50 rounded-lg animate-pop-in" style={{animationDelay: '0.7s'}}><FaStopwatch className="text-4xl mr-4 text-blue-500"/> Lead Time for Changes</div>
                            <div className="flex items-center p-4 bg-red-50 rounded-lg animate-pop-in" style={{animationDelay: '0.9s'}}><FaLink className="text-4xl mr-4 text-red-500"/> Change Failure Rate</div>
                            <div className="flex items-center p-4 bg-red-50 rounded-lg animate-pop-in" style={{animationDelay: '1.1s'}}><FaUndo className="text-4xl mr-4 text-red-500"/> Time to Restore Service</div>
                         </div>
                    </div>
                );
            case SlideLayout.SuccessStories:
                return (
                     <div className="p-12">
                        <h2 className="text-4xl font-montserrat text-center mb-8 animate-rise text-primary">{slide.title}</h2>
                        <div className="grid grid-cols-3 gap-8">
                            {slide.threeColumn?.items.map((item, index) => (
                                <div key={index} className="text-center p-6 bg-gray-50 rounded-lg shadow-md animate-rise" style={{ animationDelay: `${0.2 * (index + 1)}s` }}>
                                    <div className="flex justify-center mb-4">{item.logo}</div>
                                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-base">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case SlideLayout.Future:
                return (
                    <div className="p-12 flex flex-col items-center justify-center h-full">
                         <h2 className="text-4xl font-montserrat mb-4 animate-rise text-primary">{slide.title}</h2>
                         <p className="text-lg max-w-3xl text-center mb-8 animate-fade-in" style={{animationDelay: '0.3s'}}>{slide.text}</p>
                         <div className="relative">
                            <DevOpsCycle activeStage={null}/>
                            <div className="absolute top-10 left-0 animate-pop-in" style={{animationDelay: '0.5s'}}><div className="p-3 bg-primary text-white rounded-lg shadow-lg">DevSecOps</div></div>
                            <div className="absolute bottom-10 left-20 animate-pop-in" style={{animationDelay: '0.8s'}}><div className="p-3 bg-primary text-white rounded-lg shadow-lg">GitOps & Progressive Delivery</div></div>
                            <div className="absolute top-1/2 right-0 -translate-y-1/2 animate-pop-in" style={{animationDelay: '1.1s'}}><div className="p-3 bg-primary text-white rounded-lg shadow-lg">AIOps</div></div>
                         </div>
                    </div>
                );
            case SlideLayout.DevSecOps:
                return (
                     <div className="p-12 flex items-center gap-8 h-full">
                        <div className="w-1/2 animate-pan-in">
                            <h2 className="text-4xl font-montserrat mb-4 text-primary">{slide.title}</h2>
                            <p className="text-lg">{slide.text}</p>
                        </div>
                        <div className="w-1/2 relative">
                            <DevOpsCycle activeStage={null} showSecurity={true} />
                        </div>
                    </div>
                );
             case SlideLayout.GitOps:
                return (
                    <div className="p-12 h-full flex flex-col">
                        <h2 className="text-4xl font-montserrat text-center mb-4 animate-rise text-primary">{slide.title}</h2>
                        <p className="text-lg text-center max-w-4xl mx-auto mb-8 animate-fade-in">{slide.text}</p>
                        <div className="flex-grow flex items-center justify-center gap-4 text-center">
                            <div className="animate-pop-in" style={{animationDelay: '0.2s'}}><FaCode className="text-6xl mx-auto text-secondary"/><p>Developer</p></div>
                            <FaArrowRight className="text-4xl text-accent animate-fade-in" style={{animationDelay: '0.4s'}}/>
                            <div className="animate-pop-in" style={{animationDelay: '0.6s'}}><SiGit className="text-6xl mx-auto text-secondary"/><p>Git (Pull Request)</p></div>
                            <FaArrowRight className="text-4xl text-accent animate-fade-in" style={{animationDelay: '0.8s'}}/>
                            <div className="animate-pop-in" style={{animationDelay: '1s'}}><FaCogs className="text-6xl mx-auto text-secondary"/><p>CI Process</p></div>
                            <FaArrowRight className="text-4xl text-accent animate-fade-in" style={{animationDelay: '1.2s'}}/>
                            <div className="animate-pop-in" style={{animationDelay: '1.4s'}}><FaRobot className="text-6xl mx-auto text-secondary"/><p>Operator (ArgoCD/Flux)</p></div>
                             <FaArrowRight className="text-4xl text-accent animate-fade-in" style={{animationDelay: '1.6s'}}/>
                            <div className="animate-pop-in" style={{animationDelay: '1.8s'}}><SiKubernetes className="text-6xl mx-auto text-secondary"/><p>Kubernetes Cluster</p></div>
                        </div>
                    </div>
                );
            case SlideLayout.AIOps:
                 return (
                     <div className="p-12 flex items-center gap-8 h-full">
                        <div className="w-1/2 animate-pan-in">
                            <h2 className="text-4xl font-montserrat mb-4 text-primary">{slide.title}</h2>
                            <p className="text-lg">{slide.text}</p>
                        </div>
                        <div className="w-1/2 relative">
                             <DevOpsCycle activeStage={null} showAI={true} />
                             <FaBrain className="absolute top-0 left-1/2 -translate-x-1/2 text-6xl text-accent animate-pop-in" />
                        </div>
                    </div>
                );
            case SlideLayout.End:
                return (
                    <div className="flex flex-col items-center justify-center text-center h-full">
                        <h1 className="text-6xl font-montserrat animate-rise text-primary">{slide.title}</h1>
                        <p className="text-3xl mt-4 animate-fade-in text-secondary" style={{ animationDelay: '0.5s' }}>{slide.subtitle}</p>
                    </div>
                );

            default:
                return <div>Bilinmeyen Slayt Düzeni</div>;
        }
    };

    return (
        <div className="w-full h-full flex-grow">
            {renderLayout()}
        </div>
    );
};

export default SlidePresenter;