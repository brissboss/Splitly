import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import getStrapiErrorMessage from '@/lib/errors/strapiError';
import { Card, CardContent, CardTitle, CardDescription, CardHeader, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle } from 'lucide-react';
import GitHubIcon from '@/assets/icons/github.svg?react';

function GithubAuthRedirect() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const auth = useAuth();

	const handleAuth = async (token: string) => {
		const error = await auth.authByProvider(token, 'github');

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
						<CardDescription>{t('auth.externalProviders.errorDescription', { provider: 'GitHub' })}</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-4 px-6">
						{/* [{getStrapiErrorMessage(auth.error, t)}] */}
						{auth.error && (
							<Alert variant="destructive">
								<AlertCircle className="h-4 w-4" />
								<AlertTitle>{t('form.errors.error')}</AlertTitle>
								<AlertDescription>{getStrapiErrorMessage(auth.error, t)}</AlertDescription>
							</Alert>
						)}
						<div className="flex items-center gap-4">
							<Button onClick={() => navigate('/signup')} variant="secondary" className="w-full">
								{t('auth.signup')}
							</Button>
							<Button onClick={() => navigate('/login')} variant="secondary" className="w-full">
								{t('auth.login')}
							</Button>
						</div>
						<Button
							onClick={() => (window.location.href = `${import.meta.env.VITE_API_URL}/api/connect/github`)}
							variant="default"
							className="w-full"
						>
							<GitHubIcon className="h-5 w-5" />
							{t('auth.externalProviders.retryWithProvider', { provider: 'GitHub' })}
						</Button>
					</CardContent>
					<CardFooter>
						<p className="mt-2 text-start text-xs text-neutral-400">{t('auth.externalProviders.supportHint', { provider: 'GitHub' })}</p>
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

export default GithubAuthRedirect;
