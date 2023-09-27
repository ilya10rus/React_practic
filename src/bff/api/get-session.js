import { transformSession } from '../transformers';

export const getSession = async (hash) =>
	fetch(`http://localhost:3004/sessions?hash=${hash}`)
		.then((loadedSessions) => loadedSessions.json())
		.then(([loadedSessions]) => loadedSessions && transformSession(loadedSessions));
