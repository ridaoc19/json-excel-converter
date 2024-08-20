import Excel from './Excel/Excel';
import Json from './Json/Json';

const Reader = (): JSX.Element => {
	return (
		<div className='reader'>
			<div className='reader__json'>
				<Json />
			</div>
			<div className='reader__excel'>
				<Excel />
			</div>
		</div>
	);
};

export default Reader;
