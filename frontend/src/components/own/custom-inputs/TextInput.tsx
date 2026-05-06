// components/own/inputs/TextInput.tsx
"use client";

import React from "react";

type TextInputProps = {
    className?: string;
    label?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
    error?: string;
};

export default function TextInput({
    className = "",
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    error,
}: TextInputProps) {
    return (
        <div>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label}
                </label>
            )}

            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={`w-full ${className} border rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition
                    ${
                        error
                            ? "border-red-300 focus:ring-red-400"
                            : "border-gray-200 focus:ring-orange-400"
                    }
                `}
            />

            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}
