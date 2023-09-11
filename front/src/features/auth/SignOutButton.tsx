"use client";

import { signOut } from "next-auth/react";
import { Button } from "../../components/atoms/Button";

export const SignOutButton = () => {
    return (
        <Button onClick={() => signOut()} colour="blue">Sign out</Button>
    );
}