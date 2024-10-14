import React from "react";

const ViewRewardModal = ({ isOpen, onClose, reward }) => {
  if (!isOpen || !reward) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // Close modal on overlay click
    >
      <div
        className="bg-white rounded p-5 w-11/12 md:w-1/3"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
      >
        <h2 className="text-xl font-semibold mb-4">View Reward</h2>

        <p>
          <strong>Users:</strong> {reward.users}
        </p>
        <p>
          <strong>Reward Name:</strong> {reward.reward_name}
        </p>
        <p>
          <strong>Category:</strong> {reward.category}
        </p>
        <p>
          <strong>Credit Amount:</strong>{" "}
          {reward.category === "Credit" ? reward.creditAmount : "-"}
        </p>
        <p>
          <strong>Discount Amount:</strong>{" "}
          {reward.category === "Discount" ? reward.discountAmount : "-"}
        </p>
        <p>
          <strong>Discount Type:</strong>{" "}
          {reward.category === "Discount" ? reward.discountType : "-"}
        </p>
        <p>
          <strong>Max Upto:</strong>{" "}
          {reward.category === "Discount" &&
          reward.discountType === "Upto Discount"
            ? reward.maxUpto
            : "-"}
        </p>
        <p>
          <strong>Free Call:</strong> {reward.freeCall ? "Yes" : "No"}
        </p>
        <p>
          <strong>Reward Expired:</strong> {reward.rewardExpired || "-"}
        </p>

        <button
          onClick={onClose}
          className="bg-[#f37360] text-white px-4 py-2 rounded mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewRewardModal;
