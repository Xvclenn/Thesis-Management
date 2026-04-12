"use client";

import DataTable from "@/components/own/data-table/DataTable";
import LoadingComp from "@/components/own/LoadingComp";
import { fetcher } from "@/utils/fetcher";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { thesisColumns } from "./columns";

interface Thesis {
    _id: string;
    mongolian: string;
    english: string;
    description: string;
    status: string;
    addedDate: string;
    editedDate: string;
}

// const data = [
//     {
//         _id: "1",
//         mongolian:
//             "Их сургуулийн дипломын ажлын систем (Төгсөлтийн сэдвүүдийн удирдлага)",
//         english: "Thesis Management System",
//         description:
//             "This is a system for managing thesis topics in universities.",
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
//         _id: "2",
//         mongolian: "Их сургуулийн дипломын ажлын систем",
//         english:
//             "Thesis Management System Thesis Management System Thesis Management System",
//         description:
//             "A comprehensive platform for handling thesis submissions and approvals.",
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
//         _id: "3",
//         mongolian: "Их сургуулийн дипломын ажлын систем",
//         english: "Thesis Management System",
//         description:
//             "System designed to streamline thesis management processes.",
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
//         _id: "4",
//         mongolian: "Их сургуулийн дипломын ажлын систем",
//         english: "Thesis Management System",
//         description:
//             "An application for managing academic thesis topics efficiently.",
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
//         _id: "5",
//         mongolian: "Их сургуулийн дипломын ажлын систем",
//         english: "Thesis Management System",
//         description: "Platform to oversee and approve thesis proposals.",
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
//         _id: "6",
//         mongolian: "Хиймэл оюуны технологи ашигласан эмнэлгийн систем",
//         english: "AI-Powered Healthcare Management System",
//         description:
//             "Healthcare system leveraging AI for better management and diagnostics.",
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
//         _id: "7",
//         mongolian: "Мобайл утасны аппликейшн дизайн ба хөгжүүлэлт",
//         english: "Mobile Application Design and Development",
//         description:
//             "Project focused on designing and developing mobile applications.",
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
//         _id: "8",
//         mongolian: "Үйлдвэрлэлийн удирдлагын платформ",
//         english: "Manufacturing Management Platform",
//         description:
//             "Platform for managing manufacturing processes and operations.",
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
//         _id: "9",
//         mongolian: "Блокчэйн технологи дээр суурилсан нэхэр түүхийн систем",
//         english: "Blockchain-Based Supply Chain System",
//         description:
//             "Supply chain system built on blockchain for transparency and security.",
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
//         _id: "10",
//         mongolian: "Цахим сургалтын платформ",
//         english: "E-Learning Platform",
//         description:
//             "Online platform for educational courses and learning management.",
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
//         _id: "11",
//         mongolian: "IoT сенсор ашигласан ухаалаг байшингийн систем",
//         english: "IoT Smart Home System",
//         description: "Smart home system utilizing IoT sensors for automation.",
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
//         _id: "12",
//         mongolian: "Үнэ төлбөргүй ба нээлттэй эхийн програм хангамж",
//         english: "Open Source Software Development",
//         description: "Development of open-source software for community use.",
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
//         _id: "13",
//         mongolian: "Гажилтаа арилгах машин сургалтын модель",
//         english: "Anomaly Detection ML Model",
//         description: "Machine learning model for detecting anomalies in data.",
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
//         _id: "14",
//         mongolian: "Клаудын үйлчилгээнээс ашиглаж байгаа программ",
//         english: "Cloud-Based Service Application",
//         description: "Application leveraging cloud services for scalability.",
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
//         _id: "15",
//         mongolian: "Виртуал бодит байдлын аппликейшн төлөвлөлт",
//         english: "Virtual Reality Application Planning",
//         description:
//             "Planning and development of virtual reality applications.",
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

export default function ThesisList() {
    const [data, setData] = useState<Thesis[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const params = useParams();

    console.log(params.slug);

    const handleDelete = async (id: string) => {
        // const confirmed = await openConfirm({
        //     title: "Сэдэв устгах уу?",
        //     description: "Сэдэв буцаах боломжгүй",
        //     confirmText: "Устгах",
        //     variant: "destructive",
        // });

        // if (!confirmed) return;

        console.log("ID", id);

        // try {
        //     const res = await fetcher(`/api/thesis/${id}`, {
        //         method: "DELETE",
        //     });

        //     if (res.success) {
        //         // ✅ UI update (хамгийн чухал)
        //         setData((prev) => prev.filter((item) => item._id !== id));
        //     }
        // } catch (err) {
        //     console.error(err);
        // }
    };

    // EDIT OPEN
    const handleEdit = (row: Thesis) => {
        // setEditingItem(row);
        // setIsModalOpen(true);
        console.log("ROW", row);
    };

    const columns = thesisColumns(handleDelete, handleEdit);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetcher<{
                    success: boolean;
                    data: Thesis[];
                    count: number;
                }>(`/api/thesis/student/${params.slug}`, { method: "GET" });

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

    // useEffect(() => {
    //     if (!params?.slug) return;

    //     const fetchData = async () => {
    //         setLoading(true);
    //         try {
    //             const res = await fetcher(`/api/thesis/${params.slug}`, {
    //                 method: "GET",
    //             });

    //             if (!res?.success || !res.data) {
    //                 setError("Сэдэв олдсонгүй");
    //                 setData(null);
    //             } else {
    //                 setData(res.data);
    //                 setError(null);
    //             }
    //         } catch (err) {
    //             console.error("Error fetching thesis:", err);
    //             setError("Серверийн алдаа гарлаа");
    //             setData(null);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, [params.slug]);

    if (loading) return <LoadingComp />;
    if (error) return <p className="p-6 text-red-500">{error}</p>;
    if (!data) return <p className="p-6">Сэдэв олдсонгүй</p>;

    return (
        // <div className="p-6 space-y-3 bg-white shadow rounded-lg">
        //     <h1 className="text-2xl font-bold">{data.mongolian}</h1>
        //     <p className="text-gray-500">{data.english}</p>
        //     <p className="mt-2">{data.description}</p>
        //     <p className="text-sm text-gray-400">
        //         Нэмсэн: {new Date(data.addedDate).toLocaleString()}
        //     </p>
        //     <p className="text-sm text-gray-400">
        //         Засварласан: {new Date(data.editedDate).toLocaleString()}
        //     </p>
        //     <p className="mt-2 font-semibold">Төлөв: {data.status}</p>
        // </div>
        <div className="flex flex-col h-[88vh] bg-gray-100">
            {/* Summary Box */}
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white shadow rounded-lg p-5 flex flex-col">
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
                <DataTable
                    title="Төгсөлтийн сэдвүүд"
                    data={data.map((d) => ({ ...d, id: d._id }))}
                    columns={columns}
                    // onRowClick={(row) =>
                    //     router.push(`/teacher/thesis/${row._id}`)
                    // }
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
