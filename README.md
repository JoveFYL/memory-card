# Memory Card Game - Pokemon Edition

A Pokemon-themed memory card game built with React, TypeScript, and Vite. The objective is to click on each Pokemon card only once without repeating. Cards shuffle after each click to test your memory.

## React Concepts

This project demonstrates the following React concepts:

- **State Management**: Using `useState` to manage game state, scores, selected Pokemon, and UI states
- **Side Effects**: Using `useEffect` to handle data fetching and component lifecycle events
- **Custom Hooks**: Implementation of custom hooks for Pokemon data fetching and game logic
- **Component Composition**: Breaking down the UI into reusable components (Cards, Card, Dialogs)
- **Props and Prop Drilling**: Passing data and callbacks between parent and child components
- **Conditional Rendering**: Displaying different UI states based on game status (start, playing, win, lose)
- **Event Handling**: Managing user interactions with click handlers
- **TypeScript Integration**: Type-safe props, state, and function signatures

## Branches

### Main Branch

The main branch implements Pokemon data fetching using vanilla JavaScript with the native `fetch` API. This approach demonstrates:

- Direct API calls to PokeAPI
- Promise handling with `Promise.all`
- Basic async/await patterns
- Manual data transformation and state updates

### React Query Branch

The `react-query-branch` utilises TanStack Query (React Query) for data fetching and caching. This implementation:

- Prevents excessive API calls through caching
- Stores previously fetched Pokemon data to avoid redundant network requests
- Optimises application performance by retrieving cached data when the same Pokemon is randomly selected in future rounds
- Implements manual cache checking and React Query's built-in caching mechanisms
- Includes React Query DevTools for debugging and monitoring cache behavior

The React Query implementation significantly reduces API usage as more Pokemon are encountered during gameplay, leading to faster load times and a better user experience.

## Technologies Used

- React
- TypeScript
- Vite
- PokeAPI
- TanStack Query (react-query-branch only)

## Setup

```bash
npm install
npm run dev
```
