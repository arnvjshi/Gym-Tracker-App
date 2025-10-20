# Gym Tracker Pro - Production Build Guide

## 🚀 Build APK for Production

This guide will help you build a production-ready APK for your Gym Tracker app.

### Prerequisites

1. **Install EAS CLI globally:**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo:**
   ```bash
   eas login
   ```

3. **Configure the project:**
   ```bash
   eas build:configure
   ```

### Building the APK

#### Option 1: Cloud Build (Recommended)
Build the APK on Expo's servers:

```bash
npm run build:android
```

Or directly:
```bash
eas build --platform android --profile production
```

#### Option 2: Local Build
Build the APK on your local machine:

```bash
npm run build:android:local
```

Or directly:
```bash
eas build --platform android --profile production --local
```

### Download the APK

After the build completes:
1. You'll receive a download link in the terminal
2. Or visit: https://expo.dev/accounts/[your-username]/projects/gym-tracker-app/builds
3. Download the APK file
4. Transfer to your Android device and install

### Testing the APK

1. Enable "Install from Unknown Sources" on your Android device
2. Transfer the APK file to your device
3. Open the file manager and tap on the APK
4. Follow the installation prompts
5. Launch "Gym Tracker Pro" from your app drawer

### Build Profiles

- **development**: For testing with development client
- **preview**: For internal testing (generates APK)
- **production**: For production release (generates APK)

### Troubleshooting

#### Build Fails
- Ensure all dependencies are installed: `npm install`
- Clear cache: `npx expo start -c`
- Check for TypeScript errors: `npm run typecheck`

#### APK Installation Issues
- Verify the APK is not corrupted (re-download if necessary)
- Check Android version compatibility (min SDK 21)
- Ensure sufficient storage space on device

### App Features

✅ Interactive animated background
✅ Weight tracking with charts
✅ Exercise logging with muscle groups
✅ Personal records tracking
✅ BMI calculator
✅ Data export/import
✅ Dark theme optimized
✅ Offline-first architecture

### Version Information

- **Version**: 1.0.0
- **Package**: com.arnvjshi.gymtrackerapp
- **Min Android**: 5.0 (API 21)
- **Target Android**: Latest

---

## 📱 Quick Build Command

For fastest APK generation:

```bash
eas build --platform android --profile preview
```

This creates an APK suitable for testing on any Android device.

Enjoy your Gym Tracker Pro! 💪
