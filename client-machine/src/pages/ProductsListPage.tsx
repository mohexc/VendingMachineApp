import { Card, Typography, Row, Col, Button } from "antd";
import React, { FC, useEffect } from "react";
import { useCartContext } from "../context/CartContext";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import { ParamsInterface } from "../types";

const ProductsListPage: FC = () => {
  const { shop, getInvetories, getShop, inventories } = useShopContext();
  const { cart, addCartItem, removeCartItem, checkOut } = useCartContext();
  const params = useParams<ParamsInterface>();
  const allPrice = cart?.reduce((acc, currValue) => {
    const totalPriceCartItem = currValue.inventory.product.price * currValue.qyt;
    return acc + totalPriceCartItem;
  }, 0);

  useEffect(() => {
    getInvetories(params.id);
    getShop(params.id);
    // eslint-disable-next-line
  }, []);

  if (!shop) {
    return <p>Loading....</p>;
  }

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={16}>
          <Card>
            <Typography.Title level={3}>{shop.name}</Typography.Title>
          </Card>
          <Row gutter={[16, 16]} style={{ marginTop: "0.5rem" }}>
            {inventories?.map((inventory) => (
              <Col xs={6}>
                <Card style={{ height: 300, position: "relative" }}>
                  <p>
                    <b>{inventory.product.name}</b>
                  </p>
                  <p>Qyt : {inventory.qyt}</p>
                  <p>Price : {inventory.product.price}$</p>
                  <Button
                    type="primary"
                    style={{ position: "absolute", bottom: 0, width: "100%", left: 0 }}
                    onClick={() => addCartItem(inventory)}
                  >
                    Add to cart
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
        <Col xs={8}>
          <Card style={{ height: "97vh", position: "relative" }}>
            <Typography.Title level={3}>Cart</Typography.Title>
            {cart?.map((cartItem) => (
              <div style={{ marginBottom: "1rem" }}>
                <Row gutter={[16, 16]}>
                  <Col xs={16}>
                    <Typography.Title level={5}>{cartItem.inventory.product.name}</Typography.Title>
                  </Col>
                  <Col xs={8}>Price : {cartItem.inventory.product.price}</Col>
                </Row>

                <Row gutter={[16, 16]}>
                  <Col xs={6}>
                    <MinusCircleOutlined
                      style={{ fontSize: "1.5rem" }}
                      onClick={() => removeCartItem(cartItem.inventory)}
                    />
                  </Col>
                  <Col xs={4}>{cartItem.qyt}</Col>
                  <Col xs={6}>
                    <PlusCircleOutlined
                      style={{ fontSize: "1.5rem" }}
                      onClick={() => addCartItem(cartItem.inventory)}
                    />
                  </Col>
                  <Col xs={{ span: 8 }}>Total Price: {cartItem.inventory.product.price * cartItem.qyt}</Col>
                </Row>
              </div>
            ))}
            {cart && cart.length > 0 && (
              <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%" }}>
                <p style={{ marginLeft: "1rem" }}>
                  <b>All price : {allPrice}</b>
                </p>
                <Button type="primary" block onClick={() => checkOut(params.id)}>
                  Checkout
                </Button>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductsListPage;
