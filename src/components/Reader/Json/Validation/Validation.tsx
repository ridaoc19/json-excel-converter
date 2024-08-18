import useAppSelector from '../../../../hooks/useAppSelector';
import { globalState } from '../../../../redux/globalSlice';

type ValidationType = () => JSX.Element;

const Validation: ValidationType = () => {
	const { error } = useAppSelector(globalState);
	return (
		<div className='validation'>
			{error.map(({ row, message, id }) => (
				<div key={id}>
					<p>{`${row} - ${message}`}</p>
				</div>
			))}
		</div>
	);
};

export default Validation;
