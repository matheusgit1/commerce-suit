import React from "react";
import { Result } from "antd";

export const WithoutContent: React.FC = () => {
  return (
    <React.Fragment>
      <Result
        status="404"
        // title="404"
        subTitle="Nada para mostrar nessa página."
      />
    </React.Fragment>
  );
};
