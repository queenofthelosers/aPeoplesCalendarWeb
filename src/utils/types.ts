export interface DatabaseEvent {
    category: string;
    date: string;
    title: string;
    imgSrc: string;
    imgAlt: string;
    NSFW: boolean;
    description: string;
    link: string;
    infoSrc: string;
    otd: string;
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
