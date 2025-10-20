import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useStore } from '@/src/store/useStore';
import { useState, useEffect } from 'react';

export default function ProfileScreen() {
  const height = useStore((s) => s.profile.heightCm);
  const setHeight = useStore((s) => s.setHeight);
  const [val, setVal] = useState('');
  useEffect(() => {
    setVal(height ? String(height) : '');
  }, [height]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.label}>Height (cm)</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        placeholder="e.g. 175"
        placeholderTextColor="#6b7280"
        value={val}
        onChangeText={(t) => {
          setVal(t);
          const n = parseInt(t, 10);
          if (!isNaN(n)) setHeight(n);
          else setHeight(null);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  title: { fontSize: 20, fontWeight: '700', color: '#e5e7eb' },
  label: { color: '#9ca3af' },
  input: { backgroundColor: '#111827', color: '#e5e7eb', padding: 10, borderRadius: 8 },
});
