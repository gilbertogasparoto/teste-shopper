import React, { useState } from "react";
import "./styles.css";
import { UploadIcon } from "../../assets/icons/upload-icon";
import ProductGrid from "./ProductGrid";
import { ProductGridType } from "../../utils/enums";
import UploadModal from "./UploadModal";

const Principal: React.FC = () => {
  const [gridType, setGridType] = useState(ProductGridType.UNIDADE);

  return (
    <div className="principal-container">
      <header className="principal-header">
        <p className="principal-header__title">Produtos</p>
        <button className="principal-header__button">
          <UploadIcon fill="white" /> Exportar atualização
        </button>
      </header>

      <main className="principal-grid">
        <nav className="principal-grid__menu">
          <ul className="principal-grid__menu-list">
            <li
              onClick={() => setGridType(ProductGridType.UNIDADE)}
              className={`principal-grid__menu-list__item${
                gridType === ProductGridType.UNIDADE ? "--active" : ""
              }`}
            >
              Unidades
            </li>
            <li
              onClick={() => setGridType(ProductGridType.PACOTE)}
              className={`principal-grid__menu-list__item${
                gridType === ProductGridType.PACOTE ? "--active" : ""
              }`}
            >
              Pacotes
            </li>
          </ul>
        </nav>
        <ProductGrid type={gridType} />
      </main>

      <UploadModal />
    </div>
  );
};

export default Principal;
