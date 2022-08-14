import React from 'react'
import {Container, Title} from './login.styles'
import { Form } from '../../components'
import { useNavigate } from 'react-router-dom'
import {paths} from '../../mocks/paths'
interface props {}

export const Login: React.FC<props> = ({}) => {
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
    console.log(email, password)
    return;
  }

  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  return(
    <React.Fragment>
      <Container>
        <React.Fragment>
          {/* <Title>COMMERCE-SUIT</Title> */}
          <FormWrapper>
            <FormHeader>
              <FormHeading>Login</FormHeading>
            </FormHeader>

            <FormBody onSubmit={onSubmit}>
              <FormFieldset>
                <FormFieldLabel>E-mail</FormFieldLabel>
                <FormInput  placeholder="E-mail" type="email" required onChange={(e)=>setEmail(e.target.value)}/>
              </FormFieldset>

              <FormFieldset>
                <FormFieldLabel>Senha</FormFieldLabel>
                <FormInput placeholder="senha" type="password" required onChange={(e)=>setPassword(e.target.value)} />
              </FormFieldset>

              <FormFieldset>
                <FormButton type="submit">Fazer login</FormButton>
              </FormFieldset>

              <FormFieldset>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                  <FormLink onClick={()=>navigate(paths.newAcount)}>não possui uma conta? crie uma<br/></FormLink>
                  <FormLink style={{marginTop: 20}} onClick={()=>navigate(paths.resetPassword)}>esqueceu sua senha? recupere-a aqui</FormLink>
                  <FormLink style={{marginTop: 20}} onClick={()=>navigate(paths.verifyAcount)}>verifique sua conta<br/></FormLink>
                </div>
              </FormFieldset>

              {/* <FormFieldset>
                <FormLink style={{marginTop: 20}} onClick={()=>navigate(paths.verifyAcount)}>verifique sua conta<br/></FormLink>
              </FormFieldset> */}
            </FormBody>
          </FormWrapper>
        </React.Fragment>

      </Container>
    </React.Fragment>
  )
}