# API Configuration Guide

## 🔌 Backend Setup

Your Memory App is ready to connect with your Node.js/Express.js/MongoDB backend. Follow this guide to integrate your APIs.

## 1. Update API Base URL

Edit `utils/apiService.js` and replace:
```javascript
const API_BASE_URL = 'http://your-api-domain.com/api'
```

Example:
```javascript
// For local development
const API_BASE_URL = 'http://192.168.1.100:5000/api'

// For production
const API_BASE_URL = 'https://api.memoryapp.com/api'
```

## 2. Expected API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login-mpin` - Login with MPIN
- `POST /auth/login-biometric` - Biometric login

### User
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile

### Gallery
- `GET /gallery/photos` - Get all photos
- `POST /gallery/upload` - Upload photo

### Videos
- `GET /videos` - Get all videos

### Notes
- `GET /notes` - Get all notes
- `POST /notes` - Create new note
- `GET /notes/date/:date` - Get notes for specific date

### Mood
- `GET /mood` - Get mood tracking data
- `POST /mood` - Add mood entry

## 3. Request/Response Format

### Authentication Request
```json
{
  "phone": "+1 (555) 123-4567",
  "mpin": "1234"
}
```

### Authentication Response
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user123",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Profile Response
```json
{
  "success": true,
  "data": {
    "id": "user123",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567",
    "bio": "Photography enthusiast",
    "avatar": "https://url.com/avatar.jpg"
  }
}
```

### Photos Response
```json
{
  "success": true,
  "data": [
    {
      "id": "photo1",
      "uri": "https://url.com/photo1.jpg",
      "date": "2024-05-20",
      "title": "Beach Day"
    }
  ]
}
```

### Notes Response
```json
{
  "success": true,
  "data": [
    {
      "date": "2024-05-24",
      "title": "Beautiful Day",
      "content": "Had a wonderful time..."
    }
  ]
}
```

## 4. Token Management

After successful login, store the token using `AsyncStorage`:

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage'

// After login
await AsyncStorage.setItem('authToken', response.token)

// Retrieve token
const token = await AsyncStorage.getItem('authToken')

// Use in API calls (already handled in apiService.js)
headers: { Authorization: `Bearer ${token}` }
```

### Add AsyncStorage Dependency
```bash
npm install @react-native-async-storage/async-storage
```

## 5. Error Handling

All API calls include error handling. Errors will throw with messages like:
```
"Registration failed"
"Login failed"
"Failed to fetch photos"
```

Implement try-catch in your screens:
```javascript
try {
  const response = await apiService.register(formData)
  if (response.success) {
    // Handle success
  }
} catch (error) {
  alert('Error: ' + error.message)
}
```

## 6. File Upload

For photo uploads, implement FormData:
```javascript
const formData = new FormData()
formData.append('file', {
  uri: photoUri,
  type: 'image/jpeg',
  name: 'photo.jpg'
})

const response = await apiService.uploadPhoto(token, formData)
```

## 7. Biometric Authentication

For fingerprint/face recognition, integrate:
- **iOS**: LocalAuthentication framework
- **Android**: BiometricPrompt

```bash
npm install react-native-biometrics
```

Example usage:
```javascript
import Biometrics from 'react-native-biometrics'

const handleBiometric = async () => {
  try {
    const result = await Biometrics.isSensorAvailable()
    if (result.available) {
      const res = await Biometrics.createSignature({
        promptMessage: 'Authenticate',
      })
      // Send to backend for verification
    }
  } catch (error) {
    console.error(error)
  }
}
```

## 8. Voice Recognition

For voice authentication, use:
```bash
npm install react-native-voice
```

Example:
```javascript
import Voice from 'react-native-voice'

const startVoiceRecognition = async () => {
  try {
    await Voice.start('en-US')
  } catch (e) {
    console.error(e)
  }
}
```

## 9. Testing the API Integration

### Test Script
```javascript
// In your component
useEffect(() => {
  testApiConnection()
}, [])

const testApiConnection = async () => {
  try {
    const result = await apiService.register({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '5551234567',
      password: '123456',
      confirmPassword: '123456'
    })
    console.log('API Response:', result)
  } catch (error) {
    console.error('API Error:', error)
  }
}
```

## 10. Common Issues & Solutions

### CORS Error
**Problem**: "Network error" when calling API
**Solution**: Enable CORS in your Express backend:
```javascript
const cors = require('cors')
app.use(cors())
```

### SSL Certificate Error
**Problem**: "Certificate verification failed"
**Solution**: For development only, disable SSL verification:
```javascript
const config = {
  rejectUnauthorizedSSL: false
}
```

### Token Expiration
**Problem**: "Unauthorized" after some time
**Solution**: Implement token refresh:
```javascript
// Add to apiService.js
const refreshToken = async () => {
  const refreshToken = await AsyncStorage.getItem('refreshToken')
  // Call refresh endpoint
}
```

### Image Upload Size
**Problem**: Upload fails for large images
**Solution**: Compress images before upload:
```bash
npm install react-native-image-resizer
```

## 11. Environment Variables

Create `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_API_TIMEOUT=30000
```

Update `utils/apiService.js`:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
```

## 12. Security Best Practices

✅ **Do**:
- Always use HTTPS in production
- Validate all user inputs
- Store sensitive data securely
- Implement rate limiting
- Use strong authentication

❌ **Don't**:
- Store tokens in plain text
- Expose API URLs publicly
- Skip SSL verification in production
- Log sensitive data
- Hardcode credentials

## 13. Next Steps

1. ✅ Update API_BASE_URL
2. ✅ Implement AsyncStorage for token management
3. ✅ Test authentication endpoints
4. ✅ Set up error handling and logging
5. ✅ Implement file upload
6. ✅ Add biometric authentication
7. ✅ Deploy to production

## 📞 Support Resources

- Expo Documentation: https://docs.expo.dev
- React Native API: https://reactnative.dev/docs/api
- Express.js Guide: https://expressjs.com
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas

---

**Ready to connect?** Start with step 1 and test each endpoint as you implement it!
