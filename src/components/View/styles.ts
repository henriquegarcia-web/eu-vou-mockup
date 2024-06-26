import styled from 'styled-components'
import { pagePadding, adminViewHeader } from '@/utils/styles/globals'

export const View = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  width: 100%;
  height: 100%;
  padding: ${pagePadding};
  border-radius: 8px;

  border: 1px solid rgba(0, 0, 0, 0.1);
`

export const ViewHeader = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  height: ${adminViewHeader};

  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`

export const ViewHeaderTitle = styled.h2`
  display: flex;
  align-items: center;
  column-gap: 8px;

  font-size: 18px;
  line-height: 18px;
  font-weight: 600;

  svg {
    font-size: 20px;
    margin-top: -4px;
  }
`

export const ViewHeaderLegend = styled.p`
  display: flex;

  font-size: 14px;
  line-height: 14px;
  font-weight: 300;

  color: rgba(0, 0, 0, 0.7);
`

export const ViewContent = styled.div`
  display: flex;
  height: calc(100% - ${adminViewHeader} - 30px);
`
