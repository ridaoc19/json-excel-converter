import MonacoEditor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { useRef } from 'react';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import { globalState, postError, postExcelJson } from '../../../redux/globalSlice';
import Validation from './Validation/Validation';

type JsonType = () => JSX.Element;

const Json: JsonType = () => {
	const { json } = useAppSelector(globalState);
	const dispatch = useAppDispatch();
	const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

	const handleEditorDidMount = (editorInstance: monaco.editor.IStandaloneCodeEditor): void => {
		editorRef.current = editorInstance;
	};

	const handleEditorChange = (data: string | undefined): void => {
		if (data !== undefined) {
			dispatch(postExcelJson(data));
		}
	};

	return (
		<div className='json'>
			<div className='json__editor'>
				<MonacoEditor
					// height='58vh'
					language='json'
					value={json}
					onChange={handleEditorChange}
					onMount={handleEditorDidMount}
					onValidate={event => {
						const error: Omit<ErrorLocal, 'id'>[] = event.map(
							({ message, startLineNumber: row }) => ({
								message,
								row,
							})
						);
						dispatch(postError(error));
					}}
					theme='vs-dark'
					options={{
						automaticLayout: true,
						minimap: { enabled: false },
						formatOnType: true,
					}}
				/>
			</div>
			<div className='json__validation'>
				<Validation />
			</div>
		</div>
	);
};

export default Json;
