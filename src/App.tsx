import { useContext } from 'react';
import { CreateContext } from './hooks/useContext/StoreContext';
import './styles/app.scss';
import Auth from './views/Auth/Auth';
import Home from './views/Home/Home';

const App = (): JSX.Element => {
	const {
		stateContext: { isLogin },
	} = useContext(CreateContext);

	return (
		<div className='app'>
			{isLogin ? (
				<div className='app__home'>
					<Home />
				</div>
			) : (
				<div className='app__login'>
					<Auth />
				</div>
			)}
		</div>
	);
};

export default App;
