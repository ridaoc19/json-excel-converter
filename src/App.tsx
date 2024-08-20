import { useContext } from 'react';
import { CreateContext } from './hooks/useContext/StoreContext';

import Auth from './views/Auth/Auth';
import Home from './views/Home/Home';
import './styles/app.scss';

const App = (): JSX.Element => {
	const { stateContext } = useContext(CreateContext);

	return (
		<div className='app'>
			{stateContext.isLogin ? (
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
