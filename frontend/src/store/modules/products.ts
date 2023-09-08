import api from "../../services/api";

export const getAllProducts = async () => {
  try {
    const { data } = await api.get("/products");
    return data;
  } catch (err) {
    console.log(err);
  }
};
