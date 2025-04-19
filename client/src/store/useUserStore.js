import { create } from 'zustand'

const useUserStore = create((set) => ({
  user: null,
  token: null,

  setUser: (userData) => set({ user: userData.user, token: userData.token }),
  logout: () => set({ user: null, token: null }),
}))

export default useUserStore
