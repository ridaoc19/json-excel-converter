import { useState } from 'react';
import Buttons from './Buttons/Buttons';
import ExcelReader from './Excel/Excel';
import TextEditor from './TextEditor/TextEditor';
import TextEditorError from './TextEditor/TextEditorError';

export interface StateTextEditor {
	value: string;
	error: { id: number; message: string; row: number }[];
}

export interface StateFile {
	file: File | null;
	type: 'json' | 'excel' | null;
}

const View = (): JSX.Element => {
	const [stateFile, setStateFile] = useState<StateFile>({ file: null, type: null });
	const [{ value, error }, setStateTextEditor] = useState<StateTextEditor>({
		value: '{}',
		error: [],
	});

	return (
		<div>
			<Buttons setStateFile={setStateFile} />
			<TextEditor setStateTextEditor={setStateTextEditor} value={value} />
			<TextEditorError error={error} />
			{stateFile.type === 'excel' && (
				<ExcelReader stateFile={stateFile} setStateTextEditor={setStateTextEditor} />
			)}
		</div>
	);
};

export default View;
