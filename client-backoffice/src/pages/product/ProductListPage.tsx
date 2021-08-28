import { Button, Card, Col, Input, Row, Select, Table, Typography } from "antd";
import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import CreateProduct from "../../components/product/CreateProduct";
import { useProductContext } from "../../context/ProductContext";
import { CreateModalRef } from "../../types";

const ProductListPage = () => {
  const { products, getProductsAll } = useProductContext();
  const history = useHistory();
  const createUserRef = useRef<CreateModalRef>(null);

  useEffect(() => {
    getProductsAll();
    // eslint-disable-next-line
  }, []);

  const handleSelect = (value, record) => {
    value === "View" && history.push(`/products/${record}`);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
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

  if (!products) {
    return <p>Loading</p>;
  }
  return (
    <Card style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
      <Row gutter={16} style={{ marginBottom: "0.5rem" }}>
        <Col xs={10}>
          <Typography.Title level={3}>Products</Typography.Title>
        </Col>
        <Col xs={10}>
          <Input.Search bordered enterButton />
        </Col>
        <Col xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button block type="primary" onClick={() => createUserRef.current?.showModal()}>
            Create
          </Button>
          <CreateProduct ref={createUserRef} />
        </Col>
      </Row>
      <Table rowKey={(record) => record.id} bordered dataSource={products} columns={columns} />
    </Card>
  );
};

export default ProductListPage;
