import { Dimensions } from 'react-native'
import { theme } from '../constants/theme'

export const isTablet = theme.isTablet

const { width, height } = Dimensions.get('window')

export const responsive = {
  width,
  height,
  isTablet,

  // Layout calculations
  getResponsiveSize: (mobileSize, tabletSize) => {
    return isTablet ? tabletSize : mobileSize
  },

  // Width based on screen size
  getWidth: (percentage = 100) => {
    return (width * percentage) / 100
  },

  // Height based on screen size
  getHeight: (percentage = 100) => {
    return (height * percentage) / 100
  },

  // Padding based on device type
  getPadding: () => {
    return isTablet ? theme.sizes.lg : theme.sizes.base
  },

  // Grid columns
  getGridColumns: () => {
    if (width < 480) return 2
    if (width < 768) return 3
    return 4
  },

  // Font size scaling
  scaleFont: (size) => {
    const baseWidth = 375
    return Math.round((width / baseWidth) * size)
  },

  // Spacing based on device type
  getSpacing: (factor = 1) => {
    return (isTablet ? theme.sizes.lg : theme.sizes.base) * factor
  },

  // Screen type
  screenType: width < 480 ? 'small' : width < 768 ? 'medium' : 'large',
}