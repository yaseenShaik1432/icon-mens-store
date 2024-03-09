import axios from "axios";

export async function getAllProducts(params: any) {
  try {
    const res = await axios.get(
      `${process.env.DOMAIN}/api/products?category=${params?.category ?? ""}`
    );
    if (res.status === 200) {
      return res?.data?.allProducts;
    }
  } catch (error) {
    return error;
  }
}

export async function getEachProduct(id: string) {
  try {
    const res = await axios.get(`${process.env.DOMAIN}/api/products/${id}`);
    if (res.status === 200) {
      return res?.data?.product;
    }
  } catch (error) {
    return error;
  }
}
