import LoadingBody from "@/components/ui/LoadingBody";
import TableHeader from "../../table/ui/TableHeader";
import TableBody from "../../table/ui/TableBody";
import { Product } from "../queries";
import {
  ProductSizesTableProvider,
  useProductSizesTableContext,
} from "./context";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

const ProductSizes: React.FC<{
  productSizes: NonNullable<Product>["sizes"];
}> = ({ productSizes }) => {
  const [open, setOpen] = useState(true);
  return (
    <ProductSizesTableProvider productSizes={productSizes}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full pb-2 items-center hover:bg-white/5 rounded-lg transition justify-between"
      >
        <h1 className="text-lg font-semibold text-white/80">Dimensiuni</h1>
        {open ? (
          <ChevronUpIcon className="size-7 text-white/80" />
        ) : (
          <ChevronDownIcon className="size-7 text-white/80" />
        )}
      </button>
      {open && (
        <div className="overflow-hidden rounded-lg border border-neutral-700">
          <Table />
        </div>
      )}
    </ProductSizesTableProvider>
  );
};

export default ProductSizes;

const Table = () => {
  const {
    state: { loading, cols, rows },
    actions: { setColWidth },
  } = useProductSizesTableContext();

  return loading ? (
    <LoadingBody />
  ) : (
    <div className="relative h-[75vh] overflow-auto">
      <table>
        <TableHeader cols={cols} setColWidth={setColWidth} />
        <TableBody cols={cols} rows={rows} />
      </table>
    </div>
  );
};
