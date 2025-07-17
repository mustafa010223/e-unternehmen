import { ReactElement } from 'react';

export enum SlideLayout {
    Title,
    Agenda,
    CenteredGraphic,
    Waterfall,
    WallOfConfusion,
    DevOpsIntro,
    DevOpsWhatIs,
    DevOpsCycle,
    CIvsCD,
    ToolsTable,
    DoraMetrics,
    DoraTable,
    SuccessStories,
    Future,
    DevSecOps,
    GitOps,
    DeploymentStrategy,
    AIOps,
    Summary,
    End,
    ComparisonTable,
}

export type Stage = 'Plan' | 'Code' | 'Build' | 'Test' | 'Release' | 'Deploy' | 'Operate' | 'Monitor' | 'End' | null;

export type TableRow = (string | { text: string, icon?: ReactElement })[];

export interface SlideData {
    id: number;
    layout: SlideLayout;
    title?: string;
    subtitle?: string;
    text?: string;
    listItems?: { text: string, icon: ReactElement }[];
    graphic?: { 
        type: 'cartoon' | 'diagram' | 'logos' | 'wall' | 'devops-cycle' | 'future' | 'devsecops' | 'gitops' | 'aiops';
        data?: any;
    };
    tableData?: {
        headers: string[];
        rows: TableRow[];
        categoryHighlight?: {
            columnIndex: number;
            value: string;
            color: string;
        }
    }
    animatedCycle?: {
        stage: Stage;
        description: string;
    }
    twoColumn?: {
        left: { title: string, content: string | { text: string, icon: ReactElement }[], icon?: ReactElement };
        right: { title: string, content: string | { text: string, icon: ReactElement }[], icon?: ReactElement };
    }
    threeColumn?: {
        items: { logo: ReactElement, title: string, text: string }[];
    }
    shouldAnimateWall?: 'build' | 'destroy';
}