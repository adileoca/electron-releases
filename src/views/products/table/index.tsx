import { ProductsTableProvider } from "./context";
import ViewBody from "./ViewBody";

const ProductsView = () => {
  return (
    <ProductsTableProvider>
      <ViewBody />
    </ProductsTableProvider>
  );
};

export default ProductsView;
