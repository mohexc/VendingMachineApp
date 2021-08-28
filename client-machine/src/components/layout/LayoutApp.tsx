import { Layout } from "antd";
import React, { FC } from "react";

const LayoutApp: FC = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Content style={{ padding: "0.5rem" }}>{children}</Layout.Content>
    </Layout>
  );
};

export default LayoutApp;
