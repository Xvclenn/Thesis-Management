//teacher/thesis/columns.tsx
import { Column } from "@/components/own/data-table/types";
import RoleBadge from "@/components/own/RoleBadge";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";

type Role = "admin" | "supervisor" | "commission" | "headofdepartment";

export type Teacher = {
    _id: string;
    image: string;
    firstName: string;
    lastName: string;
    supervisorId: string;
    supervisorCode: string;
    department: string;
    position: string;
    role: Role[];
    email: string;
};

export const teacherColumns = (
    onEdit: (row: Teacher) => void,
): Column<Teacher>[] => [
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
        header: "Багшийн код",
        accessor: "supervisorCode",
        visible: true,
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
        header: "Цахим шуудан",
        accessor: "email",
        visible: true,
    },
    {
        header: "Тэнхим",
        accessor: "department",
        visible: true,
    },
    {
        header: "Албан тушаал",
        accessor: "position",
        visible: true,
    },
    {
        header: "Системийн эрх",
        accessor: "role",
        visible: true,
        cell: (row) => <RoleBadge role={row.role} />,
    },
    {
        header: "Үйлдэл",
        visible: true,
        cell: (row) => (
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    className="flex items-center gap-1.5 cursor-pointer"
                    onClick={() => onEdit(row)}
                >
                    <SquarePen size={14} />
                </Button>
            </div>
        ),
    },
];
