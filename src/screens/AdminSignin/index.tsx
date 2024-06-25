import { useNavigate } from 'react-router-dom'

import * as S from './styles'

import { Input, Button } from 'antd'

interface IAdminSignin {}

const AdminSignin = ({}: IAdminSignin) => {
  const navigate = useNavigate()

  const handleSignin = (e: any) => {
    e.preventDefault()

    navigate('/admin')
  }

  return (
    <S.AdminSignin>
      <S.AdminSigninWrapper>
        <S.AdminSigninTitle>
          <b>Entrar</b>
        </S.AdminSigninTitle>
        <S.AdminSigninForm onSubmit={handleSignin}>
          <Input placeholder="Usuário" />
          <Input placeholder="Senha" />
          <Button type="primary" htmlType="submit">
            Entrar
          </Button>
        </S.AdminSigninForm>
      </S.AdminSigninWrapper>
    </S.AdminSignin>
  )
}

export default AdminSignin
