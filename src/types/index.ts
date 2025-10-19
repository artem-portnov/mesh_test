export type Team = {
    id: number;
    name: string;
    crest: string;
};

export type TeamListResponse = {
    teams: Team[];
};

export type SquadMember = {
    id: number;
    name: string;
    position: string;
};

export type TeamDetail = {
    id: number;
    name: string;
    crest: string;
    squad: SquadMember[];
};

export type Match = {
    id: number;
    utcDate: string;
    status: string;
    competition: {
        name: string
    };
    homeTeam: {
        name: string
    };
    awayTeam: {
        name: string
    };
};

export type MatchesResponse = {
    matches: Match[];
};
