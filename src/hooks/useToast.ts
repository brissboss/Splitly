import { useDispatch } from 'react-redux';
import { addToast } from '@/store/toastsSlice';
import type { ToastData } from '@/types/toasts';

function useToast() {
	const dispatch = useDispatch();

	return (toast: ToastData) => {
		dispatch(addToast(toast));
	};
}

export default useToast;
