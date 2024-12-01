const Stat = ({ number, text }) => {
  return (
    <div className="w-20 h-20 rounded-full bg-zinc-50  shadow p-2 flex flex-col justify-center items-center">
      <div className="text-xl font-display text-zinc-700 leading-5">
        {number}
      </div>
      <div className="text-xs text-zinc-600 text-center">{text}</div>
    </div>
  );
};

export default Stat;
