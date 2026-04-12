// components/own/inputs/TextArea.tsx
"use client";

import React from "react";

type TextAreaProps = {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    rows?: number;
    error?: string;
};

export default function TextArea({
    label,
    value,
    onChange,
    placeholder,
    rows = 4,
    error,
}: TextAreaProps) {
    return (
        <div>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label}
                </label>
            )}

            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={rows}
                className={`w-full border rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition resize-none
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
