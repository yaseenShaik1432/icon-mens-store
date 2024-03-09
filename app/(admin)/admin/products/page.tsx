"use client";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useState, useEffect } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getCookie } from "cookies-next";
import Image from "next/image";
import Popup from "@/app/components/common/Popup";

export default function AdminAllProducts() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const router = useRouter();
  const token = getCookie("token");
  const call = async () => {
    try {
      const res: any = await axios.get("/api/products");
      setProducts(res?.data?.allProducts);
      console.log("🚀 ~ file: page.tsx:67 ~ useEffect ~ res:", res?.data);
    } catch (error) {
      console.log("🚀 ~ file: page.tsx:73 ~ call ~ error:", error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await axios.delete(`/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response?.data?.message);
      call();
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
      setOpen(false);
    }
  };
  useEffect(() => {
    call();
  }, []);

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {products?.map((product: any) => (
              <div key={product?._id}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <Image
                    src={product?.image?.url}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg..."
                    alt={product?.image?.alt}
                    height={500}
                    width={500}
                    className="h-56 md:h-96 xl:h-96 2xl:h-96 lg:h-96 w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="flex flex-row justify-between items-center">
                  <div>
                    <h3 className="mt-4 text-sm text-gray-700">
                      {product?.title}
                    </h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {product?.price}
                    </p>
                  </div>
                  <div>
                    <PencilSquareIcon
                      className="caret-black h-6 w-6 my-2 hover:cursor-pointer hover:stroke-sky-800"
                      onClick={() => {
                        router.push(`/admin/edit-product/${product?._id}`);
                      }}
                    />
                    <TrashIcon
                      className="caret-black h-6 w-6 my-2 hover:cursor-pointer hover:stroke-red-600"
                      onClick={() => {
                        setOpen(true);
                        setProductId(product?._id.toString());
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Popup
        title={"Delete Product"}
        description={
          "Are you sure you want to delete your product? All of your product data will be permanently removed. This action cannot be undone"
        }
        primaryButton={"Delete"}
        cancelButton={"cancel"}
        method={() => handleDeleteProduct(productId)}
        setOpen={setOpen}
        open={open}
        Icon={
          <ExclamationTriangleIcon
            className="h-6 w-6 text-red-600"
            aria-hidden="true"
          />
        }
      />
    </>
  );
}
