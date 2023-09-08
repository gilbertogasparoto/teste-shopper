import React, { useState } from "react";
import { createPortal } from "react-dom";
import { CrossIcon } from "../../../assets/icons/cross-icon";
import "./styles.css";
import { CheckIcon } from "../../../assets/icons/check-icon";
import { ArrowRightIcon } from "../../../assets/icons/arrow-right-icon";
import { moneyFormat } from "../../../utils/fn";
import api from "../../../services/api";
import LoadingSpinner from "../../../components/LoadingSpinner";

export type typePrdRelatory = {
  product_code: number;
  name: string;
  cost_price: string;
  sales_price: string;
  new_price: number;
  errors: string[];
};

export interface iRelatory {
  data?: typePrdRelatory[];
  handleReset: () => void;
  updateCallback: () => void;
}

const Relatory: React.FC<iRelatory> = ({
  data,
  handleReset,
  updateCallback,
}) => {
  const [relatoryLoading, setRelatoryLoading] = useState(false);

  const updateProducts = async () => {
    setRelatoryLoading(true);
    try {
      await api.patch("/products", data);
      updateCallback();
    } catch (err) {
      console.log(err);
    }
    setRelatoryLoading(false);
  };

  return createPortal(
    <>
      {data && data.length ? (
        <div className="relatory__backdrop">
          <div className="relatory">
            <header className="relatory-header">
              <h2 className="relatory-header__title">Validação do Arquivo</h2>
            </header>

            <main className="relatory-products">
              <ul className="relatory-products__list">
                {data.map((prd: typePrdRelatory) => (
                  <li className="relatory-products__list-item">
                    <div className="relatory-products__list-item__row">
                      <span className="list-item__row--left">
                        {!isNaN(Number(prd.product_code))
                          ? prd.product_code
                          : "?"}
                      </span>
                      <span className="list-item__row--left">
                        {prd.name || "-"}
                      </span>
                      <span className="list-item__row--center">
                        {prd.sales_price
                          ? `R$ ${moneyFormat(prd.sales_price)}`
                          : "-"}
                      </span>
                      <span className="list-item__row--center">
                        <ArrowRightIcon
                          width="25px"
                          height="25px"
                          fill="var(--grey-color)"
                        />
                      </span>
                      <span className="list-item__row--center">
                        {!isNaN(Number(prd.new_price))
                          ? `R$ ${moneyFormat(prd.new_price)}`
                          : "?"}
                      </span>

                      {prd.errors.length ? (
                        <span className="list-item__row--right list-item__status--error">
                          <CrossIcon fill="white" />
                        </span>
                      ) : (
                        <span className="list-item__row--right list-item__status--ok">
                          <CheckIcon fill="white" />
                        </span>
                      )}
                    </div>

                    {prd.errors.length ? (
                      <ul className="relatory-products__list-item__errors">
                        {prd.errors.map((error: string) => (
                          <li className="list-item__errors__error">
                            •&nbsp;{error}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            </main>

            <footer className="relatory-footer">
              {data.some((prd: typePrdRelatory) => prd.errors.length) ? (
                <button
                  onClick={handleReset}
                  className="relatory-footer__button"
                >
                  Reenviar arquivo
                </button>
              ) : (
                <button
                  disabled={relatoryLoading}
                  onClick={updateProducts}
                  className="relatory-footer__button"
                >
                  {relatoryLoading ? "Atualizando..." : "Atualizar"}
                </button>
              )}
            </footer>
          </div>
        </div>
      ) : null}
    </>,
    document.getElementById("portal")!
  );
};

export default Relatory;
