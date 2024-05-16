const Button = ({ Icon = null, onClick = null, label }) => (
  <button
    className="flex items-center rounded-md border border-neutral-300 px-3 py-1 shadow-sm shadow-neutral-200"
    onClick={onClick}
  >
    {Icon && <Icon className="h-4 pr-2 text-neutral-600" />}
    <span className="text-sm font-medium text-neutral-600">{label}</span>
  </button>
);

export default Button;
