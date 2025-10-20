# 🚀 BUILD YOUR APK NOW - Copy & Paste Commands

## Step-by-Step Instructions

### Step 1: Install EAS CLI (One-time setup)

Open PowerShell and run:

```powershell
npm install -g eas-cli
```

Wait for installation to complete (takes ~1 minute).

---

### Step 2: Login to Expo

If you have an Expo account:

```powershell
eas login
```

If you DON'T have an account yet:

1. Visit: https://expo.dev
2. Click "Sign Up"
3. Create free account
4. Come back here
5. Run: `eas login`
6. Enter your credentials

---

### Step 3: Build Your APK

Copy and paste this command:

```powershell
eas build --platform android --profile preview
```

**What happens:**
1. EAS checks your project configuration ✅
2. Uploads your code to Expo servers ✅
3. Builds APK on their servers (~10 minutes) ✅
4. Provides download link ✅

**You'll see output like:**
```
✔ Using remote Android credentials
✔ Uploaded to Expo
✔ Building...
...
✔ Build completed!
   Download: https://expo.dev/artifacts/eas/[YOUR-BUILD-ID].apk
```

---

### Step 4: Download Your APK

When build completes, you'll get a link like:
```
https://expo.dev/artifacts/eas/abc123xyz.apk
```

**Options to download:**
- Click the link in terminal
- Or visit: https://expo.dev → Projects → gym-tracker-app → Builds
- Or check your email (Expo sends notification)

---

### Step 5: Install on Your Phone

#### Method A: Direct Download on Phone
1. Open the download link on your Android phone
2. Download the APK
3. Open the downloaded file
4. Tap "Install"
5. Done! ✅

#### Method B: Transfer from Computer
1. Download APK to your computer
2. Connect phone via USB
3. Copy APK to phone storage
4. On phone: Open file manager → Find APK → Tap it → Install

---

## 🎯 All Commands in One Place

```powershell
# 1. Install EAS CLI (one-time)
npm install -g eas-cli

# 2. Login (one-time)
eas login

# 3. Build APK (10 minutes)
eas build --platform android --profile preview

# Alternative: Use npm script
npm run build:android
```

---

## ⚡ Quick Troubleshooting

### Error: "eas: command not found"
**Solution:**
```powershell
npm install -g eas-cli
```

### Error: "Not logged in"
**Solution:**
```powershell
eas login
```

### Error: "No Android credentials"
**Solution:** Let EAS handle it automatically (just press Enter when asked)

### Error: Building fails
**Solution:**
```powershell
# Clear cache and reinstall dependencies
Remove-Item -Recurse -Force node_modules
npm install --legacy-peer-deps

# Try building again
eas build --platform android --profile preview
```

### Can't install APK on phone
**Solutions:**
1. Enable "Unknown Sources":
   - Settings → Security → Unknown Sources (ON)
   - Or: Settings → Apps → Special Access → Install Unknown Apps → Chrome (or your browser) → Allow

2. Check storage space (need ~50 MB free)

3. Make sure Android version is 5.0+ (API 21+)

---

## 📋 Build Profiles

### Preview (Recommended for first build)
```powershell
eas build --platform android --profile preview
```
- ✅ Fast build
- ✅ APK output
- ✅ Easy to install
- ✅ Perfect for testing

### Production (For final release)
```powershell
eas build --platform android --profile production
```
- ✅ Optimized
- ✅ Smaller size
- ✅ Better performance

---

## 🎁 What You Get

Your APK will be named something like:
```
build-abc123xyz.apk
```

**App Details:**
- Name: Gym Tracker Pro
- Version: 1.0.0
- Size: ~30-50 MB
- Package: com.arnvjshi.gymtrackerapp
- Min Android: 5.0 (API 21)

---

## ✨ After Installation

When you open the app, you'll see:
1. **Animated particle background** 🌟
2. **Dashboard** with stats
3. **Weigh-In** tracker
4. **Exercises** logger
5. **Profile** with BMI calculator

---

## 🔄 Building Again?

If you make changes and want to rebuild:

```powershell
eas build --platform android --profile preview
```

Each build gets a unique ID and download link.

---

## 💡 Pro Tips

1. **Keep terminal open** during build
2. **Check email** for build notifications
3. **Save APK file** on your computer
4. **First build takes ~10 min**, subsequent builds are faster
5. **You can close terminal** after upload completes

---

## 📱 Testing Checklist

After installing, test:
- [ ] Open app successfully
- [ ] See animated background
- [ ] Add weight entry
- [ ] Log an exercise
- [ ] View dashboard stats
- [ ] Check profile
- [ ] Export data

---

## 🎉 That's It!

You're now 3 commands away from having your gym tracker app on your phone:

```powershell
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```

**Build time**: ~10 minutes
**Download**: Automatic link provided
**Install**: Tap APK → Install → Done!

---

## 📞 Need Help?

1. **Check**: QUICK_START.md
2. **Read**: BUILD_GUIDE.md
3. **Visit**: https://docs.expo.dev
4. **Forum**: https://forums.expo.dev

---

**Ready? Let's build! 🚀**

Copy the commands above and paste them in PowerShell one by one.

**You've got this! 💪**
