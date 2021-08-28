import { Button, Card, Col, Input, Row, Select, Table, Typography } from "antd";
import React, { FC, useEffect, useRef, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import CreateInventory from "../../components/inventory/CreateInventory";
import { useMachineContext } from "../../context/MachineContext";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { CreateModalRef, Inventory, ParamsInterface, Shop } from "../../types";
import { useAuthContext } from "../../context/AuthContext";

// Main
const MachineDetailPage: FC = () => {
  const params = useParams<ParamsInterface>();
  const history = useHistory();
  const createInventoryRef = useRef<CreateModalRef>(null);
  const { getMachineByIdAndInventory } = useMachineContext();
  const [shop, setShop] = useState<Shop | undefined>();
  const { httpRequests } = useAuthContext();
  const [inventories, setInventories] = useState<Inventory[]>();

  useEffect(() => {
    fetchShop();
    // eslint-disable-next-line
  }, []);

  const handleSelect = (value, record) => {
    console.log(value);
  };

  const fetchShop = async () => {
    const _shop = await getMachineByIdAndInventory(params.id);
    setShop(_shop);
    const { data } = await httpRequests.get(`inventories/shop/${params.id}`);
    setInventories(data);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (product) => <p>{product.name}</p>,
    },
    {
      title: "Qyt",
      dataIndex: "qyt",
      key: "qyt",
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

  if (!shop) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <Card style={{ marginBottom: "0.5rem" }}>
        <Row>
          <Col xs={10}>
            <p>
              <ArrowLeftOutlined style={{ fontSize: "1.5rem", cursor: "pointer" }} onClick={() => history.goBack()} />
            </p>
            <Typography.Title level={4}>Infomation Machine</Typography.Title>
            <p>Name : {shop.name}</p>
            <p>Address : {shop.address}</p>
            <p>Create : {shop.created_at}</p>
            <p>Update : {shop.updated_at}</p>
          </Col>
          <Col xs={14} style={{ background: "grey" }}>
            <b>Map</b>
          </Col>
        </Row>
      </Card>
      <Card style={{}}>
        <Row gutter={[16, 16]} style={{ marginBottom: "0.5rem" }}>
          <Col xs={24} md={8} lg={10}>
            <Typography.Title level={4}>Inventory</Typography.Title>
          </Col>
          <Col xs={24} md={8} lg={10}>
            <Input.Search bordered enterButton />
          </Col>
          <Col xs={24} md={8} lg={4} style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button block type="primary" onClick={() => createInventoryRef.current?.showModal()}>
              Create
            </Button>
            <CreateInventory ref={createInventoryRef} fetchShop={fetchShop} />
          </Col>
        </Row>
        <Table dataSource={inventories} columns={columns} />
      </Card>
    </div>
  );
};

export default MachineDetailPage;
