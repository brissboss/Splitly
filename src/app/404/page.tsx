import { useTranslation } from 'react-i18next';
import LanguageToggle from '@/components/layouts/language-toggle';
import ModeToggle from '@/components/layouts/mode-toggle';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function Error404() {
	const { t } = useTranslation();

	return (
		<div className="relative flex h-dvh flex-col items-center justify-center px-4 text-center">
			<div className="absolute top-2 right-2 flex gap-2">
				<LanguageToggle />
				<ModeToggle />
			</div>

			<h1 className="text-6xl font-bold">{t('notFound.title')}</h1>
			<p className="text-muted-foreground mt-2 text-xl">{t('notFound.subtitle')}</p>
			<p className="text-muted-foreground">{t('notFound.description')}</p>

			<Link to="/">
				<Button className="mt-6">{t('notFound.backToHome')}</Button>
			</Link>
		</div>
	);
}

export default Error404;
