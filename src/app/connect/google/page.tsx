import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardTitle, CardDescription, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import GoogleIcon from '@/assets/icons/google.svg?react';
import { Loader2 } from 'lucide-react';

function GoogleAuthRedirect() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const auth = useAuth();

	const handleAuth = async (token: string) => {
		const error = await auth.authByProvider(token, 'google');

		console.log(error);

		if (!error) {
			navigate('/');
		}
	};

	useEffect(() => {
		auth.setError(null);

		const params = new URLSearchParams(window.location.search);
		const token = params.get('access_token');

		if (token) {
			handleAuth(token);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="flex flex-col">
			{auth.error && (
				<Card className="w-[370px] sm:w-[400px]">
					<CardHeader className="flex flex-col gap-2">
						<CardTitle>{t('auth.externalProviders.errorTitle')}</CardTitle>
						<CardDescription>{t('auth.externalProviders.errorDescription', { provider: 'Google' })}</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-4 px-6">
						<div className="flex items-center gap-4">
							<Button onClick={() => navigate('/signup')} variant="secondary" className="w-full">
								{t('auth.signup')}
							</Button>
							<Button onClick={() => navigate('/login')} variant="secondary" className="w-full">
								{t('auth.login')}
							</Button>
						</div>
						<Button
							onClick={() => (window.location.href = `${import.meta.env.VITE_API_URL}/api/connect/google`)}
							variant="default"
							className="w-full"
						>
							<GoogleIcon className="h-5 w-5" />
							{t('auth.externalProviders.retryWithProvider', { provider: 'Google' })}
						</Button>
					</CardContent>
					<CardFooter>
						<p className="mt-2 text-start text-xs text-neutral-400">{t('auth.externalProviders.supportHint', { provider: 'Google' })}</p>
					</CardFooter>
				</Card>
			)}
			{auth.loading && (
				<div className="flex items-center gap-4">
					<Loader2 className="animate-spin" />
					<p>{t('auth.loginTitle')}...</p>
				</div>
			)}
		</div>
	);
}

export default GoogleAuthRedirect;
