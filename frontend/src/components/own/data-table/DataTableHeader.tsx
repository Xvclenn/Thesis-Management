import React from "react";

interface Props {
    title: string;
    actions?: React.ReactNode;
}

export default function DataTableHeader({ title, actions }: Props) {
    return (
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
            <h1 className="text-base font-bold text-gray-900">{title}</h1>

            <div className="flex items-center gap-2">{actions}</div>
        </div>
    );
}
