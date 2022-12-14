import React from "react";
import { message } from "antd";
import { Container, Title } from "./login.styles";
import { Form } from "../../components";
import { useNavigate } from "react-router-dom";
import { paths } from "../../mocks/paths";
import { AuthApi } from "../../services/auth-api";
import { useAuthContext } from "../../context";
import { useLocation } from "react-router-dom";

interface props {}

export default function Login({}) {
  const AuthContext = useAuthContext();

  const navigate = useNavigate();
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

  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await AuthContext.login({
        email: email,
        password: password,
      });
      AuthContext.createUser(response.data);
      message.success("Bem vindo!");
      navigate(paths.home);
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

  //@ts-ignore
  const [email, setEmail] = React.useState<string>(location.state?.email || "");
  const [password, setPassword] = React.useState<string>("");

  return (
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
                <FormInput
                  defaultValue={email}
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
                <FormButton type="submit">Fazer login</FormButton>
              </FormFieldset>

              <FormFieldset>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <FormLink onClick={() => navigate(paths.newAcount)}>
                    n??o possui uma conta? crie uma
                    <br />
                  </FormLink>
                  <FormLink
                    style={{ marginTop: 20 }}
                    onClick={() => navigate(paths.resetPassword)}
                  >
                    esqueceu sua senha? recupere-a aqui
                  </FormLink>
                  <FormLink
                    style={{ marginTop: 20 }}
                    onClick={() => navigate(paths.verifyAcount)}
                  >
                    verifique sua conta
                    <br />
                  </FormLink>
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
  );
}
