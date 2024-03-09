import axios from "axios";

export async function addToCart(bodyData: any) {
  try {
    const res = await axios.post(`/api/cart`, bodyData);
    if (res.status === 200) {
      return res?.data;
    }
  } catch (error) {
    return error;
  }
}

export async function getCartItems(params: any) {
  try {
    const res = await axios.get(`/api/cart?userId=${params}`);
    if (res.status === 200) {
      return res?.data;
    }
  } catch (error) {
    return error;
  }
}
