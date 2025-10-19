import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch } from '../index';
import { fetchTeam, fetchTeamMatches } from '../../api/teams';
import type { TeamDetail, Match } from '../../types';

type TeamDetailsState = {
    detail?: TeamDetail;
    matches?: Match[];
    loading: boolean;
    error?: string | null;
};

const initialState: TeamDetailsState = {
    loading: false,
    error: null,
};

const slice = createSlice({
    name: 'teamDetails',
    initialState,
    reducers: {
        fetchStart(state: TeamDetailsState) {
            state.loading = true;
            state.error = null;
        },
        fetchSuccess(state: TeamDetailsState, action: PayloadAction<{ detail: TeamDetail; matches: Match[] }>) {
            state.loading = false;
            state.detail = action.payload.detail;
            state.matches = action.payload.matches;
        },
        fetchFailure(state: TeamDetailsState, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchStart, fetchSuccess, fetchFailure } = slice.actions;
export default slice.reducer;

export const loadTeamDetails = (teamId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchStart());
        const [detail, matchesRes] = await Promise.all([
            fetchTeam(teamId),
            fetchTeamMatches(teamId, { status: 'SCHEDULED' })
        ]);
        dispatch(fetchSuccess({
            detail,
            matches: matchesRes.matches || []
        }));
    } catch (e: any) {
        dispatch(fetchFailure(e?.message ?? 'Ошибка загрузки'));
    }
};