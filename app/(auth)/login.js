import { Ionicons } from '@expo/vector-icons'
import * as AuthSession from 'expo-auth-session'
import { useRouter } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AIToy from '../../components/AIToy'
import AppButton from '../../components/AppButton'
import Header from '../../components/Header'
import ScreenWrapper from '../../components/ScreenWrapper'
import AppTextInput from '../../components/TextInput'
import { theme } from '../../constants/theme'
import apiService from '../../utils/apiService'

WebBrowser.maybeCompleteAuthSession()

const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
}

export default function Login() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [loginMethod, setLoginMethod] = useState('mpin') // mpin, fingerprint, face, voice
  const [formData, setFormData] = useState({
    phone: '',
    mpin: '',
  })
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (loginMethod === 'mpin' && !formData.mpin.trim())
      newErrors.mpin = 'MPIN is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const redirectUri = AuthSession.makeRedirectUri({
  scheme: 'mobileapp',
})
console.log('Redirect URI:', redirectUri)

const [request, response, promptAsync] = AuthSession.useAuthRequest(
  {
    clientId: '275435124465-qlbifmtdqt7ng7c9maqpe5g6t8hfrkh5.apps.googleusercontent.com',
    scopes: [
      'openid',
      'profile',
      'email',
      'https://www.googleapis.com/auth/drive.readonly',
    ],
    redirectUri,
    responseType: AuthSession.ResponseType.Token,
  },
  discovery
)


  const handleMPINLogin = async () => {
    if (!validateForm()) return

    setLoading(true)
    try {
      const response = await apiService.loginWithMpin(formData.phone, formData.mpin)
      if (response.success && response.token) {
        // Store token and navigate to home
        router.replace('/(tabs)')
      } else {
        alert(response.message || 'Login failed')
      }
    } catch (error) {
      alert('Login error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

const handleGoogleLogin = async () => {
  try {
    const result = await promptAsync()

    if (result.type === 'success') {
      const accessToken = result.params.access_token

      console.log('Access Token:', accessToken)

      const userResponse = await fetch(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      const user = await userResponse.json()

      console.log('User Info:', user)

      router.replace('/(tabs)')
    }
  } catch (error) {
    console.log(error)
    alert('Google login failed')
  }
}

  const handleBiometricLogin = async (type) => {
    setLoading(true)
    try {
      // Here you would integrate with actual biometric APIs
      // For now, this is a placeholder
      const response = await apiService.loginWithBiometric(formData.phone, type)
      if (response.success && response.token) {
        router.replace('/(tabs)')
      } else {
        alert('Biometric login failed')
      }
    } catch (error) {
      alert(`${type} login error: ` + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScreenWrapper scrollable padding="lg">
        <AIToy
          message="Welcome back to your memory app!"
        />
        <Header title="Login" />

        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>Choose your login method</Text>

          {/* Login Method Tabs */}
          <View style={styles.methodTabs}>
            {['mpin', 'fingerprint', 'face', 'voice'].map((method) => (
              <AppButton
                key={method}
                title={method.charAt(0).toUpperCase() + method.slice(1)}
                onPress={() => setLoginMethod(method)}
                variant={loginMethod === method ? 'primary' : 'secondary'}
                size="sm"
                fullWidth
              />
            ))}
          </View>

          {/* Phone Input - Always visible */}
          <AppTextInput
            label="Phone Number"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChangeText={(text) => {
              setFormData({ ...formData, phone: text })
              if (errors.phone) setErrors({ ...errors, phone: null })
            }}
            error={errors.phone}
            keyboardType="phone-pad"
          />

          {/* MPIN Login */}
          {loginMethod === 'mpin' && (
            <AppTextInput
              label="MPIN"
              placeholder="Enter your MPIN"
              value={formData.mpin}
              onChangeText={(text) => {
                setFormData({ ...formData, mpin: text })
                if (errors.mpin) setErrors({ ...errors, mpin: null })
              }}
              error={errors.mpin}
              secureTextEntry
              keyboardType="number-pad"
            />
          )}

          {/* Fingerprint Login */}
          {loginMethod === 'fingerprint' && (
            <View style={styles.biometricContainer}>
              <Ionicons
                name="finger-print"
                size={80}
                color={theme.colors.primary}
              />
              <Text style={styles.biometricText}>
                Place your finger on the sensor
              </Text>
              <AppButton
                title="Scan Fingerprint"
                onPress={() => handleBiometricLogin('fingerprint')}
                loading={loading}
                fullWidth
                size="lg"
              />
            </View>
          )}

          {/* Face Recognition Login */}
          {loginMethod === 'face' && (
            <View style={styles.biometricContainer}>
              <Ionicons
                name="person-circle-outline"
                size={80}
                color={theme.colors.primary}
              />
              <Text style={styles.biometricText}>
                Position your face in the frame
              </Text>
              <AppButton
                title="Scan Face"
                onPress={() => handleBiometricLogin('face')}
                loading={loading}
                fullWidth
                size="lg"
              />
            </View>
          )}

          {/* Voice Recognition Login */}
          {loginMethod === 'voice' && (
            <View style={styles.biometricContainer}>
              <Ionicons
                name="mic-circle-outline"
                size={80}
                color={theme.colors.primary}
              />
              <Text style={styles.biometricText}>
                Speak to authenticate
              </Text>
              <AppButton
                title="Start Voice Recognition"
                onPress={() => handleBiometricLogin('voice')}
                loading={loading}
                fullWidth
                size="lg"
              />
            </View>
          )}

          {/* MPIN Login Button */}
          {loginMethod === 'mpin' && (
            <AppButton
              title="Login with MPIN"
              onPress={handleMPINLogin}
              loading={loading}
              fullWidth
              size="lg"
            />
          )}

        <TouchableOpacity
          onPress={handleGoogleLogin}
          style={styles.googleButton}
        >
          <Ionicons
            name="logo-google"
            size={22}
            color="#DB4437"
          />
          <Text style={styles.googleText}>
            Continue with Google
          </Text>
        </TouchableOpacity>

          {/* Register Link */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <Text
              style={styles.registerLink}
              onPress={() => router.push('/register')}
            >
              Register
            </Text>
          </View>
        </View>
      </ScreenWrapper>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  formContainer: {
    paddingVertical: theme.sizes.xl,
  },
  subtitle: {
    fontSize: theme.sizes.base,
    color: theme.colors.subText,
    marginBottom: theme.sizes.lg,
    textAlign: 'center',
  },
  methodTabs: {
    flexDirection: 'row',
    marginBottom: theme.sizes.lg,
    gap: theme.sizes.sm,
  },
  biometricContainer: {
    alignItems: 'center',
    paddingVertical: theme.sizes.xxl,
    marginVertical: theme.sizes.lg,
  },
  biometricText: {
    fontSize: theme.sizes.base,
    color: theme.colors.subText,
    marginVertical: theme.sizes.lg,
    textAlign: 'center',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.sizes.lg,
  },
  registerText: {
    color: theme.colors.subText,
    fontSize: theme.sizes.base,
  },
  registerLink: {
    color: theme.colors.primary,
    fontWeight: '600',
    fontSize: theme.sizes.base,
  },
  googleButton: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff',
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 12,
  padding: 14,
  marginTop: 20,
},

googleText: {
  marginLeft: 10,
  fontSize: 16,
  fontWeight: '600',
},
})
