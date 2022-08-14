import React from 'react'
import {Container, Title} from './verify-acount.styles'
import { Form } from '../../components'
import { useNavigate } from 'react-router-dom'
import {paths} from '../../mocks/paths'
import {useLocation} from 'react-router-dom';
import { AuthApi } from '../../services/auth-api'
import { useAuthContext } from '../../context'
import {  toast } from 'react-toastify';


interface props {}

export const VerifyAcount: React.FC<props> = ({}) => {

  const location = useLocation()
  const AuthContext = useAuthContext()
  const authApi = new AuthApi()
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
    try{
      const {data, status} = await authApi.verifyAcount({email, verifyCode})
      toast.success(data.mensagem)
      navigate(paths.login, {state:{email: email}})
    }catch(error: any){
      if(error.response.data.erro){
        toast.error(error.response.data.erro)
        return
      }
      toast.error("Erro interno")
      return
    }
  }

  //@ts-ignore
  const [email, setEmail] = React.useState<string>(location.state.email || '')
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
                <FormInput defaultValue={email}  placeholder="E-mail" type="email" required onChange={(e)=>setEmail(e.target.value)}/>
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