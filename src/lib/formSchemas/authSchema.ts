import { z } from 'zod';

export const getAuthSchema = (t: (key: string) => string) =>
	z.object({
		email: z
			.string()
			.min(1, { message: t('form.errors.emailRequired') })
			.email({ message: t('form.errors.emailInvalid') }),
		password: z
			.string()
			.min(8, { message: t('form.errors.passwordMinLength') })
			.refine((password) => /[A-Z]/.test(password), {
				message: t('form.errors.passwordUppercase'),
			})
			.refine((password) => /[a-z]/.test(password), {
				message: t('form.errors.passwordLowercase'),
			})
			.refine((password) => /[0-9]/.test(password), {
				message: t('form.errors.passwordNumber'),
			})
			.refine((password) => /[!@#$%^&*.]/.test(password), {
				message: t('form.errors.passwordSpecialCharacter'),
			}),
	});

export const getForgotPasswordEmailSchema = (t: (key: string) => string) =>
	z.object({
		email: z
			.string()
			.min(1, { message: t('form.errors.emailRequired') })
			.email({ message: t('form.errors.emailInvalid') }),
	});

export const getResetPasswordSchema = (t: (key: string) => string) =>
	z
		.object({
			password: z
				.string()
				.min(8, { message: t('form.errors.passwordMinLength') })
				.refine((password) => /[A-Z]/.test(password), {
					message: t('form.errors.passwordUppercase'),
				})
				.refine((password) => /[a-z]/.test(password), {
					message: t('form.errors.passwordLowercase'),
				})
				.refine((password) => /[0-9]/.test(password), {
					message: t('form.errors.passwordNumber'),
				})
				.refine((password) => /[!@#$%^&*.]/.test(password), {
					message: t('form.errors.passwordSpecialCharacter'),
				}),
			passwordConfirmation: z
				.string()
				.min(8, { message: t('form.errors.passwordMinLength') })
				.refine((password) => /[A-Z]/.test(password), {
					message: t('form.errors.passwordUppercase'),
				})
				.refine((password) => /[a-z]/.test(password), {
					message: t('form.errors.passwordLowercase'),
				})
				.refine((password) => /[0-9]/.test(password), {
					message: t('form.errors.passwordNumber'),
				})
				.refine((password) => /[!@#$%^&*.]/.test(password), {
					message: t('form.errors.passwordSpecialCharacter'),
				}),
		})
		.refine((data) => data.password === data.passwordConfirmation, {
			path: ['passwordConfirmation'],
			message: t('form.errors.passwordMismatch'),
		});

export type AuthFormSchema = z.infer<ReturnType<typeof getAuthSchema>>;
export type ForgotPasswordEmailSchema = z.infer<ReturnType<typeof getForgotPasswordEmailSchema>>;
export type ResetPasswordSchema = z.infer<ReturnType<typeof getResetPasswordSchema>>;
