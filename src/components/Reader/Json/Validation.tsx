import useAppSelector from '../../../hooks/useAppSelector';
import { globalState } from '../../../redux/globalSlice';

type ValidationType = () => JSX.Element;

const Validation: ValidationType = () => {
	const { error } = useAppSelector(globalState);
	return (
		<div>
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

export default Validation;
