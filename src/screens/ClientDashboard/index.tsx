import { useCallback, useRef } from 'react'
import * as S from './styles'

import { Button } from 'antd'
import { exportComponentAsPNG } from 'react-component-export-image'

import { useAdmin } from '@/contexts/AdminProvider'

interface IClientDashboard {}

const ClientDashboard = ({}: IClientDashboard) => {
  const { adminData } = useAdmin()

  const clientDashboardPostRef = useRef<HTMLDivElement>(null) // Referência para a div ClientDashboardPost

  // const handleExportImage = () => {
  //   if (clientDashboardPostRef.current) {
  //     const postElement = clientDashboardPostRef.current

  //     // Usa htmlToImage para capturar a imagem da div ClientDashboardPost
  //     // htmlToImage
  //     //   .toPng(postElement)
  //     //   .then(function (dataUrl) {
  //     //     // Cria um link temporário para download da imagem
  //     //     const link = document.createElement('a')
  //     //     link.download = 'client_dashboard_post.png'
  //     //     link.href = dataUrl
  //     //     document.body.appendChild(link)
  //     //     link.click()
  //     //     document.body.removeChild(link)
  //     //   })
  //     //   .catch(function (error) {
  //     //     console.error('Erro ao exportar imagem:', error)
  //     //   })
  //     htmlToImage.toPng(postElement).then(function (dataUrl) {
  //       download(dataUrl, 'my-node.png')
  //     })
  //   }
  // }

  const handleExportImage = useCallback(() => {
    if (clientDashboardPostRef.current === null) {
      return
    }

    exportComponentAsPNG(clientDashboardPostRef)

    // toPng(clientDashboardPostRef.current, { cacheBust: true })
    //   .then((dataUrl) => {
    //     const link = document.createElement('a')
    //     link.download = 'my-image-name.png'
    //     link.href = dataUrl
    //     link.click()
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  }, [clientDashboardPostRef])

  return (
    <S.ClientDashboard>
      <S.ClientDashboardWrapper>
        <S.ClientDashboardPost ref={clientDashboardPostRef}>
          {adminData && adminData.editor.image ? (
            <>
              <img src={adminData?.editor.image} alt="" />

              <S.ClientDashboardPostSelection
                width={adminData?.editor.size.width || 0}
                height={adminData?.editor.size.height || 0}
                top={adminData?.editor.position.top || 0}
                right={adminData?.editor.position.right || 0}
                bottom={adminData?.editor.position.bottom || 0}
                left={adminData?.editor.position.left || 0}
                iscircle={adminData?.editor.border.isCircle ? 1 : 0}
                bordertopleft={adminData?.editor.border.topLeft || 0}
                bordertopright={adminData?.editor.border.topRight || 0}
                borderbottomright={adminData?.editor.border.bottomRight || 0}
                borderbottomleft={adminData?.editor.border.bottomLeft || 0}
              >
                Adicione sua foto aqui
              </S.ClientDashboardPostSelection>
            </>
          ) : (
            <S.ClientDashboardPostLoading />
          )}
        </S.ClientDashboardPost>
        <S.ClientDashboardExport>
          <Button onClick={handleExportImage}>Exportar</Button>
        </S.ClientDashboardExport>
      </S.ClientDashboardWrapper>
    </S.ClientDashboard>
  )
}

export default ClientDashboard
