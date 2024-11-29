const Pagination = ({ currentPage, totalPages, goToPage }) => {
  return (
    <div className="flex gap-3 justify-center flex-wrap m-6">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-zinc-100 h-10 px-4 rounded-full shadow"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => goToPage(index + 1)}
          className={
            currentPage === index + 1
              ? "bg-apple-300 w-10 h-10 rounded-full shadow-inner-sm"
              : "bg-zinc-100 w-10 h-10 rounded-full shadow"
          }
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-zinc-100 h-10 px-4 rounded-full shadow"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
