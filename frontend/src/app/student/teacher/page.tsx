"use client";
import DataTable from "@/components/own/data-table/DataTable";
import { useEffect, useState } from "react";
import { fetcher } from "@/utils/fetcher";
import { teacherColumns } from "./columns";
import DataTableSupervisor from "@/components/own/data-table/DataTableSupervisor";
import LoadingComp from "@/components/own/LoadingComp";

type Teacher = {
    _id: string;
    image: string;
    firstName: string;
    lastName: string;
    supervisorId: string;
    supervisorCode: string;
    email: string;
};

// const data = [
//     {
//         id: "1",
//         fullName: "Бат-Эрдэнэ С.",
//         email: "baterdene.s@example.com",
//         department: "Компьютерийн шинжлэх ухаан",
//         status: "Идэвхтэй",
//     },
//     {
//         id: "2",
//         fullName: "Мөнхжаргал Т.",
//         email: "munkhjargal.t@example.com",
//         department: "Мэдээллийн технологи",
//         status: "Идэвхтэй",
//     },
//     {
//         id: "3",
//         fullName: "Энхтуяа Д.",
//         email: "enkhtuya.d@example.com",
//         department: "Програм хангамжийн инженерчлэл",
//         status: "Идэвхтэй",
//     },
//     {
//         id: "4",
//         fullName: "Наранбат Г.",
//         email: "naranbat.g@example.com",
//         department: "Компьютерийн сүлжээ",
//         status: "Идэвхтэй",
//     },
//     {
//         id: "5",
//         fullName: "Солонго А.",
//         email: "solongo.a@example.com",
//         department: "Мэдээллийн аюулгүй байдал",
//         status: "Идэвхтэй",
//     },
// ];

// const dataTest: TestData[] = [
//     // {
//     //     _id: "1",
//     //     mongolian:
//     //         "Их сургуулийн дипломын ажлын систем (Төгсөлтийн сэдвүүдийн удирдлага)",
//     //     english: "Thesis Management System",
//     //     addedDate: "Jan 4, 2025",
//     //     editedDate: "Jan 4, 2025",
//     //     status: "Илгээсэн",
//     //     test: "Test",
//     //     test1: "Test1",
//     //     test2: "Test2",
//     //     test3: "Test3",
//     //     test4: "Test4",
//     //     test5: "Test5",
//     //     test6: "Test6",
//     //     test7: "Test7",
//     //     test8: "Test8",
//     //     test9: "Test9",
//     //     test10: "Test10",
//     // },
// ];

export default function Page() {
    const [data, setData] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetcher<{
                    success: boolean;
                    data: any[];
                    count: number;
                }>("/api/auth/getAllTeachers", { method: "GET" });

                console.log(res.data);

                if (res.success) {
                    const mapped = res.data.map((req) => ({
                        _id: req._id,
                        supervisorId: req.supervisor?._id ?? "",
                        image: req.image ?? "",
                        firstName: req.firstName ?? "",
                        lastName: req.lastName ?? "",
                        supervisorCode:
                            req.supervisorProfile?.supervisorCode ?? "",
                        email: req.email ?? "",
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
    //             const res = await fetcher("/api/auth/getAllTeachers", {
    //                 method: "GET",
    //             });

    //             console.log("API response:", res.data);

    //             if (res.success) {
    //                 setData(res.data);
    //             }
    //         } catch (err) {
    //             console.error(err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     getData();
    // }, []);

    if (loading) return <LoadingComp />;

    return (
        <div className="flex flex-col h-[86vh]">
            <p className="text-[12px] font-bold text-gray-300 uppercase tracking-[0.12em] mb-2">
                Хураангуй
            </p>
            {/* Summary Box */}
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col">
                    <p className="text-gray-500 text-sm">Нийт багш нар</p>
                    <h2 className="text-2xl font-bold">{data.length}</h2>
                </div>
            </div>

            <p className="text-[12px] font-bold text-gray-300 uppercase tracking-[0.12em] mb-2">
                Хүснэгт
            </p>

            {/* DataTable */}
            <div className="flex-1 overflow-auto">
                <DataTableSupervisor
                    title="Багш нарын жагсаалт"
                    data={data.map((d) => ({ ...d, id: d._id }))}
                    // data={data}
                    columns={teacherColumns()}
                    // actions={
                    //     <>
                    //         {/* <Button
                    //             onClick={() => setIsAddModalOpen(true)}
                    //             variant="outline"
                    //             className="flex items-center gap-1.5 cursor-pointer"
                    //         >
                    //             <Plus size={15} />{" "}
                    //             <span className="hidden sm:inline">
                    //                 Сэдэв нэмэх
                    //             </span>
                    //         </Button>
                    //         <Button
                    //             onClick={() => setIsSendModalOpen(true)}
                    //             variant="default"
                    //             className="flex items-center gap-1.5 bg-orange-500 border-orange-500 hover:bg-orange-600 transition-all cursor-pointer"
                    //         >
                    //             <Send size={14} />
                    //             <span className="hidden sm:inline">
                    //                 Багшид илгээх
                    //             </span>
                    //         </Button> */}
                    //         <div>TEST</div>
                    //     </>
                    // }
                />
            </div>
        </div>
    );
}
