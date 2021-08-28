import { Modal, Form, Input, notification } from "antd";
import React, { useImperativeHandle, useState } from "react";

const CreateUser = (props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [form] = Form.useForm();

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

  const onFinish = (values: any) => {
    notification.success({
      message: JSON.stringify(values),
    });
    setIsVisible(false);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal title="Create User" visible={isVisible} onOk={handleOk} onCancel={handleCancel}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.forwardRef(CreateUser);
