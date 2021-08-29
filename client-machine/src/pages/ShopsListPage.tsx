import { Card, Row, Col, Typography } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";
import { Shop } from "../types";

const ShopsListPage: FC = () => {
  const [shops, setShops] = useState<Shop[] | undefined>();
  const { httpRequests } = useAuthContext();
  const history = useHistory();
  const { clearCart } = useCartContext();
  useEffect(() => {
    getShopAll();
    clearCart();
    // eslint-disable-next-line
  }, []);
  const getShopAll = async () => {
    const { data } = await httpRequests.get("shops");
    setShops(data);
  };
  return (
    <div>
      <Card style={{ marginBottom: "1rem" }}>
        <Typography.Title level={3}>Vending Machine</Typography.Title>
      </Card>
      <Row gutter={[16, 16]}>
        {shops?.map((shop) => (
          <Col key={JSON.stringify(shop)} lg={4}>
            <Card hoverable onClick={() => history.push(`/shops/${shop.id}`)}>
              <Typography.Title level={4}>{shop.name}</Typography.Title>
              <p>Address: {shop.address}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ShopsListPage;
