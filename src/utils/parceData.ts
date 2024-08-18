import type { InitialStateGlobal } from '../redux/globalSlice';

type ParceData = (
	data: InitialStateGlobal['excel'] | InitialStateGlobal['json']
) => Pick<InitialStateGlobal, 'excel' | 'json'>;

export const parceData: ParceData = payload => {
	let data = [];
	if (typeof payload === 'string') {
		const parseJson = JSON.parse(payload);
		if (Array.isArray(parseJson)) {
			data = parseJson;
		}
		// ! EXCEL
	} else {
		const objectsArray: Array<Record<string, CellData>> = payload.rows.map(row => {
			if (Array.isArray(row)) {
				return payload.header.reduce(
					(acc, key, index) => {
						acc[key] = row[index] ?? '';
						return acc;
					},
					{} as Record<string, CellData>
				);
			}
			return {}; // Manejar el caso en que row no sea un array
		});
		data = objectsArray;
	}
	const header = [...new Set(data.flatMap(item => Object.keys(item)))];
	const rows: RowData[] = data.map(items => {
		return header.map(key => items[key] || '');
	});
	return {
		json: JSON.stringify(data, null, 2),
		excel: { header, rows },
	};
};
