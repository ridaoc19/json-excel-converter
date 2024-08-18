import { ChangeEvent } from 'react';
import { TYPE_EXCEL, TYPE_JSON } from '../../core/const';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import {
	globalState,
	postError,
	postExcelJson,
	postProgress,
	postStatus,
} from '../../redux/globalSlice';
import { excelGenerate, excelReader } from '../../utils/excel';
import { jsonGenerate, jsonReader } from '../../utils/json';

const FileActions = (): JSX.Element => {
	const { excel, json } = useAppSelector(globalState);
	const dispatch = useAppDispatch();

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const selectedFile = event.target.files?.[0];

		if (selectedFile) {
			const reader = new FileReader();

			if (selectedFile.type === TYPE_JSON || selectedFile.type === TYPE_EXCEL) {
				reader.onload = e => {
					if (selectedFile.type === TYPE_JSON) {
						dispatch(postExcelJson(jsonReader(e)));
					}

					if (selectedFile.type === TYPE_EXCEL) {
						dispatch(postExcelJson(excelReader(e)));
					}
				};

				reader.onerror = () => dispatch(postError([{ message: 'error', row: null }]));
				reader.onloadstart = () => dispatch(postStatus('pending'));
				reader.onprogress = e =>
					e.lengthComputable &&
					dispatch(postProgress(Number(((e.loaded / e.total) * 100).toFixed(0))));

				if (selectedFile.type === TYPE_JSON) {
					reader.readAsText(selectedFile);
				} else {
					reader.readAsArrayBuffer(selectedFile);
				}
			}
		} else {
			console.error('No se seleccionó ningún archivo');
		}
	};

	const handleDownload = (): void => {
		jsonGenerate({ json });
		excelGenerate(excel);
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

export default FileActions;
