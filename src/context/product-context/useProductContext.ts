import React from "react";
import { ProductContext } from "./index";

export const useProductContext = () => {
  const values = React.useContext(ProductContext);
  return values;
};
