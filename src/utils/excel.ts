import * as XLSX from 'xlsx';
import { TYPE_EXCEL } from '../core/const';

// Descargar archivo Excel
export const excelGenerate = ({ header, rows }: Excel): void => {
	try {
		const worksheet = XLSX.utils.json_to_sheet(rows);

		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

		XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });

		const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
		const blobExcel = new Blob([excelBuffer], {
			type: TYPE_EXCEL,
		});
		const urlExcel = URL.createObjectURL(blobExcel);
		const linkExcel = document.createElement('a');
		linkExcel.href = urlExcel;
		linkExcel.download = 'data.xlsx';
		linkExcel.click();
	} catch (error) {
		console.error('Error parsing JSON for Excel download:', error);
	}
};

export const excelReader = (e: ProgressEvent<FileReader>): SheetToJsonOutput => {
	// export const excelReader = (e: ProgressEvent<FileReader>): Excel & { json: string } => {
	const data = new Uint8Array(e.target?.result as ArrayBuffer);
	const workbook = XLSX.read(data, { type: 'array' });
	const sheetName = workbook.SheetNames[0];
	const worksheet = workbook.Sheets[sheetName];
	const jsonData: SheetToJsonOutput = XLSX.utils.sheet_to_json(worksheet, {
		header: 1,
	}) as SheetToJsonOutput;

	// TODO
	const header = jsonData[0] as HeaderRow;
	const rows = jsonData.slice(1) as RowData[];
	const objectsArray: Array<Record<string, CellData>> = rows.map(row => {
		if (Array.isArray(row)) {
			return header.reduce(
				(acc, key, index) => {
					acc[key] = row[index] ?? '';
					return acc;
				},
				{} as Record<string, CellData>
			);
		}
		return {};
	});

	const newHeader = [...new Set(objectsArray.flatMap(item => Object.keys(item)))];
	const newRows: RowData[] = objectsArray.map(items => {
		return newHeader.map(key => items[key] || '');
	});

	return [newHeader, ...newRows];
};
