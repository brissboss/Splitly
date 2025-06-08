import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/layouts/theme-provider';
import { useTranslation } from 'react-i18next';

function ModeToggle() {
	const { setTheme } = useTheme();
	const { t } = useTranslation();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm">
					<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
					<span className="sr-only">{t('themeToggle.toggleLabel')}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme('light')}>{t('themeToggle.light')}</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>{t('themeToggle.dark')}</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>{t('themeToggle.system')}</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default ModeToggle;
