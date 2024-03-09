import ProductDetails from "@/app/components/ProductDetails";
import { getEachProduct } from "@/app/services/product";
import { ProductTypes } from "@/app/utils/types";

export const dynamic = "force-dynamic";

export default async function Product({ params }: any) {
  const { id } = params;
  const data: ProductTypes = await getEachProduct(id);

  return (
    <>
      Hello
      <ProductDetails data={data && data} id={id} />;
    </>
  );
}
