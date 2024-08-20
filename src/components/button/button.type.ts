import { ButtonHTMLAttributes, ReactNode } from 'react';
import { SvgType } from '../icons/svgType';

export const enum ButtonType {
	Dark = 'dark',
	Light = 'light',
	Link = 'link',
	Highlighter = 'highlighter',
	None = 'none',
	Information = 'information',
	Warning = 'warning',
	Success = 'success',
	Error = 'error',
}

export interface ButtonProps {
	id: string;
	type: ButtonType;
	text: string | ReactNode;
	handleClick: HandleClick;

	svgRight?: SvgType | null;
	svgLeft?: SvgType | null;
	other_attributes?: ButtonHTMLAttributes<HTMLButtonElement>;
	disabled?: boolean;
	value?: string | number;
}
