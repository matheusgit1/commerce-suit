import React, { useEffect } from "react";

import { Container, WrapperLinks, NavLink } from "./BurgerMenu.styles";

type BurgerMenuProps = {
  visibility: boolean;
  toggleMenuVisibility: () => void;
};

export function BurgerMenu({
  visibility,
  toggleMenuVisibility,
}: BurgerMenuProps) {
  useEffect(() => {
    document.body.style.overflow = visibility ? "hidden" : "auto";
  }, [visibility]);
  return (
    <Container $visibility={visibility} onClick={() => toggleMenuVisibility()}>
      <WrapperLinks
        $visibility={visibility}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <NavLink>Início</NavLink>
        <NavLink>Mapa de cobertura</NavLink>
        <NavLink>Recarga</NavLink>
        <NavLink>Portabilidade</NavLink>
        <NavLink>Ativar chip</NavLink>
        <NavLink>Meus pedidos</NavLink>
        <NavLink>Quem somos</NavLink>
      </WrapperLinks>
    </Container>
  );
}
