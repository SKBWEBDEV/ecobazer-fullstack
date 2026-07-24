import api from './axios'

export const registerUser = (payload) => 
  api.post('/register', payload)

export const loginUser = (payload) => 
  api.post('/login', payload)

export const verifyEmail = (token) =>
  api.post(`/verify-email/${token}`)

export const forgotPassword = (email) => 
  api.post('/forgot-password', { email })

export const resetPassword = (token, payload) => 
  api.post(`/reset-password/${token}`, payload)