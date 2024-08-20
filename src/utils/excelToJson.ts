// type CellData = string | number | boolean;
// type JsonData = Record<string, string | number | boolean | null>;
// type HeaderRow = string[]; // Header row type
// type RowData = CellData[];
// type SheetToJsonOutput = [HeaderRow, ...RowData[]];

export type DynamicEntry = { [key: string]: string | DynamicEntry | string[] };
export type PlacementType = { [placement: string]: DynamicEntry[] };
export type TypeType = { [type: string]: PlacementType };
export type DomainType = { [domain: string]: TypeType };

export function excelToJson(data: SheetToJsonOutput): GlobalData {
	const headers: HeaderRow = data[0];
	const result: DomainType = {};

	for (let i = 1; i < data.length; i += 1) {
		const row: RowData = data[i];
		const [domain, type, placement, ...values] = row as [string, string, string, ...CellData[]];

		if (!result[domain]) {
			result[domain] = {};
		}
		if (!result[domain][type]) {
			result[domain][type] = {};
		}
		if (!result[domain][type][placement]) {
			result[domain][type][placement] = [];
		}

		const entry: DynamicEntry = {};
		for (let j = 0; j < values.length; j += 1) {
			const header = headers[j + 3];
			const value = values[j];

			if (value) {
				const keys = header.split('.');
				let current: DynamicEntry = entry;

				keys.forEach((key, index) => {
					if (index === keys.length - 1) {
						if (key === 'richaudience' && typeof value === 'string' && value.includes(',')) {
							current[key] = value.split(',').map(item => item.trim());
						} else {
							current[key] = String(value);
						}
					} else {
						if (!current[key]) {
							current[key] = {};
						}
						current = current[key] as DynamicEntry;
					}
				});
			}
		}

		result[domain][type][placement].push(entry);
	}

	const json = JSON.stringify(result, null, 2);
	const header = data[0] as HeaderRow;
	const rows = data.slice(1) as RowData[];

	return {
		excel: { header, rows },
		json,
	};
}
