import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import teamsReducer from './slices/teamsSlice';
import teamDetailsReducer from './slices/teamDetailsSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['teams'],
};

const rootReducer = combineReducers({
    teams: teamsReducer,
    teamDetails: teamDetailsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;