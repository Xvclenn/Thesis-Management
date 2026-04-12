"use client";

import { useEffect, useState } from "react";
import DataTableHeader from "./DataTableHeader";
import DataTablePagination from "./DataTablePagination";
import { Column, DataTableProps } from "./types";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DataTableStudents<T extends { id: string }>({
    title,
    data,
    columns,
    actions,
    onRowClick,
}: DataTableProps<T>) {
    console.log("DATA", data);

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [pageSize, setPageSize] = useState(10);

    const router = useRouter();

    const totalPages = Math.ceil(data.length / pageSize);

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    const paginatedData = data.slice(start, end);

    // ✅ Selected data log
    useEffect(() => {
        const selectedData = data.filter((row) =>
            selectedRows.includes(row.id),
        );
    }, [selectedRows, data]);

    // ✅ Toggle single row
    function toggleRow(id: string) {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
        );
    }

    // ✅ Check all (current page)
    const allSelected =
        paginatedData.length > 0 &&
        paginatedData.every((row) => selectedRows.includes(row.id));

    function toggleAll() {
        if (allSelected) {
            setSelectedRows((prev) =>
                prev.filter(
                    (id) => !paginatedData.some((row) => row.id === id),
                ),
            );
        } else {
            setSelectedRows((prev) => [
                ...prev,
                ...paginatedData
                    .map((row) => row.id)
                    .filter((id) => !prev.includes(id)),
            ]);
        }
    }

    return (
        <div className="border h-full rounded-2xl border-gray-200 bg-white flex flex-col">
            <DataTableHeader title={title} actions={actions} />

            {/* Selected rows banner */}
            {selectedRows.length > 0 && (
                <div className="flex items-center gap-3 px-5 py-2.5 bg-orange-50 border-b border-orange-100 text-sm text-orange-700">
                    <span className="font-medium">
                        {selectedRows.length} мөр сонгогдсон
                    </span>
                    <div className="flex gap-2 ml-auto">
                        <button
                            onClick={() => setSelectedRows([])}
                            className="text-xs px-3 py-1 rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors"
                        >
                            Цуцлах
                        </button>
                    </div>
                </div>
            )}

            <div className="relative flex-1 overflow-x-auto scrollbar-custom">
                {data.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-400 font-light text-lg">
                        Одоогоор оруулсан сэдэв байхгүй байна.
                    </div>
                ) : (
                    <table className="border-collapse w-full">
                        <thead className="sticky uppercase top-0 text-left text-sm font-semibold z-10 shadow-sm">
                            <tr>
                                <th className="p-4">
                                    <div className="flex items-center">
                                        <Checkbox
                                            className="cursor-pointer"
                                            checked={allSelected}
                                            onCheckedChange={toggleAll}
                                        />
                                    </div>
                                </th>

                                <th className="w-10 px-3 py-3 text-gray-500 text-center">
                                    №
                                </th>

                                <th className="px-4 py-3 text-gray-500">
                                    <span>Зураг</span>
                                </th>

                                {columns.map((col, i) =>
                                    col.visible !== false ? ( // visible=false бол header-г харуулахгүй
                                        <th
                                            key={i}
                                            scope="col"
                                            className={`px-6 py-3 text-gray-500 w-100 truncate`}
                                        >
                                            {col.header}
                                        </th>
                                    ) : null,
                                )}
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedData.map((row, i) => {
                                const isSelected = selectedRows.includes(
                                    row.id,
                                );
                                const rowNumber = start + i + 1;
                                return (
                                    <tr
                                        key={i}
                                        className={`border-t border-gray-100 transition-all hover:bg-gray-200 cursor-pointer ${
                                            isSelected ? "bg-gray-100" : ""
                                        }`}
                                    >
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <Checkbox
                                                    className="cursor-pointer"
                                                    checked={isSelected}
                                                    onCheckedChange={() =>
                                                        toggleRow(row.id)
                                                    }
                                                />
                                            </div>
                                        </td>

                                        <td className="w-10 px-3 py-3 text-xs text-gray-400 text-center tabular-nums">
                                            {rowNumber}
                                        </td>

                                        <td className="px-4 py-4 text-sm">
                                            <div className="flex items-center">
                                                <Image
                                                    src={
                                                        (row as any).image
                                                            ? (row as any).image
                                                            : "/assets/logoblue.png"
                                                    }
                                                    width={40}
                                                    height={40}
                                                    alt="user"
                                                    className="rounded-full object-cover w-10 h-10"
                                                />
                                            </div>
                                        </td>

                                        {columns.map((col, j) => {
                                            if (col.visible === false)
                                                return null; // visible=false бол cell-г харуулахгүй

                                            if (col.cell) {
                                                return (
                                                    <td
                                                        key={j}
                                                        className="px-6 py-4 text-sm truncate max-w-80"
                                                    >
                                                        {col.cell(row)}
                                                    </td>
                                                );
                                            }

                                            const value = row[col.accessor!];

                                            return (
                                                <td
                                                    key={j}
                                                    className={`px-6 py-4 text-sm truncate max-w-80`}
                                                    onClick={() => {
                                                        if (onRowClick) {
                                                            onRowClick(row); // ✅ Custom handler
                                                        }
                                                    }}
                                                >
                                                    {value as React.ReactNode}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            <DataTablePagination
                pageSize={pageSize}
                currentPage={currentPage}
                totalPages={totalPages}
                setPageSize={setPageSize}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}
