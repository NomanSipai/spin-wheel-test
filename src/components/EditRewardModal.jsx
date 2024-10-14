import React, { useState, useEffect } from "react";
import { Modal, Input, Select, Switch, Button } from "antd";

const { Option } = Select;

const EditRewardModal = ({ isOpen, onClose, reward, onEditReward, days }) => {
  const [editedReward, setEditedReward] = useState(null);

  useEffect(() => {
    if (isOpen && reward) {
      setEditedReward(reward); // Populate the state with the reward data
    }
  }, [isOpen, reward]);

  const handleInputChange = (value, field) => {
    setEditedReward({ ...editedReward, [field]: value });
  };

  const handleSubmit = () => {
    if (
      !editedReward.users ||
      // !editedReward.reward_name ||           reward name
      editedReward.day === "Select a Day"
    ) {
      return alert("Please fill in all fields.");
    }
    onEditReward(editedReward);
    onClose();
  };

  if (!editedReward) return null; // Ensure editedReward is not null

  return (
    <Modal
      title="Edit Reward"
      visible={isOpen}
      onCancel={onClose}
      footer={[
        <Button className="ant-btn" key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button className="ant-btn" key="submit" onClick={handleSubmit}>
          Update
        </Button>,
      ]}
    >
      <div className="mb-2">
        <label className="block mb-1">Select Day</label>
        <Select
          value={editedReward.day}
          onChange={(value) => handleInputChange(value, "day")}
          className="w-full"
        >
          <Option value="Select a Day">Select a Day</Option>
          <Option value="All">All</Option>
          {days.map((day) => (
            <Option key={day} value={day}>
              {day}
            </Option>
          ))}
        </Select>
      </div>

      <div className="mb-2">
        <label className="block mb-1">Users</label>
        <Input
          value={editedReward.users}
          onChange={(e) => handleInputChange(e.target.value, "users")}
          placeholder="Users"
          className="ant-input"
        />
      </div>

      {/* <div className="mb-2">         // reward name
        <label className="block mb-1">Reward Name</label>
        <Input
          value={editedReward.reward_name}
          onChange={(e) => handleInputChange(e.target.value, "reward_name")}
          placeholder="Reward Name"
          className="ant-input"
        />
      </div> */}

      <div className="mb-2">
        <label className="block mb-1">Category</label>
        <Select
          value={editedReward.category}
          onChange={(value) => handleInputChange(value, "category")}
          className="w-full"
        >
          <Option value="">Select Category</Option>
          <Option value="Credit">Credit</Option>
          <Option value="Discount">Discount</Option>
          <Option value="Free Call">Free Call</Option>
          <Option value="Better Luck Next Time">Better Luck Next Time</Option>
          <Option value="Spin Again">Spin Again</Option>
          <Option value="iPhone 16 Pro Max">iPhone 16 Pro Max</Option>{" "}
          {/* New Category */}
        </Select>
      </div>

      {editedReward.category === "Credit" && (
        <div className="mb-2">
          <label className="block mb-1">Credit Amount</label>
          <Input
            type="number"
            value={editedReward.creditAmount}
            onChange={(e) => handleInputChange(e.target.value, "creditAmount")}
            placeholder="Credit Amount"
            className="ant-input"
          />
        </div>
      )}

      {editedReward.category === "Discount" && (
        <>
          <div className="mb-2">
            <label className="block mb-1">Discount Amount</label>
            <Input
              type="number"
              value={editedReward.discountAmount}
              onChange={(e) =>
                handleInputChange(e.target.value, "discountAmount")
              }
              placeholder="Discount Amount"
              className="ant-input"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Discount Type</label>
            <Select
              value={editedReward.discountType}
              onChange={(value) => handleInputChange(value, "discountType")}
              className="w-full"
            >
              <Option value="Flat Discount">Flat Discount</Option>
              <Option value="Upto Discount">Upto Discount</Option>
            </Select>
          </div>
          {editedReward.discountType === "Upto Discount" && (
            <div className="mb-2">
              <label className="block mb-1">Max Upto</label>
              <Input
                type="number"
                value={editedReward.maxUpto}
                onChange={(e) => handleInputChange(e.target.value, "maxUpto")}
                placeholder="Max Upto"
                className="ant-input"
              />
            </div>
          )}
        </>
      )}

      {editedReward.category === "Free Call" && (
        <div className="mb-2 flex items-center">
          <label className="block mr-2">Free Call</label>
          <Switch
            checked={editedReward.freeCall}
            onChange={(checked) => handleInputChange(checked, "freeCall")}
          />
        </div>
      )}

      <div className="mb-2">
        <label className="block mb-1">Reward Expired Time</label>
        <Input
          value={editedReward.rewardExpired}
          onChange={(e) => handleInputChange(e.target.value, "rewardExpired")}
          placeholder="Reward Expired Time"
          className="ant-input"
        />
      </div>
    </Modal>
  );
};

export default EditRewardModal;

// old 001
