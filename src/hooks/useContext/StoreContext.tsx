import { createContext, FC, ReactNode, useMemo, useState } from 'react';
import { ContextProps, InitialStateContext } from '../../types/context';

export const initialStateContext: InitialStateContext = {
	excel: {
		header: [],
		rows: [],
	},
	json: '{}',
	isLogin: true,
	status: 'idle',
	onprogress: 0,
	error: [],
};

export const contextProps: ContextProps = {
	stateContext: initialStateContext,
	setStateContext: () => {},
};

export const CreateContext = createContext<ContextProps>(contextProps);

const StoreContext: FC<{ children: ReactNode }> = ({ children }) => {
	const [stateContext, setStateContext] = useState<InitialStateContext>(initialStateContext);

	const contextValue = useMemo(
		() => ({ stateContext, setStateContext }),
		[stateContext, setStateContext]
	);

	return <CreateContext.Provider value={contextValue}>{children}</CreateContext.Provider>;
};

export default StoreContext;
