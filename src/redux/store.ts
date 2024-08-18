import type { Action, EnhancedStore, ThunkAction } from '@reduxjs/toolkit';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { globalSlice } from './globalSlice';

const rootReducer = combineSlices(globalSlice);
export type RootState = ReturnType<typeof rootReducer>;

type MakeStore = (data?: Partial<RootState>) => EnhancedStore<RootState, Action>;
export const makeStore: MakeStore = preloadedState => {
	const store = configureStore({
		reducer: rootReducer,
		preloadedState,
	});

	setupListeners(store.dispatch);
	return store;
};

export const store = makeStore();

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
	ThunkReturnType,
	RootState,
	unknown,
	Action
>;
