import React, { FC } from "react";
import { Layout } from "antd";
import SiderbarApp from "./SiderbarApp";
import HeaderbarApp from "./HeaderbarApp";

const LayoutApp: FC = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderbarApp />
      <Layout>
        <HeaderbarApp />
        <Layout.Content style={{ padding: "0.5rem" }}>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};

export default LayoutApp;
