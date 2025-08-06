import _ from 'lodash';
import { getIconPairs, getShuffledNumberPairs } from '$lib';

export function createGameBoardWithCards(gridSize: number, theme: string): GameCard[][] {
	const totalCards = gridSize * gridSize;
	const pairCount = totalCards / 2;

	const pairs =
		theme === 'numbers' ? getShuffledNumberPairs(pairCount, 1, 999) : getIconPairs(pairCount);

	const cards: GameCard[] = pairs.map((value, index) => ({
		id: index,
		value: value.toString(),
		isFlipped: false,
		isMatched: false
	}));

	return _.chunk(cards, gridSize);
}
