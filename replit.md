# Zyon Galicia - Professional Boat Website

## Overview

This project is a modern React website for Zyon Galicia, a professional boat company specializing in speedboats, work vessels, and pangas in Galicia, Spain. The application is built as a full-stack solution with a React frontend and Express backend, designed to showcase the company's services, boat catalog, and provide customer contact functionality.

The website features a clean, professional design with Zyon Galicia's corporate orange color scheme (#F27C38, #F26D3D, #F29979) and neutral grays (#F2F2F2, #595959). It includes modern UI elements like smooth animations, responsive design, dark/light theme support, and multilingual capabilities (Spanish, English, French).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Shadcn/ui component library built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom CSS variables for Zyon Galicia brand colors and theming
- **State Management**: React Context for theme and language state, TanStack Query for server state
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Internationalization**: react-i18next for Spanish, English, and French language support

### Backend Architecture
- **Runtime**: Node.js with Express framework
- **Language**: TypeScript with ES modules
- **Database Integration**: Drizzle ORM configured for PostgreSQL with schema-first approach
- **Storage Layer**: Abstracted storage interface with in-memory implementation (MemStorage) for development
- **API Design**: RESTful API structure with `/api` prefix for all backend routes
- **Development**: Hot-reload setup with Vite middleware integration for seamless development experience

### Database Schema
- **Users Table**: Basic user management with id, username, and password fields
- **Contact Messages Table**: Customer inquiry storage with name, email, phone, subject, message, and timestamp
- **Schema Validation**: Zod schemas for runtime validation and type inference from database schema
- **Migration Support**: Drizzle Kit for database migrations and schema management

### UI/UX Design Patterns
- **Component Architecture**: Modular component structure with reusable UI primitives
- **Responsive Design**: Mobile-first approach with responsive layouts and navigation
- **Theme System**: Comprehensive light/dark mode support with CSS custom properties
- **Animation Strategy**: Smooth transitions and hover effects for enhanced user experience
- **Accessibility**: ARIA-compliant components from Radix UI foundation

### Development Environment
- **Hot Reload**: Vite development server with Express middleware integration
- **Type Checking**: TypeScript strict mode with path mapping for clean imports
- **Code Quality**: ESLint and Prettier integration (implied by typical setup)
- **Error Handling**: Custom error boundaries and runtime error overlays for development

## External Dependencies

### Core Framework Dependencies
- **@vitejs/plugin-react**: React support for Vite build tool
- **wouter**: Lightweight routing library for single-page application navigation
- **@tanstack/react-query**: Server state management and data fetching

### Database & Backend
- **drizzle-orm**: Type-safe SQL query builder and ORM
- **drizzle-kit**: Database migration and schema management toolkit
- **@neondatabase/serverless**: PostgreSQL serverless database driver
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI Component Library
- **@radix-ui/react-***: Comprehensive set of accessible, unstyled UI primitives including:
  - Form controls (Dialog, Select, Checkbox, etc.)
  - Navigation (Dropdown Menu, Navigation Menu)
  - Feedback (Toast, Alert Dialog, Progress)
  - Layout (Accordion, Tabs, Collapsible)

### Styling & Design
- **tailwindcss**: Utility-first CSS framework for rapid UI development
- **class-variance-authority**: Utility for creating component variants with Tailwind
- **clsx**: Utility for constructing className strings conditionally

### Form Handling & Validation
- **react-hook-form**: Performant forms with easy validation
- **@hookform/resolvers**: Validation resolvers for various schema libraries
- **zod**: TypeScript-first schema validation library
- **drizzle-zod**: Integration between Drizzle ORM and Zod validation

### Internationalization
- **react-i18next**: React integration for i18next internationalization framework
- **i18next**: Core internationalization library supporting multiple languages

### Development Tools
- **typescript**: Static type checking for JavaScript
- **@types/node**: TypeScript definitions for Node.js
- **esbuild**: Fast JavaScript bundler for production builds
- **tsx**: TypeScript execution environment for development

### Specialized Components
- **cmdk**: Command palette component for enhanced user interactions
- **embla-carousel-react**: Carousel/slider component for image galleries
- **date-fns**: Modern JavaScript date utility library
- **react-helmet**: Document head management for SEO and meta tags

### Replit Integration
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit-specific development tooling

The architecture follows a modern full-stack pattern with clear separation between frontend and backend concerns, type safety throughout the application, and a focus on developer experience and maintainability.