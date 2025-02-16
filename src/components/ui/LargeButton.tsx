const LargeButton: React.FC<{
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => any;
  children: any;
}> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="mt-6 transition active:scale-95">
      <div className="w-full rounded-md border-t border-neutral-500 bg-neutral-600 py-1 transition hover:border-neutral-400 hover:bg-neutral-500 ">
        <span className="font-medium text-neutral-200">{children}</span>
      </div>
    </button>
  );
};

export default LargeButton;
