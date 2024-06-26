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
    width: string
    height: string
  }
  position: {
    top: string
    right: string
    bottom: string
    left: string
  }
  border: {
    isCircle: boolean
    topLeft: string
    topRight: string
    bottomRight: string
    bottomLeft: string
  }
}

export interface IEditorSettingsForm {
  width: string
  height: string
  top: string
  right: string
  bottom: string
  left: string
  isCircle: boolean
  borderTopLeft: string
  borderTopRight: string
  borderBottomRight: string
  borderBottomLeft: string
}

export interface IAdminData {
  editor: IEditorSettings
}
