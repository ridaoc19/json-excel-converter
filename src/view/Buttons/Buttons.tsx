import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import type { StateFile } from '../View';

interface ButtonsProps {
	// file: StateFile;
	setStateFile: Dispatch<SetStateAction<StateFile>>;
}

const Buttons = ({ setStateFile }: ButtonsProps): JSX.Element => {
	// Maneja el cambio del input de archivo
	const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const selectedFile = event.target.files?.[0]; // Verifica si hay un archivo seleccionado

		// Validar que se haya seleccionado un archivo
		if (selectedFile) {
			if (
				selectedFile.type === 'application/json' ||
				selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			) {
				setStateFile({
					file: selectedFile,
					type: selectedFile.type === 'application/json' ? 'json' : 'excel',
				});
			}
		} else {
			alert('No se seleccionó ningún archivo');
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
				<button type='button'>Descargar</button>
			</div>
		</div>
	);
};

export default Buttons;
