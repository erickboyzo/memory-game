# Memory Game

A classic memory card matching game built with SvelteKit and modern web technologies.

## Game Rules

**Objective:** Match all pairs of cards in the fewest moves possible.

**How to Play:**

1. Choose your game settings:
   - **Theme**: Numbers or Icons
   - **Players**: 1-4 players
   - **Grid Size**: 4x4 or 6x6
2. Click "Start Game" to begin
3. Click on cards to flip them over
4. Try to find matching pairs
5. When you find a match, those cards stay face up
6. Continue until all pairs are matched
7. The player with the most matches wins (multiplayer)

**Scoring:**

- Single Player: Complete the game in the fewest moves
- Multiplayer: Player with the most pairs wins

## Technology Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **State Management**: Svelte Stores - Reactive state management
- **Build Tool**: [Vite](https://vitejs.dev/) - Fast build tool and dev server
- **Testing**: [Vitest](https://vitest.dev/) - Unit testing framework
- **Linting**: ESLint + Prettier - Code quality and formatting

## Development

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

### Available Scripts

```bash
npm run dev         # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run test       # Run tests
npm run lint       # Check code quality
npm run format     # Format code
```

## Acknowledgments

- Project inspired by [Frontend Mentor's](https://www.frontendmentor.io/challenges/memory-game-vse4WFPvM) Memory Game Challenge
- Icons provided by FontAwesome
