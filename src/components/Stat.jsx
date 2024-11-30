const Stat = ({ number, text }) => {
  return (
    <div className="w-20 h-20 rounded-full bg-apple-200 border border-apple-400 p-2 flex flex-col justify-center items-center">
      <div className="text-xl font-display text-apple-800 leading-5">
        {number}
      </div>
      <div className="text-xs text-apple-800 text-center">{text}</div>
    </div>
  );
};

export default Stat;
