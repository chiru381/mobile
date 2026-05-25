import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
import Card from '../components/Card'
import Divider from '../components/Divider'
import Header from '../components/Header'
import ScreenWrapper from '../components/ScreenWrapper'
import { theme } from '../constants/theme'

export default function About() {
  const router = useRouter()

  return (
    <ScreenWrapper scrollable padding="md">
      <Header
        title="About Us"
        showBack
        onBackPress={() => router.back()}
      />

      {/* App Logo & Name */}
      <View style={styles.heroSection}>
        <Text style={styles.appEmoji}>💖</Text>
        <Text style={styles.appName}>Memory App</Text>
        <Text style={styles.tagline}>Preserve Your Precious Moments</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>

      {/* Description */}
      <Card padding="lg" shadow="md" style={styles.descriptionCard}>
        <Text style={styles.cardTitle}>About Memory App</Text>
        <Text style={styles.description}>
          Memory App is your personal digital keeper of precious moments. Store, organize, and relive your favorite
          memories with advanced features like mood tracking, travel logs, and secure app lock protection.
        </Text>
      </Card>

      {/* Features */}
      <Card padding="lg" shadow="md" style={styles.featureCard}>
        <Text style={styles.cardTitle}>Key Features</Text>
        <View style={styles.featureList}>
          {[
            '📸 Photo Gallery - Organize your photos',
            '🎬 Video Memories - Store and play videos',
            '✈️ Travel Logs - Document your adventures',
            '💍 Wedding Moments - Preserve special days',
            '😊 Mood Tracker - Track your emotional journey',
            '📅 Calendar Notes - Daily diary entries',
            '👥 Face Album - People and face recognition',
            '🔒 App Lock - Secure your memories',
          ].map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </Card>

      {/* Contact & Support */}
      <Card padding="lg" shadow="md" style={styles.contactCard}>
        <Text style={styles.cardTitle}>Contact & Support</Text>
        <View style={styles.contactItem}>
          <Ionicons name="mail" size={20} color={theme.colors.secondary} />
          <Text style={styles.contactText}>support@memoryapp.com</Text>
        </View>
        <Divider marginVertical="base" />
        <View style={styles.contactItem}>
          <Ionicons name="globe" size={20} color={theme.colors.secondary} />
          <Text style={styles.contactText}>www.memoryapp.com</Text>
        </View>
        <Divider marginVertical="base" />
        <View style={styles.contactItem}>
          <Ionicons name="call" size={20} color={theme.colors.secondary} />
          <Text style={styles.contactText}>+1 (555) 123-4567</Text>
        </View>
      </Card>

      {/* Legal */}
      <Card padding="lg" shadow="md" style={styles.legalCard}>
        <Text style={styles.cardTitle}>Legal</Text>
        <Text style={styles.legalLink}>Privacy Policy</Text>
        <Divider marginVertical="base" />
        <Text style={styles.legalLink}>Terms of Service</Text>
        <Divider marginVertical="base" />
        <Text style={styles.legalLink}>License Agreement</Text>
      </Card>

      {/* Credits */}
      <Card padding="lg" shadow="md" style={styles.creditsCard}>
        <Text style={styles.cardTitle}>Made with ❤️</Text>
        <Text style={styles.creditsText}>
          Designed and developed by the Memory App team.
        </Text>
        <Text style={styles.creditsText}>
          © 2024 Memory App. All rights reserved.
        </Text>
      </Card>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Thank you for using Memory App!</Text>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  heroSection: {
    alignItems: 'center',
    paddingVertical: theme.sizes.xxl,
    marginBottom: theme.sizes.lg,
  },
  appEmoji: {
    fontSize: 80,
    marginBottom: theme.sizes.base,
  },
  appName: {
    fontSize: theme.sizes.h2,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.sizes.sm,
  },
  tagline: {
    fontSize: theme.sizes.base,
    color: theme.colors.subText,
    textAlign: 'center',
    marginBottom: theme.sizes.base,
  },
  version: {
    fontSize: theme.sizes.sm,
    color: theme.colors.secondary,
  },
  descriptionCard: {
    marginBottom: theme.sizes.lg,
  },
  cardTitle: {
    fontSize: theme.sizes.h5,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.sizes.base,
  },
  description: {
    fontSize: theme.sizes.base,
    color: theme.colors.subText,
    lineHeight: 24,
  },
  featureCard: {
    marginBottom: theme.sizes.lg,
  },
  featureList: {
    gap: theme.sizes.sm,
  },
  featureItem: {
    paddingVertical: theme.sizes.sm,
  },
  featureText: {
    fontSize: theme.sizes.base,
    color: theme.colors.text,
  },
  contactCard: {
    marginBottom: theme.sizes.lg,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.sizes.sm,
  },
  contactText: {
    marginLeft: theme.sizes.base,
    fontSize: theme.sizes.base,
    color: theme.colors.text,
  },
  legalCard: {
    marginBottom: theme.sizes.lg,
  },
  legalLink: {
    fontSize: theme.sizes.base,
    color: theme.colors.secondary,
    fontWeight: '500',
  },
  creditsCard: {
    marginBottom: theme.sizes.lg,
  },
  creditsText: {
    fontSize: theme.sizes.sm,
    color: theme.colors.subText,
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: theme.sizes.xl,
  },
  footerText: {
    fontSize: theme.sizes.base,
    color: theme.colors.subText,
  },
})