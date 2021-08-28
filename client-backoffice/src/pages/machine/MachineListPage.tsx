import { Button, Card, Col, Input, Row, Select, Table, Typography } from "antd";
import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import CreateMachine from "../../components/machine/CreateMachine";
import { useMachineContext } from "../../context/MachineContext";

interface CreateMachine {
  showModal(): void;
}

const MachineListPage = () => {
  const { machines, getMachinesAll } = useMachineContext();
  const history = useHistory();
  const createMachineRef = useRef<CreateMachine>(null);

  useEffect(() => {
    getMachinesAll();
    // eslint-disable-next-line
  }, []);

  const handleSelect = (value: any, record: any) => {
    value === "View" && history.push(`/machines/${record}`);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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

  if (!machines) {
    return <p>Loading</p>;
  }
  return (
    <Card style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
      <Row gutter={16} style={{ marginBottom: "0.5rem" }}>
        <Col xs={10}>
          <Typography.Title level={3}>Machines</Typography.Title>
        </Col>
        <Col xs={10}>
          <Input.Search bordered enterButton />
        </Col>
        <Col xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button block type="primary" onClick={() => createMachineRef.current?.showModal()}>
            Create
          </Button>
          <CreateMachine ref={createMachineRef} fetchMachine={getMachinesAll} />
        </Col>
      </Row>
      <Table rowKey={(record) => record.id} bordered dataSource={machines} columns={columns} />
    </Card>
  );
};

export default MachineListPage;
