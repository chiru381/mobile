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
          transform: [{ scale: 1.05 }],
        },
      ]}
      onPress={() => setSelectedMood(item)}
    >
      <Text style={styles.moodEmoji}>{item.emoji}</Text>

      <Text style={styles.moodLabel}>{item.label}</Text>
    </TouchableOpacity>
  )

  const renderHistoryItem = ({ item }) => {

  // FIX INVALID DATE
  const rawDate = item.date || item.createdAt

  const formattedDate = rawDate
    ? new Date(rawDate).toDateString()
    : 'No Date'

  return (

    <Card
      padding="base"
      shadow="sm"
      style={styles.historyCard}
    >

      <View style={styles.historyContent}>

        {/* LEFT SIDE */}

        <View style={styles.historyLeft}>

          <Text style={styles.historyDate}>
            {formattedDate}
          </Text>

          <Text style={styles.historyNote}>
            {
              item.note?.trim()
                ? item.note
                : 'No notes added'
            }
          </Text>

        </View>

        {/* RIGHT SIDE */}

        <View style={styles.historyMood}>

          <Text style={styles.historyEmoji}>
            {item.emoji}
          </Text>

          <Text style={styles.historyLabel}>
            {item.mood}
          </Text>

        </View>

      </View>

    </Card>
  )
}

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
          contentContainerStyle={{
            paddingBottom: 6,
          }}
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

  // ================= MOOD SELECTOR =================

  moodSelectorCard: {
    marginTop: 10,
    marginBottom: 20,

    borderRadius: 24,

    backgroundColor: theme.colors.card,

    borderWidth: 1,
    borderColor: theme.colors.border,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,

    elevation: 4,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.text,

    marginBottom: 18,
  },

  // ================= MOOD GRID =================

  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  moodOption: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: 18,

    marginHorizontal: 4,

    borderRadius: 20,

    backgroundColor: theme.colors.bgLight,

    borderWidth: 1.5,
    borderColor: 'transparent',
  },

  moodEmoji: {
    fontSize: 34,
    marginBottom: 8,
  },

  moodLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.text,
    textAlign: 'center',
  },

  // ================= NOTES =================

  notesContainer: {
    marginBottom: 20,
  },

  // ================= HISTORY =================

  historySection: {
    marginTop: 28,
    paddingBottom: 120,
  },

historyCard: {
  marginBottom: 14,

  borderRadius: 20,

  backgroundColor: theme.colors.card,

  borderWidth: 1,
  borderColor: theme.colors.border,

  overflow: 'hidden',

  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.06,
  shadowRadius: 5,

  elevation: 3,
},

historyContent: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  // LEFT + RIGHT PADDING
  paddingHorizontal: 18,
  paddingVertical: 16,
},

historyLeft: {
  flex: 1,
  paddingRight: 14,
},

historyDate: {
  fontSize: 13,
  fontWeight: '700',

  color: theme.colors.subText,

  marginBottom: 8,
},

historyNote: {
  fontSize: 15,
  lineHeight: 22,

  color: theme.colors.text,
},

historyMood: {
  width: 92,
  height: 92,

  borderRadius: 24,

  justifyContent: 'center',
  alignItems: 'center',

  backgroundColor: theme.colors.bgLight,

  borderWidth: 1,
  borderColor: theme.colors.border,
},

historyEmoji: {
  fontSize: 34,
  marginBottom: 6,
},

historyLabel: {
  fontSize: 13,
  fontWeight: '700',

  color: theme.colors.text,
},

  // ================= EMPTY STATE =================

  emptyText: {
    marginTop: 30,

    textAlign: 'center',

    fontSize: 15,
    color: theme.colors.subText,
  },

})