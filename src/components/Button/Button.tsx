import React, { HTMLProps } from "react";

import { Container, StyledButton, ButtonStyleProps } from "./Button.styles";

export interface ButtonProps
  extends ButtonStyleProps,
    HTMLProps<HTMLButtonElement> {
  label: string;
}

export function Button({
  className,
  label,
  mode = "default",
  labelColor,
  fontSize,
  unitType = "rem",
  ...rest
}: ButtonProps) {
  return (
    <Container>
      {/* @ts-ignore */}
      <StyledButton
        mode={mode}
        labelColor={labelColor}
        fontSize={fontSize}
        unitType={unitType}
        {...rest}
        className={className}
      >
        {label}
      </StyledButton>
    </Container>
  );
}
