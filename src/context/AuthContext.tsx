import React, { createContext, useContext, useState, useEffect } from 'react';
import * as AuthApi from '@/lib/api/authApi';

type User = {
	id: number;
	email: string;
};

type AuthContextType = {
	user: User | null;
	token: string | null;
	login: (email: string, password: string) => Promise<string | null>;
	logout: () => void;
	signup: (email: string, password: string) => Promise<string | null>;
	authByProvider: (accessToken: string, provider: string) => Promise<string | null>;
	sendResetPasswordLink: (email: string, local?: string) => Promise<string | null>;
	resetPassword: (code: string, password: string, passwordConfirmation: string) => Promise<string | null>;
	loading: boolean;
	error: string | null;
	setError: (error: string | null) => void;
};

const AuthContext = createContext<AuthContextType>({
	user: null,
	token: null,
	login: async () => null,
	logout: () => {},
	signup: async () => null,
	authByProvider: async () => null,
	sendResetPasswordLink: async () => null,
	resetPassword: async () => null,
	loading: false,
	error: null,
	setError: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const savedToken = localStorage.getItem('token');
		const savedUser = localStorage.getItem('user');
		if (savedToken && savedUser) {
			setToken(savedToken);
			setUser(JSON.parse(savedUser));
		}
	}, []);

	async function login(email: string, password: string) {
		setLoading(true);
		setError(null);

		try {
			const data = await AuthApi.login(email, password);
			setToken(data.jwt);
			setUser(data.user);
			localStorage.setItem('token', data.jwt);
			localStorage.setItem('user', JSON.stringify(data.user));
			return null;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err.message);
			setToken(null);
			setUser(null);
			return err.message;
		} finally {
			setLoading(false);
		}
	}

	function logout() {
		setToken(null);
		setUser(null);
		localStorage.removeItem('token');
		localStorage.removeItem('user');
	}

	async function signup(email: string, password: string) {
		setLoading(true);
		setError(null);

		try {
			const data = await AuthApi.signup(email, password);
			setToken(data.jwt);
			setUser(data.user);
			localStorage.setItem('token', data.jwt);
			localStorage.setItem('user', JSON.stringify(data.user));
			return null;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err.message);
			setToken(null);
			setUser(null);
			return err.message;
		} finally {
			setLoading(false);
		}
	}

	async function authByProvider(accessToken: string, provider: string) {
		setLoading(true);
		setError(null);

		try {
			const data = await AuthApi.providerAuth(accessToken, provider);
			setToken(data.jwt);
			setUser(data.user);
			localStorage.setItem('token', data.jwt);
			localStorage.setItem('user', JSON.stringify(data.user));
			return null;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err.message);
			setToken(null);
			setUser(null);
			return err.message;
		} finally {
			setLoading(false);
		}
	}

	async function sendResetPasswordLink(email: string, local?: string) {
		setLoading(true);
		setError(null);

		try {
			await AuthApi.sendResetPasswordLink(email, local);
			return null;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err.message);
			return err.message;
		} finally {
			setLoading(false);
		}
	}

	async function resetPassword(code: string, password: string, passwordConfirmation: string) {
		setLoading(true);
		setError(null);

		try {
			const data = await AuthApi.resetPassword(code, password, passwordConfirmation);
			setToken(data.jwt);
			setUser(data.user);
			localStorage.setItem('token', data.jwt);
			localStorage.setItem('user', JSON.stringify(data.user));
			return null;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err.message);
			setToken(null);
			setUser(null);
			return err.message;
		} finally {
			setLoading(false);
		}
	}

	return (
		<AuthContext.Provider
			value={{ user, token, login, logout, signup, authByProvider, sendResetPasswordLink, resetPassword, loading, error, setError }}
		>
			{children}
		</AuthContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
