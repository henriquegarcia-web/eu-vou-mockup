import * as S from './styles'

interface IView {
  title: string
  legend: string
  icon: React.ReactNode
  children: React.ReactNode
}

const View = ({ title, legend, icon, children }: IView) => {
  return (
    <S.View>
      <S.ViewHeader>
        <S.ViewHeaderTitle>
          {icon}
          {title}
        </S.ViewHeaderTitle>
        <S.ViewHeaderLegend>{legend}</S.ViewHeaderLegend>
      </S.ViewHeader>
      <S.ViewContent>{children}</S.ViewContent>
    </S.View>
  )
}

export default View
