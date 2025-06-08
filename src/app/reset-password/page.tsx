import { Card, CardContent, CardTitle, CardDescription, CardHeader, CardFooter } from '@/components/ui/card';
import { Form, FormField, FormLabel, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { getResetPasswordSchema, type ResetPasswordSchema } from '@/lib/formSchemas/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle } from 'lucide-react';
import InputPassword from '@/components/ui/inputPassword';
import { useEffect, useState } from 'react';
import getStrapiErrorMessage from '@/lib/errors/strapiError';
import SplitlyIconDark from '@/assets/icons/logo_splitly_dark.svg?react';
import SplitlyIconLight from '@/assets/icons/logo_splitly_light.svg?react';

function ResetPassword() {
	const { t, i18n } = useTranslation();
	const auth = useAuth();
	const navigate = useNavigate();
	const [code, setCode] = useState('');

	const form = useForm<ResetPasswordSchema>({
		resolver: zodResolver(getResetPasswordSchema(t)),
		defaultValues: {
			password: '',
			passwordConfirmation: '',
		},
	});

	async function onSumbit(data: ResetPasswordSchema) {
		const error = await auth.resetPassword(code, data.password, data.passwordConfirmation);

		if (!error) {
			navigate('/');
		}
	}

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const token = params.get('code');

		if (token) {
			setCode(token);
		}
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
				<form onSubmit={form.handleSubmit(onSumbit)}>
					<Card className="w-[370px] sm:w-[400px]">
						<CardHeader>
							<CardTitle className="text-xl">{t('auth.resetPassword.resetTitle')}</CardTitle>
							<CardDescription>{t('auth.resetPassword.resetDescription')}</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-4 px-6">
							{auth.error && (
								<Alert variant="destructive">
									<AlertCircle className="h-4 w-4" />
									<AlertTitle>{t('form.errors.error')}</AlertTitle>
									<AlertDescription>{getStrapiErrorMessage(auth.error, t)}</AlertDescription>
								</Alert>
							)}
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t('auth.resetPassword.newPassword')}</FormLabel>
										<FormControl>
											<InputPassword placeholder="**********" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="passwordConfirmation"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t('auth.resetPassword.passwordConfirmation')}</FormLabel>
										<FormControl>
											<InputPassword placeholder="**********" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
						<CardFooter className="flex items-center gap-4 pt-2">
							<Button disabled={auth.loading} type="submit" className="w-full">
								{auth.loading && <Loader2 className="animate-spin" />}
								{t('auth.resetPassword.resetButton')}
							</Button>
						</CardFooter>
					</Card>
				</form>
			</Form>
		</div>
	);
}

export default ResetPassword;
