import { useEffect, useState } from 'react'
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import AppButton from '../../components/AppButton'
import Card from '../../components/Card'
import Header from '../../components/Header'
import ScreenWrapper from '../../components/ScreenWrapper'
import AppTextInput from '../../components/TextInput'
import { theme } from '../../constants/theme'
import apiService from '../../utils/apiService'

export default function Mood() {
  const moods = [
    {
      id: '1',
      emoji: '😀',
      label: 'Excellent',
      color: theme.colors.success,
    },
    {
      id: '2',
      emoji: '😊',
      label: 'Good',
      color: theme.colors.secondary,
    },
    {
      id: '3',
      emoji: '😐',
      label: 'Neutral',
      color: theme.colors.warning,
    },
    {
      id: '4',
      emoji: '😔',
      label: 'Sad',
      color: theme.colors.error,
    },
    {
      id: '5',
      emoji: '😡',
      label: 'Angry',
      color: theme.colors.error,
    },
  ]

  const [selectedMood, setSelectedMood] = useState(null)
  const [notes, setNotes] = useState('')
  const [moodHistory, setMoodHistory] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchMoods()
  }, [])

  const fetchMoods = async () => {
    try {
      setLoading(true)

      const response = await apiService.getMoods()

      setMoodHistory(response?.data || [])
    } catch (error) {
      console.log('Get Moods Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveMood = async () => {
    try {
      if (!selectedMood) {
        return
      }

      const payload = {
        mood: selectedMood.label,
        note: notes,
        emoji: selectedMood.emoji,
        color: selectedMood.color,
        date: new Date(),
      }

      await apiService.createMood(payload)

      Alert.alert('Success', 'Mood saved successfully')

      setSelectedMood(null)
      setNotes('')

      fetchMoods()
    } catch (error) {
      console.log('Save Mood Error:', error)

      Alert.alert('Error', 'Failed to save mood')
    }
  }

  const renderMoodOption = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.moodOption,
        selectedMood?.id === item.id && {
          backgroundColor: `${item.color}20`,
          borderColor: item.color,
          borderWidth: 2,
        },
      ]}
      onPress={() => setSelectedMood(item)}
    >
      <Text style={styles.moodEmoji}>{item.emoji}</Text>

      <Text style={styles.moodLabel}>{item.label}</Text>
    </TouchableOpacity>
  )

  const renderHistoryItem = ({ item }) => (
    <Card padding="base" shadow="sm" style={styles.historyCard}>
      <View style={styles.historyContent}>
        <View>
          <Text style={styles.historyDate}>
            {new Date(item.date).toDateString()}
          </Text>

          {item.note ? (
            <Text style={styles.historyNote}>{item.note}</Text>
          ) : null}
        </View>

        <View style={styles.historyMood}>
          <Text style={styles.historyEmoji}>{item.emoji}</Text>

          <Text style={styles.historyLabel}>{item.mood}</Text>
        </View>
      </View>
    </Card>
  )

  return (
    <ScreenWrapper scrollable padding="md">
      <Header title="Mood Tracker" subtitle="How are you feeling?" />

      {/* Mood Selection */}
      <Card padding="lg" shadow="md" style={styles.moodSelectorCard}>
        <Text style={styles.sectionTitle}>Select Your Mood</Text>

        <FlatList
          data={moods}
          renderItem={renderMoodOption}
          keyExtractor={(item) => item.id}
          numColumns={5}
          scrollEnabled={false}
          columnWrapperStyle={styles.columnWrapper}
        />
      </Card>

      {/* Notes */}
      <AppTextInput
        label="Add Notes (Optional)"
        placeholder="How are you feeling?"
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={4}
      />

      {/* Save Button */}
      <AppButton
        title={loading ? 'Saving...' : 'Save Mood Entry'}
        onPress={handleSaveMood}
        disabled={!selectedMood}
        fullWidth
      />

      {/* History */}
      <View style={styles.historySection}>
        <Text style={styles.sectionTitle}>
          Mood History ({moodHistory.length})
        </Text>

        <FlatList
          data={moodHistory}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item._id}
          scrollEnabled={false}
        />
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  moodSelectorCard: {
    marginBottom: theme.sizes.lg,
  },

  sectionTitle: {
    fontSize: theme.sizes.h5,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.sizes.base,
  },

  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: theme.sizes.base,
  },

  moodOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.sizes.base,
    borderRadius: theme.sizes.radiusMd,
    marginHorizontal: theme.sizes.xs,
    backgroundColor: theme.colors.bgLight,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  moodEmoji: {
    fontSize: 32,
    marginBottom: theme.sizes.xs,
  },

  moodLabel: {
    fontSize: theme.sizes.xs,
    color: theme.colors.subText,
    textAlign: 'center',
  },

  historySection: {
    marginTop: theme.sizes.lg,
    marginBottom: theme.sizes.xxl,
  },

  historyCard: {
    marginBottom: theme.sizes.sm,
  },

  historyContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  historyDate: {
    fontSize: theme.sizes.sm,
    color: theme.colors.subText,
    marginBottom: 4,
  },

  historyMood: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  historyEmoji: {
    fontSize: 24,
    marginRight: theme.sizes.sm,
  },

  historyLabel: {
    fontSize: theme.sizes.base,
    color: theme.colors.text,
    fontWeight: '500',
  },

  historyNote: {
    fontSize: theme.sizes.sm,
    color: theme.colors.text,
    maxWidth: 220,
  },
})