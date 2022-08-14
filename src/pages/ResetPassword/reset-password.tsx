import React from 'react'
import {Container, Title} from './reset-password.styles'
import { Form } from '../../components'
import { useNavigate } from 'react-router-dom'
import {paths} from '../../mocks/paths'
interface props {}

export const ResetPassword: React.FC<props> = ({}) => {
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
    console.log(email)
    return;
  }

  const [email, setEmail] = React.useState<string>('')
  // const [password, setPassword] = React.useState<string>('')

  return(
    <React.Fragment>
      <Container>
        <React.Fragment>
          {/* <Title>COMMERCE-SUIT</Title> */}
          <FormWrapper>
            <FormHeader>
              <FormHeading>Recuperação de senha</FormHeading>
            </FormHeader>

            <FormBody onSubmit={onSubmit}>
              <FormFieldset>
                <FormFieldLabel>E-mail</FormFieldLabel>
                <FormInput  placeholder="E-mail" type="email" required onChange={(e)=>setEmail(e.target.value)}/>
              </FormFieldset>

              {/* <FormFieldset>
                <FormFieldLabel>Senha</FormFieldLabel>
                <FormInput placeholder="senha" type="password" required onChange={(e)=>setPassword(e.target.value)} />
              </FormFieldset> */}

              <FormFieldset>
                <FormButton type="submit">Resetar senha</FormButton>
              </FormFieldset>

              <FormFieldset>
                <FormLink onClick={()=>navigate(paths.login)}>ou faça login</FormLink>
              </FormFieldset>
            </FormBody>
          </FormWrapper>
        </React.Fragment>

      </Container>
    </React.Fragment>
  )
}