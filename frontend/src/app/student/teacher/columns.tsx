//student/teacher/columns.tsx
import { Column } from "@/components/own/data-table/types";
import StatusBadge from "@/components/own/StatusBadge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/formatDate";
import { SquarePen, Trash2Icon } from "lucide-react";

type Teacher = {
    _id: string;
    image: string;
    firstName: string;
    lastName: string;
    supervisorId: string;
    supervisorCode: string;
    email: string;
    status: string;
};

export const teacherColumns = () // onDelete: (id: string) => void,
// onEdit: (row: Teacher) => void,
: Column<Teacher>[] => [
    {
        header: "ID",
        accessor: "_id",
        visible: false,
    },
    {
        header: "Зураг",
        accessor: "image",
        visible: false,
    },
    {
        header: "Нэр",
        accessor: "firstName",
        visible: true,
    },
    {
        header: "Овог",
        accessor: "lastName",
        visible: true,
    },
    {
        header: "Багшийн код",
        accessor: "supervisorCode",
        visible: true,
    },
    {
        header: "Имэйл",
        accessor: "email",
        visible: true,
    },
    {
        header: "Төлөв",
        accessor: "status",
        cell: (row) => <StatusBadge status={row.status} />,
    },
    {
        header: "Үйлдэл",
        visible: false,
        cell: (row) => (
            <div className="flex gap-2">
                {/* <Button
                    variant="secondary"
                    className="flex items-center gap-1.5 transition-all cursor-pointer"
                    onClick={() => onEdit(row)}
                >
                    <SquarePen size={14} />
                </Button> */}
                {/* <Button
                    variant="destructive"
                    className="flex items-center gap-1.5 transition-all cursor-pointer"
                    onClick={() => onDelete(row._id)}
                >
                    <Trash2Icon size={14} />
                </Button> */}
            </div>
        ),
    },
];
