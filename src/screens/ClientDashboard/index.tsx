import * as S from './styles'

import { Button } from 'antd'

import { useAdmin } from '@/contexts/AdminProvider'

interface IClientDashboard {}

const ClientDashboard = ({}: IClientDashboard) => {
  const { adminData } = useAdmin()

  return (
    <S.ClientDashboard>
      <S.ClientDashboardWrapper>
        <S.ClientDashboardPost>
          <img src={adminData?.editor.image} alt="" />
          <S.ClientDashboardPostSelection
            width={adminData?.editor.size.width || 0}
            height={adminData?.editor.size.height || 0}
            top={adminData?.editor.position.top || 0}
            right={adminData?.editor.position.right || 0}
            bottom={adminData?.editor.position.bottom || 0}
            left={adminData?.editor.position.left || 0}
            iscircle={adminData?.editor.border.isCircle ? 1 : 0}
            bordertopleft={adminData?.editor.border.topLeft || 0}
            bordertopright={adminData?.editor.border.topRight || 0}
            borderbottomright={adminData?.editor.border.bottomRight || 0}
            borderbottomleft={adminData?.editor.border.bottomLeft || 0}
          >
            Adicione sua foto aqui
          </S.ClientDashboardPostSelection>
        </S.ClientDashboardPost>
        <S.ClientDashboardExport>
          <Button>Exportar</Button>
        </S.ClientDashboardExport>
      </S.ClientDashboardWrapper>
    </S.ClientDashboard>
  )
}

export default ClientDashboard
