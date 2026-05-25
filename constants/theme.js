import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export const theme = {
  width,
  height,
  isTablet: width > 768,

  colors: {
    // Primary & Secondary
    primary: '#6C5CE7',
    primaryLight: '#8B7FFF',
    primaryDark: '#5A4EC5',
    secondary: '#00B4D8',
    accent: '#FF006E',

    // Background
    bg: '#0F0F1A',
    bgLight: '#1A1A2E',
    bgLighter: '#252538',

    // Text
    text: '#FFFFFF',
    textSecondary: '#B8B8CC',
    subText: '#A0A0B2',
    textLight: '#E0E0F0',

    // Functional
    success: '#00D084',
    warning: '#FFB800',
    error: '#FF4757',
    info: '#00B4D8',

    // Cards & Borders
    card: '#1A1A2E',
    border: '#2D2D42',
    divider: '#3A3A52',

    // Transparent
    overlay: 'rgba(0, 0, 0, 0.7)',
    overlayLight: 'rgba(0, 0, 0, 0.3)',
  },

  sizes: {
    // Font Sizes
    h1: 32,
    h2: 28,
    h3: 24,
    h4: 20,
    h5: 18,
    base: 16,
    sm: 14,
    xs: 12,
    xxs: 10,

    // Spacing
    xs: 4,
    sm: 8,
    md: 12,
    base: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
    xxxl: 48,

    // Radius
    radiusXs: 4,
    radiusSm: 8,
    radiusMd: 12,
    radiusLg: 16,
    radiusXl: 20,
    radiusFull: 9999,
  },

  fonts: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 3,
      elevation: 3,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 6,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 12,
      elevation: 12,
    },
  },
}