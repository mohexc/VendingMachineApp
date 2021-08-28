import { Modal, Form, Input, notification } from "antd";
import React, { useImperativeHandle, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

const CreateMachine = (props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [form] = Form.useForm();
  const { httpRequests } = useAuthContext();

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
    console.log(values);
    await httpRequests.post("shops", values);
    props.fetchMachine();
    setIsVisible(false);
    notification.success({
      message: "Create Machine Success",
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // const normFile = (e: any) => {
  //   console.log("Upload event:", e);
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e && e.fileList;
  // };

  return (
    <Modal title="Create Machine" visible={isVisible} onOk={handleOk} onCancel={handleCancel}>
      <Form
        form={form}
        labelAlign="left"
        name="Create Machine"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input your name!" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Adress" name="address" rules={[{ required: true, message: "Please input your address!" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="image" name="image" rules={[{ required: true, message: "Please input your image!" }]}>
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

export default React.forwardRef(CreateMachine);
