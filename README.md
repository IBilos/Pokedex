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

### Sorting

- Alphabetically by name
- By total power
- By generation
- By individual stats

--

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

4. **(Optional) Linter:**

```bash
npm run lint
npm run lint:fix
```
