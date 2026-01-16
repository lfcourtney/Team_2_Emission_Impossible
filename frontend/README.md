# Dashboard Frontend

This is the interactive frontend for the Emissions tool. It's built to be fast, modern, and demonstrate "GreenOps" concepts with live visualizations.

## 🚀 Tech Stack

### Core Framework
*   **Vite**: The build tool. It makes the dev server instant and the production build tiny.
*   **React 19**: The UI library. We're using functional components and Hooks (`useState`, `useEffect`, `useMemo`).

### Styling & UI
*   **Tailwind CSS 4**: For CSS Styling.
*   **Lucide React**: Icon set used across the Front-End.
*   **Framer Motion**: Handles animations used to keep the dashboard feeling dynamic.

### Data & Visualization
*   **Recharts**: The charting library. Used for the real-time "Emissions vs. Prediction" area chart. It handles the gradients and tooltips.
*   **Mock Data Pattern**: Currently, data is simulated in `src/data/mockData.js` to demonstrate the UI before the backend is ready.

## 🛠️ Key Features

1.  **Dashboard**: A responsive grid layout with KPI cards and charts.
2.  **Simulator Panel**: A sidebar that lets you toggle GreenOps levers (Time Shifting, Region Shifting) and see the immediate impact on the charts.
3.  **Live Data Feed**: The dashboard simulates real-time data jitter to look like a live control center.
4.  **Dark Mode**: Fully supported via Tailwind (check `index.css` and system preferences).

## 📦 Install & Run

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev
```

Then open `http://localhost:5173`.
