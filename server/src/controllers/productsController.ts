import { NextFunction, Request, Response } from "express";
import productsModel from "../models/productsModel";
import { priceRounder } from "../../utils/fn";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productsModel.getAll();
    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

const validateProducts = async (req: Request, res: Response) => {
  const products = req.body;
  const relatory = [];
  try {
    for await (const product of products) {
      let errors = [];
      let productExists;

      if (!product?.product_code || !product?.new_price) {
        errors.push(
          `Os parâmetros "product_code" e "new_price" são obrigatórios`
        );
      } else {
        const { product_code, new_price } = product;

        if (isNaN(Number(product_code)) || isNaN(new_price)) {
          errors.push(
            `Os parâmetros "product_code" e "new_price" devem ser valores numéricos`
          );
        } else {
          productExists = await productsModel.getByCode(product_code);

          if (!productExists || !productExists.length) {
            errors.push(
              `Nenhum produto com o código "${product_code}" foi encontrado.`
            );
          } else {
            const { cost_price, sales_price } = productExists[0];

            if (Number(new_price) < Number(cost_price)) {
              errors.push(
                `O novo preço de venda inserido não pode ser menor que o preço de custo do produto.`
              );
            }

            if (
              priceRounder(Math.abs(Number(new_price) - Number(sales_price))) >
              priceRounder(sales_price * 0.1)
            ) {
              errors.push(
                `O reajuste do preço não pode ser maior ou menor que 10% do preço atual (max ${priceRounder(
                  sales_price * 0.1
                )}).`
              );
            }

            const pack = await productsModel.getPackByProductCode(product_code);

            if (pack && pack.length > 1) {
              errors.push(
                `Não é possível alterar o valor de um pacote que possui 1 ou mais produtos distintos.`
              );
            }
          }
        }
      }

      relatory.push({
        product_code: product?.product_code ? product.product_code : "",
        name:
          productExists && productExists[0]?.name ? productExists[0]?.name : "",
        cost_price:
          productExists && productExists[0]?.cost_price
            ? productExists[0]?.cost_price
            : "",
        sales_price:
          productExists && productExists[0]?.sales_price
            ? productExists[0]?.sales_price
            : "",
        new_price: product?.new_price ? product.new_price : "",
        errors,
      });
    }

    res.status(200).json(relatory);
  } catch (err) {
    res.send(err);
  }
};

const updatePrice = async (req: Request, res: Response) => {
  const products = req.body;
  try {
    for await (const product of products) {
      const { product_code, new_price } = product;
      let updated;

      const pack = await productsModel.getPackByProductCode(product_code);

      if (pack && pack.length) {
        updated = await productsModel.updatePackPrice(
          pack[0],
          Number(new_price)
        );
      } else {
        updated = await productsModel.updateProductPrice(
          product_code,
          Number(new_price)
        );
      }
    }

    return res.status(200).json("Ok");
  } catch (err) {
    res.send(err);
  }
};

export default {
  getAll,
  validateProducts,
  updatePrice,
};
