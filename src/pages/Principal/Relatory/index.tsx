import React from "react";
import { createPortal } from "react-dom";
import { CrossIcon } from "../../../assets/icons/cross-icon";

const Relatory: React.FC = () => {
  return createPortal(
    <div className="relatory__backdrop">
      <div className="relatory">
        <header className="relatory-header">
          <h2 className="relatory-header__title">Atualizar Preços</h2>
          <div className="relatory-header__close">
            <CrossIcon width="25px" height="25px" fill="var(--grey-color)" />
          </div>
        </header>

        <main className="relatory-uploader"></main>

        <footer className="relatory-footer">
          <button className="relatory-footer__button">Validar</button>
        </footer>
      </div>
    </div>,
    document.getElementById("portal")!
  );
};

export default Relatory;
