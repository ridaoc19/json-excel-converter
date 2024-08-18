/* eslint-disable no-param-reassign */
import { PayloadAction } from '@reduxjs/toolkit';
import generateUniqueId from '../utils/uuid';
import createAppSlice from './createAppSlice';
import type { RootState } from './store';

export type CellData = string | number | boolean;
export type JsonData = Record<string, string | number | boolean | null>;
export type HeaderRow = string[]; // Header row type
export type RowData = CellData[];
export type SheetToJsonOutput = [HeaderRow, ...RowData];
export interface Excel {
	header: string[];
	rows: RowData[];
}
export interface Error {
	id: string;
	message: string;
	row: number | null;
}

interface InitialStateGlobal {
	excel: Excel;
	json: string;
	status: 'idle' | 'pending' | 'error' | 'success';
	onprogress: number;
	error: Error[];
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
				// ! JSON
				if (typeof payload === 'string') {
					state.json = payload;
					const parseJson = JSON.parse(payload);

					if (Array.isArray(parseJson)) {
						const header = [...new Set(parseJson.flatMap(item => Object.keys(item)))];
						const rows: RowData[] = parseJson.map(items => {
							return header.map(key => items[key] || '');
						});

						state.excel = { header, rows };
					}
					// ! EXCEL
				} else {
					const objectsArray: Array<Record<string, CellData>> = payload.rows.map(row => {
						if (Array.isArray(row)) {
							return payload.header.reduce(
								(acc, key, index) => {
									acc[key] = row[index] ?? ''; // Manejar valores potencialmente indefinidos o null
									return acc;
								},
								{} as Record<string, CellData>
							);
						}
						return {}; // Manejar el caso en que row no sea un array
					});
					state.json = JSON.stringify(objectsArray, null, 2); // Formato JSON con indentación

					const header = [...new Set(objectsArray.flatMap(item => Object.keys(item)))];
					const rows: RowData[] = objectsArray.map(items => {
						return header.map(key => items[key] || '');
					});

					state.excel = { header, rows };
				}

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
		postError: create.reducer((state, { payload }: PayloadAction<Omit<Error, 'id'>[]>) => {
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
