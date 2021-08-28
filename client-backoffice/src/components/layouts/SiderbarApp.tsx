import { Layout, Menu } from "antd";
import React, { FC } from "react";
import {
  UserOutlined,
  ShopOutlined,
  CodeSandboxOutlined,
  AreaChartOutlined,
  FileTextOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const SiderbarApp: FC = () => {
  let history = useHistory();

  const handleClick = (e) => {
    e.key === "Dashboard" && history.push("/dashboard");
    e.key === "User" && history.push("/users");
    e.key === "Machine" && history.push("/machines");
    e.key === "Product" && history.push("/products");
    e.key === "Inventories" && history.push("/inventories");
    e.key === "Order" && history.push("/orders");
    e.key === "Alert" && history.push("/alerts");
  };
  return (
    <Layout.Sider collapsed>
      <div style={{ height: "32px", margin: "16px", background: "rgba(255, 255, 255, 0.2)" }} />
      <Menu theme="dark" mode="inline" onClick={handleClick}>
        <Menu.Item key="Dashboard" icon={<AreaChartOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="User" icon={<UserOutlined />}>
          User
        </Menu.Item>
        <Menu.Item key="Product" icon={<CodeSandboxOutlined />}>
          Product
        </Menu.Item>
        <Menu.Item key="Machine" icon={<ShopOutlined />}>
          Machine
        </Menu.Item>
        <Menu.Item key="Order" icon={<FileTextOutlined />}>
          Orders
        </Menu.Item>
        <Menu.Item key="Alert" icon={<BellOutlined />}>
          Alerts
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};

export default SiderbarApp;
