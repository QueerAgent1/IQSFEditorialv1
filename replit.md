# IQSF - Defining Safety, Advancing Equality

## Overview

IQSF is a full-stack web application dedicated to advancing LGBTQ+ safety through data-driven research, advocacy, and certification systems. The platform provides an interactive global safety map, data analytics dashboard, organizational certification programs, membership tiers, and AI-powered reporting tools. Built as a modern React SPA with Express.js backend, the application focuses on making safety data accessible and actionable for individuals, advocates, and organizations worldwide.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

**Frontend Architecture**
- React 18 SPA with TypeScript using Vite as the build tool
- Tailwind CSS with custom CSS variables for theming and pride color scheme
- shadcn/ui component library for consistent UI patterns
- Wouter for client-side routing (lightweight alternative to React Router)
- TanStack Query for server state management and caching
- Interactive maps powered by Leaflet for geographical data visualization

**Backend Architecture**
- Express.js server with TypeScript for API endpoints
- RESTful API design with endpoints for countries, statistics, certifications, reports, and memberships
- In-memory storage implementation with interfaces designed for easy database migration
- Middleware for request logging, JSON parsing, and error handling
- Vite integration for development with HMR support

**Data Storage**
- Drizzle ORM configured for PostgreSQL with migration support
- Neon Database as the PostgreSQL provider
- Comprehensive schema including users, countries, certifications, reports, and memberships
- Zod integration for schema validation and type safety
- Current implementation uses in-memory storage with database-ready interfaces

**Component Architecture**
- Modular component structure with clear separation of concerns
- Feature-based components (InteractiveMap, DataDashboard, CertificationSystem, etc.)
- Reusable UI components from shadcn/ui with custom styling
- Form handling with React Hook Form and Zod validation
- Toast notifications for user feedback

**State Management**
- TanStack Query for server state with caching and background updates
- React hooks for local component state
- Context providers for global UI state (toasts, tooltips)
- Query client configured with custom error handling and retry logic

**Styling System**
- Tailwind CSS with CSS custom properties for theming
- Pride color palette integrated into design system
- Responsive design with mobile-first approach
- Custom animations and gradient effects for brand identity
- Dark mode support through CSS variables

## External Dependencies

**Core Framework Dependencies**
- React 18 with TypeScript for frontend development
- Express.js for backend API server
- Vite for build tooling and development server
- Wouter for lightweight client-side routing

**Database & ORM**
- Drizzle ORM for database operations and migrations
- Neon Database (@neondatabase/serverless) as PostgreSQL provider
- Zod for schema validation and type inference

**UI & Styling**
- Tailwind CSS for utility-first styling
- Radix UI primitives for accessible component foundations
- Lucide React for consistent iconography
- shadcn/ui component library for pre-built components

**Data & State Management**
- TanStack Query for server state management
- React Hook Form with Hookform Resolvers for form handling
- Date-fns for date manipulation and formatting

**Maps & Visualization**
- Leaflet for interactive map functionality (loaded via CDN)
- Custom map markers and overlays for safety data visualization

**Development Tools**
- TypeScript for type safety across the stack
- PostCSS with Autoprefixer for CSS processing
- ESBuild for production server bundling
- Replit-specific plugins for development environment integration

**Session & Security**
- Connect-pg-simple for PostgreSQL session storage
- Express session management for user authentication
- CORS handling for cross-origin requests