//teacher/thesis/page.tsx
"use client";

import DataTable from "@/components/own/data-table/DataTable";
import { teacherColumns, Teacher } from "./columns";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { fetcher } from "@/utils/fetcher";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import LoadingComp from "@/components/own/LoadingComp";
import EditTeacherProfileModal from "@/components/own/custom-modals/editTeacherModal";
import AddTeacherModal from "@/components/own/custom-modals/addTeacherModal";

export default function Page() {
    const [data, setData] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<Teacher | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetcher<{
                    success: boolean;
                    data: any[];
                }>("/api/auth/getAllTeachers", { method: "GET" });

                if (res.success) {
                    const mapped: Teacher[] = res.data.map((teacher) => ({
                        _id: teacher._id,
                        image: teacher.image,
                        firstName: teacher.firstName,
                        lastName: teacher.lastName,
                        supervisorId: teacher.supervisorProfile?._id,
                        supervisorCode:
                            teacher.supervisorProfile?.supervisorCode,
                        department: teacher.supervisorProfile?.department,
                        position: teacher.supervisorProfile?.position,
                        role: teacher.role,
                        email: teacher.email,
                    }));

                    setData(mapped);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    const handleEdit = (row: Teacher) => {
        setSelectedUser(row);
        setIsModalOpen(true);
    };

    const handleAdd = async (form: any) => {
        try {
            const res = await fetcher("/api/auth/register", {
                method: "POST",
                data: form,
            });

            if (res.success) {
                toast.success("Амжилттай нэмэгдлээ");

                setData((prev) => [...prev, res.user]);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSave = async (updatedData: any) => {
        if (!selectedUser) return;

        try {
            const res = await fetcher(
                `/api/admin/teacher/${selectedUser._id}`,
                {
                    method: "PUT",
                    data: updatedData,
                },
            );

            if (res.success) {
                toast.success("Мэдээлэл амжилттай шинэчлэгдлээ");
                // 🔥 UI update
                setData((prev) =>
                    prev.map((item) =>
                        item._id === selectedUser._id
                            ? { ...item, ...updatedData }
                            : item,
                    ),
                );
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <LoadingComp />;

    return (
        <div className="flex flex-col h-[86vh]">
            <p className="text-[12px] font-bold text-gray-300 uppercase tracking-[0.12em] mb-2">
                Хүснэгт
            </p>

            <div className="flex-1 overflow-auto">
                <DataTable
                    title="Эрхийн удирдлага"
                    data={data.map((d) => ({ ...d, id: d._id }))}
                    columns={teacherColumns(handleEdit)}
                    actions={
                        <Button
                            variant="outline"
                            className="flex items-center gap-1.5 cursor-pointer"
                            onClick={() => {
                                setIsAddModalOpen(true);
                            }}
                        >
                            <Plus size={15} />
                            <span className="hidden sm:inline">Багш нэмэх</span>
                        </Button>
                    }
                />
            </div>

            <EditTeacherProfileModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={selectedUser}
            />

            <AddTeacherModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleAdd}
            />

            <ToastContainer />
        </div>
    );
}
