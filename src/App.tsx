import FileActions from './components/FileActions/FileActions';
import Reader from './components/Reader/Reader';

const App = (): JSX.Element => {
	return (
		<div className='app'>
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
