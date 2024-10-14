import { useState } from "react";
import AddProductModal from "./AddProductModal";
import EditRewardModal from "./EditRewardModal";
import ConfirmationModal from "./ConfirmationModal";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Switch } from "antd"; // Import the Switch component from Ant Design
import toast from "react-hot-toast";

const Table = () => {
  const [rewards, setRewards] = useState([]);
  const [days] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentReward, setCurrentReward] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleOpenEditModal = (reward) => {
    setCurrentReward(reward);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentReward(null);
  };

  const handleAddReward = (newReward) => {
    // Set active status to true by default when adding a new reward
    const rewardToAdd = { ...newReward, active: true };
    if (newReward.day === "All") {
      days.forEach((day) => {
        setRewards((prev) => [
          ...prev,
          { ...rewardToAdd, day, id: Date.now() + Math.random() },
        ]);
      });
    } else {
      setRewards((prev) => [...prev, rewardToAdd]);
    }
    handleCloseAddModal();
    toast.success("Reward added successfully!");
  };

  const handleEditReward = (updatedReward) => {
    setRewards((prev) =>
      prev.map((reward) =>
        reward.id === updatedReward.id ? updatedReward : reward
      )
    );
    handleCloseEditModal();
    toast.success("Reward updated successfully!");
  };

  const handleDeleteRow = (id) => {
    setCurrentReward(id);
    setIsConfirmationModalOpen(true);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const toggleActiveStatus = (id) => {
    setRewards((prev) =>
      prev.map((reward) =>
        reward.id === id ? { ...reward, active: !reward.active } : reward
      )
    );
    toast.success("Reward status updated successfully!");
  };

  return (
    <div className="relative overflow-x-auto shadow-lg sm:rounded-lg p-5 bg-gray-50">
      <div className="mb-4 flex justify-between">
        <button
          onClick={handleOpenAddModal}
          className="bg-[#f37360] text-white px-4 py-2 rounded ml-2 hover:translate-y-[-2px] transition-all duration-[0.5s] ease[ease]"
        >
          Add Reward
        </button>
        <select onChange={handleCategoryChange} className="border rounded p-2">
          <option value="All">All</option>
          <option value="Credit">Credit</option>
          <option value="Discount">Discount</option>
          <option value="Free Call">Free Call</option>
        </select>
      </div>

      {days.map((day) => (
        <div key={day} className="my-5 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 my-4">{day}</h2>
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="text-[#828a9d] bg-[#f1f3f6] uppercase">
              <tr>
                <th>Actions</th>
                <th>Users</th>
                {/* <th>Reward Name</th>             reward name */}
                <th>Category</th>
                {selectedCategory === "Credit" && <th>Credit Amount</th>}
                {selectedCategory === "Discount" && (
                  <>
                    <th>Discount Amount</th>
                    <th>Discount Type</th>
                    <th>Max Upto</th>
                  </>
                )}
                {selectedCategory === "Free Call" && <th>Free Call</th>}
                <th>Reward Expired</th>
                <th>Active</th> {/* New column for active status */}
              </tr>
            </thead>
            <tbody>
              {rewards
                .filter(
                  (reward) =>
                    reward.day === day &&
                    (selectedCategory === "All" ||
                      reward.category === selectedCategory)
                )
                .map((reward) => (
                  <tr key={reward.id}>
                    <td className="flex space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(reward)}
                        className="text-blue-600"
                      >
                        <AiOutlineEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteRow(reward.id)}
                        className="text-red-600"
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
                    <td>{reward.users}</td>
                    {/* <td>{reward.reward_name}</td>        reward name */}
                    <td>{reward.category}</td>
                    {selectedCategory === "Credit" && (
                      <td>{reward.creditAmount}</td>
                    )}
                    {selectedCategory === "Discount" && (
                      <>
                        <td>{reward.discountAmount}</td>
                        <td>{reward.discountType}</td>
                        <td>
                          {reward.discountType === "Upto Discount"
                            ? reward.maxUpto
                            : "-"}
                        </td>
                      </>
                    )}
                    {selectedCategory === "Free Call" && (
                      <td>{reward.freeCall ? "Yes" : "No"}</td>
                    )}
                    <td>{reward.rewardExpired || "-"}</td>
                    <td>
                      <Switch
                        checked={reward.active}
                        onChange={() => toggleActiveStatus(reward.id)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onAddProduct={handleAddReward}
        days={days}
      />

      <EditRewardModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        reward={currentReward}
        onEditReward={handleEditReward}
        days={days}
      />

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={() => {
          setRewards((prev) =>
            prev.filter((reward) => reward.id !== currentReward)
          );
          setIsConfirmationModalOpen(false);
          toast.success("Reward deleted successfully!");
        }}
      />
    </div>
  );
};

export default Table;

// old 001
