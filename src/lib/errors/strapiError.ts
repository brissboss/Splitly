import type { TFunction } from 'i18next';

export default function getStrapiErrorMessage(error: string | null, t: TFunction): string | null {
	if (!error) return null;

	const errorMap: Record<string, string> = {
		'Email or Username are already taken': t('form.errors.userExists'),
		'Email is already taken.': t('form.errors.userExists'),
		'Invalid identifier or password': t('form.errors.invalidCredentials'),
		'code is a required field': t('form.errors.resetPasswordFailed'),
		'Incorrect code provided': t('form.errors.resetPasswordFailed'),
	};

	const entries = Object.entries(errorMap).find(([apiMsg]) => error.includes(apiMsg));
	return entries ? entries[1] : t('form.errors.unknowError');
}
