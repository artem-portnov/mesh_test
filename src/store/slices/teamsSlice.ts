import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTeams } from '../../api/teams';
import type { Team } from '../../types';
import { AppDispatch } from '../index.ts';

const PAGE_SIZE = 10;

type TeamsState = {
    items: Team[];
    loading: boolean;
    error?: string | null;
};

const initialState: TeamsState = {
    items: [],
    loading: false,
    error: null,
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
            action: PayloadAction<{ items: Team[] }>
        ) {
            state.loading = false;
            state.items = action.payload.items;
        },
        fetchFailure(state: TeamsState, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchStart, fetchSuccess, fetchFailure } = slice.actions;

export default slice.reducer;

export const loadTeams = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchStart());
        const data = await fetchTeams({ limit: PAGE_SIZE, offset: 0 });
        dispatch(fetchSuccess({
            items: data.teams
        }));
    } catch (e: any) {
        console.error('Ошибка загрузки команд: ', e);
        dispatch(fetchFailure(e?.message ?? 'Не удалось загрузить команд'));
    }
};
