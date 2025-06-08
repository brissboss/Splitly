import type { simulationState } from '@/types/simulation';

async function getMe(token: string | null) {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me?populate=*`, {
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.error?.message || 'Failed to get me');
	}

	return data;
}

async function saveSimulation(simulationData: simulationState, token: string | null) {
	const { documentId } = (await getMe(token)).simulation;

	const res = await fetch(`${import.meta.env.VITE_API_URL}/api/simulations/${documentId}`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ data: { data: simulationData } }),
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.error?.message || 'Failed to save simulation');
	}

	return true;
}

async function getSimulation(token: string | null) {
	const { simulation } = await getMe(token);

	if (simulation?.data) {
		return simulation.data;
	}
}

export { saveSimulation, getSimulation };
