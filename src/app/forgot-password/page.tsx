import { useForm } from 'react-hook-form';
import { getForgotPasswordEmailSchema, type ForgotPasswordEmailSchema } from '@/lib/formSchemas/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardTitle, CardDescription, CardHeader, CardFooter } from '@/components/ui/card';
import { Form, FormField, FormLabel, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, MailSearch } from 'lucide-react';
import SplitlyIconDark from '@/assets/icons/logo_splitly_dark.svg?react';
import SplitlyIconLight from '@/assets/icons/logo_splitly_light.svg?react';

function ForgotPassword() {
	const { t, i18n } = useTranslation();
	const auth = useAuth();
	const navigate = useNavigate();
	const [isSend, setIsSend] = useState(false);

	const form = useForm<ForgotPasswordEmailSchema>({
		resolver: zodResolver(getForgotPasswordEmailSchema(t)),
		defaultValues: {
			email: '',
		},
	});

	async function onSubmit(data: ForgotPasswordEmailSchema) {
		const error = await auth.sendResetPasswordLink(data.email, i18n.language);

		if (!error) {
			setIsSend(true);
			form.setValue('email', '');
		}
	}

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
							<CardTitle className="text-xl">{t('auth.forgotPassword.forgotTitle')}</CardTitle>
							<CardDescription>{t('auth.forgotPassword.forgotDescription')}</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-4 px-6">
							{isSend && (
								<Alert>
									<MailSearch className="h-4 w-4" />
									<AlertTitle>{t('auth.forgotPassword.forgotSendConfirmationTitle')}</AlertTitle>
									<AlertDescription>{t('auth.forgotPassword.forgotSendConfirmationDescription')}</AlertDescription>
								</Alert>
							)}
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
						</CardContent>
						<CardFooter className="flex items-center gap-4 pt-2">
							<Button type="button" variant="secondary" className="w-full" onClick={() => navigate('/')}>
								{t('auth.forgotPassword.forgotCancelButton')}
							</Button>
							<Button disabled={auth.loading} type="submit" className="w-full">
								{auth.loading && <Loader2 className="animate-spin" />}
								{t('auth.forgotPassword.forgotSendButton')}
							</Button>
						</CardFooter>
					</Card>
				</form>
			</Form>
		</div>
	);
}

export default ForgotPassword;
