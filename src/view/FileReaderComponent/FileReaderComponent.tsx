import useAppSelector from '../../hooks/useAppSelector';
import { globalState } from '../../redux/globalSlice';
import type { StateFile, StateTextEditor } from '../View';

interface FileReaderComponentProps {
	stateFile: StateFile;
	setStateTextEditor: React.Dispatch<React.SetStateAction<StateTextEditor>>;
}

type FileReaderComponentType = (data: FileReaderComponentProps) => JSX.Element;

const FileReaderComponent: FileReaderComponentType = () => {
	const { excel } = useAppSelector(globalState);

	// const [tableData, setTableData] = useState<TableData>([]);

	// useEffect(() => {
	// 	if (stateFile.file) {
	// 		const reader = new FileReader();

	// 		if (stateFile.type === 'excel') {
	// 			reader.onload = e => {
	// 				const data = new Uint8Array(e.target?.result as ArrayBuffer);
	// 				const workbook = XLSX.read(data, { type: 'array' });
	// 				const sheetName = workbook.SheetNames[0];
	// 				const worksheet = workbook.Sheets[sheetName];
	// 				const jsonData = XLSX.utils.sheet_to_json<RowData>(worksheet, { header: 1 });

	// 				setTableData(jsonData);

	// 				const jsonString = JSON.stringify(jsonData, null, 2);
	// 				setStateTextEditor(prevState => ({ ...prevState, value: jsonString }));
	// 			};

	// 			reader.readAsArrayBuffer(stateFile.file);
	// 		} else if (stateFile.type === 'json') {
	// 			reader.onload = e => {
	// 				try {
	// 					const jsonData = JSON.parse(e.target?.result as string);
	// 					const formattedJsonString = JSON.stringify(jsonData, null, 2);
	// 					setStateTextEditor(prevState => ({ ...prevState, value: formattedJsonString }));

	// 					if (Array.isArray(jsonData) && jsonData.length > 0 && Array.isArray(jsonData[0])) {
	// 						setTableData(jsonData);
	// 					}
	// 				} catch (error) {
	// 					console.error('Error parsing JSON file:', error);
	// 					setStateTextEditor(prevState => ({
	// 						...prevState,
	// 						value: 'Error al cargar el archivo JSON',
	// 					}));
	// 				}
	// 			};

	// 			reader.readAsText(stateFile.file);
	// 		}
	// 	}
	// }, [stateFile, setStateTextEditor]);

	return (
		<div style={{ marginTop: '1rem' }}>
			{excel.header.length > 0 ? (
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: `repeat(${excel.header.length}, 1fr)`,
					}}
				>
					{excel.header.map(title => (
						<div
							key={title}
							style={{
								border: '1px solid #ccc',
								padding: '0.5rem',
								textAlign: 'center',
								backgroundColor: '#f0f0f0',
							}}
						>
							{title}
						</div>
					))}
					{excel.rows.map((row, rowIndex) => {
						return row.map((cell, cellIndex) => {
							const key = `${rowIndex}-${cellIndex}`;
							return (
								<div
									key={key}
									style={{
										border: '1px solid #ccc',
										padding: '0.5rem',
										textAlign: 'center',
										backgroundColor: '#fff',
									}}
								>
									{cell !== null ? cell.toString() : ''}
								</div>
							);
						});
					})}
				</div>
			) : (
				<p>No hay datos para mostrar</p>
			)}
		</div>
	);
};

export default FileReaderComponent;
