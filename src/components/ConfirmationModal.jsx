import React from "react";
import { Modal, Button } from "antd";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal
      title="Confirmation"
      visible={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          No, cancel
        </Button>,
        <Button key="confirm" type="primary" danger onClick={onConfirm}>
          Yes, I'm sure
        </Button>,
      ]}
    >
      <div className="text-center">
        <svg
          className="mx-auto mb-4 text-gray-400 w-12 h-12"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <h3 className="mb-5 text-lg font-normal text-gray-500">
          Are you sure you want to delete this reward?
        </h3>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
