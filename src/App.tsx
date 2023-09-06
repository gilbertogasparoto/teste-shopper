import React from "react";
import Papa from "papaparse";
import "./styles.css";
import { UploadIcon } from "./assets/icons/upload-icon";

function App() {
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

  return (
    <div className="modal-upload">
      <header>
        <h2>Carregar CSV</h2>
      </header>

      <main>
        <label className="file-uploader" htmlFor="uploader">
          <UploadIcon />
          Selecione o arquivo
        </label>
        <input
          id="uploader"
          type="file"
          name="file"
          accept=".csv"
          onChange={changeHandler}
        />
      </main>

      <footer>
        <button>Validar</button>
      </footer>
    </div>
  );
}

export default App;
