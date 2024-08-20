import { useState } from 'react';
import FileActions from './components/FileActions/FileActions';
import Reader from './components/Reader/Reader';
import './styles/app.scss';

interface User {
	name: string;
	password: string;
}

const App = (): JSX.Element => {
	const [{ name, password }, setUser] = useState<User>({ name: '', password: '' });
	const [isLogin, setIsLogin] = useState<boolean>(true);

	const handleLogin = (): void => {
		if (name === 'bienvenido' && password === '123') {
			setIsLogin(true);
		}
	};

	return (
		<div className='app'>
			{isLogin ? (
				<>
					<div className='app__title'>
						<h1>{`Convertidor JSON <==> EXCEL`}</h1>
					</div>
					<div className='app__file-actions'>
						<FileActions />
					</div>
					<div className='app__reader'>
						<Reader />
					</div>
				</>
			) : (
				<div className='app__login'>
					<div className='login'>
						<input
							type='text'
							placeholder='Usuario'
							value={name}
							onChange={e => setUser(prevState => ({ ...prevState, name: e.target.value }))}
						/>
						<input
							type='password'
							placeholder='Contraseña'
							value={password}
							onChange={e => setUser(prevState => ({ ...prevState, password: e.target.value }))}
						/>
						<button type='button' onClick={handleLogin}>
							login
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default App;
