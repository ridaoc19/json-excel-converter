import { useContext } from 'react';
import { CreateContext } from '../../../../hooks/useContext/StoreContext';

type ExcelType = () => JSX.Element;

const Excel: ExcelType = () => {
	const { stateContext } = useContext(CreateContext);
	// const { excel } = useAppSelector(globalState);

	return (
		<div className='excel'>
			{stateContext.excel.header.length > 0 ? (
				<div style={{ gridTemplateColumns: `repeat(${stateContext.excel.header.length}, 1fr)` }}>
					{stateContext.excel.header.map(title => (
						<div key={title} className='excel__title'>
							{title}
						</div>
					))}
					{stateContext.excel.rows.map((row, rowIndex) => {
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
