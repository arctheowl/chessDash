# Chess Rating Dashboard

A modern web application for tracking chess player ratings and performance over time using the English Chess Federation (ECF) database.

## Features

- 🔍 **Player Search**: Search for chess players by name using the ECF database
- 📊 **Rating Tracking**: View detailed rating history with interactive charts
- 📈 **Performance Analytics**: Track rating changes and performance trends over time
- 🎨 **Modern UI**: Beautiful, responsive design with dark theme
- ⚡ **Real-time Data**: Live data from the ECF API

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **API**: ECF Rating API

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd chess-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Searching for Players

1. Use the search bar at the top of the page
2. Type a player's name (minimum 2 characters)
3. Select a player from the dropdown results

### Viewing Player Information

Once you select a player, you'll see:
- Player profile with current rating, title, federation, and club
- Interactive rating history chart
- Performance statistics (highest/lowest ratings, games recorded)

### Rating History Chart

The chart displays:
- Rating progression over time
- Interactive tooltips with game details
- Tournament and opponent information (when available)
- Performance statistics below the chart

## API Endpoints

The application uses the following API routes:

- `GET /api/players?q=<search_query>` - Search for players by name
- `GET /api/players/[id]/history` - Get player rating history

These routes proxy requests to the ECF Rating API.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── players/
│   │       ├── route.ts
│   │       └── [id]/
│   │           └── history/
│   │               └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── PlayerCard.tsx
│   ├── PlayerSearch.tsx
│   └── RatingChart.tsx
└── types/
    └── chess.ts
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. Create new components in `src/components/`
2. Add TypeScript types in `src/types/`
3. Create API routes in `src/app/api/`
4. Update the main page in `src/app/page.tsx`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [ECF Rating API](https://www.ecfrating.org.uk/) for providing chess player data
- [Recharts](https://recharts.org/) for the charting library
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Next.js](https://nextjs.org/) for the React framework
