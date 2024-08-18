import * as XLSX from 'xlsx';

export const excelGenerate = ({ header, rows }: Excel): void => {
	// Descargar archivo Excel
	try {
		const worksheet = XLSX.utils.json_to_sheet(rows);

		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

		XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });

		const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
		const blobExcel = new Blob([excelBuffer], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
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

export const excelReader = (e: ProgressEvent<FileReader>): Excel => {
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

	return {
		header,
		rows,
	};
};
