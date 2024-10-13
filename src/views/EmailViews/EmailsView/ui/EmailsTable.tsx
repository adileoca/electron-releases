import clsx from "clsx";
import { useState } from "react";
import CheckboxInput from "@/components/ui/CheckboxInput";
import { formatDate } from "@/utils/format";
import { Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const emails = [
  {
    sender: "adileoca@yahoo.com",
    title: "Informare cu privire la un colet GLS / GLS parcel information",
    excerpt:
      "Stimate Destinatar, Vă informăm că FOTO-PE-CERAMICA.RO a pregătit coletul cu numărul 6113866012 pentru dumneavoastră. După predarea coletului către GLS, acesta se va livra la următoarea adresă: Andrei",
    date: "15:14",
  },
];
const EmailsTable = () => {
  const [enabled, setEnabled] = useState(false);
  const navigate = useNavigate();
  return (
    <table className="w-full table-fixed">
      <tbody>
        {emails &&
          Array(24)
            .fill(emails[0])
            .map((email, idx) => (
              <tr
                key={idx}
                onClick={() => {
                  navigate(`/emails/123`);
                }}
                className="group z-10 items-center"
              >
                <TdWrapper className="z-50 w-[3.5rem]">
                  <div className="flex h-12 items-center pl-4">
                    <CheckboxInput checked={enabled} onChange={setEnabled} />
                  </div>
                </TdWrapper>
                <TdWrapper className="w-56">
                  <div className="flex h-12 items-center">{email.sender}</div>
                </TdWrapper>
                <TdWrapper>
                  <div className="flex h-12 items-center">
                    <div className="mr-4">
                      <Circle
                        size={10}
                        className="rounded-full bg-blue-600 text-blue-600"
                      />
                    </div>
                    <div className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                      <span>{`${email.title} - `}</span>
                      <span className="font-normal">{email.excerpt}</span>
                    </div>
                  </div>
                </TdWrapper>
                <TdWrapper className="w-28">
                  <div className="flex h-12 items-center justify-end pr-4">
                    {email.date}
                  </div>
                </TdWrapper>
              </tr>
            ))}
      </tbody>
    </table>
  );
};

export default EmailsTable;

const TdWrapper = ({ children, className = "", onClick = () => {} }) => (
  <td
    className={clsx("p-0 hover:cursor-pointer", className)}
    onClick={() => console.log("caca")}
  >
    <div className="duration-50 text-neutral-600/ w-full border-y border-neutral-200 border-t-transparent bg-white transition group-hover:border-x-blue-200 group-hover:bg-neutral-100/90 dark:border-neutral-700 dark:border-t-transparent dark:bg-neutral-900/90 dark:text-neutral-200 dark:group-hover:border-x-blue-500  dark:group-hover:bg-neutral-800/90">
      {children}
    </div>
  </td>
);
