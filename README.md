# LittlePallet - Frontend

LittlePallet is a collaborative application for creating and managing highly configurable lists, with customizable fields, data types, and interface controls. This repository contains the frontend, focused on providing a fluid and responsive experience to create, manage, share, and view lists.

## 🚀 Features

- **Collaborative Management**: Create, edit, and share lists with other users easily.
- **Access and Role Management**: Update roles, permissions, and remove users from shared lists directly.
- **Interactive Interface**: Agile user experience (UX) and real-time interfaces thanks to the implementation of optimistic updates (Optimistic UI) for an instant feel, handling race conditions and input hydration.
- **Dynamic Tables**: Column sorting and customized views for effective management of data tables (`TableList`).
- **Responsive Design**: Modern and mobile-friendly interface using Tailwind CSS.

## 🛠️ Technologies and Dependencies

- **Core Framework**: [React 18](https://reactjs.org/) (Create React App)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **HTTP Requests and Async State**: [React Query v5 (TanStack)](https://tanstack.com/query/latest) along with `axios`.
- **Styles and Design**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components & Gestures**: [@headlessui/react](https://headlessui.com/) and [@heroicons/react](https://heroicons.com/) for accessible components and unified iconography.
- **Utilities**: `clsx` (conditional CSS classes) and `lodash`.

## 📦 Installation and Usage

Make sure to have [Node.js](https://nodejs.org/) (v16 or higher is recommended) installed in your local environment.

1. **Clone the repository:**
   ```bash
   git clone git@github.com:jcbp/littlepallet-frontend.git
   cd littlepallet-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run in Development environment:**
   ```bash
   npm start
   ```
   The application will run in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload automatically when saving changes.

## ⚙️ Available Commands

- `npm start`: Starts the local development server.
- `npm test`: Runs the interactive test environment (Jest).
- `npm run build`: Compiles the application optimized for production inside the `build` folder.
- `npm run deploy`: Pushes the temporary branch to `gh-pages` for a quick deployment, pre-configured in `package.json`.

## 📝 For Developers

- **Requests and API Integration**: Calls to endpoints should be handled with `react-query` and its Hooks to automate caching, temporary loading states, and maintain consistency.
- **Optimistic Updates (Optimistic UI)**: If you are working on views like "Share List Modal" (`ShareListModal`), always prioritize fast visual updates locally (`onMutate`) performing a rollback if an error occurs, instead of blocking the user waiting for HTTP response.
- **Visual Standards**: Exclusively use Tailwind CSS utility classes for styling. Functions like `clsx` are used to conditionally group styles. Base accessible components from Headless UI should be used for dialogs (modals), transitions, dropdowns, etc.
