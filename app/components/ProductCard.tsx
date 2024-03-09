import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductCard({ product }: any) {
  return (
    <Link
      key={product?._id}
      href={`/products/${product?._id.toString()}`}
      className="group"
    >
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
      <h3 className="mt-4 text-sm text-gray-700">{product?.title}</h3>
      <div className="flex">
        <p className="mt-1 text-lg font-medium text-gray-900">
          ₹{product?.price?.toString()}
        </p>
        <p className="mt-1 ml-1 text-lg font-medium tracking-tight text-gray-400 line-through">
          ₹{product?.mrp?.toString()}
        </p>
      </div>
    </Link>
  );
}
