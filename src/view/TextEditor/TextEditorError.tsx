import useAppSelector from '../../hooks/useAppSelector';
import { globalState } from '../../redux/globalSlice';
import type { StateTextEditor } from '../View';

interface TextEditorErrorProps {
	error: StateTextEditor['error'];
}

type TextEditorErrorType = (data: TextEditorErrorProps) => JSX.Element;

const TextEditorError: TextEditorErrorType = () => {
	const { onprogress, error } = useAppSelector(globalState);
	return (
		<div>
			<div>
				<progress value={onprogress} max='100' />
				<span>{onprogress}%</span>
			</div>
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
		</div>
	);
};

export default TextEditorError;
