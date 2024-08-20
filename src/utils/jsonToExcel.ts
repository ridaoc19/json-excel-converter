type DynamicEntry = { [key: string]: string | DynamicEntry | string[] };
type PlacementType = { [placement: string]: DynamicEntry[] };
type TypeType = { [type: string]: PlacementType };
export type DomainType = { [domain: string]: TypeType };

const headers = [
	'Domain',
	'Type',
	'Placement',
	'richaudience',
	'appnexus',
	'pubmatic.publisherId',
	'pubmatic.slotId',
	'rubicon.accountId',
	'rubicon.siteId',
	'rubicon.zoneId',
	'ix.siteId',
];

type HeaderRow = string[];
type RowData = string[];

export function jsonToExcel(data: DomainType): GlobalData {
	const result: string[][] = [headers];

	// !Función auxiliar para agregar una fila al resultado
	function addRow(domain: string, type: string, placement: string, entry: DynamicEntry): void {
		const row: string[] = [domain, type, placement];

		// !Extraer valores de acuerdo al encabezado
		headers.slice(3).forEach(header => {
			const keys = header.split('.');
			let value: string | string[] | DynamicEntry | undefined = entry;

			keys.forEach(key => {
				if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
					value = value[key];
				} else {
					value = undefined;
				}
			});

			if (Array.isArray(value)) {
				row.push(value.join(', '));
			} else if (typeof value === 'string') {
				row.push(value);
			} else {
				row.push('');
			}
		});

		result.push(row);
	}

	// !Iterar sobre los datos y aplanar usando métodos de array
	Object.entries(data).forEach(([domain, types]) => {
		Object.entries(types).forEach(([type, placements]) => {
			Object.entries(placements).forEach(([placement, entries]) => {
				entries.forEach(entry => {
					addRow(domain, type, placement, entry);
				});
			});
		});
	});

	const json = JSON.stringify(data, null, 2);
	const header = result[0] as HeaderRow;
	const rows = result.slice(1) as RowData[];
	return {
		excel: { header, rows },
		json,
	};
}
