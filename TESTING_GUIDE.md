# 🧪 Testing Guide - Gym Tracker App v2.0

## Quick Test Checklist

### ✅ Pre-Test Setup
```bash
# Start the app
npx expo start

# Or run on Android
npm run android
```

### 1️⃣ Exercise Library Test (5 mins)
- [ ] Open "Workouts" screen
- [ ] Tap "Library" tab
- [ ] Verify 35+ exercises are shown
- [ ] Test search: Type "bench" → Should find "Bench Press", "Incline Bench Press"
- [ ] Test muscle filter: Tap "Chest" → Should show only chest exercises
- [ ] Verify difficulty badges show (Beginner/Intermediate/Advanced)
- [ ] Tap an exercise → Should highlight with green border
- [ ] Verify "Select Exercise from Library →" button shows when no exercise selected

### 2️⃣ Exercise Logging Test (5 mins)
- [ ] Select "Bench Press" from library
- [ ] Tap "Log" tab
- [ ] Verify exercise card shows with "Bench Press • Chest • Barbell"
- [ ] Enter: Sets=4, Reps=10, Weight=60
- [ ] Tap "LOG EXERCISE"
- [ ] Verify exercise appears in "Recent Workouts" list
- [ ] Log 2-3 more exercises (different muscle groups)
- [ ] Verify each entry shows correct date, sets, reps, weight

### 3️⃣ Muscle Rating Test (5 mins)
- [ ] Open "Muscles" screen
- [ ] Verify pie chart shows volume distribution
- [ ] Verify bar chart shows muscle comparison
- [ ] Find muscle card (e.g., "Chest")
- [ ] Tap "+" button → Level should increase
- [ ] Tap "-" button → Level should decrease
- [ ] Verify progress bar updates
- [ ] Expand card → Should show detailed stats
- [ ] Check "Weekly Volume", "Monthly Volume", "Frequency", "Last Trained"

### 4️⃣ Dashboard Test (5 mins)
- [ ] Open "Dashboard" (home screen)
- [ ] Verify "Weekly Volume" stat shows total kg
- [ ] Verify "Total Workouts" matches logged exercises
- [ ] Verify "Muscle Balance" shows average level
- [ ] Check "Top Developed Muscles" section
- [ ] Should show 3 muscles with levels and progress bars
- [ ] Tap "View All →" → Should navigate to Muscles screen
- [ ] If you have low-level muscles, check "Needs Attention" section
- [ ] Verify weight chart displays correctly
- [ ] Check "This Week" section shows workout count

### 5️⃣ Workout Programs Test (3 mins)
- [ ] Open "Workouts" screen
- [ ] Tap "Programs" tab
- [ ] Verify 9 programs are listed
- [ ] Tap "Push Pull Legs - Push A"
- [ ] Modal should open with exercise list
- [ ] Verify exercises show sets, reps, rest times
- [ ] Tap "Close" → Modal should dismiss

### 6️⃣ Weight Tracking Test (3 mins)
- [ ] Open "Weight" screen
- [ ] Add a weight entry
- [ ] Verify chart updates
- [ ] Verify "Change from first" shows correct calculation
- [ ] Add 2-3 more entries with different values
- [ ] Check chart shows trend line

### 7️⃣ Profile & Export Test (3 mins)
- [ ] Open "Profile" screen
- [ ] Enter height (e.g., 175 cm)
- [ ] Verify BMI calculates correctly
- [ ] Check "Personal Records" section
- [ ] Should show highest volume exercises
- [ ] Tap "EXPORT DATA"
- [ ] Share modal should appear
- [ ] Verify JSON file contains all data

### 8️⃣ Data Persistence Test (2 mins)
- [ ] Log some exercises
- [ ] Close app completely
- [ ] Reopen app
- [ ] Verify all data is still present
- [ ] Check Dashboard, Muscles, Workouts screens

## 🐛 Common Issues & Fixes

### Charts Not Rendering
**Issue:** Victory charts show blank or error
**Fix:** 
- Check console for errors
- Verify dimensions prop is set
- Ensure data array is not empty

### Muscle Ratings Not Updating
**Issue:** Logging exercise doesn't update muscle level
**Fix:**
- Ensure exercise has primaryMuscle set
- Check useGymStore.addExercise() is called
- Verify calculateMuscleStats() returns correct volume

### Exercise Library Empty
**Issue:** Library tab shows no exercises
**Fix:**
- Verify PREDEFINED_EXERCISES imported correctly
- Check getAllExercises() returns data
- Ensure customExercises merged properly

### Import/Export Fails
**Issue:** Export doesn't create file or import fails
**Fix:**
- Check AsyncStorage permissions
- Verify JSON structure matches ExportData type
- Test with small dataset first

## 📊 Sample Test Data

### Workout 1: Push Day
```
Bench Press: 4 sets × 10 reps @ 60 kg (Chest)
Overhead Press: 3 sets × 12 reps @ 40 kg (Shoulders)
Dips: 3 sets × 8 reps @ bodyweight (Triceps)
```

### Workout 2: Pull Day
```
Deadlift: 5 sets × 5 reps @ 100 kg (Back)
Pull-ups: 4 sets × 8 reps @ bodyweight (Back/Lats)
Barbell Curls: 3 sets × 12 reps @ 25 kg (Biceps)
```

### Workout 3: Leg Day
```
Squats: 5 sets × 10 reps @ 80 kg (Quads)
Leg Curls: 3 sets × 12 reps @ 45 kg (Hamstrings)
Calf Raises: 4 sets × 15 reps @ 60 kg (Calves)
```

## ✨ Expected Results

### After Logging Sample Data Above:

#### Dashboard Should Show:
- **Weekly Volume:** ~3,500-4,000 kg
- **Total Workouts:** 9 exercises
- **Muscle Balance:** 1.5-2.0/10 (since we just started)
- **Top Muscles:** Back (Level 2), Chest (Level 1), Quads (Level 1)

#### Muscles Screen Should Show:
- **Pie Chart:** Back dominates (deadlift volume), followed by Chest, Quads
- **Bar Chart:** Back has tallest bar, others shorter
- **Chest Card:** 
  - Level 1
  - Weekly Volume: 2,400 kg (4 sets × 10 reps × 60 kg)
  - Frequency: 1 workout
  - Last Trained: Today

#### Workouts Screen Should List:
- 9 exercises in reverse chronological order
- Each with correct muscle group badge
- Delete button (✕) on each entry

## 🚨 Critical Tests (Must Pass)

### P0 - App Launch
- [ ] App starts without crashes
- [ ] All 5 tabs load correctly
- [ ] No TypeScript errors in console

### P0 - Data Persistence
- [ ] Logged exercises persist after app restart
- [ ] Muscle ratings persist after app restart
- [ ] Weight entries persist after app restart

### P0 - Core Features
- [ ] Can log exercises from library
- [ ] Can adjust muscle levels
- [ ] Charts render without errors
- [ ] Export creates valid JSON

### P1 - UI/UX
- [ ] All screens render correctly
- [ ] Animations don't lag
- [ ] Touch targets are responsive
- [ ] Text is readable (no truncation)

### P1 - Data Accuracy
- [ ] Volume calculations are correct
- [ ] PRs detect correctly
- [ ] Muscle ratings update logically
- [ ] BMI calculates accurately

## 📝 Test Report Template

```markdown
## Test Session Report

**Date:** [Date]
**Version:** v2.0.0
**Device:** [Device/Emulator]
**Tester:** [Name]

### Test Results
- [ ] Exercise Library: PASS / FAIL
- [ ] Exercise Logging: PASS / FAIL
- [ ] Muscle Ratings: PASS / FAIL
- [ ] Dashboard Stats: PASS / FAIL
- [ ] Workout Programs: PASS / FAIL
- [ ] Weight Tracking: PASS / FAIL
- [ ] Profile & Export: PASS / FAIL
- [ ] Data Persistence: PASS / FAIL

### Bugs Found
1. [Bug description]
   - Severity: Critical / High / Medium / Low
   - Steps to reproduce:
   - Expected: 
   - Actual:

### Performance Notes
- App load time: [X] seconds
- Chart render time: [X] seconds
- Overall responsiveness: Excellent / Good / Fair / Poor

### Recommendations
- [Improvement suggestion 1]
- [Improvement suggestion 2]
```

## 🎯 Next Steps After Testing

### If All Tests Pass ✅
1. Update version to 2.0.0 in `app.json`
2. Run `eas build --platform android --profile preview`
3. Test APK on physical device
4. Create release notes
5. Distribute APK

### If Tests Fail ❌
1. Document all bugs in issues
2. Prioritize by severity
3. Fix P0 bugs first
4. Retest after fixes
5. Repeat until all P0/P1 pass

## 💡 Testing Tips

1. **Fresh Install:** Test on clean device to catch onboarding issues
2. **Large Dataset:** Import 100+ exercises to test performance
3. **Edge Cases:** Try 0 weight, 999 sets, empty strings
4. **Network:** Test offline functionality (should work without network)
5. **Memory:** Run for 30 mins to check for memory leaks
6. **Battery:** Monitor battery usage during heavy use

---

**Ready to test? Start with the Quick Test Checklist above!** 🚀

