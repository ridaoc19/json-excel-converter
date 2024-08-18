import FileActions from './components/FileActions/FileActions';
import Reader from './components/Reader/Reader';
import './styles/app.scss';

const App = (): JSX.Element => {
	return (
		<div className='app'>
			<div className='app__title'>
				<h1>{`Convertidor JSON <==> EXCEL`}</h1>
			</div>
			<div className='app__file-actions'>
				<FileActions />
			</div>
			<div className='app__reader'>
				<Reader />
			</div>
		</div>
	);
};

export default App;
