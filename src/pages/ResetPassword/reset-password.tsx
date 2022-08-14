import React from 'react'
import {Container, Title} from './reset-password.styles'
import { Form } from '../../components'
import { useNavigate } from 'react-router-dom'
import {paths} from '../../mocks/paths'
import { useAuthContext } from '../../context'
import {  toast } from 'react-toastify';
import {useLocation, } from 'react-router-dom';

interface props {}

export const ResetPassword: React.FC<props> = ({}) => {
  const navigate = useNavigate()
  const AuthContext = useAuthContext()
  
  const location = useLocation()

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

  const [email, setEmail] = React.useState<string>('')

  const onSubmit = async (event: any) => {
    event.preventDefault()
    try{
      const response = await AuthContext.resetPassword({email: email})
      toast.success(response.data.mensagem)
      console.log(response.data)
      return;
    }catch(error: any){
      if(error.response.data.erro){
        toast.error(error.response.data.erro)
        return
      }
      toast.error("Erro interno")
      return
    }
    
    console.log(email)
    return;
  }
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