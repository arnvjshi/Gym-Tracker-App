import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert, Share } from 'react-native';
import { useStore, useWeightEntriesSorted } from '@/src/store/useStore';
import { useState, useEffect } from 'react';
import { AnimatedBackground } from '@/src/components/ThreeBackground';

export default function ProfileScreen() {
  const profile = useStore((s) => s.profile);
  const updateProfile = useStore((s) => s.updateProfile);
  const exportData = useStore((s) => s.exportData);
  const personalRecords = useStore((s) => s.personalRecords);
  const weightEntries = useWeightEntriesSorted();
  
  const [height, setHeight] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    setHeight(profile.heightCm ? String(profile.heightCm) : '');
    setName(profile.name || '');
    setAge(profile.age ? String(profile.age) : '');
  }, [profile]);

  const handleExport = async () => {
    try {
      const data = await exportData();
      await Share.share({
        message: data,
        title: 'Gym Tracker Data Export',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to export data');
    }
  };

  const latest = weightEntries[weightEntries.length - 1];
  let bmi = null;
  if (latest && profile.heightCm) {
    const heightM = profile.heightCm / 100;
    bmi = (latest.weight / (heightM * heightM)).toFixed(1);
  }

  return (
    <View style={styles.wrapper}>
      <AnimatedBackground />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Personal Information</Text>
          
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#6b7280"
            value={name}
            onChangeText={(t) => {
              setName(t);
              updateProfile({ name: t });
            }}
          />

          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            placeholder="Enter your age"
            placeholderTextColor="#6b7280"
            value={age}
            onChangeText={(t) => {
              setAge(t);
              const n = parseInt(t, 10);
              if (!isNaN(n)) updateProfile({ age: n });
            }}
          />

          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            placeholder="e.g. 175"
            placeholderTextColor="#6b7280"
            value={height}
            onChangeText={(t) => {
              setHeight(t);
              const n = parseInt(t, 10);
              if (!isNaN(n)) updateProfile({ heightCm: n });
              else updateProfile({ heightCm: null });
            }}
          />
        </View>

        {bmi && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>BMI Calculator</Text>
            <View style={styles.bmiContainer}>
              <Text style={styles.bmiValue}>{bmi}</Text>
              <Text style={styles.bmiLabel}>
                {parseFloat(bmi) < 18.5 ? 'Underweight' :
                 parseFloat(bmi) < 25 ? 'Normal' :
                 parseFloat(bmi) < 30 ? 'Overweight' : 'Obese'}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Personal Records</Text>
          {personalRecords.length === 0 ? (
            <Text style={styles.emptyText}>No personal records yet. Keep training!</Text>
          ) : (
            personalRecords.map((pr) => (
              <View key={pr.id} style={styles.prItem}>
                <Text style={styles.prName}>{pr.exerciseName}</Text>
                <Text style={styles.prValue}>{pr.weight}kg × {pr.reps}</Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Data Management</Text>
          <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
            <Text style={styles.exportButtonText}>Export Data</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: { padding: 16, gap: 16 },
  title: { fontSize: 28, fontWeight: '800', color: '#f9fafb', textShadowColor: 'rgba(34, 197, 94, 0.3)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 10 },
  card: { backgroundColor: 'rgba(17, 24, 39, 0.9)', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: 'rgba(34, 197, 94, 0.2)', gap: 12 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#22c55e', marginBottom: 4 },
  label: { color: '#9ca3af', fontSize: 14, marginTop: 8 },
  input: { backgroundColor: 'rgba(15, 23, 42, 0.8)', color: '#e5e7eb', padding: 12, borderRadius: 10, fontSize: 16, borderWidth: 1, borderColor: 'rgba(34, 197, 94, 0.3)' },
  bmiContainer: { alignItems: 'center', paddingVertical: 16 },
  bmiValue: { fontSize: 48, fontWeight: '800', color: '#22c55e' },
  bmiLabel: { fontSize: 18, color: '#9ca3af', marginTop: 8 },
  prItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(34, 197, 94, 0.1)' },
  prName: { color: '#e5e7eb', fontSize: 16, fontWeight: '600' },
  prValue: { color: '#22c55e', fontSize: 16, fontWeight: '700' },
  emptyText: { color: '#6b7280', textAlign: 'center', paddingVertical: 16 },
  exportButton: { backgroundColor: '#22c55e', paddingVertical: 14, borderRadius: 12, alignItems: 'center', elevation: 4, shadowColor: '#22c55e', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
  exportButtonText: { color: '#0f172a', fontWeight: '700', fontSize: 16 },
});
