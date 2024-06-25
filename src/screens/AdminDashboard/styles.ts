import styled from 'styled-components'
import {
  Screen,
  adminHeader,
  adminMenu,
  pagePadding
} from '@/utils/styles/globals'

export const AdminDashboard = styled(Screen)`
  display: flex;
  flex-direction: column;
`

export const AdminDashboardHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${adminHeader};
  padding: 0 ${pagePadding};

  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`

export const AdminDashboardLogo = styled.h1`
  display: flex;
  justify-content: center;
  width: calc(${adminMenu} - ${pagePadding});
  padding-right: ${pagePadding};

  font-size: 20px;
  line-height: 20px;
  font-weight: 800;
`

export const AdminDashboardContent = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - ${adminHeader});
`

export const AdminDashboardMenu = styled.div`
  display: flex;
  width: ${adminMenu};
  height: 100%;
  padding: ${pagePadding};

  border-right: 1px solid rgba(0, 0, 0, 0.1);
`

export const AdminDashboardViews = styled.div`
  display: flex;
  width: calc(100% - ${adminMenu});
  height: 100%;
  padding: ${pagePadding};
`
