# Magic Deck Viewer

A React application that displays my Magic: The Gathering decks and allows users to explore individual cards using live data from the Scryfall API.

## Overview

This app lets users:

- View a list of my Magic decks
- Click into a deck to see its full decklist
- Preview individual cards with real card images and oracle text
- See commander details for EDH decks

The goal of this project was to practice client-side routing, state management, and consuming a third-party API in a real-world React application.

## Tech Stack

- React
- React Router
- JavaScript
- CSS
- Scryfall API

## Features

- Client-side routing between pages
- Dynamic data fetching from a public API
- Loading and error states for async requests
- Card preview panel with sticky positioning
- Clean component structure and reusable API utilities

## API Used

[Scryfall API](https://scryfall.com/docs/api)

Scryfall provides up-to-date Magic: The Gathering card data, including images, rules text, and card metadata.

## Installation & Setup

```bash
npm install
npm run dev
```
