"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./alert.module.css"

export default function AlertModel({ titulo, descricao, textoBotao, linkBotao }) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  // abre o modal automaticamente quando o componente monta
  useEffect(() => {
    setShowModal(true);
  }, []);

  return (
    <>
      {showModal && (
        <>
          <div className="p-5 mt-5 modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="py-5 modal-dialog">
              <div className="modal-content rounded-0">
                <div className="modal-header">
                  <h1 className="modal-title fs-5">{titulo}</h1>
                </div>
                <div className="modal-body">{descricao}</div>
                <div className="modal-footer">
                  <button
                    onClick={() => router.push(linkBotao)}
                    className={`btn btn-danger rounded-0 ${styles.btnVermelho}`}
                  >
                    {textoBotao}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* backdrop */}
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>
  );
}
