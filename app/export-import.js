import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AppButton from '../components/AppButton'
import Card from '../components/Card'
import Divider from '../components/Divider'
import Header from '../components/Header'
import ScreenWrapper from '../components/ScreenWrapper'
import { theme } from '../constants/theme'

export default function ExportImport() {
  const router = useRouter()

  const [exportProgress, setExportProgress] = useState(0)
  const [isExporting, setIsExporting] = useState(false)

  const [exportedFiles] = useState([
    { id: '1', name: 'Memories_2024_05.zip', date: '2024-05-24', size: '245 MB' },
    { id: '2', name: 'Memories_2024_04.zip', date: '2024-04-24', size: '189 MB' },
    { id: '3', name: 'Memories_2024_03.zip', date: '2024-03-24', size: '312 MB' },
  ])

  const handleExport = () => {
    setIsExporting(true)
    setExportProgress(0)

    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsExporting(false)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handleUploadToCloud = () => {
    alert('Uploading to cloud storage...')
  }

  const handleDownloadFile = (fileName) => {
    alert(`Downloading ${fileName}...`)
  }

  const handleImport = () => {
    alert('Select a file to import from device')
  }

  const renderExportedFile = ({ item }) => (
    <Card padding="md" shadow="sm" style={styles.fileCard}>
      <View style={styles.fileInfo}>
        <View style={styles.fileIconContainer}>
          <Ionicons name="document-outline" size={24} color={theme.colors.secondary} />
        </View>

        <View style={styles.fileDetails}>
          <Text style={styles.fileName}>{item.name}</Text>
          <Text style={styles.fileMetadata}>
            {item.date} • {item.size}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => handleDownloadFile(item.name)}>
        <Ionicons name="download" size={24} color={theme.colors.primary} />
      </TouchableOpacity>
    </Card>
  )

  return (
    <ScreenWrapper scrollable padding="md">
      <Header
        title="Export & Import"
        subtitle="Backup and manage your data"
        showBack
        onBackPress={() => router.back()}
      />

      {/* Export Section */}
      <Card padding="lg" shadow="md" style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Ionicons name="download" size={24} color={theme.colors.secondary} />
          <Text style={styles.sectionTitle}>Export Memories</Text>
        </View>

        <Divider marginVertical="base" />

        <Text style={styles.description}>
          Create a backup of all your memories, notes, and albums
        </Text>

        {isExporting ? (
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>{exportProgress}%</Text>

            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${exportProgress}%` },
                ]}
              />
            </View>

            <Text style={styles.progressStatus}>
              {exportProgress < 100 ? 'Exporting...' : 'Export complete!'}
            </Text>
          </View>
        ) : (
          <>
            <AppButton
              title="Export All Data"
              onPress={handleExport}
              fullWidth
              icon={<Ionicons name="download" size={18} color="#fff" />}
            />

            <AppButton
              title="Upload to Cloud"
              variant="secondary"
              onPress={handleUploadToCloud}
              fullWidth
            />
          </>
        )}
      </Card>

      {/* Files */}
      {exportedFiles.length > 0 && (
        <View style={styles.filesSection}>
          <Text style={styles.filesTitle}>
            Recent Exports ({exportedFiles.length})
          </Text>

          <FlatList
            data={exportedFiles}
            renderItem={renderExportedFile}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      )}

      {/* Import Section */}
      <Card padding="lg" shadow="md" style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Ionicons name="cloud-upload" size={24} color={theme.colors.success} />
          <Text style={styles.sectionTitle}>Import Memories</Text>
        </View>

        <Divider marginVertical="base" />

        <Text style={styles.description}>
          Restore your memories from backup file
        </Text>

        <AppButton
          title="Select File to Import"
          onPress={handleImport}
          fullWidth
          icon={<Ionicons name="cloud-upload" size={18} color="#fff" />}
        />
      </Card>

      {/* Cloud */}
      <Card padding="lg" shadow="md" style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Ionicons name="cloud" size={24} color={theme.colors.info} />
          <Text style={styles.sectionTitle}>Cloud Sync</Text>
        </View>

        <Divider marginVertical="base" />

        <Text style={styles.description}>
          Sync your data automatically with cloud storage
        </Text>

        <View style={styles.cloudRow}>
          <Ionicons name="logo-google" size={28} color="#EA4335" />
          <Text style={styles.cloudName}>Google Drive</Text>
          <Text style={styles.cloudStatus}>Connected</Text>
        </View>

        <AppButton title="Configure Cloud Sync" variant="secondary" fullWidth />
      </Card>

      {/* Storage */}
      <Card padding="lg" shadow="md" style={styles.storageCard}>
        <Text style={styles.storageTitle}>Storage Info</Text>

        <Divider marginVertical="base" />

        <View style={styles.storageRow}>
          <Text style={styles.storageLabel}>Used Storage</Text>
          <Text style={styles.storageValue}>4.2 GB / 10 GB</Text>
        </View>

        <View style={styles.storageRow}>
          <Text style={styles.storageLabel}>Photos</Text>
          <Text style={styles.storageValue}>156 items</Text>
        </View>

        <View style={styles.storageRow}>
          <Text style={styles.storageLabel}>Videos</Text>
          <Text style={styles.storageValue}>45 items</Text>
        </View>
      </Card>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  sectionCard: { marginBottom: theme.sizes.lg },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.sizes.base,
  },

  sectionTitle: {
    fontSize: theme.sizes.h5,
    fontWeight: '700',
    marginLeft: theme.sizes.base,
    color: theme.colors.text,
  },

  description: {
    fontSize: theme.sizes.sm,
    color: theme.colors.subText,
    marginBottom: theme.sizes.base,
  },

  progressContainer: { marginVertical: theme.sizes.base },

  progressText: {
    textAlign: 'center',
    fontSize: theme.sizes.h5,
    fontWeight: '700',
    color: theme.colors.primary,
  },

  progressBar: {
    height: 8,
    backgroundColor: theme.colors.bgLight,
    borderRadius: 5,
    marginTop: 10,
  },

  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },

  progressStatus: {
    textAlign: 'center',
    marginTop: 10,
    color: theme.colors.subText,
  },

  filesSection: { marginBottom: theme.sizes.lg },

  filesTitle: {
    fontSize: theme.sizes.h5,
    fontWeight: '700',
    marginBottom: theme.sizes.base,
  },

  fileCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.sizes.sm,
  },

  fileInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },

  fileIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.sizes.base,
    backgroundColor: `${theme.colors.secondary}20`,
  },

  fileDetails: { flex: 1 },

  fileName: { fontWeight: '600' },

  fileMetadata: { fontSize: theme.sizes.sm, color: theme.colors.subText },

  cloudRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },

  cloudName: {
    flex: 1,
    marginLeft: 10,
    fontWeight: '600',
  },

  cloudStatus: {
    color: theme.colors.success,
    fontWeight: '600',
  },

  storageCard: { marginBottom: theme.sizes.xxl },

  storageTitle: {
    fontSize: theme.sizes.h5,
    fontWeight: '700',
    marginBottom: theme.sizes.base,
  },

  storageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },

  storageLabel: { color: theme.colors.subText },

  storageValue: { fontWeight: '600' },
})