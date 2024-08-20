import { SvgType } from '../icons/svgType';

export const getBorderColor = (errorMessage: string, value: string | number): string => {
	if (errorMessage) {
		return '#db2424';
	}
	if (value.toString().length === 0) {
		return '#3498db';
	}
	return '#66b949';
};

export const getSvgColor = (errorMessage: string | undefined): string => {
	if (errorMessage) {
		return '#db2424';
	}
	return '#848FAC';
};

export const svgTypePassword = (svgType: SvgType, toggle: boolean): SvgType => {
	if (svgType !== SvgType.Password) {
		return svgType;
	}
	if (toggle) {
		return SvgType.OpenEye;
	}

	return SvgType.ClosedEye;
};

export const getInputType = (type: string, toggle: boolean): string => {
	if (['password', 'newPassword'].includes(type)) {
		if (toggle) {
			return 'text';
		}
		return 'password';
	}

	return type;
};

export const getClassNameModifier = (baseClass: string, modifier: string | undefined): string => {
	if (modifier) {
		return `${baseClass}--${modifier}`;
	}
	return baseClass;
};
