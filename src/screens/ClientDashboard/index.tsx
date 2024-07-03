import { useCallback, useRef } from 'react'

import * as S from './styles'
import { TbHandClick } from 'react-icons/tb'
import { FaInstagram, FaLinkedin } from 'react-icons/fa'

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
      <S.ClientDashboardHeader>
        <S.ClientDashboardHeaderWrapper>
          <img
            src="http://xlabmeetup.com.br/wp-content/uploads/2024/03/logo.png"
            alt="Experience Lab"
            title=""
          />
          <ul>
            <li>
              <a
                href="https://xlabmeetup.com.br/#home"
                target="_blank"
                rel="noopener noreferrer"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="https://xlabmeetup.com.br/#sobre-nos"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sobre Nós
              </a>
            </li>
            <li>
              <a
                href="https://xlabmeetup.com.br/#palestrantes"
                target="_blank"
                rel="noopener noreferrer"
              >
                Palestrantes
              </a>
            </li>
            <li>
              <a
                href="https://xlabmeetup.com.br/#hosts"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hosts
              </a>
            </li>
            <li>
              <a
                href="https://xlabmeetup.com.br/#proximos-eventos"
                target="_blank"
                rel="noopener noreferrer"
              >
                Próximos Eventos
              </a>
            </li>
          </ul>
        </S.ClientDashboardHeaderWrapper>
      </S.ClientDashboardHeader>
      <S.ClientDashboardWrapper>
        <S.ClientDashboardHeadline>
          Crie um layout de post <b>#EuVou</b> exclusivo do evento, customizado
          com a sua imagem.
        </S.ClientDashboardHeadline>

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
                <TbHandClick />
                Clique aqui para adicionar sua foto
              </S.ClientDashboardPostSelection>
            </>
          ) : (
            <S.ClientDashboardPostLoading />
          )}
        </S.ClientDashboardPost>

        <S.ClientDashboardLabel>
          Clique no botão acima e escolha a sua melhor foto. Em seguida clique
          no botão abaixo e compartilhe em suas redes.
        </S.ClientDashboardLabel>

        <S.ClientDashboardExport>
          <button onClick={handleExportImage}>
            Compartilhar no <FaInstagram />
          </button>
          <button onClick={handleExportImage}>
            Compartilhar no <FaLinkedin />
          </button>
          <button onClick={handleExportImage}>Baixar Imagem</button>
        </S.ClientDashboardExport>
      </S.ClientDashboardWrapper>
    </S.ClientDashboard>
  )
}

export default ClientDashboard
