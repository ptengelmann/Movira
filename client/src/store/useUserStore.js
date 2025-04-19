import { create } from 'zustand'

const useUserStore = create((set) => ({
  user: null,
  token: null,

  setUser: (userData) => set({ user: userData.user, token: userData.token }),
  logout: () => set({ user: null, token: null }),
}))

if (localStorage.getItem('token') && !useUserStore.getState().token) {
    const token = localStorage.getItem('token')
    // optionally decode and fetch user profile here
    useUserStore.setState({ token })
  }
  

export default useUserStore
