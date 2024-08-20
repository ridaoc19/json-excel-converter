import { ChangeEvent, useContext, useRef, useState } from 'react';
import { TYPE_EXCEL, TYPE_JSON } from '../../../core/const';
import { CreateContext, initialStateContext } from '../../../hooks/useContext/StoreContext';
import { excelGenerate, excelReader } from '../../../utils/excel';
import { jsonGenerate, jsonReader } from '../../../utils/json';
import { parceData } from '../../../utils/parceData';
import Button from '../../../components/button/Button';
import { ButtonType } from '../../../components/button/button.type';

const FileActions = (): JSX.Element => {
	const { stateContext, setStateContext } = useContext(CreateContext);
	const [progress, setProgress] = useState<number>(0);
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
				reader.onloadstart = () => setProgress(10);
				reader.onprogress = e =>
					e.lengthComputable && setProgress(Number(((e.loaded / e.total) * 100).toFixed(0)));

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

	const renderUploadLabel = ({ uploadLabel }: { uploadLabel: number }): string => {
		if (uploadLabel === 0) {
			return 'Subir archivo';
		}
		if (uploadLabel === 100) {
			return 'Archivo Cargado';
		}
		return `Subiendo... ${uploadLabel} %`;
	};

	return (
		<div className='file-actions'>
			<div className='file-actions__upload'>
				<div className='file-actions__upload--input'>
					<label htmlFor='jsonInput' style={{ position: 'relative' }}>
						<div className='progress-bar' style={{ width: `${progress}` }} />
						{renderUploadLabel({ uploadLabel: progress })}
						<input id='jsonInput' ref={fileInputRef} type='file' onChange={handleFileChange} />
					</label>
				</div>

				<div className='file-actions__empty'>
					<Button
						id='button'
						text='Limpiar'
						type={ButtonType.Error}
						disabled={stateContext.excel.header.length === 0}
						handleClick={() => {
							if (fileInputRef.current) {
								fileInputRef.current.value = '';
							}
							setProgress(0);
							setStateContext({ ...initialStateContext, isLogin: true });
						}}
					/>
				</div>

				<div className='file-actions__download'>
					<Button
						id='button'
						text='Descargar'
						disabled={stateContext.excel.header.length === 0}
						type={ButtonType.Success}
						handleClick={handleDownload}
					/>
				</div>
			</div>

			<div>
				<Button
					id='button'
					text='Cerrar sesión'
					type={ButtonType.Dark}
					handleClick={() => setStateContext(prevState => ({ ...prevState, isLogin: false }))}
				/>
			</div>
		</div>
	);
};

export default FileActions;
