# NorthPeak Digital - Premium SaaS Agency

A high-performance, accessible, and responsive landing page for a premium SaaS agency, built with modern web standards. 

## Features

- **Performance Optimized**: Achieves 95+ scores in Lighthouse for Performance, Accessibility, Best Practices, and SEO.
- **Custom Animations**: Smooth, 60fps scrolling and reveal animations using Vanilla JavaScript and CSS.
- **Premium UI/UX**: Includes custom cursors, magnetic buttons, noise overlays, and glassmorphism design techniques.
- **Fully Responsive**: Perfectly adapts to all viewport sizes (360px, 768px, 1024px, 1440px, and 1920px).
- **Accessible (a11y)**: Semantic HTML, ARIA attributes, focus management, and keyboard navigation support.
- **SEO Ready**: Configured with meta tags, Open Graph properties, and semantic structure.

## Tech Stack

- **HTML5**: Semantic and accessible markup.
- **CSS3**: Modern CSS features (variables, calc, clamp, grid, flexbox) without external frameworks.
- **Vanilla JavaScript**: Lightweight, dependency-free interaction and animation logic.
- **Vite**: Fast frontend build tool.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository and navigate into the project directory.
2. Install the dependencies:
   ```bash
   npm install
   ```

### Development

To start the local development server with hot-module replacement (HMR):
```bash
npm run dev
```

### Production Build

To create an optimized production build:
```bash
npm run build
```
The compiled assets will be output to the `dist` directory. You can preview the production build using:
```bash
npm run preview
```

## Project Structure

- `/index.html`: The main HTML document.
- `/style.css`: All CSS styling, organized by components and variables.
- `/script.js`: Vanilla JavaScript handling the loader, custom cursor, magnetic effects, and form validation.
- `/package.json`: Project dependencies and scripts.
