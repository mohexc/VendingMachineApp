import { Card, Col, Input, Row, Select, Table, Typography } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { Alert } from "../../types";

const AlertsListPage: FC = () => {
  const history = useHistory();
  const [alerts, setAlerts] = useState<Alert[] | undefined>();
  const { httpRequests } = useAuthContext();
  useEffect(() => {
    getAlertsAll();
    // eslint-disable-next-line
  }, []);

  const getAlertsAll = async () => {
    const { data } = await httpRequests.get("alert");
    setAlerts(data);
  };

  const handleSelect = (value, record) => {
    value === "View" && history.push(`/alerts/${record}`);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Shop",
      dataIndex: "shop",
      key: "shop",
      render: (text) => <p>{text.name}</p>,
    },
    {
      title: "Address",
      dataIndex: "shop",
      key: "shop",
      render: (text) => <p>{text.address}</p>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Create_At",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Operation",
      key: "operation",
      dataIndex: "id",
      width: "10%",
      render: (record) => (
        <Select placeholder="Operation" style={{ width: "100%" }} onSelect={(e) => handleSelect(e, record)}>
          <Select.Option value="View">View</Select.Option>
          <Select.Option value="Edit">Edit</Select.Option>
          <Select.Option value="Delete">Delete</Select.Option>
        </Select>
      ),
    },
  ];

  if (!alerts) {
    return <p>Loading...</p>;
  }
  return (
    <Card style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
      <Row gutter={16} style={{ marginBottom: "0.5rem" }}>
        <Col xs={10}>
          <Typography.Title level={3}>Alerts</Typography.Title>
        </Col>
        <Col xs={{ span: 10, offset: 4 }}>
          <Input.Search bordered enterButton />
        </Col>
      </Row>
      <Table rowKey={(record) => record.id} bordered dataSource={alerts} columns={columns} />
    </Card>
  );
};

export default AlertsListPage;
