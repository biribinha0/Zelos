"use client";
import { useEffect, useMemo, useState } from "react";
import styles from "./Calendario.module.css";

const STORAGE_KEY = "calendarNotes.v1"; // { "2025-08-28": ["texto 1", "texto 2"] }

export default function Calendar() {
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth()); // 0-11
    const [notes, setNotes] = useState({});
    const [openDate, setOpenDate] = useState(null); // "YYYY-MM-DD" quando modal aberto
    const [newNote, setNewNote] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingText, setEditingText] = useState("");

    // carregar e salvar no localStorage
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) setNotes(JSON.parse(raw));
        } catch { }
    }, []);
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
        } catch { }
    }, [notes]);

    // helpers
    const monthName = useMemo(
        () =>
            new Date(year, month, 1).toLocaleString("pt-BR", {
                month: "long",
                year: "numeric",
            }),
        [year, month]
    );

    const daysGrid = useMemo(() => {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startWeekday = (firstDay.getDay() + 6) % 7; // converte para semana começando na segunda (0=Seg)
        const totalDays = lastDay.getDate();

        const cells = [];
        // dias do mês anterior para preencher a primeira linha
        for (let i = 0; i < startWeekday; i++) {
            const date = new Date(year, month, -i).toISOString().slice(0, 10);
            cells.unshift({ day: null, iso: date, outside: true });
        }
        // dias do mês atual
        for (let d = 1; d <= totalDays; d++) {
            const iso = toISO(year, month + 1, d);
            cells.push({ day: d, iso, outside: false });
        }
        // completa múltiplos de 7
        while (cells.length % 7 !== 0) {
            const next = new Date(year, month, totalDays + (cells.length % 7) + 1)
                .toISOString()
                .slice(0, 10);
            cells.push({ day: null, iso: next, outside: true });
        }
        return cells;
    }, [year, month]);

    function toISO(y, m, d) {
        const mm = String(m).padStart(2, "0");
        const dd = String(d).padStart(2, "0");
        return `${y}-${mm}-${dd}`;
    }

    function prevMonth() {
        const date = new Date(year, month - 1, 1);
        setYear(date.getFullYear());
        setMonth(date.getMonth());
    }
    function nextMonth() {
        const date = new Date(year, month + 1, 1);
        setYear(date.getFullYear());
        setMonth(date.getMonth());
    }

    // CRUD
    function addNote() {
        const v = newNote.trim();
        if (!openDate || !v) return;
        setNotes((prev) => {
            const arr = Array.isArray(prev[openDate]) ? [...prev[openDate]] : [];
            arr.push(v);
            return { ...prev, [openDate]: arr };
        });
        setNewNote("");
    }
    function startEdit(idx, txt) {
        setEditingIndex(idx);
        setEditingText(txt);
    }
    function saveEdit() {
        if (editingIndex == null || !openDate) return;
        const v = editingText.trim();
        if (!v) return;
        setNotes((prev) => {
            const arr = [...(prev[openDate] || [])];
            arr[editingIndex] = v;
            return { ...prev, [openDate]: arr };
        });
        setEditingIndex(null);
        setEditingText("");
    }
    function cancelEdit() {
        setEditingIndex(null);
        setEditingText("");
    }
    function deleteNote(idx) {
        if (!openDate) return;
        setNotes((prev) => {
            const arr = [...(prev[openDate] || [])];
            arr.splice(idx, 1);
            const copy = { ...prev };
            if (arr.length) copy[openDate] = arr;
            else delete copy[openDate];
            return copy;
        });
        if (editingIndex === idx) cancelEdit();
    }

    const weekdays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

    return (
        <>
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <button onClick={prevMonth} className={styles.navBtn} aria-label="Mês anterior">
                    ‹
                </button>
                <h2 className={styles.title}>
                    {monthName.charAt(0).toUpperCase() + monthName.slice(1)}
                </h2>
                <button onClick={nextMonth} className={styles.navBtn} aria-label="Próximo mês">
                    ›
                </button>
            </header>

            <div className={styles.weekRow}>
                {weekdays.map((w) => (
                    <div key={w} className={styles.weekday}>
                        {w}
                    </div>
                ))}
            </div>

            <div className={styles.grid}>
                {daysGrid.map((cell, i) => {
                    const dayNotes = notes[cell.iso] || [];
                    const isToday = cell.iso === new Date().toISOString().slice(0, 10);
                    return (
                        <button
                            key={cell.iso + i}
                            className={[
                                styles.cell,
                                cell.outside ? styles.outside : "",
                                isToday ? styles.today : "",
                            ].join(" ")}
                            onClick={() => setOpenDate(cell.iso)}
                            aria-label={`Dia ${cell.day || ""}`}
                        >
                            <div className={styles.cellHeader}>
                                <span>{cell.day ?? ""}</span>
                                {!!dayNotes.length && (
                                    <span className={styles.badge}>{dayNotes.length}</span>
                                )}
                            </div>
                            {!!dayNotes.length && (
                                <div className={styles.preview} title={dayNotes.join("\n")}>
                                    {dayNotes[0].slice(0, 40)}
                                    {dayNotes[0].length > 40 ? "…" : ""}
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Modal simples */}
            {openDate && (
                <div className={styles.modalBackdrop} onClick={() => setOpenDate(null)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>
                                Anotações —{" "}
                                {new Date(openDate).toLocaleDateString("pt-BR", {
                                    weekday: "long",
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </h3>
                            <button
                                className={styles.close}
                                onClick={() => setOpenDate(null)}
                                aria-label="Fechar"
                            >
                                ✕
                            </button>
                        </div>

                        <div className={styles.notesList}>
                            {(notes[openDate] || []).length === 0 && (
                                <p className={styles.empty}>Sem anotações para este dia.</p>
                            )}

                            {(notes[openDate] || []).map((txt, idx) => (
                                <div key={idx} className={styles.noteItem}>
                                    {editingIndex === idx ? (
                                        <>
                                            <textarea
                                                className={styles.input}
                                                value={editingText}
                                                onChange={(e) => setEditingText(e.target.value)}
                                                rows={3}
                                            />
                                            <div className={styles.row}>
                                                <button className={styles.btnPrimary} onClick={saveEdit}>
                                                    Salvar
                                                </button>
                                                <button className={styles.btnGhost} onClick={cancelEdit}>
                                                    Cancelar
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <p className={styles.noteText}>{txt}</p>
                                            <div className={styles.row}>
                                                <button
                                                    className={styles.btnGhost}
                                                    onClick={() => startEdit(idx, txt)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className={styles.btnDanger}
                                                    onClick={() => deleteNote(idx)}
                                                >
                                                    Excluir
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className={styles.addBox}>
                            <label className={styles.label}>Nova anotação</label>
                            <textarea
                                className={styles.input}
                                placeholder="Escreva aqui…"
                                rows={3}
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                            />
                            <button className={styles.btnPrimary} onClick={addNote}>
                                Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </>
    );
}
