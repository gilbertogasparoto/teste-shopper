import React, { useCallback, useEffect, useState } from "react";
import "./styles.css";
import { ProductGridType } from "../../../utils/enums";
import { getAllProducts } from "../../../store/modules/products";
import { moneyFormat } from "../../../utils/fn";

interface iProductGrid {
  type: ProductGridType;
}

const ProductGrid: React.FC<iProductGrid> = ({ type }) => {
  const [gridData, setGridData] = useState([]);

  const fillGridData = useCallback(async () => {
    const data = await getAllProducts();
    setGridData(data);
  }, [gridData]);

  useEffect(() => {
    fillGridData();
  }, []);

  return (
    <ul className="grid">
      <li className="grid__list--head">
        <span>Código</span>
        <span>Produto</span>
        <span>Vlr. Custo</span>
        <span>Vlr. Venda</span>
      </li>

      {gridData.length &&
        gridData.map((prod: any) => (
          <li className="grid__list--item">
            <span>{prod.code}</span>
            <span>{prod.name}</span>
            <span>R$&nbsp;{moneyFormat(prod.cost_price)}</span>
            <span>R$&nbsp;{moneyFormat(prod.sales_price)}</span>
          </li>
        ))}
    </ul>
  );
};

export default ProductGrid;
