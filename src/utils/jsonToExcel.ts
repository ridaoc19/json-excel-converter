// type DynamicEntry = { [key: string]: string | DynamicEntry | string[] };
// type PlacementType = { [placement: string]: DynamicEntry[] };
// type TypeType = { [type: string]: PlacementType };
// type DomainType = { [domain: string]: TypeType };

// // Función para obtener los encabezados únicos de los datos
// function getHeaders(data: DomainType): string[] {
// 	const headersSet: Set<string> = new Set();

// 	// Función recursiva para recolectar las claves
// 	function collectHeaders(entry: DynamicEntry, prefix: string = ''): void {
// 		for (const key in entry) {
// 			const value = entry[key];
// 			const fullKey = prefix ? `${prefix}.${key}` : key;

// 			if (typeof value === 'object' && !Array.isArray(value)) {
// 				collectHeaders(value as DynamicEntry, fullKey);
// 			} else {
// 				headersSet.add(fullKey);
// 			}
// 		}
// 	}

// 	// Iterar sobre todos los dominios, tipos y placements
// 	for (const domain in data) {
// 		for (const type in data[domain]) {
// 			for (const placement in data[domain][type]) {
// 				for (const entry of data[domain][type][placement]) {
// 					collectHeaders(entry);
// 				}
// 			}
// 		}
// 	}

// 	return Array.from(headersSet).sort();
// }

// // Función para aplanar los datos
// export function flattenData(data: DomainType): string[][] {
// 	const headers = getHeaders(data);
// 	const result: string[][] = [headers];

// 	// Función auxiliar para agregar una fila al resultado
// 	function addRow(domain: string, type: string, placement: string, entry: DynamicEntry): void {
// 		const row: string[] = [domain, type, placement];

// 		// Extraer valores de acuerdo con el encabezado
// 		for (const header of headers.slice(3)) {
// 			const keys = header.split('.');
// 			let value: any = entry;

// 			for (const key of keys) {
// 				value = value ? value[key] : '';
// 			}

// 			if (Array.isArray(value)) {
// 				row.push(value.join(', '));
// 			} else {
// 				row.push(value || '');
// 			}
// 		}

// 		result.push(row);
// 	}

// 	// Iterar sobre los datos y aplanar
// 	for (const domain in data) {
// 		for (const type in data[domain]) {
// 			for (const placement in data[domain][type]) {
// 				for (const entry of data[domain][type][placement]) {
// 					addRow(domain, type, placement, entry);
// 				}
// 			}
// 		}
// 	}

// 	return result;
// }
type DynamicEntry = { [key: string]: string | DynamicEntry | string[] };
type PlacementType = { [placement: string]: DynamicEntry[] };
type TypeType = { [type: string]: PlacementType };
export type DomainType = { [domain: string]: TypeType };

// Headers de la tabla en el formato de columnas
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

// Función recursiva para aplanar los datos
export function jsonToExcel(data: DomainType): GlobalData {
	const result: string[][] = [headers];

	// Función auxiliar para agregar una fila al resultado
	function addRow(domain: string, type: string, placement: string, entry: DynamicEntry): void {
		const row: string[] = [domain, type, placement];

		// Extraer valores de acuerdo con el encabezado
		for (const header of headers.slice(3)) {
			const keys = header.split('.');
			let value: any = entry;

			for (const key of keys) {
				value = value ? value[key] : '';
			}

			if (Array.isArray(value)) {
				row.push(value.join(', '));
			} else {
				row.push(value || '');
			}
		}

		result.push(row);
	}

	// Iterar sobre los datos y aplanar
	for (const domain in data) {
		for (const type in data[domain]) {
			for (const placement in data[domain][type]) {
				for (const entry of data[domain][type][placement]) {
					addRow(domain, type, placement, entry);
				}
			}
		}
	}

	const json = JSON.stringify(data, null, 2);
	const header = result[0] as HeaderRow;
	const rows = result.slice(1) as RowData[];
	return {
		excel: { header, rows },
		json,
	};
}
