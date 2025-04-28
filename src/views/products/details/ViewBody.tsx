import { Product } from "./queries";
import { useEffect } from "react";
import ProductSizes from "./SizesTable";

const ViewBody: React.FC<{ product: NonNullable<Product> }> = ({ product }) => {
  useEffect(() => {
    console.log("product", product);
  }, [product]);

  return (
    <div className="mx-auto space-y-8 p-2 text-white">
      <div>
        <ProductSizes productSizes={product.sizes} />
      </div>
      <div>
        <ProductSizes productSizes={product.sizes} />
      </div>
    </div>
  );
};

export default ViewBody;
