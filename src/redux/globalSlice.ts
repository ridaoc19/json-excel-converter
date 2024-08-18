/* eslint-disable no-param-reassign */
import { PayloadAction } from '@reduxjs/toolkit';
import createAppSlice from './createAppSlice';
import type { RootState } from './store';
import generateUniqueId from '../utils/uuid';

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
	jsonData: JsonData[];
	excel: Excel;
	json: string;
	status: 'idle' | 'pending' | 'error' | 'success';
	onprogress: number;
	error: Error[];
}

const initialStateGlobal: InitialStateGlobal = {
	jsonData: [],
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
				if (typeof payload === 'string') {
					// Si el payload es un string (JSON), convertir a formato Excel
					state.json = payload;
					const parseJson = JSON.parse(payload);

					if (Array.isArray(parseJson)) {
						const header = [...new Set(parseJson.flatMap(item => Object.keys(item)))];
						const rows: RowData[] = parseJson.map(items => {
							return Object.values(items);
						});

						state.excel = { header, rows };
					}
				} else {
					// Si el payload es un array (Excel), convertir a formato JSON
					state.excel = payload;

					const objectsArray: Array<Record<string, CellData>> = payload.rows.map(row => {
						if (Array.isArray(row)) {
							// Asegurarse de que row es un array
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
				}

				state.status = 'success';
			}
		),
		postJsonData: create.reducer((state, { payload }: PayloadAction<JsonData[]>) => {
			state.jsonData = payload;
			state.status = 'success';
		}),
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

export const { postJsonData, postProgress, postError, postStatus, postExcelJson } =
	globalSlice.actions;

export const globalState = (state: RootState): InitialStateGlobal => state.global;
