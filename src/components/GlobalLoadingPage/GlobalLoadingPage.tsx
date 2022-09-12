import React from "react";
import { Spin, Result, Typography } from "antd";
import { AppstoreTwoTone } from "@ant-design/icons";

export const GlobalLoadingPage: React.FC = () => {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flex: 1,
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Result
          icon={<AppstoreTwoTone spin width={200} />}
          title={
            <Typography.Title level={4} style={{ opacity: 0.6 }}>
              Carregando...
            </Typography.Title>
          }
        />
      </div>
    </React.Fragment>
  );
};
