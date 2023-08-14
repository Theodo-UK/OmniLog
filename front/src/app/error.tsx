"use client";

import { GenericError } from "@/atomic/molecules/GenericError";

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return <GenericError error={error} reset={reset} />;
}
