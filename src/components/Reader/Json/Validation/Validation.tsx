import useAppSelector from '../../../../hooks/useAppSelector';
import { globalState } from '../../../../redux/globalSlice';

type ValidationType = () => JSX.Element;

const Validation: ValidationType = () => {
	const { error } = useAppSelector(globalState);
	return (
		<>
			{error.map(({ row, message, id }) => (
				<p key={id}>{`${row} - ${message}`}</p>
			))}
		</>
	);
};

export default Validation;
