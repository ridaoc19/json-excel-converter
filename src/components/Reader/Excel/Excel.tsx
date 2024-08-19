import useAppSelector from '../../../hooks/useAppSelector';
import { globalState } from '../../../redux/globalSlice';

type ExcelType = () => JSX.Element;

const Excel: ExcelType = () => {
	const { excel } = useAppSelector(globalState);

	return (
		<div className='excel'>
			{excel.header.length > 0 ? (
				<div style={{ gridTemplateColumns: `repeat(${excel.header.length}, 1fr)` }}>
					{excel.header.map(title => (
						<div key={title} className='excel__title'>
							{title}
						</div>
					))}
					{excel.rows.map((row, rowIndex) => {
						return row.map((cell, cellIndex) => {
							const key = `${rowIndex}-${cellIndex}`;
							return (
								<div key={key} className='excel__row'>
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
