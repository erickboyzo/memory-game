import _ from 'lodash';

export function getShuffledNumberPairs(
	pairCount: number,
	min: number = 1,
	max: number = 999
): number[] {
	const numbers = _.sampleSize(_.range(min, max + 1), pairCount);
	const pairs = [...numbers, ...numbers];
	return _.shuffle(pairs);
}
