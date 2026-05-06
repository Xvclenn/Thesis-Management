import { Column } from "@/components/own/data-table/types";
import StatusBadge from "@/components/own/StatusBadge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/formatDate";
import { Check, SquarePen, Trash2Icon } from "lucide-react";

type Thesis = {
    _id: string;
    mongolian: string;
    english: string;
    description: string;
    status: string;
    addedDate: string;
    editedDate: string;
    student: string;
    requestId: string;
};

export const thesisColumns = (
    onEdit: (row: Thesis) => void,
): Column<Thesis>[] => [
    {
        header: "ID",
        accessor: "_id",
        visible: true,
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
                {/* <Button
                    variant="secondary"
                    className="group flex text-green-800 bg-green-200 items-center gap-1.5 transition-all hover:bg-green-200 cursor-pointer"
                    onClick={() => onApprove(row.requestId)}
                >
                    <Check size={14} />{" "}
                    <span className="hidden group-hover:block transition-all">
                        Батлах
                    </span>
                </Button> */}
            </div>
        ),
    },
];
