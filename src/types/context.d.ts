import { Dispatch, SetStateAction } from 'react';

declare interface ContextProps {
	stateContext: InitialStateContext;
	setStateContext: Dispatch<SetStateAction<InitialStateContext>>;
}

declare interface InitialStateContext {
	excel: Excel;
	json: string;
	status: 'idle' | 'pending' | 'error' | 'success';
	isLogin: boolean;
	onprogress: number;
	error: ErrorLocal[];
}
