import React from 'react';

const Confirmation = ({ isOpen, onClose, message, confirmText, confirmColor, onCancel, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 2xl:w-1/5 rounded-lg shadow-lg p-6 relative overflow-y-hidden">
        <h3 className="text-lg font-bold mb-4">Confirmation</h3>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Go Back
          </button>
          <button
            onClick={onConfirm}
            className={`bg-${confirmColor}-500 hover:bg-${confirmColor}-700 text-white font-bold py-2 px-4 rounded`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
