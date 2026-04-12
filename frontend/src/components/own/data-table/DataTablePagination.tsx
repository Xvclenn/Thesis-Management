"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    setPageSize: (size: number) => void;
    setCurrentPage: (page: number) => void;
}

export default function DataTablePagination({
    currentPage,
    totalPages,
    setCurrentPage,
}: Props) {
    function getPaginationPages(currentPage: number, totalPages: number) {
        const delta = 1;
        const pages: (number | string)[] = [];

        const rangeStart = Math.max(2, currentPage - delta);
        const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

        pages.push(1);

        if (rangeStart > 2) {
            pages.push("...");
        }

        for (let i = rangeStart; i <= rangeEnd; i++) {
            pages.push(i);
        }

        if (rangeEnd < totalPages - 1) {
            pages.push("...");
        }

        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    }
    const pages = getPaginationPages(currentPage, totalPages);
    return (
        <div className="flex justify-center items-center gap-2 px-6 py-4 border-t border-gray-100">
            <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="flex items-center gap-1 border rounded-lg px-3 py-1 text-xs cursor-pointer"
            >
                <ChevronLeft size={14} />
                Өмнөх
            </Button>

            <div className="flex items-center gap-1 text-xs">
                {pages.map((page, i) =>
                    page === "..." ? (
                        <span
                            key={i}
                            className="px-2 text-gray-400 cursor-default"
                        >
                            ...
                        </span>
                    ) : (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(page as number)}
                            className={`px-2 py-1 rounded cursor-pointer ${
                                currentPage === page
                                    ? "bg-orange-400 text-white"
                                    : "hover:bg-gray-100"
                            }`}
                        >
                            {page}
                        </button>
                    ),
                )}
            </div>

            <Button
                variant="outline"
                onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                className="flex items-center gap-1 border rounded-lg px-3 py-1 text-xs cursor-pointer"
            >
                Дараах
                <ChevronRight size={14} />
            </Button>
        </div>
    );
}
