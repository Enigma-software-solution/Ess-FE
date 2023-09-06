import React from "react";
import { Modal } from "antd";

const DeleteModal = ({
  visible,
  onOk,
  onCancel,
  itemName = "",
  okText = "Delete",
  cancelText = "Cancel",
}) => {
  return (
    <Modal
      visible={visible}
      title={`Delete ${itemName}`}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
    >
      <p>Are you sure you want to delete {itemName}?</p>
    </Modal>
  );
};

export default DeleteModal;
