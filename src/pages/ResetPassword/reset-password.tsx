import React from "react";
import { message } from "antd";
import { Container, Title } from "./reset-password.styles";
import { Form } from "../../components";
import { useNavigate } from "react-router-dom";
import { paths } from "../../mocks/paths";
import { useAuthContext } from "../../context";
import { useLocation } from "react-router-dom";

interface props {}

export default function ResetPassword({}) {
  const navigate = useNavigate();
  const AuthContext = useAuthContext();

  const location = useLocation();

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
    FormFieldLabel,
  } = Form;

  const [email, setEmail] = React.useState<string>("");

  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await AuthContext.resetPassword({ email: email });
      message.success(response.data.mensagem);
      return;
    } catch (error: any) {
      if (error.response.data.erro) {
        message.error(error.response.data.erro);
        return;
      }
      message.error("Erro interno");
      return;
    }

    return;
  };
  // const [password, setPassword] = React.useState<string>('')

  return (
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
                <FormInput
                  placeholder="E-mail"
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormFieldset>

              {/* <FormFieldset>
                <FormFieldLabel>Senha</FormFieldLabel>
                <FormInput placeholder="senha" type="password" required onChange={(e)=>setPassword(e.target.value)} />
              </FormFieldset> */}

              <FormFieldset>
                <FormButton type="submit">Resetar senha</FormButton>
              </FormFieldset>

              <FormFieldset>
                <FormLink onClick={() => navigate(paths.login)}>
                  ou faça login
                </FormLink>
              </FormFieldset>
            </FormBody>
          </FormWrapper>
        </React.Fragment>
      </Container>
    </React.Fragment>
  );
}
