const Pagination = ({ currentPage, totalPages, goToPage }) => {
  return (
    <div className="flex gap-3 justify-center flex-wrap m-6">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-zinc-300 h-10 px-4 rounded-md"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => goToPage(index + 1)}
          className={
            currentPage === index + 1
              ? "bg-apple-300 w-10 h-10 rounded-md"
              : "bg-zinc-300 w-10 h-10 rounded-md"
          }
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-zinc-300 h-10 px-4 rounded-md"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
