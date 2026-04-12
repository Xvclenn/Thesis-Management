"use client";

import ConfirmModal from "@/components/own/confirmation/ConfirmModal";
import { createContext, useContext, useState } from "react";

type ConfirmOptions = {
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "default" | "destructive";
};

type ConfirmContextType = {
    openConfirm: (options: ConfirmOptions) => Promise<boolean>;
};

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
    const [options, setOptions] = useState<ConfirmOptions | null>(null);
    const [resolver, setResolver] = useState<(value: boolean) => void>();

    const openConfirm = (opts: ConfirmOptions) => {
        setOptions(opts);
        return new Promise<boolean>((resolve) => {
            setResolver(() => resolve);
        });
    };

    const handleConfirm = () => {
        resolver?.(true);
        setOptions(null);
    };

    const handleCancel = () => {
        resolver?.(false);
        setOptions(null);
    };

    return (
        <ConfirmContext.Provider value={{ openConfirm }}>
            {children}

            <ConfirmModal
                isOpen={!!options}
                title={options?.title}
                description={options?.description}
                confirmText={options?.confirmText}
                cancelText={options?.cancelText}
                variant={options?.variant}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </ConfirmContext.Provider>
    );
}

export const useConfirm = () => {
    const ctx = useContext(ConfirmContext);
    if (!ctx) throw new Error("useConfirm must be used inside provider");
    return ctx;
};
