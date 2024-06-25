import * as S from './styles'
import { FaPenToSquare } from 'react-icons/fa6'

import { View } from '@/components'

interface IEditor {}

const Editor = ({}: IEditor) => {
  return (
    <View
      title="Editor"
      legend="Aqui é uma legenda para a view de editor"
      icon={<FaPenToSquare />}
    >
      <S.Editor></S.Editor>
    </View>
  )
}

export default Editor
