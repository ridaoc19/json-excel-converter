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
		header: ['Introducción', 'Subir archivo', 'Limpiar', 'Descargar', 'Editor de texto'],
		rows: [
			[
				'En esta aplicación puede agregar archivos con extension Excel y JSON, puede modificarlo en el editor y luego descargarlos',
				'Con este botón podrás subir archivos Excel o Json',
				'Podrás Limpiar todo lo que este cargado',
				'Descargara un archivo Excel y JSON con el contenido',
				'Puede editar el texto que haya cargado, se vera reflejado en el excel y descargarlo',
			],
		],
	},
	json: JSON.stringify(
		[
			{
				Introducción:
					'En esta aplicación puede agregar archivos con extension Excel y JSON, puede modificarlo en el editor y luego descargarlos',
				'Subir archivo': 'Con este botón podrás subir archivos Excel o Json',
				Limpiar: 'Podrás Limpiar todo lo que este cargado',
				Descargar: 'Descargara un archivo Excel y JSON con el contenido',
				'Editor de texto':
					'Puede editar el texto que haya cargado, se vera reflejado en el excel y descargarlo',
			},
		],
		null,
		2
	),
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
			state.status = 'error';
		}),
		emptyState: create.reducer(state => {
			state.error = initialStateGlobal.error;
			state.excel = { header: [], rows: [] };
			state.json = '[]';
			state.onprogress = initialStateGlobal.onprogress;
			state.status = initialStateGlobal.status;
		}),
	}),
});

export const { postProgress, postError, postStatus, postExcelJson, emptyState } =
	globalSlice.actions;

export const globalState = (state: RootState): InitialStateGlobal => state.global;
