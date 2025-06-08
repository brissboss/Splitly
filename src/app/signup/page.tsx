import { Card, CardContent, CardTitle, CardDescription, CardHeader, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from 'react-i18next';
import GitHubIcon from '@/assets/icons/github.svg?react';
import GoogleIcon from '@/assets/icons/google.svg?react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useForm } from 'react-hook-form';
import { Loader2, AlertCircle } from 'lucide-react';
import { getAuthSchema, type AuthFormSchema } from '@/lib/formSchemas/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormLabel, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputPassword from '@/components/ui/inputPassword';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import getStrapiErrorMessage from '@/lib/errors/strapiError';
import SplitlyIconDark from '@/assets/icons/logo_splitly_dark.svg?react';
import SplitlyIconLight from '@/assets/icons/logo_splitly_light.svg?react';

function SignUp() {
	const { t, i18n } = useTranslation();
	const auth = useAuth();
	const navigate = useNavigate();

	const form = useForm<AuthFormSchema>({
		resolver: zodResolver(getAuthSchema(t)),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	async function onSubmit(data: AuthFormSchema) {
		const error = await auth.signup(data.email, data.password);

		if (!error) {
			navigate('/');
		}
	}

	useEffect(() => {
		auth.setError(null);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (form.formState.isSubmitted || form.formState.isDirty) {
			form.trigger();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [i18n.language]);

	return (
		<div className="flex flex-col">
			<div className="mb-4 flex items-center">
				<SplitlyIconDark className="hidden h-12 w-12 dark:block" />
				<SplitlyIconLight className="h-12 w-12 dark:hidden" />
				<h1 className="text-3xl font-medium">Splitly</h1>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<Card className="w-[370px] sm:w-[400px]">
						<CardHeader>
							<CardTitle className="text-xl">{t('auth.signupTitle')}</CardTitle>
							<CardDescription>{t('auth.signupDescription')}</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-4 px-6">
							<div className="flex items-center gap-4">
								<Button
									type="button"
									variant="secondary"
									className="w-full"
									onClick={() => (window.location.href = `${import.meta.env.VITE_API_URL}/api/connect/github`)}
								>
									<GitHubIcon className="h-5 w-5" />
									GitHub
								</Button>
								<Button
									type="button"
									variant="secondary"
									className="w-full"
									onClick={() => (window.location.href = `${import.meta.env.VITE_API_URL}/api/connect/google`)}
								>
									<GoogleIcon className="h-5 w-5" />
									Google
								</Button>
							</div>

							<div className="flex items-center">
								<Separator className="flex-1" />
								<p className="px-4 text-center text-sm text-neutral-500 dark:text-neutral-400">{t('auth.orContinueWith')}</p>
								<Separator className="flex-1" />
							</div>

							{auth.error && (
								<Alert variant="destructive">
									<AlertCircle className="h-4 w-4" />
									<AlertTitle>{t('form.errors.error')}</AlertTitle>
									<AlertDescription>{getStrapiErrorMessage(auth.error, t)}</AlertDescription>
								</Alert>
							)}

							<div className="grid gap-2">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t('auth.mail')}</FormLabel>
											<FormControl>
												<Input type="email" placeholder="john.doe@mail.com" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="grid gap-2">
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t('auth.password')}</FormLabel>
											<FormControl>
												<InputPassword placeholder="**********" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</CardContent>
						<CardFooter className="flex flex-col gap-2">
							<Button disabled={auth.loading} type="submit" className="w-full">
								{auth.loading && <Loader2 className="animate-spin" />}
								{t('auth.signupButton')}
							</Button>
							<Link to="/login">
								<Button variant="link" size="sm" className="darl:text-neutral-400 text-neutral-500">
									{t('auth.hasAccount')}
								</Button>
							</Link>
						</CardFooter>
					</Card>
				</form>
			</Form>
		</div>
	);
}

export default SignUp;
