import { Modal, Select, Form, InputNumber, notification } from "antd";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useProductContext } from "../../context/ProductContext";
import { ParamsInterface } from "../../types";

const CreateInventory = (props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const params = useParams<ParamsInterface>();
  const { products, getProductsAll } = useProductContext();
  const [form] = Form.useForm();
  const { httpRequests } = useAuthContext();
  useEffect(() => {
    getProductsAll();
    // eslint-disable-next-line
  }, []);

  useImperativeHandle(ref, () => ({
    showModal: () => {
      setIsVisible(true);
    },
  }));

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  const onFinish = async (values: any) => {
    const _inventory = {
      productId: values.productId,
      shopId: parseInt(params.id),
      qyt: values.qyt,
    };
    await httpRequests.post("inventories", _inventory);
    notification.success({
      message: "Create Success",
    });
    props.fetchShop(params.id);
    setIsVisible(false);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal title="Create Inventory" visible={isVisible} onOk={handleOk} onCancel={handleCancel}>
      <Form
        form={form}
        name="Create Inventory"
        labelAlign="left"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="Product" name="productId" rules={[{ required: true, message: "Please input your Product!" }]}>
          <Select allowClear style={{ width: "100%" }} placeholder="Select Product">
            {products?.map((product) => (
              <Select.Option value={product.id}>{product.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Qyt" name="qyt" rules={[{ required: true, message: "Please input your Qyt!" }]}>
          <InputNumber placeholder="Qyt" style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.forwardRef(CreateInventory);
