const Button: React.FC<{
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => any;
  children: any;
}> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="w-full transition active:scale-95 rounded-md border-t border-neutral-500 bg-neutral-600 px-2 py-[3px] hover:border-neutral-400 hover:bg-neutral-500 "
    >
      <div className="flex justify-center  h-full w-full items-center text-sm font-medium text-white/90">
        {children}
      </div>
    </button>
  );
};

export default Button;
