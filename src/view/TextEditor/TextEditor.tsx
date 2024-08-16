import MonacoEditor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { Dispatch, SetStateAction, useRef } from 'react';
import type { StateTextEditor } from '../View';

interface TextEditorProps {
	value: StateTextEditor['value'];
	setStateTextEditor: Dispatch<SetStateAction<StateTextEditor>>;
}

type TextEditorType = (data: TextEditorProps) => JSX.Element;

const TextEditor: TextEditorType = ({ value, setStateTextEditor }) => {
	const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

	const handleEditorDidMount = (editorInstance: monaco.editor.IStandaloneCodeEditor): void => {
		editorRef.current = editorInstance;
	};

	const handleEditorChange = (data: string | undefined): void => {
		if (data !== undefined) {
			setStateTextEditor(prevState => ({ ...prevState, value: data }));
		}
	};

	return (
		<div>
			<MonacoEditor
				height='50vh'
				language='json'
				value={value}
				onChange={handleEditorChange}
				onMount={handleEditorDidMount}
				onValidate={event => {
					const error = event.map(({ message, startLineNumber: row }, id) => ({
						message,
						row,
						id,
					}));

					setStateTextEditor(prevState => ({ ...prevState, error }));
				}}
				theme='vs-dark'
				options={{
					automaticLayout: true,
					minimap: { enabled: false },
					formatOnType: true,
				}}
			/>
		</div>
	);
};

export default TextEditor;
