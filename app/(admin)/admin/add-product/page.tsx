"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { PhotoIcon } from "@heroicons/react/20/solid";
import { toast } from "react-toastify";
import {
  accessoriesSubOptions,
  brandsSubOptions,
  categoryOptions,
  clothingSubOptions,
  footWearSubOptions,
  sizeOptions,
} from "@/app/utils/constants";
import Input from "@/app/components/input-fields/Input";
import { ProductTypes } from "@/app/utils/types";
import { getCookie } from "cookies-next";

const initialData: ProductTypes = {
  title: "",
  price: null,
  description: "",
  mrp: null,
  image: { url: "", publicId: "", alt: "" },
  images: [{ url: "", publicId: "", alt: "" }],
  brand: "",
  highlights: "",
  category: "0",
  subCategory: "0",
  sizes: [{ name: "", inStock: false }],
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AddProduct() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({});
  const [data, setData] = useState(initialData);
  const token = getCookie("token");
  const files = acceptedFiles.map((file: any) => {
    return (
      <>
        <li key={file.path}>{file.path}</li>
      </>
    );
  });

  const [file, setFile] = useState<any>(null);
  const handleImage = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const uploadedImageUrls = [];
      for (const file of acceptedFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "test-raja");
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDNAME}/image/upload`,
          formData
        );
        uploadedImageUrls.push({
          url: res.data.secure_url,
          alt: res.data.original_filename,
          publicId: res.data.public_id,
        });
      }
      const singleFormData = new FormData();
      singleFormData.append("file", file);
      singleFormData.append("upload_preset", "test-raja");
      const result = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDNAME}/image/upload`,
        singleFormData
      );
      setData({
        ...data,
        images: uploadedImageUrls,
        image: {
          url: result.data.secure_url,
          publicId: result.data.public_id,
          alt: result.data.original_filename,
        },
      });
      const bodyData = {
        title: data.title,
        price: data.price,
        description: data.description,
        images: uploadedImageUrls,
        category: data.category,
        mrp: data.mrp,
        brand: data.brand,
        subCategory: data.subCategory,
        sizes: data.sizes,
        image: {
          url: result.data.secure_url,
          publicId: result.data.public_id,
          alt: result.data.original_filename,
        },
        highlights: data.highlights,
      };
      const response = await axios.post("/api/products", bodyData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        toast.success(response?.data?.message);
        setData(initialData);
        setFile(null);
        acceptedFiles.splice(0, acceptedFiles.length);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
  };

  useEffect(() => {
    if (data.category === "foot-wear") {
      setData({ ...data, sizes: sizeOptions.foot.sizes });
    } else if (
      [
        "jeans",
        "joggers",
        "shorts",
        "casual-trousers",
        "formal-pants",
      ].includes(data.subCategory)
    ) {
      setData({ ...data, sizes: sizeOptions.bottom.sizes });
    } else if (
      ["shirts", "t-shirts", "sweat-shirts"].includes(data.subCategory)
    ) {
      setData({ ...data, sizes: sizeOptions.top.sizes });
    } else if (data.category === "accessories") {
      setData({ ...data, sizes: sizeOptions.access.sizes });
    }
  }, [data.category, data.subCategory]);

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div className=" gap-4 mb-4">
          <div className="isolate py-6 bg-white px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Add Product
              </h2>
            </div>
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-16 max-w-xl sm:mt-20"
            >
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                {/* title */}
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Title
                  </label>
                  <div className="mt-2.5">
                    <Input
                      type="text"
                      name="title"
                      id="title"
                      value={data.title}
                      onChange={(e: { target: { value: string } }) => {
                        setData({ ...data, title: e.target.value });
                      }}
                      autoComplete="given-name"
                    />
                  </div>
                </div>
                {/* price */}
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Selling Price
                  </label>
                  <div className="mt-2.5">
                    <Input
                      type="number"
                      name="price"
                      value={data.price}
                      onChange={(e: { target: { value: string } }) => {
                        setData({ ...data, price: parseInt(e.target.value) });
                      }}
                      id="price"
                    />
                  </div>
                </div>
                {/* mrp */}
                <div>
                  <label
                    htmlFor="mrp"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    MRP
                  </label>
                  <div className="mt-2.5">
                    <Input
                      type="number"
                      name="mrp"
                      value={data.mrp}
                      onChange={(e: { target: { value: string } }) => {
                        setData({ ...data, mrp: parseInt(e.target.value) });
                      }}
                      id="mrp"
                    />
                  </div>
                </div>
                {/* brand */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="category"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Brand
                  </label>
                  <div className="mt-2.5">
                    <select
                      id="brand"
                      name="brand"
                      value={data.brand}
                      onChange={(e) =>
                        setData({ ...data, brand: e.target.value })
                      }
                      className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                    >
                      {brandsSubOptions.map(({ value, label }) => (
                        <option value={value}>{label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* description */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="desc"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2.5">
                    <Input
                      type="text"
                      value={data.description}
                      onChange={(e: { target: { value: string } }) => {
                        setData({ ...data, description: e.target.value });
                      }}
                      name="description"
                      id="desc"
                      autoComplete="description"
                    />
                  </div>
                </div>
                {/* Highlights */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="Highlights"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Highlights
                  </label>

                  <div className="mt-2.5">
                    <textarea
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                      name="Highlights"
                      value={data.highlights}
                      onChange={(e: { target: { value: string } }) => {
                        setData({
                          ...data,
                          highlights: e.target.value,
                        });
                      }}
                      id="price"
                    />
                  </div>
                </div>
                {/* primary image upload */}
                <div className="col-span-1">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Upload Primary Image
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="text-center relative cursor-pointer rounded-md bg-white font-semibold text-orange-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-600 focus-within:ring-offset-2 hover:text-orange-500"
                        >
                          <span>
                            Upload a file of{" "}
                            <p className="text-xs leading-5 text-gray-600">
                              PNG, JPG, up to 5MB
                            </p>
                          </span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            accept="image/*"
                            onChange={handleImage}
                            type="file"
                            className="sr-only"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <aside>
                    <h4>File</h4>
                    <ul className="text-sm leading-6 text-gray-600">
                      {file?.name}
                    </ul>
                  </aside>
                </div>
                {/* multiple image upload */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="image"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Upload Multiple Images
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <div className="cursor-pointer mt-4 rounded-md flex text-sm leading-6 font-semibold text-orange-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-600 focus-within:ring-offset-2 hover:text-orange-500">
                        <div {...getRootProps({ className: "dropzone" })}>
                          <input
                            multiple
                            accept="image/*"
                            {...getInputProps()}
                          />
                          <span>
                            Upload a files of{" "}
                            <p className="text-xs leading-5 text-gray-600">
                              PNG, JPG, up to 5MB
                            </p>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <aside>
                    <h4>Files</h4>
                    <ul className="text-sm leading-6 text-gray-600">{files}</ul>
                  </aside>
                </div>
                {/* category */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="category"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Category
                  </label>
                  <div className="mt-2.5">
                    <select
                      id="category"
                      name="category"
                      value={data.category}
                      onChange={(e) =>
                        setData({ ...data, category: e.target.value })
                      }
                      className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                    >
                      {categoryOptions.map(({ value, label }) => (
                        <option value={value}>{label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* sub - category */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="category"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Sub Category
                  </label>
                  <div className="mt-2.5">
                    <select
                      id="subCategory"
                      name="subCategory"
                      value={data.subCategory}
                      onChange={(e) =>
                        setData({ ...data, subCategory: e.target.value })
                      }
                      className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                    >
                      {data?.category === "clothing"
                        ? clothingSubOptions.map(
                            ({
                              value,
                              label,
                            }: {
                              value: string;
                              label: string;
                            }) => <option value={value}>{label}</option>
                          )
                        : data?.category === "foot-wear"
                        ? footWearSubOptions.map(
                            ({
                              value,
                              label,
                            }: {
                              value: string;
                              label: string;
                            }) => <option value={value}>{label}</option>
                          )
                        : data?.category === "accessories"
                        ? accessoriesSubOptions.map(
                            ({
                              value,
                              label,
                            }: {
                              value: string;
                              label: string;
                            }) => <option value={value}>{label}</option>
                          )
                        : null}
                    </select>
                  </div>
                </div>
                {data?.category === "clothing" &&
                [
                  "jeans",
                  "joggers",
                  "shorts",
                  "casual-trousers",
                  "formal-pants",
                ].includes(data.subCategory) ? (
                  <>
                    {/* bottom sizes */}
                    <div className="sm:col-span-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">
                          Select Bottom Available Sizes
                        </h3>
                      </div>
                      <div className="mt-3 flex flex-row justify-around items-center">
                        {sizeOptions.bottom.sizes.map((item) => (
                          <div
                            key={item.name}
                            className="flex items-center space-x-2"
                          >
                            <input
                              className="w-5 h-5 cursor-pointer"
                              value={item?.name}
                              id={item.name}
                              type="checkbox"
                              name={item.name}
                              onChange={(e) => {
                                const updatedSizes = data?.sizes?.map((size) =>
                                  size.name === e.target.name
                                    ? { ...size, inStock: !size.inStock }
                                    : size
                                );

                                setData({ ...data, sizes: updatedSizes });
                              }}
                            />
                            <label
                              className="cursor-pointer"
                              htmlFor={item.name}
                            >
                              {item.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : data?.category === "foot-wear" ? (
                  <>
                    {/* foot wear sizes */}
                    <div className="sm:col-span-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">
                          Select Foot Available Sizes
                        </h3>
                      </div>
                      <div className="mt-3 flex flex-row justify-around items-center">
                        {sizeOptions.foot.sizes.map((item) => (
                          <div
                            key={item.name}
                            className="flex items-center space-x-2"
                          >
                            <input
                              className="w-5 h-5 cursor-pointer"
                              value={item?.name}
                              id={item.name}
                              type="checkbox"
                              name={item.name}
                              onChange={(e) => {
                                const updatedSizes = data?.sizes?.map((size) =>
                                  size.name === e.target.name
                                    ? { ...size, inStock: !size.inStock }
                                    : size
                                );
                                setData({ ...data, sizes: updatedSizes });
                              }}
                            />
                            <label
                              className="cursor-pointer"
                              htmlFor={item.name}
                            >
                              {item.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : data?.category === "clothing" &&
                  ["shirts", "t-shirts", "sweat-shirts"].includes(
                    data.subCategory
                  ) ? (
                  <>
                    {/* top - sizes */}
                    <div className="sm:col-span-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">
                          Select Top Available Sizes
                        </h3>
                      </div>
                      <div className="mt-3 flex flex-row justify-around items-center">
                        {sizeOptions.top.sizes.map((item) => (
                          <div
                            key={item.name}
                            className="flex items-center space-x-2"
                          >
                            <input
                              className="w-5 h-5 cursor-pointer"
                              value={item?.name}
                              id={item.name}
                              type="checkbox"
                              name={item.name}
                              onChange={(e) => {
                                const updatedSizes = data?.sizes?.map((size) =>
                                  size.name === e.target.name
                                    ? { ...size, inStock: !size.inStock }
                                    : size
                                );

                                setData({ ...data, sizes: updatedSizes });
                              }}
                            />
                            <label
                              className="cursor-pointer"
                              htmlFor={item.name}
                            >
                              {item.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : data.category === "accessories" ? (
                  <>
                    {/* accessories - sizes */}
                    <div className="sm:col-span-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">
                          Select Accessories Available Sizes
                        </h3>
                      </div>
                      <div className="mt-3 flex flex-row justify-around items-center">
                        {sizeOptions.access.sizes.map((item) => (
                          <div
                            key={item.name}
                            className="flex items-center space-x-2"
                          >
                            <input
                              className="w-5 h-5 cursor-pointer"
                              value={item?.name}
                              id={item.name}
                              type="checkbox"
                              name={item?.name}
                              onChange={(e) => {
                                const updatedSizes = data?.sizes?.map((size) =>
                                  size.name === e.target.name
                                    ? { ...size, inStock: !size.inStock }
                                    : size
                                );

                                setData({ ...data, sizes: updatedSizes });
                              }}
                            />
                            <label
                              className="cursor-pointer"
                              htmlFor={item.name}
                            >
                              {item.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="mt-10">
                <button
                  type="submit"
                  className="block w-full rounded-md bg-orange-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                >
                  submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
