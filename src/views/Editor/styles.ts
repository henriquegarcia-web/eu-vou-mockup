import styled, { css } from 'styled-components'
import { Form } from 'antd'
import { IEditorSelection } from '@/utils/styles/globals'

const editorMenu = '280px'
const editorMenuFooter = '40px'

export const Editor = styled.div`
  display: flex;
  column-gap: 15px;
  width: 100%;
`

export const EditorMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: ${editorMenu};
  height: 100%;
`

export const EditorMenuForm = styled(Form)`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  height: 100%;
`

export const FormWrapper = styled.div<{ scroll: number }>`
  display: flex;
  width: 100%;
  height: calc(100% - ${editorMenuFooter});
  overflow: auto;
  padding-right: ${({ scroll }) => (scroll ? '10px' : '0px')};

  &::-webkit-scrollbar {
    width: 4px;
    border-radius: 10px;
    z-index: 1000;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.6);
  }
`

export const FormInputs = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  height: fit-content;
`

export const FormInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
`

export const FormInputsWrapperLabel = styled.div`
  display: flex;
  margin-bottom: 5px;

  font-size: 12px;
  line-height: 12px;
  font-weight: 600;
  text-transform: uppercase;

  color: rgba(0, 0, 0, 0.5);
`

export const FormSubmit = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  height: ${editorMenuFooter};
`

export const EditorView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - ${editorMenu});
  height: 100%;
`

export const EditorViewImageWrapper = styled.div`
  position: relative;
  display: flex;
  height: fit-content;

  img {
    width: 540px;
    height: 540px;
  }
`

export const EditorViewImageSelection = styled.div<IEditorSelection>`
  position: absolute;
  display: flex;

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

  border: 1px solid rgba(3, 223, 252, 1);
  background-color: rgba(3, 223, 252, 0.4);

  ${({ iscircle }) =>
    iscircle &&
    css`
      border-radius: 100%;
    `}
`
