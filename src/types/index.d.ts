export interface TimelineEvent {
    year: number;
    name: string;
}

export interface TimelineTopic {
    startYear: number;
    endYear: number;
    name: string;
    events: TimelineEvent[];
}
