import { Layout, Row, Col, Badge, Popover, Divider, Typography, notification } from "antd";
import { BellOutlined } from "@ant-design/icons";
import React, { FC } from "react";
import { useAlertContext } from "../../context/AlertContext";

const HeaderbarApp: FC = () => {
  const { alertNotread, updatedRead } = useAlertContext();
  const content = () =>
    alertNotread?.map((alert) => (
      <div>
        <p>{alert.description}</p>
        <Divider />
      </div>
    ));

  const handleMouseOver = () => {
    const ids = alertNotread?.map((alert) => alert.id);
    updatedRead(ids);
  };
  return (
    <Layout.Header style={{ background: "white" }}>
      <Row style={{ height: "100%" }}>
        <Col xs={8}></Col>
        <Col xs={8}></Col>
        <Col xs={8} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <Badge count={alertNotread?.length}>
            <Popover
              placement="bottomRight"
              title={<Typography.Title level={4}>Alert</Typography.Title>}
              content={content}
              trigger="click"
            >
              <BellOutlined style={{ fontSize: "1.2rem" }} onClick={handleMouseOver} />
            </Popover>
          </Badge>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default HeaderbarApp;
