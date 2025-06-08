import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import ModeToggle from '@/components/layouts/mode-toggle';
import LanguageToggle from '@/components/layouts/language-toggle';
import CurrencyToggle from '@/components/layouts/currency-toggle';
import { LogIn, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import { resetSimulationState } from '@/store/simulationSlice';
import { useDispatch } from 'react-redux';
import SplitlyIconDark from '@/assets/icons/logo_splitly_dark.svg?react';
import SplitlyIconLight from '@/assets/icons/logo_splitly_light.svg?react';

function Header() {
	const { t } = useTranslation();
	const auth = useAuth();
	const dispatch = useDispatch();

	function handleLogout() {
		dispatch(resetSimulationState());
		auth.logout();
	}

	return (
		<header className="bg-background fixed top-0 right-0 left-0 z-50 flex h-14 shrink-0 items-center justify-center gap-2 border-b px-5 transition-[width,height] ease-linear">
			<div className="flex w-full max-w-[1200px] items-center justify-between">
				<div className="flex items-center">
					<SplitlyIconDark className="hidden h-12 w-12 dark:block" />
					<SplitlyIconLight className="h-12 w-12 dark:hidden" />
					<h1 className="text-lg font-medium">Splitly</h1>
				</div>

				<div className="flex items-center gap-2">
					<CurrencyToggle />
					<LanguageToggle />
					<ModeToggle />
					{auth.user ? (
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Avatar>
									<AvatarFallback>{auth.user.email[0].toUpperCase()}</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem variant="destructive" onClick={handleLogout}>
									<LogOut />
									{t('auth.logout')}
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Link to="/login">
							<Button size="sm">
								<LogIn />
								{t('auth.login')}
							</Button>
						</Link>
					)}
				</div>
			</div>
		</header>
	);
}

export default Header;
