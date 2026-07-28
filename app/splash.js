import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect, useRouter } from 'expo-router'
import {
  useCallback,
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
  TouchableOpacity,
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

const defaultSplashImages = [
  {
    type: "local",
    source: require("../assets/splash1.jpg"),
  },
  {
    type: "local",
    source: require("../assets/splash2.jpg"),
  },
  {
    type: "local",
    source: require("../assets/splash3.jpg"),
  },
];

export default function Splash() {

  const { width, height } =
  Dimensions.get('window')

  const router = useRouter()
  const carouselRef = useRef(null);
  const [images, setImages] = useState(defaultSplashImages);
  const [currentIndex, setCurrentIndex] = useState(0)

  const scaleAnim =
    useRef(new Animated.Value(0.9)).current

  const opacityAnim =
    useRef(new Animated.Value(0)).current

    const loadSplashImages = useCallback(async () => {

    try {

        const updatedImages = [...defaultSplashImages];

        for (let i = 1; i <= 3; i++) {

            const data = await AsyncStorage.getItem(
                `splashScreen${i}`
            );

            if (data) {

                const image = JSON.parse(data);

                if (image?.fileUrl) {
                    updatedImages[i - 1] = {
                        type: "remote",
                        source: image.fileUrl,
                    };
                }
            }
        }

        setImages(updatedImages);
        setCurrentIndex(0);

        requestAnimationFrame(() => {
            carouselRef.current?.scrollTo({
                index: 0,
                animated: false,
            });
        });

    } catch (err) {

        console.log(err);

    }

}, []);

useFocusEffect(
  useCallback(() => {
    loadSplashImages();
  }, [loadSplashImages])
);

  useEffect(() => {

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

  

const handleContinue = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      router.replace("/(tabs)");
    } else {
      router.replace("/(auth)/login");
    }
  } catch (error) {
    router.replace("/(auth)/login");
  }
};

  return (

    <View style={styles.container}>

      {
        images.length > 0 && (

          <Carousel
          ref={carouselRef}
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
    source={
        item.type === "local"
            ? item.source
            : { uri: item.source }
    }
    defaultSource={require("../assets/splash1.jpg")}
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
       {currentIndex === images.length - 1 && (
  <Animated.View
    style={{
      marginTop: 30,
    }}
  >
    <TouchableOpacity
    style={styles.continueBtn}
    onPress={handleContinue}
    activeOpacity={0.8}
>
    <Text style={{color:"#fff",fontSize:18,fontWeight:"700"}}>
        Continue →
    </Text>
</TouchableOpacity>
  </Animated.View>
)}

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