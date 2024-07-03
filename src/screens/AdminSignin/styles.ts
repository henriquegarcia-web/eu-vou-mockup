import styled from 'styled-components'
import { Screen } from '@/utils/styles/globals'
import { Form } from 'antd'

export const AdminSignin = styled(Screen)`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const AdminSigninWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  width: 260px;
  padding: 25px 20px;
  border-radius: 8px;

  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);

  img {
    width: 70px;
    margin-bottom: 20px;
  }
`

export const AdminSigninTitle = styled.div`
  display: flex;
  margin-bottom: 15px;

  b {
    font-size: 18px;
    line-height: 18px;
    font-weight: 700;
    text-transform: uppercase;
  }
`

export const AdminSigninForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  row-gap: 5px;
`

export const AdminSigninFormAlert = styled.div`
  display: flex;
  margin: 10px 0 5px 0;

  font-size: 12px;
  line-height: 12px;
  font-weight: 500;

  color: rgba(0, 0, 0, 0.8);
`
