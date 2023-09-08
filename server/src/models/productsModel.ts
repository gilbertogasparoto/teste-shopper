import { iPack } from "../interface/Pack";
import { iPackedProduct, iProduct } from "../interface/Product";
import connection from "./connection";

const getAll = async () => {
  const [products] = await connection.execute("SELECT * FROM products");
  return products;
};

const getByCode = async (code: number) => {
  const [product] = await connection.execute<iProduct[]>(
    "SELECT * FROM products WHERE code = ?",
    [code]
  );

  return product;
};

const getPackByProductCode = async (code: number) => {
  const [pack] = await connection.execute<iPack[]>(
    "SELECT * FROM packs WHERE pack_id IN (SELECT pack_id FROM packs where pack_id = ?)",
    [code]
  );

  return pack;
};

const updateProductPrice = async (code: number, new_price: number) => {
  const [updated_product] = await connection.execute(
    "UPDATE products SET sales_price = ? WHERE code = ?",
    [new_price, code]
  );

  let updated_pack;

  const [pack_products] = await connection.execute<iPackedProduct[]>(
    "SELECT pd.code, pd.name, pd.sales_price, pc.pack_id, pc.qty FROM products pd INNER JOIN packs pc ON pc.product_id = pd.code WHERE pc.pack_id IN (SELECT pack_id FROM packs WHERE product_id = ? )",
    [code]
  );

  if (pack_products.length) {
    if (pack_products.length > 1) {
      const new_pack_price = pack_products
        .filter(
          (product: iPackedProduct) => Number(product.code) !== Number(code)
        )
        .reduce(
          (acc: number, curr: iPackedProduct) =>
            acc + curr.sales_price * curr.qty,
          new_price * pack_products[0].qty
        );

      [updated_pack] = await connection.execute(
        "UPDATE products SET sales_price = ? WHERE code = ?",
        [new_pack_price, pack_products[0].pack_id]
      );
    } else {
      const new_pack_price = new_price * pack_products[0].qty;

      [updated_pack] = await connection.execute(
        "UPDATE products SET sales_price = ? WHERE code = ?",
        [new_pack_price, pack_products[0].pack_id]
      );
    }
  }

  return {
    product: {
      code: code,
      status: updated_product ? "Updated" : "Failed",
    },
    pack: pack_products[0]
      ? {
          code: pack_products[0].pack_id,
          status: updated_pack ? "Updated" : "Failed",
        }
      : undefined,
  };
};

const updatePackPrice = async (pack: iPack, new_price: number) => {
  const [updated_pack] = await connection.execute(
    "UPDATE products SET sales_price = ? WHERE code = ?",
    [new_price, pack.pack_id]
  );

  const individual_product_price = new_price / pack.qty;

  const [updated_product] = await connection.execute(
    "UPDATE products SET sales_price = ? WHERE code = ?",
    [individual_product_price, pack.product_id]
  );

  return {
    product: {
      code: pack.product_id,
      status: updated_product ? "Updated" : "Failed",
    },
    pack: { code: pack.pack_id, status: updated_pack ? "Updated" : "Failed" },
  };
};

export default {
  getAll,
  getByCode,
  updateProductPrice,
  getPackByProductCode,
  updatePackPrice,
};
