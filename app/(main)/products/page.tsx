import ProductCard from "@/app/components/ProductCard";
import NotFound from "@/app/components/common/Notfound";
import { getAllProducts } from "@/app/services/product";
import { ProductTypes } from "@/app/utils/types";

export const dynamic = "force-dynamic";

export default async function Products({ searchParams }: any) {
  const products: ProductTypes[] = await getAllProducts(searchParams);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:max-w-7xl">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products?.length > 0 ? (
            products?.map((product: any) => (
              <ProductCard key={product?._id} product={product} />
            ))
          ) : (
            <NotFound />
          )}
        </div>
      </div>
    </div>
  );
}
