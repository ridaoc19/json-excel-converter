import MonacoEditor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { useContext, useRef } from 'react';
import { CreateContext } from '../../../../hooks/useContext/StoreContext';
import { parceData } from '../../../../utils/parceData';
import generateUniqueId from '../../../../utils/uuid';
import Validation from './Validation/Validation';

type JsonType = () => JSX.Element;

const Json: JsonType = () => {
	const { stateContext, setStateContext } = useContext(CreateContext);
	const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

	const handleEditorDidMount = (editorInstance: monaco.editor.IStandaloneCodeEditor): void => {
		editorRef.current = editorInstance;
	};

	const handleEditorChange = (data: string | undefined): void => {
		if (data !== undefined) {
			setStateContext({ ...stateContext, ...parceData(data) });
		}
	};

	return (
		<div className='json'>
			<div className='json__editor'>
				<MonacoEditor
					language='json'
					value={stateContext.json}
					onChange={handleEditorChange}
					onMount={handleEditorDidMount}
					onValidate={event => {
						const error: ErrorLocal[] = event.map(({ message, startLineNumber: row }) => ({
							id: generateUniqueId(),
							message,
							row,
						}));
						setStateContext({ ...stateContext, error });
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
				<Validation error={stateContext.error} />
			</div>
		</div>
	);
};

export default Json;
