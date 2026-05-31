# WanderLog - Travel Bucket List Application

WanderLog is a production-ready travel bucket-list application built with React. It allows users to explore countries from around the world, track their travel goals, and manage their visited destinations.

## 🚀 Features

- **Authentication Module**: Secure Login and Registration using ReqRes API.
- **Country Explorer**: Explore over 250 countries with real-time search, filtering, and sorting.
- **Detailed Country Information**: Deep dive into country data including demographics, geography, languages, and more.
- **Bucket List Management**: Add/remove countries you wish to visit.
- **Travel Tracker**: Mark countries as visited and track your global coverage.
- **Interactive Dashboard**: Modern, responsive UI with glassmorphism effects and smooth animations.
- **Dark Mode Support**: Seamlessly switch between light and dark themes.
- **Persistent Storage**: Your session and travel data are saved across refreshes.
- **Performance Optimized**: Uses lazy loading, code splitting, and memoization for a fast experience.

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API Client**: Axios
- **State Management**: React Context API
- **Persistence**: LocalStorage API

## 📂 Folder Structure

```text
src/
├── api/          # API integration modules
├── components/   # Reusable UI components
├── contexts/     # Global state management
├── hooks/        # Custom React hooks
├── pages/        # Application pages/views
├── routes/       # Routing configuration
├── utils/        # Constants, helpers, and storage utilities
├── App.jsx       # Root component
└── main.jsx      # Entry point
```

## ⚙️ Installation & Setup

1. **Clone the repository** (or extract the files).
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   ```
4. **Build for production**:
   ```bash
   npm run build
   ```

## 🔑 Test Credentials

For testing purposes, you can use the following credentials (provided by ReqRes):

- **Email**: `eve.holt@reqres.in`
- **Password**: `any-password` (e.g., `cityslicka` or `pistol`)

## 📡 API Information

- **Authentication**: [ReqRes.in](https://reqres.in/)
- **Countries Data**: [RestCountries.com](https://restcountries.com/)

## 🔮 Future Improvements

- [ ] Interactive World Map for visualization.
- [ ] User profile customization (avatar, bio).
- [ ] Social features (share travel stats).
- [ ] Photo gallery for visited countries.
- [ ] Travel notes and journals.

---
Built with ❤️ for travelers by Senior React Architect.
