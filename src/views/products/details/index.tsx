import { useParams } from "react-router-dom";
import LoadingBody from "@/components/ui/LoadingBody";
import ViewShell from "@/components/ViewShell";
import ViewHeader from "./ViewHeader";
import ViewBody from "./ViewBody";
import { useProductData } from "./hooks/useProducts";

const ProductDetailsView: React.FC = () => {
  const { product_id } = useParams<{ product_id: string }>();
  const product = useProductData(Number(product_id));

  return (
    <ViewShell header={<ViewHeader product={product} />}>
      {product ? <ViewBody product={product} /> : <LoadingBody />}
    </ViewShell>
  );
};

export default ProductDetailsView;
