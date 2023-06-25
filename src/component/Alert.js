import React, { useState } from 'react';

const Alert = ({ status, message, onClose }) => {
  let alertColor = 'green';
  let alertIcon = '';

  switch (status) {
    case 'success':
      alertColor = 'green';
      alertIcon = (
        <svg
          aria-hidden="true"
          className="flex-shrink-0 inline w-5 h-5 mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          ></path>
        </svg>
      );
      break;
    default:
      alertColor = 'red';
      alertIcon = (
        <svg
          aria-hidden="true"
          className="flex-shrink-0 inline w-5 h-5 mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-1a7 7 0 100-14 7 7 0 000 14zm-1-7a1 1 0 112 0v4a1 1 0 11-2 0v-4zm1-4a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          ></path>
        </svg>
      );
      break;
  }

  useState(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1000 + Math.floor(Math.random() * 3112313000));

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`flex p-4 mb-4 text-sm mx-auto text-${alertColor}-800 border border-${alertColor}-300 rounded-lg bg-${alertColor}-50 dark:bg-gray-800 dark:text-${alertColor}-400 dark:border-${alertColor}-800`}
      role="alert"
    >
      {alertIcon}
      <span className="sr-only">Info</span>
      <div>
        <span className="font-medium">{status === 'success' ? 'Sukses' : 'Gagal'} alert!</span> {message}
      </div>
      <button
        className="ml-auto text-gray-400 hover:text-gray-600 pl-6"
        onClick={onClose}
        aria-label="Close"
      >
        X
      </button>
    </div>
  );
};

export default Alert;
