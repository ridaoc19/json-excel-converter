/* eslint-disable no-param-reassign */
import { PayloadAction } from '@reduxjs/toolkit';
import { parceData } from '../utils/parceData';
import generateUniqueId from '../utils/uuid';
import createAppSlice from './createAppSlice';
import type { RootState } from './store';

export interface InitialStateGlobal {
	excel: Excel;
	json: string;
	status: 'idle' | 'pending' | 'error' | 'success';
	onprogress: number;
	error: ErrorLocal[];
}

const initialStateGlobal: InitialStateGlobal = {
	excel: {
		header: [],
		rows: [],
	},
	json: '',
	status: 'idle',
	onprogress: 0,
	error: [],
};

export const globalSlice = createAppSlice({
	name: 'global',
	initialState: initialStateGlobal,
	reducers: create => ({
		postExcelJson: create.reducer(
			(
				state,
				{ payload }: PayloadAction<InitialStateGlobal['excel'] | InitialStateGlobal['json']>
			) => {
				const { json, excel } = parceData(payload);
				state.json = json;
				state.excel = excel;
				state.status = 'success';
			}
		),
		postProgress: create.reducer(
			(state, { payload }: PayloadAction<InitialStateGlobal['onprogress']>) => {
				state.onprogress = payload;
			}
		),
		postStatus: create.reducer(
			(state, { payload }: PayloadAction<InitialStateGlobal['status']>) => {
				state.status = payload;
			}
		),
		postError: create.reducer((state, { payload }: PayloadAction<Omit<ErrorLocal, 'id'>[]>) => {
			state.error = payload.map(error => ({ id: generateUniqueId(), ...error }));
			// state.error = [
			// 	...state.error,
			// 	...payload.map(error => ({ id: generateUniqueId(), ...error })),
			// ];
			state.status = 'error';
		}),
	}),
});

export const { postProgress, postError, postStatus, postExcelJson } = globalSlice.actions;

export const globalState = (state: RootState): InitialStateGlobal => state.global;
