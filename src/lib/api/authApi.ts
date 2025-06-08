async function login(email: string, password: string) {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/local`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ identifier: email, password }),
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.error?.message || 'Incorrect identifiers');
	}

	return data;
}

async function signup(email: string, password: string) {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/local/register`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username: email.split('@')[0], email: email, password }),
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.error?.message || 'Error register');
	}

	return data;
}

async function providerAuth(accessToken: string, provider: string) {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/${provider}/callback?access_token=${accessToken}`);

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.error?.message || 'Auth error');
	}

	return data;
}

async function sendResetPasswordLink(email: string, local?: string) {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password${local ? `?locale=${local}` : ''}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email: email }),
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.error?.message || 'Failed to send reset password email');
	}

	return data;
}

async function resetPassword(code: string, password: string, passwordConfirmation: string) {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			code: code,
			password: password,
			passwordConfirmation: passwordConfirmation,
		}),
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.error?.message || 'Failed to reset password');
	}

	return data;
}

export { login, signup, providerAuth, sendResetPasswordLink, resetPassword };
