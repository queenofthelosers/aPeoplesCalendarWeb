export interface DatabaseEvent {
    category: string;
    date: string;
    title: string;
    imgSrc: string;
    description: string;
    link: string;
    infoSrc: string;
}

export interface DayOfEvents {
    Revolution: DatabaseEvent[];
    Rebellion: DatabaseEvent[];
    Birthdays: DatabaseEvent[];
    Assassinations: DatabaseEvent[];
    Labor: DatabaseEvent[];
    Other: DatabaseEvent[];
}

export interface EventDatabase {
    [dayString: string]: DayOfEvents;
}
