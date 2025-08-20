# Overview

This is a comprehensive Anglican Diocese web application built as a full-stack solution with a React frontend and Express.js backend. The platform serves dual purposes: a public-facing website for the diocese community and a secure admin portal for content management. The application features parish directories, priest profiles, event management, and contact functionality, all designed with an Anglican purple color scheme and mobile-first responsive design.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built using React with TypeScript and follows a component-based architecture:

- **Framework**: React with Vite for development and build tooling
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **UI Library**: Custom component library built on Radix UI primitives with Tailwind CSS
- **Forms**: React Hook Form with Zod schema validation
- **Authentication**: Context-based authentication with protected routes

The application uses a modern component structure with separation of concerns between pages, reusable UI components, and business logic hooks. The design system is built around shadcn/ui components with extensive customization for the Anglican branding.

## Backend Architecture

The backend follows RESTful API principles with Express.js:

- **Framework**: Express.js with TypeScript
- **Authentication**: Passport.js with local strategy using session-based authentication
- **Session Management**: Express-session with PostgreSQL session store
- **Database ORM**: Drizzle ORM for type-safe database operations
- **API Structure**: Organized routes with middleware for authentication and error handling

The server implements a layered architecture with separate modules for authentication, database operations, and route handling. Protected admin routes require authentication middleware.

## Database Design

The application uses PostgreSQL with Drizzle ORM for schema management:

- **Schema Definition**: Centralized schema definitions in `shared/schema.ts`
- **Migrations**: Drizzle Kit for database migrations and schema changes
- **Relationships**: Proper foreign key relationships between entities (parishes-archdeaconries, priests-parishes)
- **Data Validation**: Zod schemas for both client and server-side validation

Key entities include Users, Archdeaconries, Parishes, Priests, Events, and Contacts with appropriate relationships and constraints.

## Authentication & Authorization

The application implements session-based authentication:

- **Strategy**: Local username/password authentication via Passport.js
- **Session Storage**: PostgreSQL-backed session store for persistence
- **Password Security**: Scrypt-based password hashing with salt
- **Route Protection**: Middleware-based route protection for admin endpoints
- **Client-side Guards**: Protected route components for authenticated pages

## Development & Build Process

The project uses modern development tooling:

- **Development**: Vite dev server with HMR and TypeScript compilation
- **Build Process**: Separate builds for client (Vite) and server (esbuild)
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Asset Handling**: Vite handles static assets and bundling
- **Environment**: Environment-based configuration for development/production

# External Dependencies

## Database Infrastructure
- **Neon Database**: PostgreSQL hosting service via `@neondatabase/serverless`
- **Connection Pooling**: Built-in connection pooling for database efficiency

## UI and Styling
- **Radix UI**: Headless UI components for accessibility and functionality
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Google Fonts**: Web fonts (Playfair Display, Inter) for typography

## Development Tools
- **Replit Integration**: Vite plugins for Replit development environment
- **Build Tools**: esbuild for server bundling, PostCSS for CSS processing

## Authentication Services
- **Session Storage**: PostgreSQL session store via `connect-pg-simple`
- **Password Hashing**: Node.js crypto module for secure password handling

## Date and Utility Libraries
- **date-fns**: Date manipulation and formatting
- **clsx & tailwind-merge**: CSS class name utilities
- **nanoid**: Unique ID generation

The application is designed to be deployed on platforms that support Node.js with PostgreSQL databases, with particular consideration for Replit's development environment through specialized plugins and configurations.