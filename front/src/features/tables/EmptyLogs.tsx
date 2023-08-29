import { CardAtom } from "@/components/atoms/CardAtom";
import Link from "next/link";

export default function EmptyLogs() {
    return (
        <CardAtom>
            <p className="px-4 py-2 text-gray-800 text-center">
                There are no logs yet. Please connect our SDK and start logging!{" "}
                <Link
                    className="underline"
                    href="https://github.com/Theodo-UK/OmniLog/blob/main/README.md#quickstart"
                >
                    For more info, see here
                </Link>
                .{" "}
            </p>
        </CardAtom>
    );
}
