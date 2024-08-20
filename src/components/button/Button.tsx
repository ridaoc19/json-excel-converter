import Svg from '../icons/Svg';
import { ButtonProps, ButtonType } from './button.type';

const Button = ({
	id,
	type,
	handleClick,
	text,
	value = '',
	disabled = false,
	other_attributes = {},
	svgLeft = null,
	svgRight = null,
}: ButtonProps): JSX.Element => {
	return (
		<button
			type='button'
			id={`button__${id}`}
			className={`button button_${type}`}
			onClick={handleClick}
			value={value}
			disabled={disabled}
			aria-label={`Click para ${id}`}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...other_attributes}
		>
			{svgLeft && (
				<span className='button__svg-left'>
					{Svg({
						type: svgLeft,
						height: 16,
						width: 16,
						color: [
							ButtonType.Error,
							ButtonType.Success,
							ButtonType.Warning,
							ButtonType.Information,
						].includes(type)
							? 'white'
							: undefined,
					})}
				</span>
			)}
			{text && (
				<span className='button__text-container'>
					<div> {text}</div>
				</span>
			)}
			{svgRight && (
				<span className='button__svg-right'>
					{Svg({
						type: svgRight,
						height: 16,
						width: 16,
						color: [
							ButtonType.Error,
							ButtonType.Success,
							ButtonType.Warning,
							ButtonType.Information,
						].includes(type)
							? 'white'
							: undefined,
					})}
				</span>
			)}
		</button>
	);
};

export default Button;
