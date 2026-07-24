import toast from 'react-hot-toast'

// Centralized toast helpers so every page fires notifications the same way.
export const Toast = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  info: (message) => toast(message, { icon: '🌿' }),
  promise: (promise, messages) => toast.promise(promise, messages),
}

export default Toast
