import type { RootState } from '@/store';
import { type ReactNode, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeToast } from '@/store/toastsSlice';
import Toast from '@/components/ui/toast';

type ToastProviderProps = {
	children: ReactNode;
};

function ToastProvider({ children }: ToastProviderProps) {
	const dispatch = useDispatch();
	const toasts = useSelector((state: RootState) => state.toasts);

	const handleCloseToast = useCallback(
		(id: string) => {
			dispatch(removeToast({ id: id }));
		},
		[dispatch]
	);

	return (
		<>
			{children}
			<div className="fixed bottom-10 z-[9999] px-4 sm:right-4 sm:bottom-4 sm:px-0">
				<div className="flex flex-col gap-2">
					{toasts.toasts.map((toast) => (
						<Toast key={toast.id} data={toast} closeToast={handleCloseToast} />
					))}
				</div>
			</div>
		</>
	);
}

export default ToastProvider;
