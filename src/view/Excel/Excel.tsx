import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import type { StateFile, StateTextEditor } from '../View';

type CellData = string | number | boolean | null;
type RowData = CellData[];
type TableData = RowData[];

interface ExcelReaderProps {
	stateFile: StateFile;
	setStateTextEditor: React.Dispatch<React.SetStateAction<StateTextEditor>>;
}

const ExcelReader = ({ stateFile, setStateTextEditor }: ExcelReaderProps): JSX.Element => {
	const [tableData, setTableData] = useState<TableData>([]);

	useEffect(() => {
		if (stateFile.file && stateFile.type === 'excel') {
			const reader = new FileReader();

			reader.onload = e => {
				const data = new Uint8Array(e.target?.result as ArrayBuffer);
				const workbook = XLSX.read(data, { type: 'array' });
				const sheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[sheetName];
				const jsonData = XLSX.utils.sheet_to_json<RowData>(worksheet, { header: 1 });

				setTableData(jsonData);

				// Actualizar el estado del editor de texto con el JSON convertido
				const jsonString = JSON.stringify(jsonData, null, 2);
				setStateTextEditor(prevState => ({ ...prevState, value: jsonString }));
			};

			reader.readAsArrayBuffer(stateFile.file);
		}
	}, [stateFile, setStateTextEditor]);

	return (
		<div style={{ marginTop: '1rem' }}>
			{tableData.length > 0 ? (
				<div
					style={{ display: 'grid', gridTemplateColumns: `repeat(${tableData[0].length}, 1fr)` }}
				>
					{tableData.map((row, rowIndex) =>
						row.map((cell, cellIndex) => {
							const key = `${rowIndex}-${cellIndex}`;
							return (
								<div
									key={key}
									style={{
										border: '1px solid #ccc',
										padding: '0.5rem',
										textAlign: 'center',
										backgroundColor: rowIndex === 0 ? '#f0f0f0' : '#fff',
									}}
								>
									{cell !== null ? cell.toString() : ''}
								</div>
							);
						})
					)}
				</div>
			) : (
				<p>No hay datos para mostrar</p>
			)}
		</div>
	);
};

export default ExcelReader;
