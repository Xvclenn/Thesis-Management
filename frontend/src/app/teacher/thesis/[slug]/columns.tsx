import { Column } from "@/components/own/data-table/types";
import StatusBadge from "@/components/own/StatusBadge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/formatDate";
import { SquarePen, Trash2Icon } from "lucide-react";

type Thesis = {
    _id: string;
    mongolian: string;
    english: string;
    description: string;
    status: string;
    addedDate: string;
    editedDate: string;
};

export const thesisColumns = (
    onDelete: (id: string) => void,
    onEdit: (row: Thesis) => void,
): Column<Thesis>[] => [
    {
        header: "ID",
        accessor: "_id",
        visible: false,
    },
    {
        header: "Сэдвийн нэр (Монгол)",
        accessor: "mongolian",
        visible: true,
    },
    {
        header: "Сэдвийн нэр (Англи)",
        accessor: "english",
        visible: true,
    },
    {
        header: "Тайлбар",
        accessor: "description",
        visible: true,
    },
    {
        header: "Нэмсэн огноо",
        accessor: "addedDate",
        visible: true,
        cell: (row: any) => formatDate(row.addedDate),
    },
    {
        header: "Засварласан огноо",
        accessor: "editedDate",
        visible: true,
        cell: (row: any) => formatDate(row.editedDate),
    },
    {
        header: "Төлөв",
        accessor: "status",
        cell: (row) => <StatusBadge status={row.status} />,
        visible: true,
    },
    {
        header: "Үйлдэл",
        visible: true,
        cell: (row) => (
            <div className="flex gap-2">
                <Button
                    variant="secondary"
                    className="flex items-center gap-1.5 transition-all cursor-pointer"
                    onClick={() => onEdit(row)}
                >
                    <SquarePen size={14} />
                </Button>
                <Button
                    variant="destructive"
                    className="flex items-center gap-1.5 transition-all cursor-pointer"
                    onClick={() => onDelete(row._id)}
                >
                    <Trash2Icon size={14} />
                </Button>
            </div>
        ),
    },
    // // 🔥 AUTO GENERATE TEST COLUMNS
    // ...Array.from({ length: 10 }).map((_, i) => ({
    //     header: `Тест${i === 0 ? "" : i}`,
    //     accessor: `test${i === 0 ? "" : i}` as keyof Thesis,
    //     visible: false,
    // })),
];
