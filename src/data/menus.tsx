import { FaPenToSquare } from 'react-icons/fa6'

import { Editor } from '@/views'

export interface IAdminMenus {
  menuId: string
  menuName: string
  menuIcon: React.ReactNode
  menuComponent: React.ReactNode
}

const adminMenusData: IAdminMenus[] = [
  {
    menuId: 'admin-menu-editor',
    menuName: 'Editor',
    menuIcon: <FaPenToSquare />,
    menuComponent: <Editor />
  }
]

export { adminMenusData }
