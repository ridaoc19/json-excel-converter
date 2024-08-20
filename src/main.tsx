import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import StoreContext from './hooks/useContext/StoreContext';
import './styles/main.scss';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
	<StrictMode>
		<StoreContext>
			<App />
		</StoreContext>
	</StrictMode>
);
