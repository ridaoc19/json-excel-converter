import { Dispatch, SetStateAction } from 'react';

declare interface ContextProps {
	stateContext: InitialStateContext;
	setStateContext: Dispatch<SetStateAction<InitialStateContext>>;
}

declare interface InitialStateContext {
	excel: Excel;
	json: string;
	isLogin: boolean;
	error: ErrorLocal[];
}
