import { ChangeEvent, useContext, useState } from 'react';
import { CreateContext } from '../../hooks/useContext/StoreContext';
import Input from '../../components/input/Input';
import { SvgType } from '../../components/icons/svgType';
import Button from '../../components/button/Button';
import { ButtonType } from '../../components/button/button.type';
import { PASSWORD, USERNAME } from '../../core/const';

interface InitialStateUser {
	username: string;
	password: string;
}

const initialStateUser: InitialStateUser = {
	username: '',
	password: '',
};

const Auth = (): JSX.Element => {
	const { setStateContext } = useContext(CreateContext);
	const [auth, setAuth] = useState<InitialStateUser>(initialStateUser);
	const [error, setError] = useState<InitialStateUser>(initialStateUser);

	const handleClick = (): void => {
		if (!auth.username || !auth.password) {
			setError({
				username: !auth.username ? 'El usuario es Obligatorio' : '',
				password: !auth.password ? 'La contraseña es obligatoria' : '',
			});
		} else if (auth.username !== USERNAME || auth.password !== PASSWORD) {
			setError({
				username: auth.username !== USERNAME ? 'Usuario incorrecto.' : '',
				password: auth.password !== PASSWORD ? 'Contraseña incorrecta.' : '',
			});
		} else {
			setStateContext(prevState => ({ ...prevState, isLogin: true }));
		}
	};

	const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>): void => {
		setError(prevState => ({ ...prevState, [name]: '' }));
		setAuth(prevState => ({ ...prevState, [name]: value }));
	};

	return (
		<form className='auth'>
			<div className='login'>
				<h2 id='authFormTitle' className='sr-only'>
					Autenticación
				</h2>
				<div className='login__input'>
					{Object.keys(initialStateUser).map(name => (
						<Input
							key={name}
							type={name}
							name={name}
							placeholder={name === 'username' ? 'Usuario' : 'Contraseña'}
							value={auth[name as keyof InitialStateUser]}
							handleOnChange={handleChange}
							errorMessage={error[name as keyof InitialStateUser]}
							svgLeft={name === 'username' ? SvgType.User : SvgType.Password}
							other_attributes={{
								'aria-required': 'true',
								autoComplete: name === 'username' ? 'username' : 'current-password',
							}}
						/>
					))}
				</div>

				<div className='login__button'>
					<Button
						id='button'
						text='Iniciar Sesión'
						type={ButtonType.Dark}
						handleClick={handleClick}
					/>
				</div>
			</div>
		</form>
	);
};

export default Auth;
