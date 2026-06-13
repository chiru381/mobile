import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import {
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import FloatingHeart from '../components/FloatingHeart'
import { theme } from '../constants/theme'
import { responsive } from '../utils/responsive'

const isTablet = responsive.isTablet

const splashContent = [

  {
    appName: 'Praveen ❤️ Nandini',
    tagline: 'Where Forever Starts',
  },

  {
    appName: 'Two Hearts, One Journey',
    tagline: 'A Beautiful Beginning to Forever',
  },

  {
    appName: 'Wedding Memories',
    tagline: 'Capturing Moments That Last a Lifetime',
  },

]

export default function Splash() {

  const { width, height } =
  Dimensions.get('window')

  const router = useRouter()

  const [images, setImages] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const scaleAnim =
    useRef(new Animated.Value(0.9)).current

  const opacityAnim =
    useRef(new Animated.Value(0)).current

  useEffect(() => {

    loadImages()

    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),

      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start()


  }, [])

  const loadImages = async () => {
  try {

    const storedImages =
      await AsyncStorage.getItem(
        'splashImages'
      )

    const data =
      storedImages
        ? JSON.parse(storedImages)
        : []

    setImages(data)

  } catch (error) {

    console.log(
      'Error loading splash images:',
      error
    )

    setImages([])
  }
}

  return (

    <View style={styles.container}>

      {
        images.length > 0 && (

          <Carousel
  width={width}
  height={height}
  data={images}
  loop={false}
  pagingEnabled={true}
  snapEnabled={true}
  enabled={true}
  panGestureHandlerProps={{
    activeOffsetX: [-10, 10],
  }}
  onSnapToItem={(index) => {
    setCurrentIndex(index)
  }}
  renderItem={({ item }) => (
    <Image
      source={{
        uri: item.fileUrl,
      }}
      style={styles.backgroundImage}
    />
  )}
/>

        )
      }

      <View
  pointerEvents="none"
  style={styles.overlay}
/>
<FloatingHeart
  left={30}
  delay={0}
/>

<FloatingHeart
  left={90}
  delay={1500}
/>

<FloatingHeart
  left={180}
  delay={3000}
/>

<FloatingHeart
  left={260}
  delay={500}
/>

<FloatingHeart
  left={320}
  delay={2500}
/>

      <Animated.View
  pointerEvents="box-none"
  style={[
    styles.centerContent,
    {
      opacity: opacityAnim,
      transform: [
        {
          scale: scaleAnim
        }
      ],
    },
  ]}
>

        <Text style={styles.appName}>
  {
    splashContent[
      currentIndex
    ]?.appName ||
    'Praveen ❤️ Nandini'
  }
</Text>

<Text style={styles.tagline}>
  {
    splashContent[
      currentIndex
    ]?.tagline ||
    'Our Love Story Begins Here'
  }
</Text>
        <View style={styles.dotsContainer}>
  {images.map((_, index) => (
    <View
      key={index}
      style={[
        styles.dot,
        currentIndex === index &&
          styles.activeDot,
      ]}
    />
  ))}
</View>
        {
  currentIndex === images.length - 1 &&
  images.length > 0 && (

    <Animated.View
      style={{
        marginTop: 30,
      }}
    >

      <Text
        style={styles.continueBtn}
        onPress={() =>
          router.replace('/(auth)/login')
        }
      >
        Continue →
      </Text>

    </Animated.View>

  )
}

      </Animated.View>

    </View>
  )
}

const styles = StyleSheet.create({

 backgroundImage: {
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
},

overlay: {
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.45)',
},

centerContent: {
  position: 'absolute',
  bottom: 80,
  left: 0,
  right: 0,
  alignItems: 'center',
},

appName: {
  color: '#fff',
  fontSize: 42,
  fontWeight: '900',
},

tagline: {
  color: '#fff',
  marginTop: 10,
  fontSize: 15,
},

container: {
  flex: 1,
  backgroundColor: theme.colors.bg,
},

continueBtn: {
  color: '#fff',
  fontSize: 18,
  fontWeight: '700',

  backgroundColor:
    theme.colors.primary,

  paddingHorizontal: 24,
  paddingVertical: 12,

  borderRadius: 30,
},

dotsContainer: {
  flexDirection: 'row',
  marginTop: 25,
  alignItems: 'center',
  justifyContent: 'center',
},

dot: {
  width: 10,
  height: 10,
  borderRadius: 5,
  backgroundColor: 'rgba(255,255,255,0.4)',
  marginHorizontal: 5,
},

activeDot: {
  width: 24,
  backgroundColor: '#fff',
},

})