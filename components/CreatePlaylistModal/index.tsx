import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Modal, Form, Input, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function CreatePlaylistModal() {
  const [form] = Form.useForm();
  const router = useRouter();

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = () => setVisible(true);

  const handleOk = async () => {
    let values;

    try {
      values = await form.validateFields();
    } catch (e) {
      console.log("Validate Failed:", e);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setVisible(false);
      form.resetFields();

      console.log(values);

      notification.success({
        key: "playlist_created",
        message: "Yaaaay!",
        description: "Your playlist has been created. Go check it out!",
        btn: (
          <Button
            type="primary"
            onClick={() => {
              notification.close("playlist_created");
              router.push("/day");
            }}
          >
            Go to your playlist
          </Button>
        ),
        duration: null
      });
    }, 5000);
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
    setLoading(false);
  };

  return (
    <>
      <Button
        type="primary"
        shape="round"
        icon={<PlusOutlined />}
        onClick={handleOpenModal}
      >
        Create new playlist
      </Button>
      <Modal
        visible={visible}
        title="Create new playlist"
        onOk={handleOk}
        onCancel={!loading ? handleCancel : undefined}
        closable={!loading}
        keyboard={!loading}
        footer={[
          <Button key="back" disabled={loading} onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Create
          </Button>
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_create_playlist_modal"
          initialValues={{ name: "", secret: "", publicKey: "" }}
        >
          <Form.Item
            name="name"
            label="Playlist name"
            rules={[
              {
                required: true,
                message: "Please input the name of your playlist"
              }
            ]}
          >
            <Input disabled={loading} />
          </Form.Item>
          <Form.Item
            name="secret"
            label="Secret password"
            extra="This secret password is for you only. It allows you to control the playlist."
            rules={[
              { required: true, message: "Please input the secret password" }
            ]}
          >
            <Input.Password disabled={loading} />
          </Form.Item>
          <Form.Item
            name="publicKey"
            label="Public key"
            extra="Give this key to your customers top add songs to the queue"
            rules={[{ required: true, message: "Please input the public key" }]}
          >
            <Input disabled={loading} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
