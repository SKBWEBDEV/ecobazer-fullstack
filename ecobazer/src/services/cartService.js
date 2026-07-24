import api from './axios'

export const addToCartApi = (proid, userId) => api.post('/cart', { proid, userId })

export const updateCartQtyApi = (id, type, userId) => api.post(`/cart/update/${id}`, { type, userId })

export const getCartApi = (userId) => api.get(`/cart/${userId}`)

export const removeFromCartApi = (id) => api.delete(`/cart/${id}`)
