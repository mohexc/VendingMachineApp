import { Modal, Form, Input, InputNumber } from "antd";
import React, { useImperativeHandle, useState } from "react";

import { useAuthContext } from "../../context/AuthContext";
import { useProductContext } from "../../context/ProductContext";

// main
const CreateProduct = (props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [form] = Form.useForm();
  const { httpRequests } = useAuthContext();
  const { getProductsAll } = useProductContext();
  useImperativeHandle(ref, () => ({
    showModal: () => {
      setIsVisible(true);
    },
  }));

  const onFinish = async (values: any) => {
    await httpRequests.post("products", values);
    getProductsAll();
    setIsVisible(false);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    setIsVisible(false);
  };

  // const normFile = (e: any) => {
  //   console.log("Upload event:", e);
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e && e.fileList;
  // };
  return (
    <Modal title="Create Product" visible={isVisible} onOk={handleOk} onCancel={handleCancel}>
      <Form
        form={form}
        labelAlign="left"
        name="Create Product"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input your name!" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Price" name="price" rules={[{ required: true, message: "Please input your price!" }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Image" name="image" rules={[{ required: true, message: "Please input your image!" }]}>
          <Input />
        </Form.Item>
        {/* <Form.Item label="Image">
          <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a single or bulk upload.</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default React.forwardRef(CreateProduct);
