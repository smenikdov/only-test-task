import type { TimelineTopic, TimelineEvent } from '../../types';

export interface TimelinePointProps {
    name: string;
    index: number;
    radius: number;
    totalLength: number;
    activeTopicIndex: number;
    onClick: () => void;
}

export interface TimelineProps {
    title: React.ReactNode;
    topics: TimelineTopic[];
}

export interface TimelineSwiperProps {
    events: TimelineEvent[];
}
