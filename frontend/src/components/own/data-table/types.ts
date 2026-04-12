import React from "react";

export interface Column<T> {
    header: string;
    accessor?: keyof T;
    cell?: (row: T) => React.ReactNode;
    visible?: boolean;
}

export interface DataTableProps<T> {
    title: string;
    data: T[];
    columns: Column<T>[];
    actions?: React.ReactNode;
    onRowClick?: (row: T) => void;
}
