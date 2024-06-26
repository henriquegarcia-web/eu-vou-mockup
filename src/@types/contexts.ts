import { IAdminData, IUserData } from '@/@types/admin'

export interface IAdminContextData {
  isAdminLogged: boolean
  userData: IUserData | null
  adminData: IAdminData | null
  handleLogout: () => void
}
