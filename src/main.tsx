import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from '@/router';
import { ThemeProvider } from '@/components/layouts/theme-provider';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from '@/context/AuthContext';
import ToastProvider from '@/components/ui/toastProvider';
import './index.css';
import './lib/i18n';
import { Analytics } from '@vercel/analytics/react';

const applyThemeColor = () => {
	const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const themeColor = isDark ? '#0a0a0a' : '#ffffff';

	let metaTag = document.querySelector('meta[name="theme-color"]');
	if (!metaTag) {
		metaTag = document.createElement('meta');
		metaTag.setAttribute('name', 'theme-color');
		document.head.appendChild(metaTag);
	}
	metaTag.setAttribute('content', themeColor);
};

applyThemeColor();

const observer = new MutationObserver(() => {
	const isDark = document.documentElement.classList.contains('dark');
	const themeColor = isDark ? '#0a0a0a' : '#ffffff';
	document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor);
});

observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Provider store={store}>
				<AuthProvider>
					<ToastProvider>
						<AppRouter />
						<Analytics />
					</ToastProvider>
				</AuthProvider>
			</Provider>
		</ThemeProvider>
	</StrictMode>
);
