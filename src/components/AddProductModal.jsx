import { useState, useEffect } from "react";
import { Modal, Input, Select, Switch, Button } from "antd";
import toast from "react-hot-toast";

const { Option } = Select;

const AddProductModal = ({ isOpen, onClose, onAddProduct, days }) => {
  const [newReward, setNewReward] = useState({
    users: "",
    // reward_name: "", reward name
    category: "",
    discountAmount: "",
    discountType: "Flat Discount",
    maxUpto: "",
    creditAmount: "",
    freeCall: false,
    rewardExpired: "",
    day: "Select a Day",
    categoryEnabled: true, // Adding a switch for category
  });

  useEffect(() => {
    if (isOpen) {
      setNewReward({
        users: "",
        // reward_name: "", reward name
        category: "",
        discountAmount: "",
        discountType: "Flat Discount",
        maxUpto: "",
        creditAmount: "",
        freeCall: false,
        rewardExpired: "",
        day: "Select a Day",
        categoryEnabled: true, // Reset the switch when modal is opened
      });
    }
  }, [isOpen]);

  const handleInputChange = (value, field) => {
    setNewReward({ ...newReward, [field]: value });
  };

  const handleSubmit = () => {
    if (
      !newReward.users ||
      // !newReward.reward_name || reward name
      newReward.day === "Select a Day"
    ) {
      return toast.error("Please fill in all fields.");
    }
    onAddProduct({ ...newReward, id: Date.now() });
    onClose();
  };

  return (
    <Modal
      title="Add Reward"
      visible={isOpen}
      onCancel={onClose}
      footer={[
        <Button className="ant-btn" key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button className="ant-btn" key="submit" onClick={handleSubmit}>
          Add
        </Button>,
      ]}
    >
      <Select
        value={newReward.day}
        onChange={(value) => handleInputChange(value, "day")}
        className="w-full mb-2"
      >
        {/* <Option value="Select a Day">Select a Day</Option> */}
        <Option value="All">All</Option>
        {days.map((day) => {
          return (
            <Option key={day} value={day}>
              {day}
            </Option>
          );
        })}
      </Select>

      <Input
        value={newReward.users}
        onChange={(e) => handleInputChange(e.target.value, "users")}
        placeholder="Users"
        className="mb-2 ant-input"
      />

      {/* <Input
        value={newReward.reward_name}
        onChange={(e) => handleInputChange(e.target.value, "reward_name")}                 reward name
        placeholder="Reward Name"
        className="mb-2 ant-input"
      /> */}

      <Select
        value={newReward.category}
        onChange={(value) => handleInputChange(value, "category")}
        className="w-full mb-2"
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

      {newReward.category === "Credit" && (
        <Input
          type="number"
          value={newReward.creditAmount}
          onChange={(e) => handleInputChange(e.target.value, "creditAmount")}
          placeholder="Credit Amount"
          className="mb-2 ant-input"
        />
      )}

      {newReward.category === "Discount" && (
        <>
          <Input
            type="number"
            value={newReward.discountAmount}
            onChange={(e) =>
              handleInputChange(e.target.value, "discountAmount")
            }
            placeholder="Discount Amount"
            className="mb-2 ant-input"
          />
          <Select
            value={newReward.discountType}
            onChange={(value) => handleInputChange(value, "discountType")}
            className="w-full mb-2"
          >
            <Option value="Flat Discount">Flat Discount</Option>
            <Option value="Upto Discount">Upto Discount</Option>
          </Select>
          {newReward.discountType === "Upto Discount" && (
            <Input
              type="number"
              value={newReward.maxUpto}
              onChange={(e) => handleInputChange(e.target.value, "maxUpto")}
              placeholder="Max Upto"
              className="mb-2 ant-input"
            />
          )}
        </>
      )}

      {newReward.category === "Free Call" && (
        <div className="flex items-center mb-2">
          <span className="mr-2">Free Call</span>
          <Switch
            checked={newReward.freeCall}
            onChange={(checked) => handleInputChange(checked, "freeCall")}
          />
        </div>
      )}

      <Input
        value={newReward.rewardExpired}
        onChange={(e) => handleInputChange(e.target.value, "rewardExpired")}
        placeholder="Reward Expired Time"
        className="mb-2 ant-input"
      />
    </Modal>
  );
};

export default AddProductModal;

// old 001
