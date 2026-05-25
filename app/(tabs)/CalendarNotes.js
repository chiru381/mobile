import { Ionicons } from '@expo/vector-icons'
import { useState, useEffect } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AppButton from '../../components/AppButton'
import Card from '../../components/Card'
import Header from '../../components/Header'
import ScreenWrapper from '../../components/ScreenWrapper'
import AppTextInput from '../../components/TextInput'
import { theme } from '../../constants/theme'
import apiService from '../../utils/apiService'

export default function CalendarNotes() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [noteText, setNoteText] = useState('')
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    try {
      setLoading(true)
      const response = await apiService.getNotes()
      const data = response?.data || []
      setNotes(data)
    } catch (error) {
      console.log('Get Notes Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const getDaysInMonth = (date = new Date()) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

  const generateCalendarDays = () => {
    const days = []
    const daysInMonth = getDaysInMonth()
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: i })
    }
    return days
  }

  const handleSaveNote = async () => {
    try {
      if (!selectedDate || !noteText.trim()) {
        return
      }
      const payload = {
        title: `Note for ${selectedDate}`,
        description: noteText,
        category: 'Diary',
        tags: ['memory'],
        color: '#ffcc00',
        pinned: false,
      }
      await apiService.createNote(payload)
      setNoteText('')
      setSelectedDate(null)
      fetchNotes()
    } catch (error) {
      console.log('Create Note Error:', error)
    }
  }

  const getNoteForDate = (date) => notes.find((n) => n.title === `Note for ${date}`)

  const renderCalendarDay = ({ item }) => {
    const dateStr = `2024-05-${String(item.date).padStart(2, '0')}`
    const note = getNoteForDate(dateStr)
    const isSelected = selectedDate === dateStr

    if (loading) {
      return (
        <ScreenWrapper>
          <Text>Loading notes...</Text>
        </ScreenWrapper>
      )
    }

    return (
      <TouchableOpacity
        style={[
          styles.dayButton,
          isSelected && styles.dayButtonSelected,
          note && styles.dayButtonWithNote,
        ]}
        onPress={() => setSelectedDate(dateStr)}
      >
        <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>
          {item.date}
        </Text>
        {note && <View style={styles.noteDot} />}
      </TouchableOpacity>
    )
  }

  const renderNoteItem = ({ item }) => (
    <Card padding="md" shadow="sm" style={styles.noteCard}>
      <Text style={styles.noteDate}>{item.date}</Text>
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text style={styles.noteContent} numberOfLines={3}>
        {item.description}
      </Text>
    </Card>
  )

  return (
    <ScreenWrapper scrollable padding="md">
      <Header title="Calendar Notes" subtitle="Keep your daily diary" />

      {/* Calendar */}
      <Card padding="lg" shadow="md" style={styles.calendarCard}>
        <Text style={styles.calendarTitle}>May 2024</Text>

        <FlatList
          data={generateCalendarDays()}
          renderItem={renderCalendarDay}
          keyExtractor={(item) => item.date.toString()}
          numColumns={7}
          scrollEnabled={false}
          columnWrapperStyle={styles.calendarRow}
        />
      </Card>

      {/* Note Editor */}
      {selectedDate && (
        <Card padding="lg" shadow="md" style={styles.noteEditorCard}>
          <View style={styles.editorHeader}>
            <Text style={styles.selectedDateText}>
              Note for {selectedDate}
            </Text>

            <TouchableOpacity onPress={() => setSelectedDate(null)}>
              <Ionicons name="close" size={24} color={theme.colors.subText} />
            </TouchableOpacity>
          </View>

          <AppTextInput
            label="Write your note"
            placeholder="Write your memory..."
            value={noteText}
            onChangeText={setNoteText}
            multiline
            numberOfLines={5}
          />

          <AppButton title="Save Note" onPress={handleSaveNote} fullWidth />
        </Card>
      )}

      {/* Notes List */}
      <View style={styles.notesListSection}>
        <Text style={styles.notesListTitle}>
          Recent Notes ({notes.length})
        </Text>

        <FlatList
          data={notes}
          renderItem={renderNoteItem}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
        />
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  calendarCard: {
    marginBottom: theme.sizes.lg,
  },
  calendarTitle: {
    fontSize: theme.sizes.h5,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: theme.sizes.base,
    color: theme.colors.text,
  },
  calendarRow: {
    justifyContent: 'space-between',
    marginBottom: theme.sizes.sm,
  },
  dayButton: {
    width: '13%',
    height: 50,
    borderRadius: theme.sizes.radiusSm,
    backgroundColor: theme.colors.bgLight,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayButtonSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  dayButtonWithNote: {
    borderColor: theme.colors.secondary,
  },
  dayText: {
    fontSize: theme.sizes.sm,
    fontWeight: '600',
    color: theme.colors.text,
  },
  dayTextSelected: {
    color: '#fff',
  },
  noteDot: {
    position: 'absolute',
    bottom: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.secondary,
  },
  noteEditorCard: {
    marginBottom: theme.sizes.lg,
  },
  editorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.sizes.base,
    alignItems: 'center',
  },
  selectedDateText: {
    fontSize: theme.sizes.base,
    fontWeight: '600',
    color: theme.colors.text,
  },
  notesListSection: {
    marginBottom: theme.sizes.xxl,
  },
  notesListTitle: {
    fontSize: theme.sizes.h5,
    fontWeight: '700',
    marginBottom: theme.sizes.base,
    color: theme.colors.text,
  },
  noteCard: {
    marginBottom: theme.sizes.base,
  },
  noteDate: {
    fontSize: theme.sizes.xs,
    color: theme.colors.secondary,
    marginBottom: 4,
  },
  noteTitle: {
    fontSize: theme.sizes.base,
    fontWeight: '600',
    marginBottom: 4,
    color: theme.colors.text,
  },
  noteContent: {
    fontSize: theme.sizes.sm,
    color: theme.colors.subText,
  },
})