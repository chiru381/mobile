import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import AppButton from '../../components/AppButton'
import Header from '../../components/Header'
import ScreenWrapper from '../../components/ScreenWrapper'
import AppTextInput from '../../components/TextInput'

import { theme } from '../../constants/theme'
import apiService from '../../utils/apiService'

export default function Register() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    mpin: '',
  })

  // ================= VALIDATION =================

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter valid email'
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (!formData.mpin.trim()) {
      newErrors.mpin = 'MPIN is required'
    } else if (formData.mpin.length !== 4) {
      newErrors.mpin = 'MPIN must be 4 digits'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  // ================= REGISTER =================

  const handleRegister = async () => {
    if (!validateForm()) return

    setLoading(true)

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
        mpin: formData.mpin,

        // OPTIONAL BIOMETRIC IDS
        fingerprintId: '',
        faceId: '',
        voiceId: '',
      }

      const response = await apiService.register(payload)

      if (response.success) {
        alert('Registration successful')

        router.push('/(auth)/login')
      } else {
        alert(response.message || 'Registration failed')
      }
    } catch (error) {
      alert(error.message || 'Something went wrong')
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
        <Header title="Create Account" />

        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>
            Create your account to continue
          </Text>

          {/* NAME */}

          <AppTextInput
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.name}
            onChangeText={(text) => {
              setFormData({ ...formData, name: text })

              if (errors.name) {
                setErrors({ ...errors, name: null })
              }
            }}
            error={errors.name}
          />

          {/* EMAIL */}

          <AppTextInput
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(text) => {
              setFormData({ ...formData, email: text })

              if (errors.email) {
                setErrors({ ...errors, email: null })
              }
            }}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* PHONE NUMBER */}

          <AppTextInput
            label="Mobile Number"
            placeholder="Enter your mobile number"
            value={formData.mobile}
            onChangeText={(text) => {
              setFormData({ ...formData, mobile: text })

              if (errors.mobile) {
                setErrors({ ...errors, mobile: null })
              }
            }}
            error={errors.mobile}
            keyboardType="phone-pad"
          />

          {/* PASSWORD */}

          <AppTextInput
            label="Password"
            placeholder="Enter password"
            value={formData.password}
            onChangeText={(text) => {
              setFormData({ ...formData, password: text })

              if (errors.password) {
                setErrors({ ...errors, password: null })
              }
            }}
            error={errors.password}
            secureTextEntry
          />

          {/* CONFIRM PASSWORD */}

          <AppTextInput
            label="Confirm Password"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChangeText={(text) => {
              setFormData({
                ...formData,
                confirmPassword: text,
              })

              if (errors.confirmPassword) {
                setErrors({
                  ...errors,
                  confirmPassword: null,
                })
              }
            }}
            error={errors.confirmPassword}
            secureTextEntry
          />

          {/* MPIN */}

          <AppTextInput
            label="MPIN"
            placeholder="Enter 4 digit MPIN"
            value={formData.mpin}
            onChangeText={(text) => {
              setFormData({ ...formData, mpin: text })

              if (errors.mpin) {
                setErrors({ ...errors, mpin: null })
              }
            }}
            error={errors.mpin}
            keyboardType="number-pad"
            secureTextEntry
            maxLength={4}
          />

          {/* BUTTON */}

          <AppButton
            title="Create Account"
            onPress={handleRegister}
            loading={loading}
            fullWidth
            size="lg"
          />

          {/* LOGIN */}

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Already have an account?
            </Text>

            <Text
              style={styles.loginLink}
              onPress={() => router.push('/(auth)/login')}
            >
              {' '}
              Login
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
    marginBottom: theme.sizes.xl,
    textAlign: 'center',
  },

  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.sizes.lg,
  },

  loginText: {
    color: theme.colors.subText,
    fontSize: theme.sizes.base,
  },

  loginLink: {
    color: theme.colors.primary,
    fontWeight: '600',
    fontSize: theme.sizes.base,
  },
})