const ContentCard = ({ children }) => {
  return (
    <div className="h-fit bg-zinc-100 dark:bg-zinc-800 dark:border dark:border-zinc-700 shadow rounded-2xl p-6">
      {children}
    </div>
  );
};

export default ContentCard;
