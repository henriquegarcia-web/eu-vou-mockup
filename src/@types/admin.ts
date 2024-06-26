export interface IUserData {
  adminId: string
  adminName: string
  adminEmail: string
}

export interface ISigninUser {
  adminEmail: string
  adminPassword: string
}

export interface IEditorSettings {
  image: string
  size: {
    width: number
    height: number
  }
  position: {
    top: number
    right: number
    bottom: number
    left: number
  }
  border: {
    isCircle: boolean
    topLeft: number
    topRight: number
    bottomRight: number
    bottomLeft: number
  }
}

export interface IEditorSettingsForm {
  width: number
  height: number
  top: number
  right: number
  bottom: number
  left: number
  isCircle: boolean
  borderTopLeft: number
  borderTopRight: number
  borderBottomRight: number
  borderBottomLeft: number
}

export interface IAdminData {
  editor: IEditorSettings
}
