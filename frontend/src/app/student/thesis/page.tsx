//student/thesis/page.tsx
"use client";
import DataTable from "@/components/own/data-table/DataTable";
import { thesisColumns } from "./columns";
import {
    BookOpen,
    Check,
    Info,
    Loader,
    Plus,
    Send,
    User,
    X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { fetcher } from "@/utils/fetcher";
import SendToTeacherModal from "@/components/own/custom-modals/sendTeacherModal";
import { Button } from "@/components/ui/button";
import TopicModal from "@/components/own/custom-modals/topicModal";
import { useConfirm } from "@/context/ConfirmContext";
import { useRouter } from "next/navigation";
import LoadingComp from "@/components/own/LoadingComp";
import { toast, ToastContainer } from "react-toastify";

type Thesis = {
    _id: string;
    mongolian: string;
    english: string;
    description: string;
    status: string;
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

type StatusCompProps = {
    title: string;
    value: number;
    icon?: React.ReactNode;
    color?: string;
};

const StatusComp = ({
    title,
    value,
    icon,
    color = "blue",
}: StatusCompProps) => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-start gap-4 hover:shadow-sm transition-shadow">
            <div
                className={`bg-${color}-100 text-${color}-500 p-2.5 rounded-xl shrink-0`}
            >
                {icon}
            </div>

            <div>
                <p className="text-xs text-gray-400 mb-0.5">{title}</p>
                <p className="text-2xl font-bold text-gray-900 leading-none">
                    {value}
                </p>
            </div>
        </div>
    );
};

export default function Page() {
    const router = useRouter();
    const [data, setData] = useState<Thesis[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Thesis | null>(null);
    const [isSendModalOpen, setIsSendModalOpen] = useState(false);
    const { openConfirm } = useConfirm();

    const statusCards = [
        {
            title: "Нийт сэдвүүд",
            value: data.length,
            icon: <BookOpen size={18} />,
            color: "blue",
        },
        {
            title: "Хүлээгдэж байгаа",
            value: data.filter((d) => d.status === "Хүлээгдэж байгаа").length,
            icon: <Loader size={18} />,
            color: "amber",
        },
        {
            title: "Баталсан",
            value: data.filter((d) => d.status === "Баталсан").length,
            icon: <Check size={18} />,
            color: "green",
        },
        {
            title: "Татгалсан",
            value: data.filter((d) => d.status === "Татгалсан").length,
            icon: <X size={18} />,
            color: "red",
        },
    ];

    const handleDelete = async (id: string) => {
        const confirmed = await openConfirm({
            title: "Сэдэв устгах уу?",
            description: "Сэдэв буцаах боломжгүй",
            confirmText: "Устгах",
            variant: "destructive",
        });

        if (!confirmed) return;

        try {
            const res = await fetcher(`/api/thesis/${id}`, {
                method: "DELETE",
            });

            if (res.success) {
                // ✅ UI update (хамгийн чухал)
                setData((prev) => prev.filter((item) => item._id !== id));
                toast.success(res.message || "Сэдэв амжилттай устгалаа.");
            }
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Хүсэлт амжилтгүй!");
        }
    };

    // EDIT OPEN
    const handleEdit = (row: Thesis) => {
        setEditingItem(row);
        setIsModalOpen(true);
    };
    const columns = thesisColumns(handleDelete, handleEdit);

    // SAVE (ADD + EDIT)
    const handleSave = async (formData: any) => {
        if (editingItem) {
            const res = await fetcher(`/api/thesis/${editingItem._id}`, {
                method: "PUT",
                data: formData,
            });

            if (res.success) {
                setData((prev) =>
                    prev.map((d) => (d._id === editingItem._id ? res.data : d)),
                );
                toast.success(res.message || "Хүсэлт амжилттай.");
            }
        } else {
            const res = await fetcher("/api/thesis/createThesis", {
                method: "POST",
                data: formData,
            });

            if (res.success) {
                setData((prev) => [...prev, res.data]);
                toast.success(res.message || "Сэдэв амжилттай хадгалагдлаа.");
            }
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetcher<{
                    success: boolean;
                    data: Thesis[];
                    count: number;
                }>("/api/thesis", { method: "GET" });

                if (res.success) {
                    setData(res.data);
                }

                console.log(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    const handleSendToTeacher = async (teacherId: string) => {
        console.log("teachID", teacherId);

        try {
            const res = await fetcher("/api/thesis/request", {
                method: "POST",
                data: {
                    supervisorId: teacherId,
                    description: "Сэдвүүдээ шалгаж өгнө үү",
                },
            });

            if (res.data) {
                console.log("Амжилттай:", res.data);
                toast.success("Хүсэлт амжилттай илгээгдлээ");
            }
        } catch (err: any) {
            // console.error(err);
            toast.error(err?.response?.data?.message || "Алдаа гарлаа");
        }
    };

    if (loading) return <LoadingComp />;

    return (
        <div className="flex flex-col h-[86vh]">
            <p className="text-[12px] font-bold text-gray-300 uppercase tracking-[0.12em] mb-2">
                Хураангуй
            </p>
            {/* Summary Box */}
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {statusCards.map((item, i) => (
                    <StatusComp key={i} {...item} />
                ))}
            </div>

            <p className="text-[12px] font-bold text-gray-300 uppercase tracking-[0.12em] mb-2">
                Хүснэгт
            </p>
            {/* DataTable */}
            <div className="flex-1 overflow-auto">
                <DataTable
                    title="Төгсөлтийн сэдвүүд"
                    data={data.map((d) => ({ ...d, id: d._id }))}
                    columns={columns}
                    onRowClick={(row) =>
                        router.push(`/student/thesis/${row._id}`)
                    }
                    actions={
                        <>
                            <Button
                                onClick={() => {
                                    setEditingItem(null);
                                    setIsModalOpen(true);
                                }}
                                variant="outline"
                                className="flex items-center gap-1.5 cursor-pointer"
                            >
                                <Plus size={15} />{" "}
                                <span className="hidden sm:inline">
                                    Сэдэв нэмэх
                                </span>
                            </Button>
                            <Button
                                onClick={() => setIsSendModalOpen(true)}
                                variant="default"
                                className="flex items-center gap-1.5 bg-orange-500 border-orange-500 hover:bg-orange-600 transition-all cursor-pointer"
                            >
                                <Send size={14} />
                                <span className="hidden sm:inline">
                                    Багшид илгээх
                                </span>
                            </Button>
                        </>
                    }
                />
            </div>
            {/* Modals */}
            <SendToTeacherModal
                isOpen={isSendModalOpen}
                onClose={() => setIsSendModalOpen(false)}
                onSave={handleSendToTeacher}
            />
            <TopicModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                mode={editingItem ? "edit" : "add"}
                initialData={editingItem || undefined}
            />
            <ToastContainer
                icon={<Info />}
                position="top-right"
                autoClose={1500}
                limit={1}
                hideProgressBar={false}
                newestOnTop
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
}
