# Gym Tracker

A modern React Native fitness tracking app built with Expo, featuring weight tracking with interactive charts, exercise logging with muscle group filtering, and persistent local storage.

## ✨ Features

- 📊 **Weight Tracking** - Log daily weight with interactive Victory Native charts
- 💪 **Exercise Logger** - Track workouts by muscle group (Chest, Back, Shoulders, Arms, Legs, Core, Full Body)
- 📱 **Responsive UI** - Dark theme optimized for mobile and web
- 💾 **Persistent Storage** - Data saved locally with AsyncStorage
- 🧭 **File-based Routing** - Powered by Expo Router

## 🛠 Tech Stack

- **Framework**: Expo SDK 54
- **Language**: TypeScript
- **UI**: React Native + React Native Web
- **State Management**: Zustand (with persistence)
- **Routing**: Expo Router (file-based)
- **Charts**: Victory Native
- **Storage**: AsyncStorage

## 📋 Prerequisites

- **Node.js**: >= 20.19.4 (required for React Native 0.81)
- **npm**: >= 10.0.0
- **For mobile**: Android Studio or Xcode (for development builds)

## 🚀 Quick Start

### 1. Install Dependencies

```powershell
npm install
```

### 2. Start Development Server

```powershell
npm start
```

### 3. Run on Your Platform

#### Web
```powershell
npm run web
# Or press 'w' in the terminal
```

#### Android (Development Build Required)
```powershell
npm run android
```

#### iOS (Development Build Required)
```powershell
npm run ios
```

> **Note**: Expo SDK 54 requires a development build and cannot run in standard Expo Go. Use `expo run:android` or `expo run:ios` to build and run.

## 📁 Project Structure

```
gym-tracker-app/
├── app/                    # Expo Router pages (file-based routing)
│   ├── _layout.tsx        # Root layout with tabs navigation
│   ├── index.tsx          # Dashboard with weight chart
│   ├── weigh-in.tsx       # Weight entry form and history
│   ├── exercises.tsx      # Exercise logger with muscle group filter
│   └── profile.tsx        # User profile (height settings)
├── src/
│   ├── store/
│   │   └── useStore.ts    # Zustand store with AsyncStorage persistence
│   ├── ui/
│   │   └── WeightChart.tsx # Victory Native chart component
│   ├── utils/
│   │   └── uid.ts         # Unique ID generator
│   └── types.ts           # TypeScript type definitions
├── assets/                # Static assets (icons, splash, etc.)
└── app.json              # Expo configuration
```

## 🎨 Features in Detail

### Dashboard (`app/index.tsx`)
- Latest weight display
- Total entries count
- Interactive line chart of weight progress over time

### Weigh-In (`app/weigh-in.tsx`)
- Add new weight entries with current date
- View history of all weight entries
- Delete individual entries

### Exercises (`app/exercises.tsx`)
- Log exercises with: name, sets, reps, weight
- Filter by muscle group
- View recent exercises by selected muscle group
- Delete exercise logs

### Profile (`app/profile.tsx`)
- Set and update height (cm)
- Persistent across sessions

## 🔧 Configuration

### Environment
The app uses Expo SDK 54 with React Native 0.81. Key dependencies:

```json
{
  "expo": "~54.0.0",
  "react": "19.1.0",
  "react-native": "0.81.4",
  "expo-router": "~6.0.12"
}
```

### Styling
- Dark theme with consistent color palette
- Colors: `#0f172a`, `#111827`, `#22c55e`, `#e5e7eb`, `#9ca3af`

## 📝 Scripts

```powershell
npm start          # Start Expo dev server
npm run android    # Build and run on Android
npm run ios        # Build and run on iOS
npm run web        # Start web development server
npm run typecheck  # Run TypeScript type checking
```

## 🐛 Troubleshooting

### "Project is incompatible with Expo Go"
- **Solution**: Expo SDK 54 requires a development build. Run `npm run android` or `npm run ios` instead of using Expo Go.

### Node.js Version Warning
- **Issue**: React Native 0.81 requires Node.js >= 20.19.4
- **Solution**: Update Node.js to the latest LTS version

### Build Errors
- Try clearing cache: `npx expo start --clear`
- Clean install: `Remove-Item -Recurse -Force node_modules, package-lock.json; npm install`

## 🎯 Roadmap

- [ ] BMI calculation from height + latest weight
- [ ] Exercise templates and workout routines
- [ ] Timer for rest periods
- [ ] Export/import data (JSON/CSV)
- [ ] Progress photos
- [ ] Goal setting and tracking
- [ ] Dark/light theme toggle
- [ ] Social sharing features

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Expo and React Native
