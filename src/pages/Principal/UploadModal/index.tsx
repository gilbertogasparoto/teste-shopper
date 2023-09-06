import React from "react";
import Papa from "papaparse";
import { UploadIcon } from "../../../assets/icons/upload-icon";
import "./styles.css";
import { createPortal } from "react-dom";
import { CrossIcon } from "../../../assets/icons/cross-icon";

const UploadModal: React.FC = () => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files.length) {
      Papa.parse(e.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results: any) {
          console.log(results.data);
        },
      });
    }
  };

  return createPortal(
    <div className="modal-upload__backdrop">
      <div className="modal-upload">
        <header className="modal-upload-header">
          <h2 className="modal-upload-header__title">Carregar CSV</h2>
          <CrossIcon />
        </header>

        <main className="modal-upload-uploader">
          <label
            className="modal-upload-uploader__container"
            htmlFor="uploader"
          >
            <UploadIcon />
            Selecione o arquivo
          </label>
          <input
            id="uploader"
            type="file"
            name="file"
            accept=".csv"
            onChange={changeHandler}
            className="modal-upload-uploader__hidden"
          />
        </main>

        <footer className="modal-upload-footer">
          <button className="modal-upload-button">Validar</button>
        </footer>
      </div>
    </div>,
    document.getElementById("portal")!
  );
};

export default UploadModal;
