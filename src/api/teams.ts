import { api } from './axios';
import type {
    TeamListResponse,
    TeamDetail,
    MatchesResponse,
} from '../types';

export async function fetchTeams(params: {
    limit: number;
    offset: number;
}): Promise<TeamListResponse> {
    const {limit, offset} = params;
    const res = await api.get<TeamListResponse>('/teams', {
        params: {limit, offset}
    });
    return res.data;
}

export async function fetchTeam(teamId: number): Promise<TeamDetail> {
    const res = await api.get<TeamDetail>(`/teams/${teamId}`);
    return res.data;
}

export async function fetchTeamMatches(
    teamId: number,
    filters?: { status?: string }
): Promise<MatchesResponse> {
    const res = await api.get<MatchesResponse>(`/teams/${teamId}/matches`, {
        params: filters || {}
    });
    return res.data;
}