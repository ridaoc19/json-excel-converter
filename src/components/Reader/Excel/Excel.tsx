import useAppSelector from '../../../hooks/useAppSelector';
import { globalState } from '../../../redux/globalSlice';

type ExcelType = () => JSX.Element;

const Excel: ExcelType = () => {
	const { excel } = useAppSelector(globalState);

	return (
		<div style={{ marginTop: '1rem' }}>
			{excel.header.length > 0 ? (
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: `repeat(${excel.header.length}, 1fr)`,
					}}
				>
					{excel.header.map(title => (
						<div
							key={title}
							style={{
								border: '1px solid #ccc',
								padding: '0.5rem',
								textAlign: 'center',
								backgroundColor: '#f0f0f0',
							}}
						>
							{title}
						</div>
					))}
					{excel.rows.map((row, rowIndex) => {
						return row.map((cell, cellIndex) => {
							const key = `${rowIndex}-${cellIndex}`;
							return (
								<div
									key={key}
									style={{
										border: '1px solid #ccc',
										padding: '0.5rem',
										textAlign: 'center',
										backgroundColor: '#fff',
									}}
								>
									{cell !== null ? cell.toString() : ''}
								</div>
							);
						});
					})}
				</div>
			) : (
				<p>No hay datos para mostrar</p>
			)}
		</div>
	);
};

export default Excel;
