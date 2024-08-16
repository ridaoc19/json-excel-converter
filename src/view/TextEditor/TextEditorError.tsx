import type { StateTextEditor } from '../View';

interface TextEditorErrorProps {
	error: StateTextEditor['error'];
}

type TextEditorErrorType = (data: TextEditorErrorProps) => JSX.Element;

const TextEditorError: TextEditorErrorType = ({ error }) => {
	return (
		<div
			style={{
				maxHeight: '10rem',
				overflowY: 'scroll',
				border: '1px solid black',
				height: '10rem',
			}}
		>
			{error.map(({ row, message, id }) => (
				<div key={id}>
					<p>{`${row} - ${message}`}</p>
				</div>
			))}
		</div>
	);
};

export default TextEditorError;
