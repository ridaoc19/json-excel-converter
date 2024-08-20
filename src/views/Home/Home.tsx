import FileActions from './FileActions/FileActions';
import Reader from './Reader/Reader';

const Home = (): JSX.Element => {
	return (
		<div className='home'>
			<div className='home__title'>
				<h1>{`Convertidor JSON <==> EXCEL`}</h1>
			</div>
			<div className='home__file-actions'>
				<FileActions />
			</div>
			<div className='home__reader'>
				<Reader />
			</div>
		</div>
	);
};

export default Home;
