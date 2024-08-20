// import type { InitialStateGlobal } from '../redux/globalSlice';
// import { excelToJson } from './excelToJson';
// import { DomainType, jsonToExcel } from './jsonToExcel';

// type ParceData = (
// 	data: SheetToJsonOutput | InitialStateGlobal['json']
// 	// data: InitialStateGlobal['excel'] | InitialStateGlobal['json']
// ) => Pick<InitialStateGlobal, 'excel' | 'json'>;

// export const parceData: ParceData = payload => {
// 	// let data = [];
// 	// ! JSON
// 	if (typeof payload === 'string') {
// 		const parseJson: DomainType = JSON.parse(payload);
// 		if (Array.isArray(parseJson)) {
// 			// data = parseJson;
// 			const { excel, json } = jsonToExcel(parseJson);

// 			return {
// 				excel,
// 				json,
// 			};
// 		}
// 		// ! EXCEL
// 	} else {
// 		const { excel, json } = excelToJson(payload);
// 		return {
// 			excel,
// 			json,
// 		};
// 		// const objectsArray: Array<Record<string, CellData>> = payload.rows.map(row => {
// 		// 	if (Array.isArray(row)) {
// 		// 		return payload.header.reduce(
// 		// 			(acc, key, index) => {
// 		// 				acc[key] = row[index] ?? '';
// 		// 				return acc;
// 		// 			},
// 		// 			{} as Record<string, CellData>
// 		// 		);
// 		// 	}
// 		// 	return {};
// 		// });
// 		// data = objectsArray;
// 	}
// 	// const header = [...new Set(data.flatMap(item => Object.keys(item)))];
// 	// const rows: RowData[] = data.map(items => {
// 	// 	return header.map(key => items[key] || '');
// 	// });
// 	// return {
// 	// 	json: JSON.stringify(data, null, 2),
// 	// 	excel: { header, rows },
// 	// };
// };

import type { InitialStateGlobal } from '../redux/globalSlice';
import { excelToJson } from './excelToJson';
import { DomainType, jsonToExcel } from './jsonToExcel';

type ParceData = (
	data: SheetToJsonOutput | InitialStateGlobal['json']
) => Pick<InitialStateGlobal, 'excel' | 'json'>;

export const parceData: ParceData = payload => {
	// Caso donde payload es un JSON string
	if (typeof payload === 'string') {
		let parseJson: DomainType;

		try {
			parseJson = JSON.parse(payload) as DomainType;
		} catch (e) {
			throw new Error('Invalid JSON string');
		}

		const { excel, json } = jsonToExcel(parseJson);
		return { excel, json };
	}

	// Caso donde payload es un objeto Excel
	const { excel, json } = excelToJson(payload as SheetToJsonOutput);
	return { excel, json };
};
