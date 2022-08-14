import {
  FormWrapper,
  FormHeader,
  FormHeading,
  FormBody,
  FormIcon,
  FormFieldset,
  FormInput,
  FormOptionsItem,
  FormOptions,
  FormOptionsNote,
  FormButton,
  FormLink
} from "./form.styles";

const Form = () => {
  return (
    <div className="App">
      <FormWrapper>
        <FormHeader>
          <FormHeading>Sign in</FormHeading>
        </FormHeader>

        <FormBody>
          <FormFieldset>
            <FormInput placeholder="Username" type="text" required />
          </FormFieldset>

          <FormFieldset>
            <FormInput placeholder="E-mail" type="text" required />
          </FormFieldset>

          <FormFieldset>
            <FormInput placeholder="Password" type="password" required />
            <FormIcon className="fa fa-eye" eye small />
          </FormFieldset>

          <FormFieldset>
            <FormOptionsNote>Or sign up with</FormOptionsNote>

            <FormOptions>
              <FormOptionsItem>
                <FormIcon className="fab fa-google" big />
              </FormOptionsItem>

              <FormOptionsItem>
                <FormIcon className="fab fa-twitter" big />
              </FormOptionsItem>

              <FormOptionsItem>
                <FormIcon className="fab fa-facebook" big />
              </FormOptionsItem>
            </FormOptions>
          </FormFieldset>

          <FormFieldset>
            <FormButton type="button">Sign Up</FormButton>
          </FormFieldset>

          <FormFieldset>
            <FormLink>I already have an account</FormLink>
          </FormFieldset>
        </FormBody>
      </FormWrapper>
    </div>
  );
}
