import { useContext, useState } from 'react';
import { CreateContext } from '../../hooks/useContext/StoreContext';

interface User {
	name: string;
	password: string;
}

const Auth = (): JSX.Element => {
	const { setStateContext } = useContext(CreateContext);
	const [{ name, password }, setUser] = useState<User>({ name: '', password: '' });

	const handleLogin = (): void => {
		if (name === 'bienvenido' && password === '123') {
			setStateContext(true);
		}
	};
	return (
		<div className='auth'>
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
	);
};

export default Auth;
