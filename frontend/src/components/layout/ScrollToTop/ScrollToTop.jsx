"use client";
import "./scroll.css";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
    const [visivel, setVisivel] = useState(false);

    useEffect(() => {
        const aoRolar = () => {
            setVisivel(window.scrollY > 200);
        };

        window.addEventListener("scroll", aoRolar);
        return () => window.removeEventListener("scroll", aoRolar);
    }, [])

    const subir = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        visivel && <button
        onClick={subir}
        className="btn-voltar-topo"
        aria-label="Voltar ao Topo"
        >
            <i className="bi bi-arrow-up" ></i>
        </button>
    )
}