import { useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { formatDate } from "@/utils/format";
import DOMPurify from "dompurify";

const CollapsibleDemo = ({ mail }) => {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger
        asChild
        className="flex w-full cursor-pointer justify-between p-4 dark:bg-neutral-900/90"
      >
        <div className="flex w-full flex-col">
          <div className="flex items-center justify-between space-x-1">
            <div className="flex items-center space-x-1">
              {mail.from!.value[0].name && (
                <h1 className="text-lg font-semibold text-white/80">
                  {mail.from!.value[0].name}
                </h1>
              )}
              <span className="text-base font-normal text-white/60">
                {`<${mail.from!.value[0].address!}>`}
              </span>
            </div>
            <span className="text-white/80">
              {formatDate(String(mail.date!))}
            </span>
          </div>

          {!open && (
            <span className="truncate text-left text-white/80">
              {mail.text}
            </span>
          )}
        </div>
      </Collapsible.Trigger>
      <Collapsible.Content className="p-4 pt-0 dark:bg-neutral-900/90">
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(mail.html as string),
          }}
          className="rounded-lg bg-white p-4 text-black"
        />
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default CollapsibleDemo;
