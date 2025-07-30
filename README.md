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

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Testing

Run the test suite:

```bash
npm run test        # Run tests once
npm run test:unit   # Run unit tests in watch mode
```

## Code Quality

```bash
npm run lint        # Check code quality
npm run format      # Format code with Prettier
```
