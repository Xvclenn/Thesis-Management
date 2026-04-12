//student/thesis/page.tsx
"use client";
import DataTable from "@/components/own/data-table/DataTable";
import { studentColumns } from "./columns";
import { Plus, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { fetcher } from "@/utils/fetcher";
import AddTopicModal from "@/components/own/custom-modals/addTopicModal";
import SendToTeacherModal from "@/components/own/custom-modals/sendTeacherModal";
import { Button } from "@/components/ui/button";
import TopicModal from "@/components/own/custom-modals/topicModal";
import { useConfirm } from "@/context/ConfirmContext";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import DataTableStudents from "@/components/own/data-table/DataTableStudents";
import LoadingComp from "@/components/own/LoadingComp";

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

// const data = [
//     {
//         id: "1",
//         mongolian:
//             "Их сургуулийн дипломын ажлын систем (Төгсөлтийн сэдвүүдийн удирдлага)",
//         english: "Thesis Management System",
//         addedDate: "Jan 4, 2025",
//         editedDate: "Jan 4, 2025",
//         status: "Илгээсэн",
//         test: "Test",
//         test1: "Test1",
//         test2: "Test2",
//         test3: "Test3",
//         test4: "Test4",
//         test5: "Test5",
//         test6: "Test6",
//         test7: "Test7",
//         test8: "Test8",
//         test9: "Test9",
//         test10: "Test10",
//     },
//     {
//         id: "2",
//         mongolian: "Их сургуулийн дипломын ажлын систем",
//         english:
//             "Thesis Management System Thesis Management System Thesis Management System",
//         addedDate: "Jan 4, 2025",
//         editedDate: "Jan 4, 2025",
//         status: "Баталсан",
//         test: "Test",
//         test1: "Test1",
//         test2: "Test2",
//         test3: "Test3",
//         test4: "Test4",
//         test5: "Test5",
//         test6: "Test6",
//         test7: "Test7",
//         test8: "Test8",
//         test9: "Test9",
//         test10: "Test10",
//     },
//     {
//         id: "3",
//         mongolian: "Их сургуулийн дипломын ажлын систем",
//         english: "Thesis Management System",
//         addedDate: "Jan 4, 2025",
//         editedDate: "Jan 4, 2025",
//         status: "Татгалсан",
//         test: "Test",
//         test1: "Test1",
//         test2: "Test2",
//         test3: "Test3",
//         test4: "Test4",
//         test5: "Test5",
//         test6: "Test6",
//         test7: "Test7",
//         test8: "Test8",
//         test9: "Test9",
//         test10: "Test10",
//     },
//     {
//         id: "4",
//         mongolian: "Их сургуулийн дипломын ажлын систем",
//         english: "Thesis Management System",
//         addedDate: "Jan 4, 2025",
//         editedDate: "Jan 4, 2025",
//         status: "Татгалсан",
//         test: "Test",
//         test1: "Test1",
//         test2: "Test2",
//         test3: "Test3",
//         test4: "Test4",
//         test5: "Test5",
//         test6: "Test6",
//         test7: "Test7",
//         test8: "Test8",
//         test9: "Test9",
//         test10: "Test10",
//     },
//     {
//         id: "5",
//         mongolian: "Их сургуулийн дипломын ажлын систем",
//         english: "Thesis Management System",
//         addedDate: "Jan 4, 2025",
//         editedDate: "Jan 4, 2025",
//         status: "Татгалсан",
//         test: "Test",
//         test1: "Test1",
//         test2: "Test2",
//         test3: "Test3",
//         test4: "Test4",
//         test5: "Test5",
//         test6: "Test6",
//         test7: "Test7",
//         test8: "Test8",
//         test9: "Test9",
//         test10: "Test10",
//     },
//     {
//         id: "6",
//         mongolian: "Хиймэл оюуны технологи ашигласан эмнэлгийн систем",
//         english: "AI-Powered Healthcare Management System",
//         addedDate: "Jan 5, 2025",
//         editedDate: "Jan 5, 2025",
//         status: "Илгээсэн",
//         test: "Test",
//         test1: "Test1",
//         test2: "Test2",
//         test3: "Test3",
//         test4: "Test4",
//         test5: "Test5",
//         test6: "Test6",
//         test7: "Test7",
//         test8: "Test8",
//         test9: "Test9",
//         test10: "Test10",
//     },
//     {
//         id: "7",
//         mongolian: "Мобайл утасны аппликейшн дизайн ба хөгжүүлэлт",
//         english: "Mobile Application Design and Development",
//         addedDate: "Jan 6, 2025",
//         editedDate: "Jan 6, 2025",
//         status: "Баталсан",
//         test: "Test",
//         test1: "Test1",
//         test2: "Test2",
//         test3: "Test3",
//         test4: "Test4",
//         test5: "Test5",
//         test6: "Test6",
//         test7: "Test7",
//         test8: "Test8",
//         test9: "Test9",
//         test10: "Test10",
//     },
//     {
//         id: "8",
//         mongolian: "Үйлдвэрлэлийн удирдлагын платформ",
//         english: "Manufacturing Management Platform",
//         addedDate: "Jan 3, 2025",
//         editedDate: "Jan 3, 2025",
//         status: "Баталсан",
//         test: "Test",
//         test1: "Test1",
//         test2: "Test2",
//         test3: "Test3",
//         test4: "Test4",
//         test5: "Test5",
//         test6: "Test6",
//         test7: "Test7",
//         test8: "Test8",
//         test9: "Test9",
//         test10: "Test10",
//     },
//     {
//         id: "9",
//         mongolian: "Блокчэйн технологи дээр суурилсан нэхэр түүхийн систем",
//         english: "Blockchain-Based Supply Chain System",
//         addedDate: "Jan 2, 2025",
//         editedDate: "Jan 2, 2025",
//         status: "Татгалсан",
//         test: "Test",
//         test1: "Test1",
//         test2: "Test2",
//         test3: "Test3",
//         test4: "Test4",
//         test5: "Test5",
//         test6: "Test6",
//         test7: "Test7",
//         test8: "Test8",
//         test9: "Test9",
//         test10: "Test10",
//     },
//     {
//         id: "10",
//         mongolian: "Цахим сургалтын платформ",
//         english: "E-Learning Platform",
//         addedDate: "Jan 1, 2025",
//         editedDate: "Jan 1, 2025",
//         status: "Баталсан",
//         test: "Test",
//         test1: "Test1",
//         test2: "Test2",
//         test3: "Test3",
//         test4: "Test4",
//         test5: "Test5",
//         test6: "Test6",
//         test7: "Test7",
//         test8: "Test8",
//         test9: "Test9",
//         test10: "Test10",
//     },
//     {
//         id: "11",
//         mongolian: "IoT сенсор ашигласан ухаалаг байшингийн систем",
//         english: "IoT Smart Home System",
//         addedDate: "Dec 31, 2024",
//         editedDate: "Dec 31, 2024",
//         status: "Илгээсэн",
//         test: "Test",
//         test1: "Test1",
//         test2: "Test2",
//         test3: "Test3",
//         test4: "Test4",
//         test5: "Test5",
//         test6: "Test6",
//         test7: "Test7",
//         test8: "Test8",
//         test9: "Test9",
//         test10: "Test10",
//     },
//     {
//         id: "12",
//         mongolian: "Үнэ төлбөргүй ба нээлттэй эхийн програм хангамж",
//         english: "Open Source Software Development",
//         addedDate: "Dec 30, 2024",
//         editedDate: "Dec 30, 2024",
//         status: "Баталсан",
//         test: "Test",
//         test1: "Test1",
//         test2: "Test2",
//         test3: "Test3",
//         test4: "Test4",
//         test5: "Test5",
//         test6: "Test6",
//         test7: "Test7",
//         test8: "Test8",
//         test9: "Test9",
//         test10: "Test10",
//     },
//     {
//         id: "13",
//         mongolian: "Гажилтаа арилгах машин сургалтын модель",
//         english: "Anomaly Detection ML Model",
//         addedDate: "Dec 29, 2024",
//         editedDate: "Dec 29, 2024",
//         status: "Баталсан",
//         test: "Test",
//         test1: "Test1",
//         test2: "Test2",
//         test3: "Test3",
//         test4: "Test4",
//         test5: "Test5",
//         test6: "Test6",
//         test7: "Test7",
//         test8: "Test8",
//         test9: "Test9",
//         test10: "Test10",
//     },
//     {
//         id: "14",
//         mongolian: "Клаудын үйлчилгээнээс ашиглаж байгаа программ",
//         english: "Cloud-Based Service Application",
//         addedDate: "Dec 28, 2024",
//         editedDate: "Dec 28, 2024",
//         status: "Татгалсан",
//         test: "Test",
//         test1: "Test1",
//         test2: "Test2",
//         test3: "Test3",
//         test4: "Test4",
//         test5: "Test5",
//         test6: "Test6",
//         test7: "Test7",
//         test8: "Test8",
//         test9: "Test9",
//         test10: "Test10",
//     },
//     {
//         id: "15",
//         mongolian: "Виртуал бодит байдлын аппликейшн төлөвлөлт",
//         english: "Virtual Reality Application Planning",
//         addedDate: "Dec 27, 2024",
//         editedDate: "Dec 27, 2024",
//         status: "Баталсан",
//         test: "Test",
//         test1: "Test1",
//         test2: "Test2",
//         test3: "Test3",
//         test4: "Test4",
//         test5: "Test5",
//         test6: "Test6",
//         test7: "Test7",
//         test8: "Test8",
//         test9: "Test9",
//         test10: "Test10",
//     },
// ];

export default function Page() {
    const router = useRouter();
    const [data, setData] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [studentId, setStudentId] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Student | null>(null);
    const [isSendModalOpen, setIsSendModalOpen] = useState(false);
    const { openConfirm } = useConfirm();

    // EDIT OPEN
    const handleEdit = (row: Student) => {
        setEditingItem(row);
        setIsModalOpen(true);
    };
    const columns = studentColumns(handleEdit);

    // SAVE (ADD + EDIT)
    const handleSave = async (formData: any) => {
        if (editingItem) {
            const res = await fetcher(
                `/api/thesis/editThesis/${editingItem._id}`,
                {
                    method: "PUT",
                    data: formData,
                },
            );

            if (res.success) {
                setData((prev) =>
                    prev.map((d) => (d._id === editingItem._id ? res.data : d)),
                );
            }
        } else {
            const res = await fetcher("/api/thesis/createThesis", {
                method: "POST",
                data: formData,
            });

            if (res.success) {
                setData((prev) => [...prev, res.data]);
            }
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetcher<{
                    success: boolean;
                    data: any[];
                    count: number;
                }>("/api/thesis/requests/incoming", { method: "GET" });

                // console.log(res.data);

                if (res.success) {
                    const mapped = res.data.map((req) => ({
                        id: req._id,
                        _id: req._id,
                        studentId: req.student?._id ?? "",
                        image: req.student?.user?.image ?? "",
                        firstName: req.student?.user?.firstName ?? "",
                        lastName: req.student?.user?.lastName ?? "",
                        studentCode: req.student?.studentCode ?? "",
                        email: req.student?.user?.email ?? "",
                        description: req.description ?? "",
                        addedDate: req.createdAt,
                        editedDate: req.updatedAt,
                    }));

                    console.log("MAPPED", mapped);

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

    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             const res = await fetcher("/api/thesis/requests/incoming", {
    //                 method: "GET",
    //             });

    //             console.log("res", res.data);

    //             if (res.success) {
    //                 setData(res);
    //             }
    //         } catch (err) {
    //             toast.error("Өгөгдөл авахад алдаа гарлаа");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     getData();
    // }, []);

    if (loading) return <LoadingComp />;

    return (
        <div className="flex flex-col h-[88vh]">
            {/* Summary Box */}
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col">
                    <p className="text-gray-500 text-sm">Нийт сэдвүүд</p>
                    <h2 className="text-2xl font-bold">{data.length}</h2>
                </div>
                {/* <div className="bg-white shadow rounded-lg p-5 flex flex-col">
                    <p className="text-gray-500 text-sm">Хүлээгдэж байгаа</p>
                    <h2 className="text-2xl font-bold">
                        {
                            data.filter((d) => d.status === "Хүлээгдэж байгаа")
                                .length
                        }
                    </h2>
                </div>
                <div className="bg-white shadow rounded-lg p-5 flex flex-col">
                    <p className="text-gray-500 text-sm">Баталсан</p>
                    <h2 className="text-2xl font-bold">
                        {data.filter((d) => d.status === "Баталсан").length}
                    </h2>
                </div>
                <div className="bg-white shadow rounded-lg p-5 flex flex-col">
                    <p className="text-gray-500 text-sm">Татгалсан</p>
                    <h2 className="text-2xl font-bold">
                        {data.filter((d) => d.status === "Татгалсан").length}
                    </h2>
                </div> */}
            </div>

            {/* DataTable */}
            <div className="flex-1 overflow-auto pb-5">
                <DataTableStudents
                    title="Хүсэлт илгээсэн оюутнууд"
                    data={data.map((d) => ({ ...d, id: d._id }))}
                    columns={columns}
                    onRowClick={(row) =>
                        router.push(`/teacher/thesis/${row.studentId}`)
                    }
                />
            </div>
            {/* Modals */}
            {/* <TopicModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                mode={editingItem ? "edit" : "add"}
                initialData={editingItem || undefined}
            /> */}
            <ToastContainer />
        </div>
    );
}
