# Gym Tracker (Expo + TypeScript)

A simple Expo app to learn React Native + Expo by building a gym tracker:
- Track daily weight with a chart
- Save height in profile
- Log exercises and filter by muscle group

## Quick start (Windows / PowerShell)

1) Install prerequisites
- Node.js 18+ and npm
- Expo CLI (optional; we use npx)

2) Install deps

```pwsh
npm install
```

3) Start the dev server

```pwsh
npm run start
```

- Press `w` to open web, or scan the QR with Expo Go on your phone.
- For Android: connect a device or start an emulator, then press `a`.

## Project structure

- `app/` — Expo Router pages (tabs):
  - `index.tsx` Dashboard with weight chart
  - `weigh-in.tsx` Add/view weight entries
  - `exercises.tsx` Log and filter exercises by muscle group
  - `profile.tsx` Set your height
- `src/store/useStore.ts` — Zustand store persisted to AsyncStorage
- `src/ui/WeightChart.tsx` — Victory Native chart
- `src/types.ts` — App types

## Notes
- Data is stored locally on the device with AsyncStorage.
- You can customize muscle groups, UI colors, and chart behavior.
- If you want app icons/splash, add files to `assets/` and re-add these fields in `app.json`:
  - `icon`, `splash.image`, `android.adaptiveIcon.foregroundImage`, `web.favicon`. Remove them or point to existing files to avoid bundling errors.

## Next ideas
- BMI calculation from height + latest weight
- Exercise templates and timers
- Export/import data (JSON)