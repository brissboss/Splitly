import Header from '@/components/layouts/header';
import Result from '@/components/simulation/result';
import Form from '@/components/simulation/form';

function Simulation() {
	return (
		<>
			<Header />
			<main className="mx-auto flex max-w-[1200px] flex-col justify-center gap-4 self-center px-5 py-18 lg:flex-row-reverse">
				<aside className="top-18 h-fit w-full lg:sticky lg:w-1/3">
					<Result />
				</aside>
				<div className="w-full space-y-6 lg:w-2/3 lg:pt-0">
					<Form />
				</div>
			</main>
		</>
	);
}

export default Simulation;
