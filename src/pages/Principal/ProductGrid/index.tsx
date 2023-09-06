import React from "react";
import "./styles.css";
import { ProductGridType } from "../../../utils/enums";

interface iProductGrid {
  type: ProductGridType;
}

const ProductGrid: React.FC<iProductGrid> = ({ type }) => {
  return (
    <ul className="grid">
      {type === ProductGridType.UNIDADE ? (
        <li className="grid__list--head">
          <span>Código</span>
          <span>Produto</span>
          <span>Vlr. Custo</span>
          <span>Vlr. Venda</span>
        </li>
      ) : (
        <li className="grid__list--head">
          <span>Código</span>
          <span>Produtos</span>
          <span>Quant.</span>
          <span>Vlr. Venda</span>
        </li>
      )}

      <li className="grid__list--item">
        <span>#1010</span>
        <span>Guaraná Antartica 1l</span>
        <span>R$ 5,00</span>
        <span>R$ 5,00</span>
      </li>
      <li className="grid__list--item">
        <span>#1020</span>
        <span>Coca-Cola Zero 1l</span>
        <span>R$ 9,00</span>
        <span>R$ 9,00</span>
      </li>
    </ul>
  );
};

export default ProductGrid;
