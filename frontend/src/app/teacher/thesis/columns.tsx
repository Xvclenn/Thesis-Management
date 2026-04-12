import { Column } from "@/components/own/data-table/types";
import StatusBadge from "@/components/own/StatusBadge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/formatDate";
import { SquarePen, Trash2Icon } from "lucide-react";

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
};

export const studentColumns = (
    // onDelete: (id: string) => void,
    onEdit: (row: Student) => void,
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
