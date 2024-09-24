# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

# Used method
To get started with a React project using Yarn, TypeScript, Tailwind CSS, Vite, and a folder structure for routes, follow these steps:

### Step 1: Create a New Vite Project

1. Open your terminal.
2. Run the following command to create a new Vite project:

   ```bash
   yarn create vite my-react-app --template react-ts
   ```

   Replace `my-react-app` with your desired project name.

3. Change into your project directory:

   ```bash
   cd my-react-app
   ```

### Step 2: Install Tailwind CSS

1. Install Tailwind CSS and its peer dependencies:

   ```bash
   yarn add -D tailwindcss postcss autoprefixer
   ```

2. Initialize Tailwind CSS:

   ```bash
   npx tailwindcss init -p
   ```

3. Configure your `tailwind.config.js` file:

   ```javascript
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

4. Add the Tailwind directives to your CSS. Open `src/index.css` (or create it if it doesn’t exist) and add:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

### Step 3: Set Up React Router

1. Install React Router:

   ```bash
   yarn add react-router-dom
   ```

### Step 4: Set Up the Folder Structure

1. Create a `routes` folder inside `src`:

   ```bash
   mkdir src/routes
   ```

2. Inside `src/routes`, create a couple of route components. For example, create `Home.tsx` and `About.tsx`:

   **src/routes/Home.tsx**

   ```tsx
   import React from 'react';

   const Home: React.FC = () => {
     return <h1 className="text-2xl">Home Page</h1>;
   };

   export default Home;
   ```

   **src/routes/About.tsx**

   ```tsx
   import React from 'react';

   const About: React.FC = () => {
     return <h1 className="text-2xl">About Page</h1>;
   };

   export default About;
   ```

### Step 5: Set Up Routing in Your App

1. Modify `src/App.tsx` to set up the router:

   ```tsx
   import React from 'react';
   import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
   import Home from './routes/Home';
   import About from './routes/About';
   import './index.css'; // Ensure your styles are imported

   const App: React.FC = () => {
     return (
       <Router>
         <nav>
           <Link to="/" className="p-2">Home</Link>
           <Link to="/about" className="p-2">About</Link>
         </nav>
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/about" element={<About />} />
         </Routes>
       </Router>
     );
   };

   export default App;
   ```

### Step 6: Start the Development Server

1. Now that everything is set up, start your development server:

   ```bash
   yarn dev
   ```
