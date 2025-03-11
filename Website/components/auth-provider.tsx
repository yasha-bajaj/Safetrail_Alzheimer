"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

type AuthContextType = {
  isAuthenticated: boolean
  user: any | null
  signOut: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  signOut: () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      try {
        const authData = localStorage.getItem("safetrail-auth")
        if (authData) {
          const { authenticated, user } = JSON.parse(authData)
          setIsAuthenticated(authenticated)
          setUser(user)
        } else {
          setIsAuthenticated(false)
          setUser(null)
        }
      } catch (error) {
        setIsAuthenticated(false)
        setUser(null)
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  useEffect(() => {
    // Redirect logic
    if (!loading) {
      // If not authenticated and not on sign-in page, redirect to sign-in
      if (!isAuthenticated && pathname !== "/sign-in") {
        router.push("/sign-in")
      }

      // If authenticated and on sign-in page, redirect to home
      if (isAuthenticated && pathname === "/sign-in") {
        router.push("/")
      }
    }
  }, [isAuthenticated, loading, pathname, router])

  const signOut = () => {
    localStorage.removeItem("safetrail-auth")
    setIsAuthenticated(false)
    setUser(null)
    router.push("/sign-in")
  }

  return <AuthContext.Provider value={{ isAuthenticated, user, signOut }}>{children}</AuthContext.Provider>
}

