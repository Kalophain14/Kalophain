# Portfolio Web Application

A modern portfolio web application built with React and Express, featuring a clean design and smooth animations. This application showcases projects, provides safety updates, and includes a newsletter subscription system.

## Tech Stack

- **Frontend:**
  - React
  - TypeScript
  - Tailwind CSS
  - Shadcn/ui
  - Framer Motion
  - TanStack Query

- **Backend:**
  - Express.js
  - Node.js
  - TypeScript
  - Drizzle ORM
  - PostgreSQL

## Features

- 🎨 Modern, responsive design with animations
- 📱 Mobile-friendly interface
- 🚀 Fast loading and smooth transitions
- 📬 Newsletter subscription system
- 🔍 Project showcase with filtering
- 📊 Real-time status updates
- 🔥 Fire drill schedule management
- 📱 Social media integration

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v20 or later)
- npm (comes with Node.js)
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Kalophain14/Kalophain.git
cd Kalophain
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

2. Open your browser and navigate to:
```
http://localhost:3000
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
DATABASE_URL=your_database_url
SENDGRID_API_KEY=your_sendgrid_api_key
```

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
    └── schema.ts        # Database schema and types
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
