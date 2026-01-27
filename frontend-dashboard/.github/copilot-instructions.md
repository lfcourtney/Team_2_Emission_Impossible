# Carbon IQ Dashboard — AI Development Guide

## Project Overview
Carbon IQ is a single-page carbon emissions tracking dashboard built with **React + TypeScript + Tailwind CSS**. It simulates emissions reduction scenarios across 6 global locations, helping users explore trade-offs between renewable energy, building efficiency, and travel reduction.

**Architecture**: Monolithic React component (`App.tsx`, 994 lines) with embedded state management, no separate services or data layer yet.

## Core Data Model
- **Locations**: 6 hardcoded sites (Belfast, Dublin, London, Birmingham, Bengaluru, Sydney) with:
  - Geographic coordinates (for weather API and map projection)
  - `baselineCO2e`: annual emissions in kg
  - `confidence`: High/Medium/Low (data quality indicator)
  - `sourceSplit`: percentage breakdown across electricity, heating, transport (must sum to 100%)
- **Levers**: Three user-adjustable sliders (0–100%) controlling projected emissions reduction
- **Derived calculations**: Projections use a simple multiplicative model (see `projectedCO2e` memo)

## Key Technical Patterns

### State Management
- **Location selection**: `locationKey` drives cascading updates across UI (weather, recommendations, donut chart)
- **Reduction levers**: `renewables`, `efficiency`, `travel` (sliders) → `projectedCO2e` computed via `useMemo`
- **Computed values**: Never store derived data directly; use `useMemo` for delta calculations and action priorities

### Calculations & Business Logic
- **Emissions projection** (`projectedCO2e`):
  - Multiplies baseline by reduction factor: $0.3 \times r_{renewables} + 0.18 \times r_{efficiency} + 0.1 \times r_{travel}$
  - Caps total reduction at 70% (`Math.min(reduction, 0.7)`)
  - **To modify**: adjust multipliers in the projection formula or cap value; all downstream UI updates automatically
- **Recommended actions**:
  - Prioritized by potential impact (kg CO₂e headroom × lever weight)
  - Priority logic: High if source split ≥30/45/30%; de-escalates if improvement >25%
  - **When adding actions**: sort by `impactKg`, derive priority from thresholds in `recommendedActions` memo
- **Cap warnings**: Triggered when sliders exceed typical realistic ranges (renewables: 60%, efficiency: 40%, travel: 30%)

### UI Components
All components are functional, inline, no external libraries beyond React/Tailwind:
- **`Badge`**: Status indicator with tone-based styling (neutral/good/warn/bad)
- **`Button`**: Primary/secondary variants with green theme color (`#4a7d63`, stored in `SLIDER_COLOR`)
- **`SliderRow`**: Input row with range slider, dynamic gradient fill, percentage display
- **`DonutChart`**: SVG-based 100% stacked donut using strokeDasharray for segments
- **`weatherCodeToText`**: Enum-like mapping for Open-Meteo API codes

### Styling Conventions
- **Color scheme**: Dark theme (bg-slate-950/900, text-slate-100+), accent green (`#4a7d63`)
- **Spacing**: Tailwind utilities; rounded-xl is standard for cards
- **Responsive**: lg breakpoint for layout shift (sidebar on desktop, stacked on mobile)
- **Interactive**: Hover opacity changes, custom range input styles via inline `<style>` tags in SliderRow

## External Integrations
- **Weather API**: Open-Meteo (free, no key). Fetches current temperature, wind, weather code every 10 minutes.
  - **Error handling**: Sets `weatherStatus` to "error"; component degrades gracefully (shows "—")
  - **Cancellation**: `useEffect` cleanup cancels in-flight requests on unmount/location change
- **No backend**: Placeholder alerts for "Save scenario", "View assumptions", "Compare scenarios" — wire up to API later

## Common Modification Points

| Goal | Location | Pattern |
|------|----------|---------|
| Add new location | `LOCATIONS` array | Copy existing entry, update lat/lon, baselineCO2e, sourceSplit |
| Change reduction formula | `projectedCO2e` memo | Adjust multipliers (0.3, 0.18, 0.1) and cap (0.7) |
| Modify priority thresholds | `recommendedActions` memo | Change comparison operators in priority assignment logic |
| Update color scheme | `SLIDER_COLOR`, Tailwind classes | Search for #4a7d63 or tone-specific colors (emerald, sky, amber) |
| Add simulation actions | `recommendedActions.map()` Button onClick | Increment lever via `clamp(v + X, 0, 100)` |
| Hook API endpoints | Button onClick handlers, useEffect | Replace `alert()` stubs and `loadWeather` with real fetch calls |

## Testing & Validation
- **No test suite yet** — manually verify:
  - Sliders respect 0–100 bounds (use `clamp` utility)
  - Donut segments total 100% (sourceSplit constraint)
  - Recommended actions sort correctly (highest impact first)
  - Cap warnings trigger at threshold values
  - Weather loads and refreshes; gracefully handles network errors
- **Browser compatibility**: Relies on SVG, CSS Grid, Range input styling (Chrome/Firefox/Safari tested)

## Conventions for AI Agents
- **Component structure**: Single file, inline components top-to-bottom, export default function App at end
- **Naming**: camelCase for functions/variables, PascalCase for React components, CAPS_SNAKE_CASE for constants
- **Comments**: Minimal; code is self-documenting (component names clear, business logic in memos with inline labels)
- **Type safety**: Use TypeScript union types (`Confidence`, `LocationKey`, `ActionItem`) instead of strings
- **Avoid**: External UI libraries (use Tailwind), state management tools (keep local useState), separate backend (plan API seams, not implementation)

---

Last updated: 2026-01-26
