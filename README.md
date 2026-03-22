# Gushwork Assignment - Premium Tech Store

A fully responsive, highly innovative E-commerce product landing page for **SonicPro Wireless Headphones**. 
Built entirely with **Vanilla HTML, CSS, and JavaScript** (Zero frameworks or external libraries).

## 🌟 Key Features Implemented

- **Sticky Auto-Hiding Navbar**: Disappears when scrolling down, reappears exactly when needed past the first fold, equipped with mini-cart and quick add-to-cart actions.
- **Interactive Hover Zoom Gallery**: Custom JavaScript tracking engine that calculates relative mouse coordinates to simulate a premium magnifying glass effect over product images.
- **Dynamic Shopping Cart Sidebar**: A slide-out cart overlay that tracks your selections, calculates realtime totals, and persists sessions utilizing `localStorage`.
- **Dark Mode Engine**: A seamless Light/Dark theme toggle instantly adapting all CSS variables and inverted image treatments.
- **"Anatomy of Sound" Hotspots**: Revolutionary pulsing CSS hotspots mapped over the headphone architecture that reveal interactive tooltips.
- **Awwwards-Style Micro-Interactions**: 
  - Custom trailing-dot mouse cursor that inverts upon hovering clickable elements.
  - Page-loading splash mask sequence.
  - Intersection Observer API creating fade-in staggered animations as you scroll down the layout.
- **Fully Responsive Architecture**: Grid and Flexbox layers scaling natively from narrow mobile displays up to ultra-wide desktop monitors.

## 🚀 How to Run the Code

Because this project is built entirely on native web standards without any node-modules or bundlers, running the code is incredibly simple!

### Method 1: Direct File Execution (Easiest)
1. Download or clone this repository to your local machine.
2. Navigate into the project folder.
3. Simply double-click on `index.html` to open it in your default web browser (Chrome, Edge, Safari, Firefox).
4. The site will run perfectly!

### Method 2: Local Server (For Development)
If you have Python or Node installed and want to run it via localhost (recommended if modifying CORS or fetching local JSON data in the future):
- **Using Node:** Run `npx serve` in the project directory.
- **Using Python:** Run `python -m http.server 8000` or `python3 -m http.server 8000`.
- Then open your browser and navigate to `http://localhost:8000` (or the port specified).

## 📁 File Structure

- `index.html`: The main semantic structural document, containing breadcrumbs, tab panels, and grid containers.
- `styles.css`: All layout directives, fully declared CSS Custom Properties (Variables), dark mode overrides, and keyframe animations.
- `script.js`: Contains no-dependency Vanilla JS modules handling custom scroll observers, cart persistence, zoom mapping formulas, and cursor tracking.

## 🛠 Required Technologies
None! This project relies solely on the DOM API and native browser rendering engines. No `npm install` needed.
