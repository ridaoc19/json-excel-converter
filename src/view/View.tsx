import Buttons from './Buttons/Buttons';
import FileReaderComponent from './FileReaderComponent/FileReaderComponent';
import TextEditor from './TextEditor/TextEditor';
import TextEditorError from './TextEditor/TextEditorError';

const View = (): JSX.Element => {
	return (
		<div>
			<Buttons />
			<TextEditor />
			<TextEditorError />
			<FileReaderComponent />
		</div>
	);
};

export default View;
