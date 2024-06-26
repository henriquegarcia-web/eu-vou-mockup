import styled, { css } from 'styled-components'
import { IEditorSelection, Screen } from '@/utils/styles/globals'

export const ClientDashboard = styled(Screen)`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ClientDashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`

export const ClientDashboardPost = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  max-height: 500px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const ClientDashboardPostLoading = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 8px;

  border: 2px solid rgba(0, 0, 0, 0.2);
`

export const ClientDashboardPostSelection = styled.div<IEditorSelection>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;

  font-size: 16px;
  line-height: 16px;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.8);

  backdrop-filter: blur(5px);

  right: ${({ right }) => `${right}px`};
  bottom: ${({ bottom }) => `${bottom}px`};
  /* left: ${({ left }) => `${left}px`};
  top: ${({ top }) => `${top}px`}; */

  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};

  border-top-left-radius: ${({ bordertopleft }) => `${bordertopleft}px`};
  border-top-right-radius: ${({ bordertopright }) => `${bordertopright}px`};
  border-bottom-right-radius: ${({ borderbottomright }) =>
    `${borderbottomright}px`};
  border-bottom-left-radius: ${({ borderbottomleft }) =>
    `${borderbottomleft}px`};

  border: 4px solid rgba(3, 223, 252, 1);
  background-color: rgba(3, 223, 252, 0.4);

  &:hover {
    backdrop-filter: blur(8px);
  }

  ${({ iscircle }) =>
    iscircle &&
    css`
      border-radius: 100%;
    `}
`

export const ClientDashboardExport = styled.div`
  display: flex;
  justify-content: flex-end;
`
