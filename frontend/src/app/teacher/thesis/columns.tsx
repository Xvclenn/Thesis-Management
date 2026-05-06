//teacher/thesis/columns.tsx
import { Column } from "@/components/own/data-table/types";
import StatusBadge from "@/components/own/StatusBadge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/formatDate";
import { Check, SquarePen, Trash2Icon, X } from "lucide-react";

type Student = {
    _id: string;
    image: string;
    firstName: string;
    lastName: string;
    studentId: string;
    studentCode: string;
    email: string;
    description: string;
    addedDate: string;
    editedDate: string;
    status: string;
};

export const studentColumns = (
    onApprove: (id: string) => void,
    onReject: (id: string) => void,
): Column<Student>[] => [
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
        header: "Оюутны код",
        accessor: "studentCode",
        visible: true,
    },
    {
        header: "Имэйл",
        accessor: "email",
        visible: true,
    },
    {
        header: "Тайлбар",
        accessor: "description",
        visible: true,
    },
    {
        header: "Илгээсэн огноо",
        accessor: "addedDate",
        visible: true,
        cell: (row: any) => formatDate(row.addedDate),
    },
    {
        header: "Засварласан огноо",
        accessor: "editedDate",
        visible: false,
        cell: (row: any) => formatDate(row.editedDate),
    },
    {
        header: "Төлөв",
        accessor: "status",
        cell: (row) => <StatusBadge status={row.status} />,
    },
    {
        header: "Үйлдэл",
        visible: true,
        cell: (row) => (
            <div className="flex gap-2">
                <Button
                    variant="secondary"
                    className="group flex text-green-800 bg-green-200 items-center gap-1.5 transition-all hover:bg-green-200 cursor-pointer"
                    onClick={() => onApprove(row._id)}
                >
                    <Check size={14} />{" "}
                    <span className="hidden group-hover:block transition-all">
                        Батлах
                    </span>
                </Button>
                <Button
                    variant="destructive"
                    className="group flex items-center gap-1.5 transition-all cursor-pointer"
                    onClick={() => onReject(row._id)}
                >
                    <X size={14} />{" "}
                    <span className="hidden group-hover:block transition-all">
                        Татгалзах
                    </span>
                </Button>
            </div>
        ),
    },
];
