"use client";

import { signOut } from "next-auth/react";
import { Button } from "../../components/atoms/Button";

export const SignOutButton = () => {
    return (
        <Button onClick={() => signOut()}>Sign out</Button>
    );
}