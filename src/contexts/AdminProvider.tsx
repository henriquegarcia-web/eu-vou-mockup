import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import firebase from '@/firebase/firebase'

import { IAdminContextData } from '@/@types/contexts'
import { IAdminData, IUserData } from '@/@types/admin'

import {
  handleGetAdminData,
  handleGetUserData,
  handleLogoutAdmin
} from '@/firebase/auth'

export const AdminContext = createContext<IAdminContextData>(
  {} as IAdminContextData
)

const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  // ========================================================================

  const [userId, setUserId] = useState<string | null>(null)
  const [userData, setUserData] = useState<IUserData | null>(null)
  const [adminData, setAdminData] = useState<IAdminData | null>(null)

  const isAdminLogged = useMemo(() => {
    return !userId
  }, [userId])

  // -----------------------------------------------------------------

  const handleLogout = useCallback(async () => {
    const response = await handleLogoutAdmin()
    if (!response) return

    setUserId(null)
    setUserData(null)
  }, [])

  // -----------------------------------------------------------------

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(async (user: any) => {
        if (user) {
          const uid = user.uid
          setUserId(uid)
        } else {
          setUserId(null)
          setUserData(null)
          handleLogout()
        }
      })

    return () => unsubscribe()
  }, [handleLogout])

  useEffect(() => {
    const unsubscribe = handleGetUserData((accountData) => {
      setUserData(accountData)
    })

    if (unsubscribe) {
      return () => {
        unsubscribe()
      }
    }
  }, [userId])

  useEffect(() => {
    const unsubscribe = handleGetAdminData((accountData) => {
      setAdminData(accountData)
    })

    if (unsubscribe) {
      return () => {
        unsubscribe()
      }
    }
  }, [userId])

  // ========================================================================

  const AdminContextData: IAdminContextData = useMemo(() => {
    return {
      isAdminLogged,
      userData,
      adminData,
      handleLogout
    }
  }, [isAdminLogged, userData, adminData])

  return (
    <AdminContext.Provider value={AdminContextData}>
      {children}
    </AdminContext.Provider>
  )
}

function useAdmin(): IAdminContextData {
  const context = useContext(AdminContext)

  if (!context) throw new Error('useAuth must be used within a UserProvider')

  return context
}

export { AdminProvider, useAdmin }
