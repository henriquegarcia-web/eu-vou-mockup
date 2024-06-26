import { useEffect, useMemo, useRef, useState } from 'react'

import * as S from './styles'
import { FaPenToSquare } from 'react-icons/fa6'

import { View } from '@/components'
import ImgCrop from 'antd-img-crop'
import { Button, Checkbox, Input, Upload } from 'antd'
import { PlusOutlined, InfoCircleOutlined } from '@ant-design/icons'

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

import firebase from '@/firebase/firebase'

import type { CheckboxProps } from 'antd'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import type { UploadChangeParam } from 'antd/es/upload'

import useScrollbar from '@/hooks/useScrollbar'
import { useAdmin } from '@/contexts/AdminProvider'
import {
  IAdminData,
  IEditorSettings,
  IEditorSettingsForm
} from '@/@types/admin'
import { handleUpdateEditorSettings } from '@/firebase/auth'
import { beforeUpload, onPreview } from '@/utils/functions/imageUpload'

const editorSettingsSchema = Yup.object().shape({
  width: Yup.string().required(),
  height: Yup.string().required(),
  top: Yup.string().required(),
  right: Yup.string().required(),
  bottom: Yup.string().required(),
  left: Yup.string().required(),
  isCircle: Yup.boolean().required(),
  borderTopLeft: Yup.string().required(),
  borderTopRight: Yup.string().required(),
  borderBottomRight: Yup.string().required(),
  borderBottomLeft: Yup.string().required()
})

interface IEditor {}

const Editor = ({}: IEditor) => {
  const { adminData } = useAdmin()

  const [checked, setChecked] = useState(true)

  const [updatingCompany, setUpdatingCompany] = useState(false)

  const [tempCompanyImage, setTempCompanyImage] = useState<string>('')
  const [companyImageUploaded, setTempCompanyImageUploaded] = useState<RcFile>()
  const [companyImageModified, setCompanyImageModified] = useState(false)

  const [saveButtonEnable, setSaveButtonEnable] = useState(false)

  const editorWrapperRef = useRef(null)

  const toggleChecked = () => {
    setChecked(!checked)
  }

  const submitEdition = (e: any) => {
    e.preventDefault()
  }

  const onChange: CheckboxProps['onChange'] = (e) => {
    console.log('checked = ', e.target.checked)
    setChecked(e.target.checked)
  }

  // ========================================================= START IMAGE CONTROL

  const handleChangeCompanyImage: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status !== 'uploading' && !!info.file.originFileObj) {
      const file = info.file.originFileObj as RcFile

      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = () => {
        const dataURL = reader.result
        setTempCompanyImage(dataURL as string)
        setTempCompanyImageUploaded(file)

        setCompanyImageModified(true)
      }
    }
  }

  // ========================================================= END IMAGE CONTROL

  const { control, handleSubmit, reset, setValue, getValues, formState } =
    useForm({
      mode: 'all',
      resolver: yupResolver(editorSettingsSchema)
    })

  const { errors } = formState

  const handleUpdate = async (data: IEditorSettingsForm) => {
    try {
      setUpdatingCompany(true)

      let postUrl = ''

      if (companyImageUploaded) {
        const uniqueFileName = `${Date.now()}_${companyImageUploaded.name}`

        const storageRef = firebase.storage().ref(`/posts/${uniqueFileName}`)
        await storageRef.put(companyImageUploaded)

        postUrl = await storageRef.getDownloadURL()

        if (adminData && adminData?.editor?.image) {
          const storageRef = firebase
            .storage()
            .refFromURL(adminData?.editor?.image)
          storageRef.delete().catch((error) => {
            console.error('Erro ao excluir imagem anterior:', error)
          })
        }
      }

      await handleUpdateEditorSettings({
        image: postUrl || tempCompanyImage,
        size: {
          width: data.width,
          height: data.height
        },
        position: {
          top: data.top,
          right: data.right,
          bottom: data.bottom,
          left: data.left
        },
        border: {
          isCircle: data.isCircle,
          topLeft: data.borderTopLeft,
          topRight: data.borderTopRight,
          bottomRight: data.borderBottomRight,
          bottomLeft: data.borderBottomLeft
        }
      })

      setCompanyImageModified(false)
      setSaveButtonEnable(false)
    } finally {
      setUpdatingCompany(false)
    }
  }

  useEffect(() => {
    if (adminData) {
      setTempCompanyImage(adminData.editor.image || '')

      // setValue('companyName', companyInfo?.companyName || '')
      // setValue('companyId', companyInfo?.companyId || '')
      // setValue('companyDescription', companyInfo?.companyDescription || '')
    }
  }, [adminData, setValue])

  // const handleFieldChange = () => {
  //   const formData = getValues()
  //   const companyInfo = adminData?.adminCompanyInfo

  //   const companyNameChanged = formData.companyName !== companyInfo?.companyName
  //   const companyIdChanged = formData.companyId !== companyInfo?.companyId
  //   const companyDescriptionChanged =
  //     formData.companyDescription !== companyInfo?.companyDescription

  //   setSaveButtonEnable(
  //     companyNameChanged || companyIdChanged || companyDescriptionChanged
  //   )
  // }

  const formData = getValues()

  useEffect(() => {
    if (companyImageModified) {
      setSaveButtonEnable(companyImageModified)
    }
  }, [companyImageModified])

  const [containerHasScrollbar] = useScrollbar(editorWrapperRef)

  return (
    <View
      title="Editor"
      legend="Aqui é uma legenda para a view de editor"
      icon={<FaPenToSquare />}
    >
      <S.Editor>
        <S.EditorMenu>
          <S.EditorMenuForm
            layout="vertical"
            onFinish={handleSubmit(submitEdition)}
          >
            <S.FormWrapper
              ref={editorWrapperRef}
              scroll={containerHasScrollbar ? 1 : 0}
            >
              <S.FormInputs>
                <S.FormInputsWrapper>
                  <S.FormInputsWrapperLabel>Imagem</S.FormInputsWrapperLabel>

                  <ImgCrop rotationSlider>
                    <Upload
                      name="company-image"
                      listType="picture-card"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={handleChangeCompanyImage}
                      onPreview={onPreview}
                      className="company_image"
                    >
                      {tempCompanyImage ? (
                        <img
                          src={tempCompanyImage}
                          alt="avatar"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      ) : (
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8, fontSize: 13 }}>
                            Add Imagem
                          </div>
                        </div>
                      )}
                    </Upload>
                  </ImgCrop>
                </S.FormInputsWrapper>

                <S.FormInputsWrapper>
                  <S.FormInputsWrapperLabel>Formato</S.FormInputsWrapperLabel>
                  <Controller
                    name="width"
                    control={control}
                    rules={{ required: 'Este campo é obrigatório' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        addonBefore="Largura"
                        suffix="px"
                        defaultValue={0}
                      />
                    )}
                  />
                  <Controller
                    name="height"
                    control={control}
                    rules={{ required: 'Este campo é obrigatório' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        addonBefore="Altura"
                        suffix="px"
                        defaultValue={0}
                      />
                    )}
                  />
                </S.FormInputsWrapper>

                <S.FormInputsWrapper>
                  <S.FormInputsWrapperLabel>
                    Posicionamento
                  </S.FormInputsWrapperLabel>
                  <Controller
                    name="top"
                    control={control}
                    rules={{ required: 'Este campo é obrigatório' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        addonBefore="Cima"
                        suffix="px"
                        defaultValue={0}
                      />
                    )}
                  />
                  <Controller
                    name="right"
                    control={control}
                    rules={{ required: 'Este campo é obrigatório' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        addonBefore="Direita"
                        suffix="px"
                        defaultValue={0}
                      />
                    )}
                  />
                  <Controller
                    name="bottom"
                    control={control}
                    rules={{ required: 'Este campo é obrigatório' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        addonBefore="Baixo"
                        suffix="px"
                        defaultValue={0}
                      />
                    )}
                  />
                  <Controller
                    name="left"
                    control={control}
                    rules={{ required: 'Este campo é obrigatório' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        addonBefore="Esquerda"
                        suffix="px"
                        defaultValue={0}
                      />
                    )}
                  />
                </S.FormInputsWrapper>

                <S.FormInputsWrapper>
                  <S.FormInputsWrapperLabel>Bordas</S.FormInputsWrapperLabel>
                  <Controller
                    name="isCircle"
                    control={control}
                    rules={{ required: 'Este campo é obrigatório' }}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      >
                        Círculo
                      </Checkbox>
                    )}
                  />

                  <Controller
                    name="borderTopLeft"
                    control={control}
                    rules={{ required: 'Este campo é obrigatório' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        addonBefore="Borda Cima-Esquerda"
                        suffix="px"
                        defaultValue={0}
                      />
                    )}
                  />
                  <Controller
                    name="borderTopRight"
                    control={control}
                    rules={{ required: 'Este campo é obrigatório' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        addonBefore="Borda Cima-Direita"
                        suffix="px"
                        defaultValue={0}
                      />
                    )}
                  />
                  <Controller
                    name="borderBottomRight"
                    control={control}
                    rules={{ required: 'Este campo é obrigatório' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        addonBefore="Borda Baixo-Direita"
                        suffix="px"
                        defaultValue={0}
                      />
                    )}
                  />
                  <Controller
                    name="borderBottomLeft"
                    control={control}
                    rules={{ required: 'Este campo é obrigatório' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        addonBefore="Borda Baixo-Esquerda"
                        suffix="px"
                        defaultValue={0}
                      />
                    )}
                  />
                </S.FormInputsWrapper>
              </S.FormInputs>
            </S.FormWrapper>
            <S.FormSubmit>
              <Button disabled type="primary" htmlType="submit">
                Publicar
              </Button>
            </S.FormSubmit>
          </S.EditorMenuForm>
        </S.EditorMenu>
        <S.EditorView>
          <S.EditorViewImageWrapper>
            <img src="/postMockup.jpeg" alt="" />
            <S.EditorViewImageSelection
              width={formData.width}
              height={formData.height}
              top={formData.top}
              right={formData.right}
              bottom={formData.bottom}
              left={formData.left}
              isCircle={formData.isCircle}
              borderTopLeft={formData.borderTopLeft}
              borderTopRight={formData.borderTopRight}
              borderBottomRight={formData.borderBottomRight}
              borderBottomLeft={formData.borderBottomLeft}
            />
          </S.EditorViewImageWrapper>
        </S.EditorView>
      </S.Editor>
    </View>
  )
}

export default Editor
