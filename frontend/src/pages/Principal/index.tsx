import React, { useEffect, useState } from "react";
import "./styles.css";
import { UploadIcon } from "../../assets/icons/upload-icon";
import ProductGrid from "./ProductGrid";
import UploadModal from "./UploadModal";
import Relatory, { typePrdRelatory } from "./Relatory";
import api from "../../services/api";

const Principal: React.FC = () => {
  const [showUploader, setShowUploader] = useState(false);
  const [relatoryData, setRelatoryData] = useState<typePrdRelatory[]>([]);
  const [gridData, setGridData] = useState([]);
  const [gridLoading, setGridLoading] = useState<boolean>(false);

  const handleShowUploader = () => {
    setShowUploader(true);
  };

  const handleCloseUploader = () => {
    setShowUploader(false);
  };

  const generetaRelatory = (data: typePrdRelatory[]) => {
    setRelatoryData(data);
  };

  const resetRelatory = () => {
    setRelatoryData([]);
    handleShowUploader();
  };

  const handleUpdateCallback = () => {
    setRelatoryData([]);
    getAllProducts();
  };

  const getAllProducts = async () => {
    setGridLoading(true);
    try {
      const { data } = await api.get("/products");
      setGridData(data);
    } catch (err) {
      console.log(err);
    }
    setGridLoading(false);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="principal-container">
      <header className="principal-header">
        <p className="principal-header__title">Produtos</p>
        <button
          onClick={handleShowUploader}
          className="principal-header__button"
        >
          <UploadIcon fill="white" /> Importar atualização
        </button>
      </header>

      <main className="principal-grid">
        <ProductGrid data={gridData} loading={gridLoading} />
      </main>

      <Relatory
        data={relatoryData}
        handleReset={resetRelatory}
        updateCallback={handleUpdateCallback}
      />

      <UploadModal
        show={showUploader}
        handleClose={handleCloseUploader}
        handleGenerateRelatory={generetaRelatory}
      />
    </div>
  );
};

export default Principal;
