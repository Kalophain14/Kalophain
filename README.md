# Nuclear Station Newsletter Web App

A modern web application built with React and Express for sharing safety updates and fire drill information for a nuclear station. This application provides real-time status updates, safety notifications, and emergency drill schedules.

## Features

- 🔔 Real-time safety updates and notifications
- 🚨 Fire drill schedule management
- 📊 Station status monitoring
- 📱 Mobile-responsive design
- 📬 Newsletter subscription system
- 🔒 Secure data handling

## Tech Stack

### Frontend
- React with TypeScript
- TanStack Query for data fetching
- Tailwind CSS & shadcn/ui for styling
- Framer Motion for animations
- Wouter for routing

### Backend
- Express.js
- Node.js
- TypeScript
- In-memory storage (upgradeable to PostgreSQL)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v20 or later)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd nuclear-station-newsletter
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. The server will automatically find an available port starting from 5000. Watch the console output for the actual port number, then open your browser and navigate to:
```
http://localhost:[PORT]
```

The server includes a health check endpoint at `/health` to verify the application status.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000                    # Preferred starting port (optional, defaults to 5000)
NODE_ENV=development        # Application environment
```

Note: If the specified port is in use, the server will automatically try the next available port up to PORT+10.

## Project Structure

```
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── lib/         # Utility functions
│   │   └── hooks/       # Custom React hooks
├── server/              # Backend Express application
│   ├── routes.ts        # API routes
│   └── storage.ts       # Data storage implementation
└── shared/              # Shared types and schemas
    └── schema.ts        # Type definitions and schemas
```

## Available API Endpoints

- `GET /api/updates` - Get all safety updates
- `GET /api/firedrills` - Get fire drill schedule
- `POST /api/subscribe` - Subscribe to newsletter
- `GET /health` - Check application status

## Development

The application uses TypeScript for type safety and better development experience. Key development features include:

- Hot module replacement for rapid development
- TypeScript compilation
- Automatic server restart on changes
- Comprehensive error logging
- Automatic port selection on conflicts

## License

This project is licensed under the MIT License - see the LICENSE file for details.