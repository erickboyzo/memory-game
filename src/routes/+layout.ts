import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';

export const load = async ({ url }) => {
	let userData = null;

	if (browser) {
		const storedData = localStorage.getItem('mg_gameState');
		if (storedData) {
			try {
				userData = JSON.parse(storedData);
			} catch (e) {
				console.error('Failed to parse user data from localStorage:', e);
				localStorage.removeItem('mg_gameState'); // Clear invalid data
			}
		}
	}

	if (userData && !userData?.gameInProgress && url.pathname === '/game-in-progress') {
		throw redirect(302, '/');
	} else if (userData && userData?.gameInProgress && url.pathname === '/') {
		throw redirect(302, '/game-in-progress');
	}
	return {
		userData: userData
	};
};
