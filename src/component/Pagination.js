import React from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const renderPaginationButtons = () => {
    const buttons = [];

    for (let page = 1; page <= totalPages; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => paginate(page)}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-1 ${
            currentPage === page ? 'bg-blue-700' : ''
          }`}
        >
          {page}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="mt-4 flex justify-center">
      {currentPage > 1 && (
        <button
          onClick={() => paginate(currentPage - 1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-1"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
      )}
      {renderPaginationButtons()}
      {currentPage < totalPages && (
        <button
          onClick={() => paginate(currentPage + 1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-1"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Pagination;
