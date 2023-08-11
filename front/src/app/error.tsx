"use client";

import { useEffect } from "react";
import Header from "./Header";

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <Header>
            <h2>Something went wrong!</h2>
            <button onClick={() => reset()}>Try again</button>
        </Header>
    );
}
