// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface GameState {
		gameInProgress: boolean;
		selectedTheme: string;
		gridSize: number;
		players: Player[];
		numberOfPlayers: number;
		currentPlayerIndex: number;
		gameBoard?: GameCard[][];
	}

	interface Player {
		name: string;
		score: number;
		moves: number;
	}

	interface GameCard {
		id: number;
		value: string;
		isFlipped: boolean;
		isMatched: boolean;
	}

	interface GameBoard {
		cards: GameCard[];
	}

	interface GameResult {
		time: number;
		winningPlayer: Player;
		multiPlayer: boolean;
		players: Player[];
	}

	interface WinnerDialogProps {
		result: {
			time: number;
			moves: number;
			playerName: string;
		};
	}
}

export {};
