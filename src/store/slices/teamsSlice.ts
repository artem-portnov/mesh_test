import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTeams } from '../../api/teams';
import type { Team } from '../../types';
import { AppDispatch } from '../index.ts';

const PAGE_SIZE = 10;

type TeamsState = {
    items: Team[];
    loading: boolean;
    error?: string | null;
    offset: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
};

const initialState: TeamsState = {
    items: [],
    loading: false,
    error: null,
    offset: 0,
    limit: PAGE_SIZE,
    hasNext: true,
    hasPrev: false,
};

const slice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        fetchStart(state: TeamsState) {
            state.loading = true;
            state.error = null;
        },
        fetchSuccess(
            state: TeamsState,
            action: PayloadAction<{ items: Team[]; offset: number }>
        ) {
            state.loading = false;
            state.items = action.payload.items;
            state.offset = action.payload.offset;
            state.hasNext = action.payload.items.length === state.limit;
            state.hasPrev = action.payload.offset > 0;
        },
        fetchFailure(state: TeamsState, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchStart, fetchSuccess, fetchFailure } = slice.actions;

export default slice.reducer;

export const loadTeams = (newOffset?: number) => async (dispatch: AppDispatch) => {
    try {
        const offset = newOffset ?? 0;
        dispatch(fetchStart());
        const data = await fetchTeams({ limit: PAGE_SIZE, offset });
        dispatch(fetchSuccess({
            items: data.teams,
            offset
        }));
    } catch (e: any) {
        console.error('Ошибка загрузки команд: ', e);
        dispatch(fetchFailure(e?.message ?? 'Не удалось загрузить команды'));
    }
};