import { Button, Card, Col, Input, Row, Select, Table, Typography } from "antd";
import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import CreateUser from "../../components/user/CreateUser";
import { useUserContext } from "../../context/UserContext";
import { CreateModalRef } from "../../types";

const UserListPage = () => {
  const { users, getUsersAll } = useUserContext();
  const history = useHistory();
  const createUserRef = useRef<CreateModalRef>(null);
  useEffect(() => {
    getUsersAll();
    // eslint-disable-next-line
  }, []);

  const handleSelect = (value, record) => {
    value === "View" && history.push(`/users/${record}`);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
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

  if (!users) {
    return <p>Loading</p>;
  }
  return (
    <Card style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
      <Row gutter={16} style={{ marginBottom: "0.5rem" }}>
        <Col xs={10}>
          <Typography.Title level={3}>Users</Typography.Title>
        </Col>
        <Col xs={10}>
          <Input.Search bordered enterButton />
        </Col>
        <Col xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={() => createUserRef.current?.showModal()} block type="primary">
            Create
          </Button>
          <CreateUser ref={createUserRef} />
        </Col>
      </Row>
      <Table rowKey={(record) => record.id} bordered dataSource={users} columns={columns} />
    </Card>
  );
};

export default UserListPage;
