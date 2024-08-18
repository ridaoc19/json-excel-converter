import { ChangeEvent, useRef, useState } from 'react';
import { TYPE_EXCEL, TYPE_JSON } from '../../core/const';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import {
	emptyState,
	globalState,
	postError,
	postExcelJson,
	postProgress,
	postStatus,
} from '../../redux/globalSlice';
import { excelGenerate, excelReader } from '../../utils/excel';
import { jsonGenerate, jsonReader } from '../../utils/json';

const FileActions = (): JSX.Element => {
	const { excel, json, onprogress } = useAppSelector(globalState);
	const [uploadLabel, setUploadLabel] = useState('Subir archivo');
	const fileInputRef = useRef<HTMLInputElement>(null);
	const dispatch = useAppDispatch();

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const selectedFile = event.target.files?.[0];

		if (selectedFile) {
			const reader = new FileReader();
			setUploadLabel('Subiendo... 0%');

			if (selectedFile.type === TYPE_JSON || selectedFile.type === TYPE_EXCEL) {
				reader.onload = e => {
					if (selectedFile.type === TYPE_JSON) {
						dispatch(postExcelJson(jsonReader(e)));
					}

					if (selectedFile.type === TYPE_EXCEL) {
						dispatch(postExcelJson(excelReader(e)));
					}
					setUploadLabel('Subir archivo');
				};

				reader.onerror = () => {
					dispatch(postError([{ message: 'error', row: null }]));
					setUploadLabel('Error al subir');
				};
				reader.onloadstart = () => {
					dispatch(postStatus('pending'));
					dispatch(postProgress(10));
				};
				reader.onprogress = e => {
					if (e.lengthComputable) {
						const progress = Number(((e.loaded / e.total) * 100).toFixed(0));
						dispatch(postProgress(progress));
						setUploadLabel(`Subiendo... ${progress}%`);
					}
				};

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

	const progressStyle = {
		width: `${onprogress}%`,
	};

	return (
		<div className='file-actions'>
			<div className='file-actions__upload'>
				<div className='file-actions__upload--input'>
					<label htmlFor='jsonInput' style={{ position: 'relative' }}>
						<div className='progress-bar' style={progressStyle} />
						{uploadLabel}
						<input id='jsonInput' ref={fileInputRef} type='file' onChange={handleFileChange} />
					</label>
				</div>
			</div>

			<div className='file-actions__empty'>
				<button
					type='button'
					onClick={() => {
						if (fileInputRef.current) {
							fileInputRef.current.value = '';
						}
						dispatch(emptyState());
					}}
				>
					Limpiar
				</button>
			</div>

			<div className='file-actions__download'>
				<button type='button' onClick={handleDownload}>
					Descargar
				</button>
			</div>
		</div>
	);
};

export default FileActions;
