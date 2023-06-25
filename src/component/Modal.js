import React from 'react';

const Modal = ({ isOpen, onClose, moves }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0"></div>
      <div className="bg-white w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-lg shadow-xl p-4 sm:p-6 md:p-8 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 relative overflow-y-hidden border-2 border-grey-500">
        <h3 className="text-lg font-bold mb-4">Moves</h3>
        <ul className="overflow-auto max-h-60 sm:max-h-80">
          {moves.map((move) => (
            <li
              key={move.move.name}
              className="text-base hover:bg-gray-100 hover:shadow-md hover:cursor-pointer transition duration-300 ease-in-out py-2 px-4 rounded"
            >
              {move.move.name}
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
