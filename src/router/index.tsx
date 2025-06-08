import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Simulation from '@/app/simulation/page';
import Login from '@/app/login/page';
import SignUp from '@/app/signup/page';
import GoogleAuthRedirect from '@/app/connect/google/page';
import GithubAuthRedirect from '@/app/connect/github/page';
import ForgotPassword from '@/app/forgot-password/page';
import ResetPassword from '@/app/reset-password/page';
import LayoutAuth from '@/components/layouts/layout-auth';
import Error404 from '@/app/404/page';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Simulation />,
		errorElement: <Error404 />,
	},
	{
		element: (
			<LayoutAuth>
				<Outlet />
			</LayoutAuth>
		),
		children: [
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/signup',
				element: <SignUp />,
			},
			{
				path: '/connect/google',
				element: <GoogleAuthRedirect />,
			},
			{
				path: '/connect/github',
				element: <GithubAuthRedirect />,
			},
			{
				path: '/forgot-password',
				element: <ForgotPassword />,
			},
			{
				path: '/reset-password',
				element: <ResetPassword />,
			},
		],
	},
]);

export default function AppRouter() {
	return <RouterProvider router={router} />;
}
