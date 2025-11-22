# Bounty - Multi-Step Form Application

A modern, responsive web application built with React, TypeScript, and Vite that implements a multi-step form workflow for creating bounties.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Folder Structure Details](#folder-structure-details)
- [Component Documentation](#component-documentation)
- [Form Validation](#form-validation)
- [Routing](#routing)
- [State Management](#state-management)
- [UI Components](#ui-components)
- [Responsive Design](#responsive-design)

## Features

- Multi-step form workflow with validation
- Responsive design with mobile-first approach
- Interactive sidebar navigation
- Form state management with React Context API
- Client-side form validation with Zod
- Modern UI components using shadcn/ui
- Dark mode support
- Toast notifications
- Responsive grid layout
- Mobile hamburger menu for sidebar navigation

## Technology Stack

### Core Technologies

- **React 18** - Component-based UI library
- **TypeScript** - Typed superset of JavaScript
- **Vite** - Next-generation frontend tooling
- **React Router v6** - Declarative routing for React
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Reusable component library

### Key Dependencies

- **Zod** - TypeScript-first schema declaration and validation
- **React Hook Form** - Performant, flexible forms with easy validation
- **@tanstack/react-query** - Powerful asynchronous state management
- **Lucide React** - Beautiful & consistent icon toolkit
- **Sonner** - Minimal toast notifications
- **Recharts** - Charting library built with D3
- **Date-fns** - Modern JavaScript date utility library

### Development Dependencies

- **ESLint** - Pluggable JavaScript linter
- **Prettier** - Opinionated code formatter
- **TypeScript ESLint** - ESLint parser for TypeScript
- **PostCSS** - CSS processing platform
- **Autoprefixer** - Parse CSS and add vendor prefixes

## Architecture

The application follows a component-based architecture with a clear separation of concerns:

1. **Pages** - Route-level components that represent individual steps
2. **Components** - Reusable UI components
3. **Context** - Application state management
4. **Hooks** - Custom React hooks
5. **Utils** - Utility functions and helpers
6. **Lib** - Shared library functions

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── NavLink.tsx      # Navigation link component
│   ├── Sidebar.tsx      # Multi-step form sidebar
│   └── StepNavigation.tsx # Step navigation controls
├── context/
│   └── FormContext.tsx  # Form state management
├── hooks/
│   ├── use-mobile.tsx   # Mobile detection hook
│   └── use-toast.ts     # Toast notification hook
├── lib/
│   └── utils.ts         # Utility functions
├── pages/
│   ├── Confirmation.tsx # Confirmation page
│   ├── Index.tsx        # Entry point
│   ├── NotFound.tsx     # 404 page
│   ├── Result.tsx       # Results page
│   ├── Step1Basics.tsx  # Step 1 form
│   ├── Step2Rewards.tsx # Step 2 form
│   ├── Step2RewardsTimeline.tsx # Step 2 timeline
│   └── Step3Backer.tsx  # Step 3 form
├── utils/
│   ├── generatePayload.ts # Form data serialization
│   └── validation.ts    # Form validation schemas
├── App.css              # Global styles
├── App.tsx              # Main application component
├── index.css            # Base styles
├── main.tsx             # Application entry point
└── vite-env.d.ts        # Vite environment types
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sathishnaik786/bounty.git
   ```

2. Navigate to the project directory:
   ```bash
   cd bounty
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser to `http://localhost:8080`

## Development Workflow

1. Create a feature branch from `master`
2. Implement your changes
3. Run tests and linting
4. Commit your changes with conventional commit messages
5. Push to GitHub
6. Create a pull request to `master`

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the production-ready application
- `npm run build:dev` - Builds the development version
- `npm run lint` - Runs ESLint to check for code issues
- `npm run preview` - Previews the production build locally

## Deployment

### Production Build

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deployment Options

1. **Vercel** (Recommended)
   - Connect your GitHub repository
   - Vercel will automatically detect the Vite project
   - Set output directory to `dist/`

2. **Netlify**
   - Connect your GitHub repository
   - Set build command to `npm run build`
   - Set publish directory to `dist/`

3. **GitHub Pages**
   - Install `gh-pages` package
   - Add deployment script to `package.json`
   - Run deployment script

## Folder Structure Details

### Components

Located in `src/components/`, this directory contains reusable UI components:

- `ui/` - All shadcn/ui components
- `Sidebar.tsx` - Multi-step navigation sidebar with responsive design
- `StepNavigation.tsx` - Navigation controls between form steps
- `NavLink.tsx` - Styled navigation link component

### Context

Located in `src/context/`, this directory contains React Context providers:

- `FormContext.tsx` - Centralized form state management across all steps

### Hooks

Located in `src/hooks/`, this directory contains custom React hooks:

- `use-mobile.tsx` - Detects mobile viewport
- `use-toast.ts` - Toast notification system

### Pages

Located in `src/pages/`, this directory contains route-level components:

- `Step1Basics.tsx` - Basic details form (name, description, category)
- `Step2Rewards.tsx` - Rewards configuration
- `Step2RewardsTimeline.tsx` - Timeline configuration
- `Step3Backer.tsx` - Backer information form
- `Confirmation.tsx` - Confirmation page
- `Result.tsx` - Results display
- `NotFound.tsx` - 404 error page

### Utils

Located in `src/utils/`, this directory contains utility functions:

- `validation.ts` - Zod validation schemas for each form step
- `generatePayload.ts` - Form data serialization for submission

## Component Documentation

### Sidebar Component

The sidebar component provides navigation between form steps with visual indicators of completion status. It features:

- Responsive design with mobile hamburger menu
- Step completion indicators
- Navigation validation
- Current step highlighting

### Form Components

Each form step implements:

- React Hook Form for form state management
- Zod validation schemas
- Custom UI components from shadcn/ui
- Responsive layout design

## Form Validation

Form validation is implemented using Zod schemas in `src/utils/validation.ts`:

- Step 1: Basic details validation
- Step 2: Rewards and timeline validation
- Step 3: Backer information validation

Validation occurs on form submission and prevents navigation to incomplete steps.

## Routing

The application uses React Router v6 for client-side routing:

- `/` - Redirects to Step 1
- `/step/1` - Basic details form
- `/step/2` - Rewards and timeline form
- `/step/3` - Backer information form
- `/confirmation` - Confirmation page
- `/result` - Results page
- `/*` - 404 Not Found page

## State Management

Form state is managed using React Context API in `src/context/FormContext.tsx`:

- Centralized state for all form steps
- Navigation validation logic
- Data persistence across steps
- Form reset functionality

## UI Components

The application uses shadcn/ui components for consistent UI:

- Form controls (Input, Textarea, Select, etc.)
- Layout components (Card, Separator, etc.)
- Feedback components (Toast, Alert, etc.)
- Navigation components (Button, etc.)

## Responsive Design

The application is fully responsive with:

- Mobile-first approach
- Responsive grid layout
- Hamburger menu for mobile navigation
- Adaptive component sizing
- Touch-friendly controls

The sidebar transforms from a side navigation on desktop to a hamburger menu on mobile devices.
