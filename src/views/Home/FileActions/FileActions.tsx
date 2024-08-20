import { ChangeEvent, useContext, useRef, useState } from 'react';
import { TYPE_EXCEL, TYPE_JSON } from '../../../core/const';
import { CreateContext, initialStateContext } from '../../../hooks/useContext/StoreContext';
import { excelGenerate, excelReader } from '../../../utils/excel';
import { jsonGenerate, jsonReader } from '../../../utils/json';
import { parceData } from '../../../utils/parceData';

const FileActions = (): JSX.Element => {
	const { stateContext, setStateContext } = useContext(CreateContext);
	const [uploadLabel, setUploadLabel] = useState<number>(0);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const selectedFile = event.target.files?.[0];

		if (selectedFile) {
			if (selectedFile.type === TYPE_JSON || selectedFile.type === TYPE_EXCEL) {
				const reader = new FileReader();
				reader.onload = e => {
					setStateContext({
						...stateContext,
						...parceData(selectedFile.type === TYPE_JSON ? jsonReader(e) : excelReader(e)),
					});
				};

				reader.onerror = () => {};
				reader.onloadstart = () => setUploadLabel(10);
				reader.onprogress = e =>
					e.lengthComputable && setUploadLabel(Number(((e.loaded / e.total) * 100).toFixed(0)));

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
		jsonGenerate({ json: stateContext.json });
		excelGenerate(stateContext.excel);
	};

	return (
		<div className='file-actions'>
			<div className='file-actions__upload'>
				<div className='file-actions__upload--input'>
					<label htmlFor='jsonInput' style={{ position: 'relative' }}>
						<div className='progress-bar' style={{ width: `${uploadLabel}` }} />
						{uploadLabel === 0
							? 'Subir archivo'
							: uploadLabel === 100
								? 'Archivo Cargado'
								: `Subiendo... ${uploadLabel} %`}
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
						setUploadLabel(0);
						setStateContext({ ...initialStateContext, isLogin: true });
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
