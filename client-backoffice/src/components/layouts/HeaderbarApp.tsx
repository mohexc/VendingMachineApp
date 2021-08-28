import { Layout, Row, Col } from "antd";
import { BellOutlined } from "@ant-design/icons";
import React, { FC } from "react";

const HeaderbarApp: FC = () => {
  return (
    <Layout.Header style={{ background: "white" }}>
      <Row style={{ height: "100%" }}>
        <Col xs={8}></Col>
        <Col xs={8}></Col>
        <Col xs={8} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <BellOutlined style={{ fontSize: "1.2rem" }} />
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default HeaderbarApp;
