"use client";

import { useEffect } from "react";
import { Scaffold } from "../atomic/molecules/Scaffold";

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
        <Scaffold>
            <h2>Something went wrong!</h2>
            <button onClick={() => reset()}>Try again</button>
        </Scaffold>
    );
}
