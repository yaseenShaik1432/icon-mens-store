export type ProductTypes = {
  sizes: { name: string; inStock: Boolean }[];
  title: string;
  price: Number | null;
  description: string;
  brand: string;
  mrp: Number | null;
  image: {
    url: string;
    publicId: string;
    alt: string;
  };
  images: {
    url: string;
    alt: string;
    publicId: string;
  }[];
  highlights: string;
  category: string;
  subCategory: string;
};
