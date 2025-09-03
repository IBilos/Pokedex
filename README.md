# Pokedex

## App Description

A web application for exploring the Pokémon world, featuring advanced filtering, sorting, and detailed Pokémon information.

---

## Technologies

- **React** + **TypeScript**
- **Vite** (build tool)
- **Sass** (styling)
- **ESLint & Prettier** (code quality and formatting)
- **Axios** – for HTTP requests to the PokeAPI
- **React Query** – data fetching, caching, background updates, and infinite loading
- **Virtualization** – rendering only visible items for performance in large lists
- **Infinite Scroll** – automatic loading of Pokémon as the user scrolls
- **PokeAPI** ([https://pokeapi.co/api/v2/](https://pokeapi.co/api/v2/))

---

## Features

### Pokemon Overview

- Grid display of Pokémon with key information:
  - Image
  - Name
  - Types
  - Basic Stats (HP, Attack, Defense)
- Ability to open a detailed view in a modal

### Advanced Filtering

- Filter by type (Water, Fire, Grass, Electric…)
- Filter by generation
- Filter by stat ranges (Attack, Defense, Speed)
- Filter by abilities
- Search by Pokémon name
- Combine multiple filters at once (e.g., Water type + Generation 2 + Speed > 80)

### Sorting

- Alphabetically by name
- By total power
- By generation
- By individual stats

---

## Installation and Setup

1. **Clone the repository:**

```bash
git clone https://github.com/IBilos/Pokedex
cd Pokedex
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npm run dev
```

4. **Linter:**

```bash
npm run lint
npm run lint:fix
```

---

## Live Demo

[Open Pokedex on Vercel](https://pokedex-application-3.vercel.app/)

---

## Architecture Overview

The application separates concerns by:
- Using React Query for server state and caching
- Using useState for local UI state
- Splitting components into domain-specific (`pokemon`) and generic (`ui`)
- Keeping type safety with TypeScript across the codebase

---

## Project Structure

- `src/api` – reusable pokeApi fetches
- `src/components/pokemon` – reusable UI components (Card, Modal, Grid, etc.)
- `src/components/ui` – reusable UI components (Empty display, Loader, Filters, etc.)
- `src/pages` – main page layouts
- `src/hooks` – custom hooks (e.g., data fetching with React Query)
- `src/styles` – Sass styles (_variables.ts folder for unified styles)
- `src/types` – Interfaces, types and pokeApi helpers  
- `src/utils` – helper functions (stat calculations, sorting logic)

---

## Testing
Planned (or partially implemented):
- Unit tests with Jest + React Testing Library
- E2E tests with Cypress

---

## Future Improvements

- Add user authentication and favorites list
- Add dark mode / theming
- Internationalization (multi-language support)
- Extend filtering (height, weight, base experience)
- Expand test coverage (unit, integration, E2E)




