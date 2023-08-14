import Link from "next/link";
import { useEffect } from "react";

export const GenericError = ({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) => {
    useEffect(() => {
        console.error(error);
    }, [error]);
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                <Link href="/">Go back to the homepage</Link>
            </button>
            <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => reset()}
            >
                Try again
            </button>
        </div>
    );
};
