import firebase from '@/firebase/firebase'

import { handleTranslateFbError } from '@/utils/functions/firebaseTranslateErrors'

import { message } from 'antd'

import {
  IAdminData,
  IEditorSettings,
  ISigninUser,
  IUserData
} from '@/@types/admin'

// ============================================== LOGIN

const handleSigninAdmin = async ({
  adminEmail,
  adminPassword
}: ISigninUser): Promise<boolean> => {
  try {
    await firebase.auth().signInWithEmailAndPassword(adminEmail, adminPassword)

    return true
  } catch (error: any) {
    const errorCode = error.code
    const traslatedError = handleTranslateFbError(errorCode)

    message.open({
      type: 'error',
      content: traslatedError
    })
    return false
  }
}

// ============================================== LOGOUT

const handleLogoutAdmin = async (): Promise<boolean> => {
  try {
    await firebase.auth().signOut()

    return true
  } catch (error: any) {
    message.open({
      type: 'error',
      content: 'Falha ao fazer logout'
    })

    return false
  }
}

// ============================================== HANDLE GET USER DATA

const handleGetUserData = (
  callback: (accountData: IUserData | null) => void
) => {
  const user = firebase.auth().currentUser

  if (!user) {
    callback(null)
    return
  }

  const adminsRef = firebase.database().ref('adminAccounts/' + user.uid)

  const listener = (snapshot: any) => {
    try {
      if (snapshot && snapshot.exists()) {
        const companyData = snapshot.val()
        callback(companyData)
      } else {
        callback(null)
      }
    } catch (error) {
      message.open({
        type: 'error',
        content: 'Falha ao obter dados da empresa'
      })
    }
  }

  const offCallback = () => {
    adminsRef.off('value', listener)
  }

  adminsRef.on('value', listener)

  return offCallback
}

// ============================================== HANDLE GET ADMIN DATA

const handleGetAdminData = (
  callback: (accountData: IAdminData | null) => void
) => {
  const user = firebase.auth().currentUser

  if (!user) {
    callback(null)
    return
  }

  const adminsRef = firebase.database().ref('adminSettings/')

  const listener = (snapshot: any) => {
    try {
      if (snapshot && snapshot.exists()) {
        const companyData = snapshot.val()
        callback(companyData)
      } else {
        callback(null)
      }
    } catch (error) {
      message.open({
        type: 'error',
        content: 'Falha ao obter dados da empresa'
      })
    }
  }

  const offCallback = () => {
    adminsRef.off('value', listener)
  }

  adminsRef.on('value', listener)

  return offCallback
}

// ============================================== HANDLE EDIT PASSWORD

const handleChangePasswordAdmin = async (
  currentPassword: string,
  newPassword: string
): Promise<boolean> => {
  try {
    const user = firebase.auth().currentUser

    if (!user?.email) {
      message.open({
        type: 'error',
        content: 'Você precisa estar logado para alterar a senha.'
      })
      return false
    }

    const credentials = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    )
    await user.reauthenticateWithCredential(credentials)

    await user.updatePassword(newPassword)

    message.open({
      type: 'success',
      content: 'Senha alterada com sucesso.'
    })

    return true
  } catch (error) {
    console.error('Erro ao alterar a senha: ', error)
    message.open({
      type: 'error',
      content:
        'Falha ao alterar a senha. Verifique a senha atual e tente novamente.'
    })
    return false
  }
}

// ============================================== UPDATE ADMIN INFOS

const handleUpdateEditorSettings = async (
  editorData: IEditorSettings
): Promise<boolean> => {
  try {
    const user = firebase.auth().currentUser

    if (!user) return false

    const userDataRef = firebase.database().ref(`adminSettings/`)
    await userDataRef.set({
      editor: editorData
    })

    message.open({
      type: 'success',
      content: 'Dados do editor salvos com sucesso.'
    })

    return true
  } catch (error) {
    console.error(error)

    message.open({
      type: 'error',
      content: 'Falha ao salvar dados do editor.'
    })

    return false
  }
}

// -----------------------------------------------------------------

export {
  handleSigninAdmin,
  handleLogoutAdmin,
  handleGetUserData,
  handleGetAdminData,
  handleUpdateEditorSettings,
  handleChangePasswordAdmin
}
