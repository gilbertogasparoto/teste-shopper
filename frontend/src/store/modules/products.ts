import { typeUpdateValueData } from "../../pages/Principal/UploadModal";
import api from "../../services/api";

export const getAllProducts = async () => {
  try {
    const { data } = await api.get("/products");
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const validUpdateArchive = async (obj: typeUpdateValueData[]) => {
  try {
    const { data } = await api.post("/products", obj);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
