# Rick and Morty Character Explorer

A Next.js application that allows users to explore Rick and Morty characters with filtering options.

## Features

- Filter characters by status, gender, and species
- URL-based filtering with SSR support
- Detailed character view
- Responsive design

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- React Query
- Zustand for state management
- Tailwind CSS

## Development Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Code Quality Tools

This project uses several tools to ensure code quality:

### ESLint

ESLint is configured with strict TypeScript rules, including:
- No use of `any` type
- Explicit return types
- React hooks rules
- Tailwind CSS class ordering

To run ESLint:

```bash
npm run lint
# or
npm run lint:fix # to automatically fix issues
```

### Prettier

Prettier is used for consistent code formatting.

To format code:

```bash
npm run format
```

### TypeScript

TypeScript is configured with strict type checking.

To check types:

```bash
npm run check-types
```

### Husky & lint-staged

Husky and lint-staged are set up to run linting and type checking before each commit.

## Git Hooks

- **pre-commit**: Runs type checking and lint-staged (ESLint + Prettier)

## VSCode Setup

This project includes recommended VSCode settings:

- Format on save
- ESLint auto-fix on save
- Tailwind CSS IntelliSense

## Project Structure

- `/src/app`: Next.js App Router pages
- `/src/components`: React components
- `/src/store`: Zustand store
- `/src/styles`: Global styles

## License

MIT
