import { useCallback, useEffect, useRef, useState } from 'react'

import * as S from './styles'
import { TbHandClick } from 'react-icons/tb'
import { FaInstagram, FaLinkedin } from 'react-icons/fa'

import ImgCrop from 'antd-img-crop'
import { Upload } from 'antd'
import html2canvas from 'html2canvas'

import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import type { UploadChangeParam } from 'antd/es/upload'

import { useAdmin } from '@/contexts/AdminProvider'

import { beforeUpload, onPreview } from '@/utils/functions/imageUpload'

interface IClientDashboard {}

const ClientDashboard = ({}: IClientDashboard) => {
  const { adminData } = useAdmin()

  const [tempClientImage, setTempClientImage] = useState<string>('')
  const [clientImageUploaded, setTempClientImageUploaded] = useState<RcFile>()

  const clientDashboardPostRef = useRef<HTMLDivElement>(null)

  const handleChangeClientImage: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status !== 'uploading' && !!info.file.originFileObj) {
      const file = info.file.originFileObj as RcFile

      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = () => {
        const dataURL = reader.result
        setTempClientImage(dataURL as string)
        setTempClientImageUploaded(file)
      }
    }
  }

  const handleExportImage = useCallback(async () => {
    if (clientDashboardPostRef.current && adminData?.editor.image) {
      try {
        const response = await fetch(adminData.editor.image, { mode: 'cors' })
        const blob = await response.blob()
        const localUrl = URL.createObjectURL(blob)

        const imgElement = clientDashboardPostRef.current.querySelector('img')
        if (imgElement) {
          imgElement.src = localUrl
        }

        html2canvas(clientDashboardPostRef.current, {
          useCORS: true
        }).then((canvas) => {
          const dataUrl = canvas.toDataURL('image/png')
          const link = document.createElement('a')
          link.download = 'client-dashboard.png'
          link.href = dataUrl
          link.click()

          URL.revokeObjectURL(localUrl)
        })
      } catch (err) {
        console.error('Failed to download and export image:', err)
      }
    }
  }, [clientDashboardPostRef, adminData])

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

        <S.ClientDashboardPost ref={clientDashboardPostRef} id="print">
          {adminData && adminData.editor.image ? (
            <>
              <img src={adminData?.editor.image} alt="Post Image" />

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
                <ImgCrop rotationSlider>
                  <Upload
                    name="client-image"
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={handleChangeClientImage}
                    onPreview={onPreview}
                    className="client-image-upload"
                  >
                    {tempClientImage ? (
                      <img
                        src={tempClientImage}
                        alt="Client Image"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <div className="client-image-instructions">
                        <TbHandClick />
                        Clique aqui para adicionar sua foto
                      </div>
                    )}
                  </Upload>
                </ImgCrop>
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
