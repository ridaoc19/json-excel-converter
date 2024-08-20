export interface SvgProps {
	type: SvgType;
	width?: number;
	height?: number;
	color?: string;
}

export enum SvgType {
	User = 'user',
	Name = 'name',
	LastName = 'lastName',
	OpenEye = 'openEye',
	ClosedEye = 'closedEye',
	Password = 'password',
}
