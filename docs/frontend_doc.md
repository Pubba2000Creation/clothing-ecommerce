# Frontend Documentation - Clothing E-Commerce

## 1. Overview
The frontend is built using **React** and **Vite**, providing a fast and responsive user experience for the e-commerce platform.

## 2. Technology Stack
- **Framework:** React 19.2.0
- **Build Tool:** Vite 7.2.4
- **Routing:** React Router DOM 7.12.0
- **HTTP Client:** Axios (for API communication)
- **Styling:** Vanilla CSS (Modular approach)
- **State Management:** React Context API (Auth and Cart Management)

## 3. Project Structure
The project follows a standard React structure with a clear separation of concerns:
- `/src/pages`: Individual page components (Home, Products, Login, etc.)
- `/src/components`: Reusable UI components (Navbar, Footer, Product Cards)
- `/src/context`: Global state providers for Authentication and Shopping Cart.
- `/src/styles`: CSS files for styling pages and components.
- `/src/api`: Shared API utility functions.

## 4. Key Features
- **User Authentication:** Login and Registration with persistent session handling via Context.
- **Product Catalog:** Browsing products with filtering (category, size) and search capability.
- **Product Details:** Detailed view of products with size selection.
- **Shopping Cart:** Add, remove, and update quantities of items in the cart.
- **Checkout Flow:** Multi-step checkout process with order summary.
- **Order History:** Authenticated users can view their past orders.

## 5. Main Components & Hubs
- **App.jsx:** Main entry point handling routing.
- **AuthContext.jsx:** Manages user login state and JWT tokens.
- **CartContext.jsx:** Manages cart persistence and calculations.
- **Home.jsx:** Primary landing page with featured sections.
- **Products.jsx:** Main shopping interface.
