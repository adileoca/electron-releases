const Text = ({ children, size = "sm", additionalClass = "" }) => (
  <span className={`text-${size} ${additionalClass}`}>{children}</span>
);

export default Text;
