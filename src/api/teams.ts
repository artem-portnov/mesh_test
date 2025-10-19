import { api } from './axios';
import type {
    TeamListResponse,
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