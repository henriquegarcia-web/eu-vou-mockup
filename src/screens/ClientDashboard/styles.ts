import styled, { css } from 'styled-components'
import { IEditorSelection, Screen } from '@/utils/styles/globals'

export const ClientDashboard = styled(Screen)`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 50px;

  background-repeat: no-repeat;
  background-image: url(https://xlabmeetup.com.br/wp-content/uploads/2023/12/bg-header.jpg);
  background-position: center;
  background-size: cover;
`

export const ClientDashboardHeader = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 70px;
  padding: 0 20px;

  background-color: black;
`

export const ClientDashboardHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  height: 100%;

  img {
    height: 65%;
  }

  ul {
    display: flex;
    column-gap: 20px;

    li {
      list-style: none;

      a {
        font-size: 13px;
        line-height: 13px;
        font-weight: 500;

        color: white;
      }
    }
  }
`

export const ClientDashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 30px;
  width: 100%;
  max-width: 700px;
`

export const ClientDashboardHeadline = styled.h2`
  font-size: 24px;
  line-height: 32px;
  font-weight: 300;
  letter-spacing: 0.5px;
  text-align: center;

  color: white;
`

export const ClientDashboardLabel = styled.h3`
  font-size: 16px;
  line-height: 22px;
  font-weight: 300;
  letter-spacing: 0.5px;
  text-align: center;

  color: white;
`

export const ClientDashboardPost = styled.div`
  position: relative;
  display: flex;
  width: fit-content;
  height: fit-content;

  img {
    width: 320px;
    height: 320px;
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
  cursor: pointer;
  transition: 0.3s;

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

  border: 1px solid rgba(255, 255, 255, 1);
  background-color: rgba(255, 255, 255, 0.4);

  &:hover {
    backdrop-filter: blur(8px);
  }

  .client-image-instructions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 15px;

    font-size: 14px;
    line-height: 18px;
    font-weight: 600;
    text-align: center;
    color: rgba(0, 0, 0, 0.9);

    svg {
      font-size: 40px;
      color: rgba(0, 0, 0, 0.9);
    }
  }

  .ant-upload.ant-upload-select {
    overflow: hidden !important;

    width: ${({ width }) => `${width}px`} !important;
    height: ${({ height }) => `${height}px`} !important;

    border-top-left-radius: ${({ bordertopleft }) =>
      `${bordertopleft}px`} !important;
    border-top-right-radius: ${({ bordertopright }) =>
      `${bordertopright}px`} !important;
    border-bottom-right-radius: ${({ borderbottomright }) =>
      `${borderbottomright}px`} !important;
    border-bottom-left-radius: ${({ borderbottomleft }) =>
      `${borderbottomleft}px`} !important;

    ${({ iscircle }) =>
      iscircle &&
      css`
        border-radius: 100% !important;
      `}
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
  column-gap: 12px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 5px;
    padding: 15px 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;

    font-size: 14px;
    line-height: 14px;
    font-weight: 500;
    letter-spacing: 0.5px;

    svg {
      font-size: 20px;
      color: white;
    }

    color: white;

    &:nth-of-type(1) {
      background-color: #e4405f;
    }

    &:nth-of-type(2) {
      background-color: #0a66c2;
    }

    &:nth-of-type(3) {
      background-color: #f50062;
    }

    &:hover {
      opacity: 0.9;
    }
  }
`
