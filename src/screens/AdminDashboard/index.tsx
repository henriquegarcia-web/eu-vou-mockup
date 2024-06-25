import { useState } from 'react'

import * as S from './styles'

import { Button } from 'antd'

import { adminMenusData } from '@/data/menus'

interface IAdminDashboard {}

const AdminDashboard = ({}: IAdminDashboard) => {
  const [activeMenu, setActiveMenu] = useState(adminMenusData[0])

  return (
    <S.AdminDashboard>
      <S.AdminDashboardHeader>
        <S.AdminDashboardLogo>EuVou Mockup</S.AdminDashboardLogo>
      </S.AdminDashboardHeader>
      <S.AdminDashboardContent>
        <S.AdminDashboardMenu>
          {adminMenusData.map((menu) => {
            const isActive = activeMenu.menuId === menu.menuId
            return (
              <Button
                key={menu.menuId}
                type={isActive ? 'primary' : 'default'}
                icon={menu.menuIcon}
                onClick={() => setActiveMenu(menu)}
                style={{ width: '100%' }}
              >
                {menu.menuName}
              </Button>
            )
          })}
        </S.AdminDashboardMenu>
        <S.AdminDashboardViews>
          {activeMenu.menuComponent}
        </S.AdminDashboardViews>
      </S.AdminDashboardContent>
    </S.AdminDashboard>
  )
}

export default AdminDashboard
