import { create } from 'zustand'

const useUserStore = create((set) => ({
  user: null,
  token: null,

  setUser: (userData) => {
    localStorage.setItem('token', userData.token)
    localStorage.setItem('user', JSON.stringify(userData.user))
    set({ user: userData.user, token: userData.token })
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ user: null, token: null })
  },
}))

// ✅ Restore Zustand state on reload
const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

if (token && user && !useUserStore.getState().token) {
  useUserStore.setState({
    token,
    user: JSON.parse(user),
  })
}

export default useUserStore
