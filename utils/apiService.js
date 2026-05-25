// API configuration and service

const API_BASE_URL = 'http://10.115.44.49:5000/api'

async function request(url, options = {}) {
  const res = await fetch(url, options)
  const text = await res.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch (e) {
    data = text
  }

  if (!res.ok) {
    const message = (data && data.message) || res.statusText || 'Request failed'
    const error = new Error(message)
    error.status = res.status
    error.data = data
    throw error
  }

  return data
}

export const apiService = {
  // Auth endpoints (as provided)
  register: async (userData) => {
    return await request(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
  },

  login: async (email, password) => {
    return await request(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
  },

   loginWithMpin: async (mobile, mpin) => {
    return await request(`${API_BASE_URL}/auth/login-mpin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobile,
        mpin,
      }),
    })
  },

  loginWithFingerprint: async (fingerprintId) => {
    return await request(`${API_BASE_URL}/auth/login-fingerprint`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fingerprintId,
      }),
    })
  },

  loginWithFace: async (faceId) => {
    return await request(`${API_BASE_URL}/auth/login-face`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        faceId,
      }),
    })
  },

  loginWithVoice: async (voiceId) => {
    return await request(`${API_BASE_URL}/auth/login-voice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        voiceId,
      }),
    })
  },

  logout: async (token, deviceId) => {
    return await request(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        deviceId,
      }),
    })
  },

  logoutAll: async (token) => {
    return await request(`${API_BASE_URL}/auth/logout-all`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },

  // Existing helpers left intact but using request for consistency
  getUserProfile: async (token) => {
    return await request(`${API_BASE_URL}/user/profile`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
  },

  updateProfile: async (token, profileData) => {
    return await request(`${API_BASE_URL}/user/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    })
  },

  getPhotos: async (token) => {
    return await request(`${API_BASE_URL}/gallery/photos`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
  },

  uploadPhoto: async (token, photo) => {
    const formData = new FormData()
    formData.append('file', photo)
    return await request(`${API_BASE_URL}/gallery/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
  },

  getVideos: async (token) => {
    return await request(`${API_BASE_URL}/videos`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
  },

  getNotes: async (token) => {
    return await request(`${API_BASE_URL}/notes`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
  },

  createNote: async (token, noteData) => {
    return await request(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(noteData),
    })
  },

  getNotesByDate: async (token, date) => {
    return await request(`${API_BASE_URL}/notes/date/${date}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
  },

  getMoodTracking: async (token) => {
    return await request(`${API_BASE_URL}/mood`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
  },

  addMoodEntry: async (token, moodData) => {
    return await request(`${API_BASE_URL}/mood`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(moodData),
    })
  },
}

export default apiService
