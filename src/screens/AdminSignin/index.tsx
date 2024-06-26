import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'

import * as S from './styles'

import { Button, Input } from 'antd'

import { handleSigninAdmin } from '@/firebase/auth'

interface ISigninForm {
  adminEmail: string
  adminPassword: string
}

interface IAdminSignin {}

const AdminSignin = ({}: IAdminSignin) => {
  const navigate = useNavigate()

  const [signinIsLoading, setSigninIsLoading] = useState(false)

  const { control, handleSubmit, reset, formState } = useForm<ISigninForm>()

  const { isValid } = formState

  const handleSignin = async (data: ISigninForm) => {
    setSigninIsLoading(true)

    const signupAdminResponse = await handleSigninAdmin({
      adminEmail: data.adminEmail,
      adminPassword: data.adminPassword
    })

    setSigninIsLoading(false)

    if (signupAdminResponse) {
      reset()
      navigate('/admin/estabelecimento')
    }
  }

  return (
    <S.AdminSignin>
      <S.AdminSigninWrapper>
        <S.AdminSigninTitle>
          <b>Entrar</b>
        </S.AdminSigninTitle>
        <S.AdminSigninForm
          layout="vertical"
          onFinish={handleSubmit(handleSignin)}
        >
          <Controller
            name="adminEmail"
            control={control}
            rules={{ required: 'Este campo é obrigatório' }}
            render={({ field }) => <Input {...field} placeholder="E-mail" />}
          />
          <Controller
            name="adminPassword"
            control={control}
            rules={{ required: 'Este campo é obrigatório' }}
            render={({ field }) => (
              <Input.Password {...field} placeholder="Senha" />
            )}
          />
          <Button
            type="primary"
            htmlType="submit"
            loading={signinIsLoading}
            disabled={!isValid}
          >
            Entrar
          </Button>
        </S.AdminSigninForm>
      </S.AdminSigninWrapper>
    </S.AdminSignin>
  )
}

export default AdminSignin
