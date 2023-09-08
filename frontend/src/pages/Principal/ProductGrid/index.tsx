import React from "react";
import "./styles.css";
import { moneyFormat } from "../../../utils/fn";

import LoadingSpinner from "../../../components/LoadingSpinner";

export type typeProduct = {
  code: number;
  name: string;
  cost_price: string;
  sales_price: string;
};

interface iProductGrid {
  data: typeProduct[];
  loading: boolean;
}

const ProductGrid: React.FC<iProductGrid> = ({ data, loading }) => {
  return (
    <ul className="grid">
      <li className="grid__list--head">
        <span>Código</span>
        <span>Produto</span>
        <span>Vlr. Custo</span>
        <span>Vlr. Venda</span>
      </li>

      {loading ? (
        <div className="grid__list--loading">
          <LoadingSpinner />
        </div>
      ) : null}

      {data.length
        ? data.map((prod: any) => (
            <li key={prod.code} className="grid__list--item">
              <span>{prod.code}</span>
              <span>{prod.name}</span>
              <span>R$&nbsp;{moneyFormat(prod.cost_price)}</span>
              <span>R$&nbsp;{moneyFormat(prod.sales_price)}</span>
            </li>
          ))
        : null}
    </ul>
  );
};

export default ProductGrid;
