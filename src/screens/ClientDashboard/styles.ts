import styled, { css } from 'styled-components'
import {
  IEditorSelection,
  Screen,
  responsiveTablet
} from '@/utils/styles/globals'

export const ClientDashboard = styled(Screen)`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 50px;

  background-repeat: no-repeat;
  background-image: url(https://xlabmeetup.com.br/wp-content/uploads/2023/12/bg-header.jpg);
  background-position: center;
  background-size: cover;

  background-color: black;
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

  span {
    display: none;

    a {
      svg {
        font-size: 22px;
        color: white;
      }
    }
  }

  @media screen and (max-width: ${responsiveTablet}) {
    ul {
      display: none;
    }

    span {
      display: flex;
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
  padding: 0 20px;
`

export const ClientDashboardHeadline = styled.h2`
  font-size: 30px;
  line-height: 38px;
  font-weight: 200;
  letter-spacing: 0.5px;
  text-align: center;
  font-style: italic;

  color: white;

  b {
    font-weight: 600;
  }
`

export const ClientDashboardLabel = styled.h3`
  font-size: 15px;
  line-height: 22px;
  font-weight: 200;
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
    width: 100%;
    max-width: 540px;
    height: auto;
  }
`

export const ClientDashboardPostLoading = styled.div`
  position: relative;
  display: flex;
  width: 540px;
  height: 540px;
  border-radius: 4px;

  border: 2px solid rgba(255, 0, 100, 1);
  background-color: rgba(255, 0, 100, 0.2);
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
    row-gap: 5px;

    font-size: 12px;
    line-height: 13px;
    font-weight: 600;
    text-align: center;
    color: rgba(0, 0, 0, 0.9);

    svg {
      font-size: 30px;
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
    position: relative;
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
    background-color: #f50062;

    /* &:nth-of-type(1) {
      background-color: #e4405f;
    }

    &:nth-of-type(2) {
      background-color: #0a66c2;
    }

    &:nth-of-type(3) {
      background-color: #f50062;
    } */

    &:hover {
      opacity: 0.9;
    }

    &:disabled {
      cursor: default;
    }
  }
`

export const ExportButtonLock = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  border-radius: 100px;

  background-color: rgb(140, 140, 140);

  svg {
    font-size: 15px !important;

    color: rgb(20, 20, 20);
  }
`
