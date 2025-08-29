"use client";

import { useEffect, useState } from "react";

export default function useWindowWidth() {
    const [width, setWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 0
    );

    useEffect(() => {
        if (typeof window !== "undefined") {

            const handleResize = () => setWidth(window.innerWidth);
            handleResize();
            window.addEventListener('resize', handleResize)

            return () => window.removeEventListener('resize', handleResize)
        }
    }, [])

    return width;
}