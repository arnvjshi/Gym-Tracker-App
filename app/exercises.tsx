import { useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Modal, ScrollView } from 'react-native';
import { useGymStore } from '@/src/store/useGymStore';
import { AnimatedBackground } from '@/src/components/ThreeBackground';
import { ExerciseDefinition, MuscleGroup, EquipmentType } from '@/src/types';
import { PREDEFINED_EXERCISES } from '@/src/data/exerciseLibrary';
import { PREDEFINED_PROGRAMS } from '@/src/data/workoutPrograms';

export default function ExercisesScreen() {
  const addExercise = useGymStore((s) => s.addExercise);
  const removeExercise = useGymStore((s) => s.removeExercise);
  const exerciseLogs = useGymStore((s) => s.exerciseLogs);
  const customExercises = useGymStore((s) => s.customExercises);
  const addCustomExercise = useGymStore((s) => s.addCustomExercise);
  const getAllExercises = useGymStore((s) => s.getAllExercises);
  
  const [view, setView] = useState<'log' | 'library' | 'programs'>('log');
  const [selectedExercise, setSelectedExercise] = useState<ExerciseDefinition | null>(null);
  const [sets, setSets] = useState('3');
  const [reps, setReps] = useState('10');
  const [weight, setWeight] = useState('20');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMuscle, setFilterMuscle] = useState<MuscleGroup | 'All'>('All');
  const [filterEquipment, setFilterEquipment] = useState<EquipmentType | 'All'>('All');
  const [showProgramModal, setShowProgramModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<typeof PREDEFINED_PROGRAMS[0] | null>(null);

  const allExercises = getAllExercises();

  const filteredExercises = useMemo(() => {
    return allExercises.filter(ex => {
      const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMuscle = filterMuscle === 'All' || ex.primaryMuscle === filterMuscle || ex.secondaryMuscles.includes(filterMuscle);
      const matchesEquipment = filterEquipment === 'All' || ex.equipment === filterEquipment;
      return matchesSearch && matchesMuscle && matchesEquipment;
    });
  }, [allExercises, searchQuery, filterMuscle, filterEquipment]);

  const handleLogExercise = () => {
    if (!selectedExercise) return;
    const s = parseInt(sets, 10);
    const r = parseInt(reps, 10);
    const w = parseFloat(weight);
    
    if (!isNaN(s) && !isNaN(r) && !isNaN(w) && s > 0 && r > 0 && w >= 0) {
      addExercise({
        exerciseId: selectedExercise.id,
        exerciseName: selectedExercise.name,
        primaryMuscle: selectedExercise.primaryMuscle,
        date: new Date().toISOString(),
        sets: s,
        reps: r,
        weight: w,
      });
      setSets('3');
      setReps('10');
      setWeight('20');
      setSelectedExercise(null);
    }
  };

  const renderExerciseLibraryItem = ({ item }: { item: ExerciseDefinition }) => (
    <TouchableOpacity
      style={[styles.libraryItem, selectedExercise?.id === item.id && styles.libraryItemSelected]}
      onPress={() => setSelectedExercise(item)}
    >
      <View style={styles.libraryItemHeader}>
        <Text style={styles.libraryItemName}>{item.name}</Text>
        <View style={[styles.difficultyBadge, { backgroundColor: 
          item.difficulty === 'Beginner' ? 'rgba(34, 197, 94, 0.2)' :
          item.difficulty === 'Intermediate' ? 'rgba(251, 191, 36, 0.2)' :
          'rgba(239, 68, 68, 0.2)'
        }]}>
          <Text style={[styles.difficultyText, { color:
            item.difficulty === 'Beginner' ? '#22c55e' :
            item.difficulty === 'Intermediate' ? '#fbbf24' :
            '#ef4444'
          }]}>{item.difficulty}</Text>
        </View>
      </View>
      <Text style={styles.libraryItemMuscle}>Primary: {item.primaryMuscle} • {item.equipment}</Text>
      {item.secondaryMuscles.length > 0 && (
        <Text style={styles.libraryItemSecondary}>Secondary: {item.secondaryMuscles.join(', ')}</Text>
      )}
      {item.instructions && (
        <Text style={styles.libraryItemInstructions} numberOfLines={2}>{item.instructions}</Text>
      )}
    </TouchableOpacity>
  );

  const renderProgramItem = ({ item }: { item: typeof PREDEFINED_PROGRAMS[0] }) => (
    <TouchableOpacity
      style={styles.programCard}
      onPress={() => {
        setSelectedProgram(item);
        setShowProgramModal(true);
      }}
    >
      <Text style={styles.programName}>{item.name}</Text>
      <Text style={styles.programDescription}>{item.description}</Text>
      <Text style={styles.programMuscles}>Targets: {item.targetMuscles.join(', ')}</Text>
      <Text style={styles.programExercises}>{item.exercises.length} exercises</Text>
    </TouchableOpacity>
  );

  const renderLogItem = ({ item }: { item: typeof exerciseLogs[0] }) => (
    <View style={styles.logItem}>
      <View style={styles.logItemContent}>
        <Text style={styles.logItemName}>{item.exerciseName}</Text>
        <Text style={styles.logItemDate}>{new Date(item.date).toLocaleDateString()}</Text>
        <Text style={styles.logItemDetails}>
          {item.sets} sets × {item.reps} reps @ {item.weight} kg • {item.primaryMuscle}
        </Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => removeExercise(item.id)}>
        <Text style={styles.deleteButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <AnimatedBackground />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Workouts</Text>
          <View style={styles.viewSelector}>
            <TouchableOpacity
              style={[styles.viewButton, view === 'log' && styles.viewButtonActive]}
              onPress={() => setView('log')}
            >
              <Text style={[styles.viewButtonText, view === 'log' && styles.viewButtonTextActive]}>Log</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.viewButton, view === 'library' && styles.viewButtonActive]}
              onPress={() => setView('library')}
            >
              <Text style={[styles.viewButtonText, view === 'library' && styles.viewButtonTextActive]}>Library</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.viewButton, view === 'programs' && styles.viewButtonActive]}
              onPress={() => setView('programs')}
            >
              <Text style={[styles.viewButtonText, view === 'programs' && styles.viewButtonTextActive]}>Programs</Text>
            </TouchableOpacity>
          </View>
        </View>

        {view === 'log' && (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Log Exercise</Text>
              
              {!selectedExercise ? (
                <TouchableOpacity 
                  style={styles.selectExerciseButton}
                  onPress={() => setView('library')}
                >
                  <Text style={styles.selectExerciseText}>Select Exercise from Library →</Text>
                </TouchableOpacity>
              ) : (
                <>
                  <View style={styles.selectedExerciseCard}>
                    <Text style={styles.selectedExerciseName}>{selectedExercise.name}</Text>
                    <Text style={styles.selectedExerciseMuscle}>{selectedExercise.primaryMuscle} • {selectedExercise.equipment}</Text>
                    <TouchableOpacity onPress={() => setSelectedExercise(null)}>
                      <Text style={styles.changeExercise}>Change Exercise</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.inputRow}>
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Sets</Text>
                      <TextInput 
                        style={styles.smallInput} 
                        keyboardType="number-pad" 
                        value={sets} 
                        onChangeText={setSets} 
                      />
                    </View>
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Reps</Text>
                      <TextInput 
                        style={styles.smallInput} 
                        keyboardType="number-pad" 
                        value={reps} 
                        onChangeText={setReps} 
                      />
                    </View>
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Weight (kg)</Text>
                      <TextInput 
                        style={styles.smallInput} 
                        keyboardType="decimal-pad" 
                        value={weight} 
                        onChangeText={setWeight} 
                      />
                    </View>
                  </View>

                  <TouchableOpacity style={styles.logButton} onPress={handleLogExercise}>
                    <Text style={styles.logButtonText}>LOG EXERCISE</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

            <Text style={styles.subtitle}>Recent Workouts</Text>
            <FlatList
              data={[...exerciseLogs].reverse()}
              keyExtractor={(item) => item.id}
              renderItem={renderLogItem}
              ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Text style={styles.emptyText}>No exercises logged yet. Start your first workout!</Text>
                </View>
              }
            />
          </>
        )}

        {view === 'library' && (
          <>
            <TextInput
              style={styles.searchInput}
              placeholder="Search exercises..."
              placeholderTextColor="#6b7280"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
              <TouchableOpacity
                style={[styles.filterChip, filterMuscle === 'All' && styles.filterChipActive]}
                onPress={() => setFilterMuscle('All')}
              >
                <Text style={[styles.filterChipText, filterMuscle === 'All' && styles.filterChipTextActive]}>All Muscles</Text>
              </TouchableOpacity>
              {(['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Quads', 'Hamstrings'] as MuscleGroup[]).map(muscle => (
                <TouchableOpacity
                  key={muscle}
                  style={[styles.filterChip, filterMuscle === muscle && styles.filterChipActive]}
                  onPress={() => setFilterMuscle(muscle)}
                >
                  <Text style={[styles.filterChipText, filterMuscle === muscle && styles.filterChipTextActive]}>{muscle}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <FlatList
              data={filteredExercises}
              keyExtractor={(item) => item.id}
              renderItem={renderExerciseLibraryItem}
              ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Text style={styles.emptyText}>No exercises found. Try different filters.</Text>
                </View>
              }
            />

            {selectedExercise && (
              <TouchableOpacity 
                style={styles.floatingLogButton}
                onPress={() => setView('log')}
              >
                <Text style={styles.floatingLogButtonText}>Log {selectedExercise.name} →</Text>
              </TouchableOpacity>
            )}
          </>
        )}

        {view === 'programs' && (
          <>
            <Text style={styles.subtitle}>Pre-Built Programs</Text>
            <FlatList
              data={PREDEFINED_PROGRAMS}
              keyExtractor={(item) => item.id}
              renderItem={renderProgramItem}
              ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            />
          </>
        )}

        <Modal
          visible={showProgramModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowProgramModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {selectedProgram && (
                <ScrollView>
                  <Text style={styles.modalTitle}>{selectedProgram.name}</Text>
                  <Text style={styles.modalDescription}>{selectedProgram.description}</Text>
                  
                  <Text style={styles.modalSectionTitle}>Exercises:</Text>
                  {selectedProgram.exercises.map((ex, idx) => (
                    <View key={idx} style={styles.modalExerciseItem}>
                      <Text style={styles.modalExerciseName}>{ex.exerciseName}</Text>
                      <Text style={styles.modalExerciseDetails}>
                        {ex.sets} × {ex.reps} • Rest: {ex.restTime}s
                      </Text>
                      {ex.notes && <Text style={styles.modalExerciseNotes}>{ex.notes}</Text>}
                    </View>
                  ))}

                  <TouchableOpacity
                    style={styles.modalCloseButton}
                    onPress={() => setShowProgramModal(false)}
                  >
                    <Text style={styles.modalCloseButtonText}>Close</Text>
                  </TouchableOpacity>
                </ScrollView>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: { flex: 1, padding: 16, gap: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '800', color: '#f9fafb', textShadowColor: 'rgba(34, 197, 94, 0.3)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 10 },
  viewSelector: { flexDirection: 'row', backgroundColor: 'rgba(17, 24, 39, 0.9)', borderRadius: 8, padding: 4 },
  viewButton: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  viewButtonActive: { backgroundColor: '#22c55e' },
  viewButtonText: { color: '#9ca3af', fontSize: 12, fontWeight: '600' },
  viewButtonTextActive: { color: '#0f172a' },
  card: { backgroundColor: 'rgba(17, 24, 39, 0.9)', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: 'rgba(34, 197, 94, 0.2)', gap: 12 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#22c55e' },
  selectExerciseButton: { backgroundColor: 'rgba(34, 197, 94, 0.1)', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#22c55e', borderStyle: 'dashed' },
  selectExerciseText: { color: '#22c55e', fontWeight: '600', textAlign: 'center' },
  selectedExerciseCard: { backgroundColor: 'rgba(34, 197, 94, 0.1)', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#22c55e' },
  selectedExerciseName: { fontSize: 16, fontWeight: '700', color: '#f9fafb', marginBottom: 4 },
  selectedExerciseMuscle: { fontSize: 12, color: '#9ca3af', marginBottom: 8 },
  changeExercise: { fontSize: 12, color: '#22c55e', fontWeight: '600' },
  inputRow: { flexDirection: 'row', gap: 8 },
  inputGroup: { flex: 1 },
  inputLabel: { color: '#9ca3af', fontSize: 12, marginBottom: 4 },
  smallInput: { backgroundColor: 'rgba(15, 23, 42, 0.8)', color: '#e5e7eb', padding: 10, borderRadius: 10, fontSize: 14, borderWidth: 1, borderColor: 'rgba(34, 197, 94, 0.3)' },
  logButton: { backgroundColor: '#22c55e', paddingVertical: 14, borderRadius: 12, alignItems: 'center', elevation: 4, shadowColor: '#22c55e', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
  logButtonText: { color: '#0f172a', fontWeight: '700', fontSize: 14 },
  subtitle: { color: '#9ca3af', fontSize: 16, fontWeight: '600', marginTop: 8 },
  logItem: { backgroundColor: 'rgba(17, 24, 39, 0.9)', padding: 14, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(34, 197, 94, 0.2)' },
  logItemContent: { flex: 1 },
  logItemName: { color: '#f9fafb', fontSize: 16, fontWeight: '700', marginBottom: 4 },
  logItemDate: { color: '#6b7280', fontSize: 11, marginBottom: 4 },
  logItemDetails: { color: '#22c55e', fontSize: 14, fontWeight: '600' },
  deleteButton: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(239, 68, 68, 0.15)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#ef4444' },
  deleteButtonText: { color: '#ef4444', fontSize: 18, fontWeight: '700' },
  searchInput: { backgroundColor: 'rgba(17, 24, 39, 0.9)', color: '#e5e7eb', padding: 12, borderRadius: 12, fontSize: 16, borderWidth: 1, borderColor: 'rgba(34, 197, 94, 0.3)' },
  filterRow: { maxHeight: 40 },
  filterChip: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, backgroundColor: 'rgba(31, 41, 55, 0.8)', marginRight: 8, borderWidth: 1, borderColor: 'rgba(34, 197, 94, 0.2)' },
  filterChipActive: { backgroundColor: 'rgba(34, 197, 94, 0.3)', borderColor: '#22c55e' },
  filterChipText: { color: '#e5e7eb', fontSize: 13 },
  filterChipTextActive: { color: '#22c55e', fontWeight: '700' },
  libraryItem: { backgroundColor: 'rgba(17, 24, 39, 0.9)', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(34, 197, 94, 0.2)' },
  libraryItemSelected: { borderColor: '#22c55e', borderWidth: 2 },
  libraryItemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  libraryItemName: { fontSize: 16, fontWeight: '700', color: '#f9fafb', flex: 1 },
  difficultyBadge: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 8 },
  difficultyText: { fontSize: 11, fontWeight: '700' },
  libraryItemMuscle: { fontSize: 13, color: '#9ca3af', marginBottom: 4 },
  libraryItemSecondary: { fontSize: 12, color: '#6b7280', marginBottom: 4 },
  libraryItemInstructions: { fontSize: 12, color: '#9ca3af', fontStyle: 'italic', marginTop: 4 },
  floatingLogButton: { position: 'absolute', bottom: 20, right: 20, left: 20, backgroundColor: '#22c55e', paddingVertical: 16, borderRadius: 12, alignItems: 'center', elevation: 8, shadowColor: '#22c55e', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.5, shadowRadius: 12 },
  floatingLogButtonText: { color: '#0f172a', fontWeight: '700', fontSize: 16 },
  programCard: { backgroundColor: 'rgba(17, 24, 39, 0.9)', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(34, 197, 94, 0.2)' },
  programName: { fontSize: 18, fontWeight: '700', color: '#f9fafb', marginBottom: 6 },
  programDescription: { fontSize: 14, color: '#9ca3af', marginBottom: 8 },
  programMuscles: { fontSize: 13, color: '#22c55e', marginBottom: 4 },
  programExercises: { fontSize: 12, color: '#6b7280' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#111827', borderRadius: 16, padding: 20, maxHeight: '80%', borderWidth: 1, borderColor: 'rgba(34, 197, 94, 0.3)' },
  modalTitle: { fontSize: 24, fontWeight: '800', color: '#f9fafb', marginBottom: 8 },
  modalDescription: { fontSize: 14, color: '#9ca3af', marginBottom: 16 },
  modalSectionTitle: { fontSize: 18, fontWeight: '700', color: '#22c55e', marginBottom: 12 },
  modalExerciseItem: { backgroundColor: 'rgba(31, 41, 55, 0.8)', padding: 12, borderRadius: 10, marginBottom: 8 },
  modalExerciseName: { fontSize: 16, fontWeight: '600', color: '#f9fafb', marginBottom: 4 },
  modalExerciseDetails: { fontSize: 13, color: '#22c55e', marginBottom: 4 },
  modalExerciseNotes: { fontSize: 12, color: '#9ca3af', fontStyle: 'italic' },
  modalCloseButton: { backgroundColor: '#22c55e', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  modalCloseButtonText: { color: '#0f172a', fontWeight: '700', fontSize: 16 },
  emptyState: { padding: 32, alignItems: 'center', backgroundColor: 'rgba(17, 24, 39, 0.6)', borderRadius: 12, marginTop: 8 },
  emptyText: { color: '#6b7280', textAlign: 'center' },
});
