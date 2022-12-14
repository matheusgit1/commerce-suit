import React from "react";
import { message } from "antd";
import { Container, Title } from "./change-password.styles";
import { Form } from "../../components";
import { useNavigate } from "react-router-dom";
import { paths } from "../../mocks/paths";
import { useAuthContext } from "../../context";
import { useLocation, useParams } from "react-router-dom";

interface props {}

export default function ChangePasswordWithoutLogin({}) {
  const AuthContext = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

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

  const onSubmit = async (event: any) => {
    event.preventDefault();

    try {
      //@ts-ignore
      const { data } = await AuthContext.changePasswordWithoutLogin({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        token: params.token,
      });
      message.success(data.mensagem);
      navigate(paths.login);
      return;
    } catch (error: any) {
      if (error.response.data.erro) {
        message.error(error.response.data.erro);
        return;
      }
      message.error("Erro interno");
      return;
    }
  };

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");

  return (
    <React.Fragment>
      <Container>
        <React.Fragment>
          {/* <Title>COMMERCE-SUIT</Title> */}
          <FormWrapper>
            <FormHeader>
              <FormHeading>Troca de senha</FormHeading>
            </FormHeader>

            <FormBody onSubmit={(e) => onSubmit(e)}>
              <FormFieldset>
                <FormFieldLabel>E-mail</FormFieldLabel>
                <FormInput
                  placeholder="E-mail"
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormFieldset>

              <FormFieldset>
                <FormFieldLabel>Senha</FormFieldLabel>
                <FormInput
                  placeholder="senha"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormFieldset>

              <FormFieldset>
                <FormFieldLabel>confirma????o de senha</FormFieldLabel>
                <FormInput
                  placeholder="senha"
                  type="password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormFieldset>

              <FormFieldset>
                <FormButton type="submit">alterar senha</FormButton>
              </FormFieldset>

              <FormFieldset>
                <FormLink onClick={() => navigate(paths.newAcount)}>
                  n??o possui uma conta? crie uma
                </FormLink>
              </FormFieldset>
            </FormBody>
          </FormWrapper>
        </React.Fragment>
      </Container>
    </React.Fragment>
  );
}
