import React, { useState, useRef } from "react";
import Papa, { ParseResult } from "papaparse";
import "./styles.css";
import { createPortal } from "react-dom";
import { CrossIcon } from "../../../assets/icons/cross-icon";
import { FileImportIcon } from "../../../assets/icons/file-import-icon";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { FileIcon } from "../../../assets/icons/file-icon";
import api from "../../../services/api";
import { typePrdRelatory } from "../Relatory";

export type typeUpdateValueData = {
  new_price: string;
  product_code: string;
};

interface iUploadModal {
  show: boolean;
  handleClose: () => void;
  handleGenerateRelatory: (data: typePrdRelatory[]) => void;
}

const UploadModal: React.FC<iUploadModal> = ({
  show,
  handleClose,
  handleGenerateRelatory,
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<typeUpdateValueData[]>([]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files.length) {
      Papa.parse(e.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: (results: ParseResult<typeUpdateValueData>) => {
          if (e.target && e.target.files && e.target.files.length) {
            setData(results.data);
            setFile(e.target.files[0]);
          }
        },
      });
    }
  };

  const validUpdateArchive = async (obj: typeUpdateValueData[]) => {
    setLoading(true);
    try {
      const { data } = await api.post("/products", obj);
      handleGenerateRelatory(data);
      removeFile();
      handleClose();
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const removeFile = () => {
    if (inputFileRef && inputFileRef.current) {
      inputFileRef.current.value = "";
      setFile(null);
      setData([]);
    }
  };

  return createPortal(
    <>
      {show ? (
        <div className="modal-upload__backdrop">
          <div className="modal-upload">
            <header className="modal-upload-header">
              <h2 className="modal-upload-header__title">Atualizar Preços</h2>
              <div onClick={handleClose} className="modal-upload-header__close">
                <CrossIcon
                  width="25px"
                  height="25px"
                  fill="var(--grey-color)"
                />
              </div>
            </header>

            <main className="modal-upload-uploader">
              {loading ? (
                <div className="modal-upload-uploader__static">
                  <LoadingSpinner size={7} />

                  <p>Validando arquivo...</p>
                </div>
              ) : !file ? (
                <label
                  className="modal-upload-uploader__selector"
                  htmlFor="uploader"
                >
                  <FileImportIcon width="32px" height="32px" />
                  <p>Buscar arquivo de atualização</p>
                  <span>Formato: CSV</span>
                </label>
              ) : (
                <div className="modal-upload-uploader__static">
                  <FileIcon width="32px" height="32px" />
                  <p>{file?.name || "arquivo"}</p>
                  <span onClick={removeFile}>Remover</span>
                </div>
              )}

              <input
                id="uploader"
                ref={inputFileRef}
                type="file"
                name="file"
                accept=".csv"
                onChange={changeHandler}
                className="modal-upload-uploader__hidden"
              />
            </main>

            <footer className="modal-upload-footer">
              <button
                disabled={!file || loading}
                onClick={() => validUpdateArchive(data)}
                className="modal-upload-footer__button"
              >
                Validar
              </button>
            </footer>
          </div>
        </div>
      ) : null}
    </>,
    document.getElementById("portal")!
  );
};

export default UploadModal;
