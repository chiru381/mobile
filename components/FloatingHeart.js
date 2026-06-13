import {
    Animated,
} from 'react-native'

import {
    useEffect,
    useRef,
} from 'react'

const FloatingHeart = ({
  left,
  delay,
}) => {

  const translateY =
    useRef(
      new Animated.Value(0)
    ).current

  const opacity =
    useRef(
      new Animated.Value(0)
    ).current

  useEffect(() => {

  const startAnimation = () => {

    translateY.setValue(0)
    opacity.setValue(0)

    Animated.sequence([

      Animated.delay(delay),

      Animated.parallel([

        Animated.timing(
          translateY,
          {
            toValue: -400,
            duration: 5000,
            useNativeDriver: true,
          }
        ),

        Animated.sequence([

          Animated.timing(
            opacity,
            {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }
          ),

          Animated.timing(
            opacity,
            {
              toValue: 0,
              duration: 4000,
              useNativeDriver: true,
            }
          ),

        ]),

      ])

    ]).start(() => {
      startAnimation()
    })
  }

  startAnimation()

}, [])

  return (

    <Animated.Text
      style={{
        position: 'absolute',
        bottom: -30,
        left,
        fontSize:
          Math.random() * 15 + 20,
        opacity,
        transform: [
          {
            translateY,
          },
        ],
      }}
    >
      ❤️
    </Animated.Text>

  )
}

export default FloatingHeart