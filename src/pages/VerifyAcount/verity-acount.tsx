import React from 'react'
import {Container, Title} from './verify-acount.styles'
import { Form } from '../../components'
import { useNavigate } from 'react-router-dom'
import {paths} from '../../mocks/paths'
interface props {}

export const VerifyAcount: React.FC<props> = ({}) => {
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

  const onSubmit = (event: any) => {
    event.preventDefault()
    console.log(email, verifyCode)
    return;
  }

  const [email, setEmail] = React.useState<string>('')
  const [verifyCode, setVeirfyCode] = React.useState<string>('')

  return(
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
                <FormInput  placeholder="E-mail" type="email" required onChange={(e)=>setEmail(e.target.value)}/>
              </FormFieldset>

              <FormFieldset>
                <FormFieldLabel>Código de verificação</FormFieldLabel>
                <FormInput placeholder="codigo de verificação" type="text" required onChange={(e)=>setVeirfyCode(e.target.value)} />
              </FormFieldset>

              <FormFieldset>
                <FormButton type="submit">Verifcar conta</FormButton>
              </FormFieldset>

              <FormFieldset>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                  <FormLink onClick={()=>navigate(paths.login)}>ou faça login</FormLink>
                  <FormLink style={{marginTop: 20}}>reenviar código</FormLink>
                </div>
               
              </FormFieldset>
            </FormBody>
          </FormWrapper>
        </React.Fragment>

      </Container>
    </React.Fragment>
  )
}