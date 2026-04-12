"use client";

import { Button } from "@/components/ui/button";
import { RotateCcw, Save, X } from "lucide-react";

type Props = {
    isOpen: boolean;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "default" | "destructive";
    onConfirm: () => void;
    onCancel: () => void;
};

export default function ConfirmModal({
    isOpen,
    title,
    description,
    confirmText = "Тийм",
    cancelText = "Үгүй",
    variant = "default",
    onConfirm,
    onCancel,
}: Props) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/10 backdrop-blur-xs"
                onClick={onCancel}
            />

            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-8 z-10">
                <div className="flex items-start justify-between mb-2">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            {title}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {description}
                        </p>
                    </div>
                    <button
                        onClick={onCancel}
                        className="text-gray-400 hover:text-gray-600 transition-colors ml-4 mt-1 cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-8">
                    <Button
                        onClick={onCancel}
                        variant="outline"
                        className="flex items-center gap-1.5 cursor-pointer"
                    >
                        <RotateCcw size={14} /> {cancelText}
                    </Button>
                    <Button
                        onClick={onConfirm}
                        variant="default"
                        className={`flex items-center gap-1.5 transition-all cursor-pointer
                            ${
                                variant === "destructive"
                                    ? "bg-red-500 hover:bg-red-600"
                                    : ""
                            }
                            `}
                    >
                        <Save size={14} /> {confirmText}
                    </Button>
                </div>
            </div>
        </div>
    );
}
