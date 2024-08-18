import { ChangeEvent } from 'react';
import * as XLSX from 'xlsx';
import { TYPE_EXCEL, TYPE_JSON } from '../../core/const';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import {
	globalState,
	HeaderRow,
	postError,
	postExcelJson,
	postProgress,
	postStatus,
	RowData,
	SheetToJsonOutput,
} from '../../redux/globalSlice';

const Buttons = (): JSX.Element => {
	const { excel, json } = useAppSelector(globalState);
	const dispatch = useAppDispatch();

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const selectedFile = event.target.files?.[0]; // Verifica si hay un archivo seleccionado

		if (selectedFile) {
			const reader = new FileReader();

			if (selectedFile.type === TYPE_JSON || selectedFile.type === TYPE_EXCEL) {
				// ! INICIO
				// ? RESULTADO
				reader.onload = e => {
					try {
						if (selectedFile.type === TYPE_JSON) {
							const file = e.target?.result;
							if (file && typeof file === 'string') {
								dispatch(postExcelJson(file));
							}
						}

						if (selectedFile.type === TYPE_EXCEL) {
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
							dispatch(postExcelJson({ header, rows }));
						}
					} catch (error) {
						console.error('Error parsing JSON file:', error);
					}
				};
				// ? ERROR
				reader.onerror = () => {
					dispatch(postError([{ message: 'error', row: null }]));
				};
				// ? INICIO
				reader.onloadstart = () => {
					dispatch(postStatus('pending'));
					dispatch(postProgress(5));
				};
				// ? PROGRESO
				reader.onprogress = e => {
					if (e.lengthComputable) {
						const percentLoaded = (e.loaded / e.total) * 100;
						dispatch(postProgress(Number(percentLoaded.toFixed(0))), 'hola');
					}
				};

				// ? ARCHIVO
				if (selectedFile.type === TYPE_JSON) {
					reader.readAsText(selectedFile);
				} else {
					reader.readAsArrayBuffer(selectedFile);
				}
				// ! FINAL
			}
		} else {
			alert('No se seleccionó ningún archivo');
		}
	};

	const handleDownload = (): void => {
		// Descargar archivo JSON
		const blobJson = new Blob([json], { type: 'application/json' });
		const urlJson = URL.createObjectURL(blobJson);
		const linkJson = document.createElement('a');
		linkJson.href = urlJson;
		linkJson.download = 'data.json';
		linkJson.click();

		// Descargar archivo Excel
		try {
			// const jsonData = JSON.parse(stateTextEditor.value);
			const worksheet = XLSX.utils.json_to_sheet([...excel.header, ...excel.rows]);
			const workbook = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
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

	return (
		<div style={{ display: 'flex', gap: '1rem', margin: '1rem', justifyContent: 'space-between' }}>
			<div>
				<label htmlFor='jsonInput'>
					Subir archivo:
					<input id='jsonInput' type='file' onChange={handleFileChange} />
				</label>
			</div>

			<div>
				<button type='button' onClick={handleDownload}>
					Descargar
				</button>
			</div>
		</div>
	);
};

export default Buttons;
