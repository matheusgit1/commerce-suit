import React from 'react'
import { message } from 'antd'
import { Container, Title } from './verify-acount.styles'
import { Form } from '../../components'
import { useNavigate } from 'react-router-dom'
import { paths } from '../../mocks/paths'
import { useLocation } from 'react-router-dom';
import { AuthApi } from '../../services/auth-api'
import { useAuthContext } from '../../context'


interface props { }

export default function VerifyAcount({ }) {

  const location = useLocation()
  const AuthContext = useAuthContext()
  const navigate = useNavigate()

  const {
    FormWrapper,
    FormHeader,
    FormHeading,
    FormBody,
    FormIcon,
    FormFieldset,
    FormInput,
    FormButton,
    FormLink,
    FormFieldLabel
  } = Form

  const onSubmit = async (event: any) => {
    event.preventDefault()
    try {
      const response = await AuthContext.verifyAcount({ email, verifyCode })
      message.success(response.data.mensagem)
      navigate(paths.login, { state: { email: email } })
      return;
    } catch (error: any) {
      if (error.response.data.erro) {
        message.error(error.response.data.erro)
        return
      }
      message.error("Erro interno")
      return
    }
  }

  const resentVerifyCode = async () => {
    if (email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      try {
        const response = await AuthContext.resentVerifyCode({ email })
        message.success(response.data.mensagem)
        return
      } catch (error: any) {
        if (error.response.data.erro) {
          message.error(error.response.data.erro)
          return
        }
        message.error("Erro interno")
        return
      }
    }
    message.error("Email inválido")
    return
  }

  //@ts-ignore
  const [email, setEmail] = React.useState<string>(location.state?.email || '')
  const [verifyCode, setVeirfyCode] = React.useState<string>('')

  return (
    <React.Fragment>

      <Container>
        <React.Fragment>
          {/* <Title>COMMERCE-SUIT</Title> */}
          <FormWrapper>
            <FormHeader>
              <FormHeading>Verificar conta</FormHeading>
            </FormHeader>

            <FormBody onSubmit={onSubmit}>
              <FormFieldset>
                <FormFieldLabel>E-mail</FormFieldLabel>
                <FormInput defaultValue={email} placeholder="E-mail" type="email" required onChange={(e) => setEmail(e.target.value)} />
              </FormFieldset>

              <FormFieldset>
                <FormFieldLabel>Código de verificação</FormFieldLabel>
                <FormInput placeholder="codigo de verificação" type="text" required onChange={(e) => setVeirfyCode(e.target.value)} />
              </FormFieldset>

              <FormFieldset>
                <FormButton type="submit">Verifcar conta</FormButton>
              </FormFieldset>

              <FormFieldset>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <FormLink onClick={() => navigate(paths.login)}>ou faça login</FormLink>
                  <FormLink onClick={() => resentVerifyCode()} style={{ marginTop: 20 }}>reenviar código</FormLink>
                </div>

              </FormFieldset>
            </FormBody>
          </FormWrapper>
        </React.Fragment>

      </Container>
    </React.Fragment>
  )
}