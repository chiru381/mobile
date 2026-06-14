import { Ionicons } from '@expo/vector-icons'
import { useEffect, useRef, useState } from 'react'
import {
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

import ScrollToTopButton from '../../components/ScrollToTopButton'
import { theme } from '../../constants/theme'
import apiService from '../../utils/apiService'

const years = Array.from(
  { length: 50 },
  (_, i) => 2000 + i
)

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export default function CalendarNotes() {

const scrollRef = useRef(null)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())

  const [selectedDate, setSelectedDate] = useState(null)

  const [noteText, setNoteText] = useState('')

  const [notes, setNotes] = useState([])

  const [loading, setLoading] = useState(false)

  const [currentDate, setCurrentDate] = useState(new Date())

  // ================= FETCH NOTES =================

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {

    try {

      setLoading(true)

      const response = await apiService.getNotes()

      setNotes(response?.data || [])

    } catch (error) {

      console.log('Get Notes Error:', error)

    } finally {

      setLoading(false)
    }
  }

  // ================= MONTH DATA =================

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const year = selectedYear

const month = selectedMonth

  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const firstDay = new Date(year, month, 1).getDay()

  // ================= CALENDAR DAYS =================

  const generateCalendarDays = () => {

    const days = []

    // Empty spaces before first day

    for (let i = 0; i < firstDay; i++) {

      days.push({
        empty: true,
        id: `empty-${i}`,
      })
    }

    // Actual days

    for (let i = 1; i <= daysInMonth; i++) {

      const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`

      days.push({
        id: fullDate,
        date: i,
        fullDate,
      })
    }

    return days
  }



  // ================= SAVE NOTE =================

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

        color: '#FFB703',

        pinned: false,

        date: selectedDate,
      }

      await apiService.createNote(payload)

      setNoteText('')

      setSelectedDate(null)

      fetchNotes()

    } catch (error) {

      console.log('Create Note Error:', error)
    }
  }

  // ================= GET NOTE =================

  const getNoteForDate = (date) => {

    return notes.find(
      item =>
        item.title === `Note for ${date}`
    )
  }

  // ================= RENDER DAY =================

  const renderCalendarDay = ({ item }) => {

    if (item.empty) {
      return (
        <View
          style={styles.emptyDay}
        />
      )
    }

    const note = getNoteForDate(item.fullDate)

    const isSelected =
      selectedDate === item.fullDate

    const isToday =
      item.fullDate ===
      new Date().toISOString().split('T')[0]

    return (

      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.dayButton,

          isSelected &&
            styles.dayButtonSelected,

          note &&
            styles.dayButtonWithNote,

          isToday &&
            styles.todayButton,
        ]}
        onPress={() =>
          setSelectedDate(item.fullDate)
        }
      >

        <Text
          style={[
            styles.dayText,

            isSelected &&
              styles.dayTextSelected,
          ]}
        >
          {item.date}
        </Text>

        {
          note && (
            <View style={styles.noteDot} />
          )
        }

      </TouchableOpacity>
    )
  }

  // ================= NOTE CARD =================

  const renderNoteItem = ({ item }) => (

    <Card
      padding="lg"
      shadow="sm"
      style={styles.noteCard}
    >

      <View style={styles.noteHeader}>

        <View style={styles.noteIconBox}>

          <Ionicons
            name="calendar"
            size={20}
            color={theme.colors.primary}
          />

        </View>

        <View style={{ flex: 1 }}>

          <Text style={styles.noteDate}>
            {item.title?.replace('Note for ', '')}
          </Text>

          <Text style={styles.noteTitle}>
            Memory Note
          </Text>

        </View>

      </View>

      <Text style={styles.noteContent}>
        {item.description}
      </Text>

    </Card>
  )

  // ================= MAIN =================

  return (
<>
    <ScreenWrapper ref={scrollRef} scrollable padding="md">

      <Header
        title="Calendar Notes"
        subtitle="Your memories & diary"
      />

      {/* ================= CALENDAR ================= */}

      <Card
        padding="lg"
        shadow="md"
        style={styles.calendarCard}
      >

        {/* HEADER */}

        <View style={styles.selectorContainer}>

  <TouchableOpacity
    style={styles.selectorBox}
    onPress={() => {
      if (selectedYear > 2000) {
        setSelectedYear(
          selectedYear - 1
        )
      }
    }}
  >
    <Ionicons
      name="chevron-back"
      size={20}
      color={theme.colors.text}
    />
  </TouchableOpacity>

  <Text style={styles.selectorText}>
    {selectedYear}
  </Text>

  <TouchableOpacity
    style={styles.selectorBox}
    onPress={() =>
      setSelectedYear(
        selectedYear + 1
      )
    }
  >
    <Ionicons
      name="chevron-forward"
      size={20}
      color={theme.colors.text}
    />
  </TouchableOpacity>

</View>

<FlatList
  horizontal
  showsHorizontalScrollIndicator={false}
  data={monthNames}
  keyExtractor={(item) => item}
  contentContainerStyle={{
    paddingVertical: 12,
  }}
  renderItem={({ item, index }) => (

    <TouchableOpacity
      style={[
        styles.monthChip,

        selectedMonth === index &&
          styles.monthChipActive,
      ]}
      onPress={() =>
        setSelectedMonth(index)
      }
    >

      <Text
        style={[
          styles.monthChipText,

          selectedMonth === index && {
            color: '#fff',
          },
        ]}
      >
        {item}
      </Text>

    </TouchableOpacity>

  )}
/>

        {/* WEEK DAYS */}

        <View style={styles.weekContainer}>

          {
            weekDays.map(day => (

              <Text
                key={day}
                style={styles.weekDay}
              >
                {day}
              </Text>

            ))
          }

        </View>

        {/* CALENDAR GRID */}

        <FlatList
          data={generateCalendarDays()}
          renderItem={renderCalendarDay}
          keyExtractor={(item) => item.id}
          numColumns={7}
          scrollEnabled={false}
          columnWrapperStyle={styles.calendarRow}
          contentContainerStyle={{
            paddingBottom: 6,
          }}
        />

      </Card>

      {/* ================= NOTE EDITOR ================= */}

      {
        selectedDate && (

          <Card
            padding="lg"
            shadow="md"
            style={styles.noteEditorCard}
          >

            <View style={styles.editorHeader}>

              <View>

                <Text style={styles.editorLabel}>
                  Selected Date
                </Text>

                <Text style={styles.selectedDateText}>
                  {selectedDate}
                </Text>

              </View>

              <TouchableOpacity
                onPress={() =>
                  setSelectedDate(null)
                }
              >

                <Ionicons
                  name="close-circle"
                  size={30}
                  color={
                    theme.colors.subText
                  }
                />

              </TouchableOpacity>

            </View>

            <AppTextInput
              label="Write Your Memory"
              placeholder="Write something beautiful..."
              value={noteText}
              onChangeText={setNoteText}
              multiline
              numberOfLines={5}
            />

            <AppButton
              title={
                loading
                  ? 'Saving...'
                  : 'Save Note'
              }
              onPress={handleSaveNote}
              fullWidth
            />

          </Card>
        )
      }

      {/* ================= NOTES ================= */}

      <View style={styles.notesSection}>

        <Text style={styles.notesTitle}>

          Recent Notes ({notes.length})

        </Text>

        <FlatList
          data={notes}
          renderItem={renderNoteItem}
          keyExtractor={(item, index) =>
            index.toString()
          }
          scrollEnabled={false}
        />

      </View>

    </ScreenWrapper>
    <ScrollToTopButton
  onPress={() =>
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    })
  }
/>
</>
  )
}

const styles = StyleSheet.create({

  // ================= CALENDAR =================

  calendarCard: {

    borderRadius: 28,

    marginTop: 10,
    marginBottom: 24,

    backgroundColor: theme.colors.card,

    borderWidth: 1,
    borderColor: theme.colors.border,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.08,

    shadowRadius: 8,

    elevation: 4,
  },

  calendarHeader: {

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    marginBottom: 22,
  },

  monthButton: {

    width: 42,
    height: 42,

    borderRadius: 14,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: theme.colors.bgLight,
  },

  calendarTitle: {

    fontSize: 24,

    fontWeight: '800',

    color: theme.colors.text,
  },

  // ================= WEEK =================

weekContainer: {

  flexDirection: 'row',

  justifyContent: 'space-between',

  marginBottom: 14,
},

weekDay: {

  flex: 1,

  textAlign: 'center',

  fontSize: 13,

  fontWeight: '700',

  color: theme.colors.subText,
},

// ================= GRID =================

calendarRow: {

  marginBottom: 10,
},

emptyDay: {
  width: '14.2857%',
  height: 54,
},

dayButton: {
  width: '14.2857%',
  aspectRatio: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.colors.bgLight,
  borderRadius: 16,
  marginBottom: 8,
},

todayButton: {

  borderColor: theme.colors.primary,

  borderWidth: 1.5,
},

dayButtonSelected: {

  backgroundColor: theme.colors.primary,
},

dayButtonWithNote: {

  backgroundColor: `${theme.colors.secondary}20`,
},

dayText: {

  fontSize: 15,

  fontWeight: '700',

  color: theme.colors.text,
},

dayTextSelected: {

  color: '#fff',
},

noteDot: {

  position: 'absolute',

  bottom: 6,

  width: 6,

  height: 6,

  borderRadius: 20,

  backgroundColor: theme.colors.secondary,
},

  // ================= EDITOR =================

  noteEditorCard: {

    marginBottom: 24,

    borderRadius: 24,
  },

  editorHeader: {

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginBottom: 18,
  },

  editorLabel: {

    fontSize: 13,

    color: theme.colors.subText,

    marginBottom: 4,
  },

  selectedDateText: {

    fontSize: 18,

    fontWeight: '700',

    color: theme.colors.text,
  },

  // ================= NOTES =================

  notesSection: {

    paddingBottom: 120,
  },

  notesTitle: {

    fontSize: 22,

    fontWeight: '800',

    color: theme.colors.text,

    marginBottom: 16,
  },

  noteCard: {

    marginBottom: 14,

    borderRadius: 22,
  },

  noteHeader: {

    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 14,
  },

  noteIconBox: {

    width: 46,
    height: 46,

    borderRadius: 16,

    justifyContent: 'center',

    alignItems: 'center',

    backgroundColor: `${theme.colors.primary}15`,

    marginRight: 14,
  },

  noteDate: {

    fontSize: 13,

    color: theme.colors.subText,

    marginBottom: 2,
  },

  noteTitle: {

    fontSize: 17,

    fontWeight: '700',

    color: theme.colors.text,
  },

  noteContent: {

    fontSize: 15,

    lineHeight: 24,

    color: theme.colors.text,
  },

  selectorContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 15,
},

selectorBox: {
  width: 42,
  height: 42,
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.colors.bgLight,
},

selectorText: {
  fontSize: 20,
  fontWeight: '700',
  marginHorizontal: 20,
  color: theme.colors.text,
},

monthChip: {
  paddingHorizontal: 16,
  paddingVertical: 10,
  borderRadius: 20,
  backgroundColor: theme.colors.bgLight,
  marginRight: 10,
},

monthChipActive: {
  backgroundColor: theme.colors.primary,
},

monthChipText: {
  fontSize: 14,
  fontWeight: '600',
  color: theme.colors.text,
},
})