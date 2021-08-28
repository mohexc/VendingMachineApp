import { Card, Col, Row, Typography } from "antd";
import React, { FC } from "react";

const DashboardPage: FC = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
            <Typography.Title level={4}>Users</Typography.Title>
            <br />
            <p>New Today : 10</p>
            <p>Total : 90</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
            <Typography.Title level={4}>Machines</Typography.Title>
            <br />
            <p>New Today : 10</p>
            <p>Total : 90</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
            <Typography.Title level={4}>Inventory</Typography.Title>
            <br />
            <p>New Today : 10</p>
            <p>Total : 90</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
            <Typography.Title level={4}>Products</Typography.Title>
            <br />
            <p>New Today : 10</p>
            <p>Total : 90</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
            <Typography.Title level={4}>Orders</Typography.Title>
            <br />
            <p>New Today : 10</p>
            <p>Total : 90</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
            <Typography.Title level={4}>Alert</Typography.Title>
            <br />
            <p>New Today : 10</p>
            <p>Total : 90</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
