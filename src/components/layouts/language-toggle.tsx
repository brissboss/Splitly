import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';

function LanguageToggle() {
	const { t, i18n } = useTranslation();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm">
					<Languages />
					<span className="sr-only">{t('translationToggle.toggleLabel')}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => i18n.changeLanguage('fr')}>🇫🇷 Français</DropdownMenuItem>
				<DropdownMenuItem onClick={() => i18n.changeLanguage('en')}>🇺🇸 English</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default LanguageToggle;
