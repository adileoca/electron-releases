import {
  Popover as PopoverWrapper,
  PopoverButton,
  PopoverPanel,

} from "@headlessui/react";

const ViewHeaderPopover: React.FC<{
  children:
    | React.ReactNode
    | ((bag: { close: () => void }) => React.ReactElement);

  button: React.ReactNode;
}> = ({ children, button }) => {
  return (
    <PopoverWrapper className="clickable relative">
      <PopoverButton
        as="div"
        className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 focus:outline-none focus:ring-0"
      >
        {button}
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute left-0 z-50 mt-4 flex w-screen max-w-min  transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
      >
        {children}
      </PopoverPanel>
    </PopoverWrapper>
  );
};

export default ViewHeaderPopover;
