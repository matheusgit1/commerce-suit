import React from 'react'
import {Container, Title} from './register.styles'
import { Form } from '../../components'
import {paths} from '../../mocks/paths'
import {useNavigate} from 'react-router-dom'
interface props {}

export const Register: React.FC<props> = ({}) => {
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
    console.log(email, password, confirmPassword, name, document, phone)
    return;
  }

  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [confirmPassword, setConfirmPassword] = React.useState<string>('')
  const [name, setName] = React.useState<string>('')
  const [document, setDocument] = React.useState<string>('')
  const [phone, setPhone] = React.useState<string>('')

  return(
    <React.Fragment>
      <Container>
        <React.Fragment>
          {/* <Title>COMMERCE-SUIT</Title> */}
          <FormWrapper>
            <FormHeader>
              <FormHeading>Nova Conta</FormHeading>
            </FormHeader>

            <FormBody onSubmit={onSubmit}>
              <FormFieldset>
                <FormFieldLabel>E-mail</FormFieldLabel>
                <FormInput  placeholder="E-mail" type="email" required onChange={(e)=>setEmail(e.target.value)}/>
              </FormFieldset>

              <FormFieldset>
                <FormFieldLabel>Nome</FormFieldLabel>
                <FormInput placeholder="nome" type="text" required onChange={(e)=>setName(e.target.value)} />
              </FormFieldset>

              <FormFieldset>
                <FormFieldLabel>Documento(cpf/cnpj)</FormFieldLabel>
                <FormInput placeholder="documento" type="text" required onChange={(e)=>setDocument(e.target.value)} />
              </FormFieldset>

              <FormFieldset>
                <FormFieldLabel>Telefone</FormFieldLabel>
                <FormInput placeholder="telefone" type="tel" required onChange={(e)=>setPhone(e.target.value)} />
              </FormFieldset>

              <FormFieldset>
                <FormFieldLabel>Senha</FormFieldLabel>
                <FormInput placeholder="senha" type="password" required onChange={(e)=>setPassword(e.target.value)} />
              </FormFieldset>

              <FormFieldset>
                <FormFieldLabel>Senha</FormFieldLabel>
                <FormInput placeholder="confirmação de senha" type="password" required onChange={(e)=>setConfirmPassword(e.target.value)} />
              </FormFieldset>

              <FormFieldset>
                <FormButton type="submit">Criar conta</FormButton>
              </FormFieldset>

              <FormFieldset>
                <FormLink onClick={()=>navigate(paths.login)}>Já possui uma conta? faça login</FormLink>
              </FormFieldset>
            </FormBody>
          </FormWrapper>
        </React.Fragment>

      </Container>
    </React.Fragment>
  )
}