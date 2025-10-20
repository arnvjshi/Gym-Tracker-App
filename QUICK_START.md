# 🚀 Quick Start - Build Your APK in 3 Steps

## Prerequisites Check

Make sure you have:
- ✅ Node.js installed (v20.17.0 or higher)
- ✅ npm or yarn installed
- ✅ Internet connection
- ✅ Expo account (free - create at expo.dev)

## Step 1: Install EAS CLI

Open PowerShell/Terminal and run:

```bash
npm install -g eas-cli
```

## Step 2: Login to Expo

```bash
eas login
```

If you don't have an account:
1. Visit https://expo.dev
2. Sign up for free
3. Come back and run `eas login` again

## Step 3: Build Your APK

Choose one of these commands:

### Option A: Preview Build (Fastest - Recommended for First Build)
```bash
eas build --platform android --profile preview
```

### Option B: Production Build
```bash
eas build --platform android --profile production
```

### Option C: Using npm script
```bash
npm run build:android
```

## What Happens Next?

1. **Build Queue**: Your build enters Expo's build queue
2. **Build Time**: Takes approximately 5-10 minutes
3. **Download Link**: You'll receive a download link when complete
4. **APK File**: Download the APK to your computer

## Installing the APK

### On Your Android Device:

1. **Transfer APK**: 
   - Email it to yourself, or
   - Use Google Drive, Dropbox, etc., or
   - Direct download from the link on your phone

2. **Enable Unknown Sources**:
   - Settings → Security → Unknown Sources (enable)
   - Or Settings → Apps → Special Access → Install Unknown Apps

3. **Install**:
   - Open the APK file
   - Tap "Install"
   - Tap "Open" when done

4. **Launch**:
   - Find "Gym Tracker Pro" in your app drawer
   - Start using it!

## Troubleshooting

### "eas: command not found"
```bash
npm install -g eas-cli
```
Then try again.

### "Not logged in"
```bash
eas login
```
Enter your Expo credentials.

### Build fails with errors
1. Make sure dependencies are installed:
   ```bash
   cd D:\Codes\Gym-Tracker-App
   npm install --legacy-peer-deps
   ```

2. Clear cache and try again:
   ```bash
   npx expo start -c
   ```

3. Check for TypeScript errors:
   ```bash
   npm run typecheck
   ```

### Can't install APK on phone
- Make sure "Install from Unknown Sources" is enabled
- Check if you have enough storage space
- Try downloading the APK again (might be corrupted)
- Ensure Android version is 5.0 or higher

## Alternative: Local Build

If you want to build locally (requires Android SDK):

```bash
eas build --platform android --profile preview --local
```

**Note**: Local builds require:
- Android Studio installed
- Android SDK configured
- ~10GB of disk space
- More setup time

Cloud builds are recommended for most users!

## Build Status

You can check your build status at:
```
https://expo.dev
```

1. Login to your account
2. Go to Projects
3. Find "gym-tracker-app"
4. Click on "Builds"
5. See build progress and download links

## What's in the APK?

Your APK includes:
- ✅ All app features
- ✅ Animated background
- ✅ Weight tracking
- ✅ Exercise logging
- ✅ Personal records
- ✅ BMI calculator
- ✅ Data export
- ✅ Offline functionality
- ✅ No ads or tracking

## App Info

- **Name**: Gym Tracker Pro
- **Version**: 1.0.0
- **Package**: com.arnvjshi.gymtrackerapp
- **Size**: ~30-50 MB
- **Min Android**: 5.0 (API 21)
- **Permissions**: None required

## Tips

1. **First Build Takes Longer**: Subsequent builds are faster
2. **Keep Terminal Open**: Don't close until build completes
3. **Check Email**: Expo sends build notifications
4. **Save APK**: Keep a copy on your computer for easy reinstall

## Support

If you encounter issues:
1. Check [BUILD_GUIDE.md](./BUILD_GUIDE.md) for detailed instructions
2. Visit Expo documentation: https://docs.expo.dev
3. Check Expo forums: https://forums.expo.dev

---

## Summary

```bash
# Three commands to get your APK:
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```

That's it! 🎉

Your production-ready gym tracking app will be built in ~10 minutes and ready to install on any Android device.

---

**Happy Tracking! 💪**
