export type Team = {
    id: number;
    name: string;
    crest: string;
};

export type TeamListResponse = {
    teams: Team[];
};