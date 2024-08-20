type ValidationType = (data: { error: ErrorLocal[] }) => JSX.Element;

const Validation: ValidationType = ({ error }) => {
	return (
		<>
			{error.map(({ row, message, id }) => (
				<p key={id}>{`${row} - ${message}`}</p>
			))}
		</>
	);
};

export default Validation;
