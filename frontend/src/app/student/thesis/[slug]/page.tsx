"use client";
import { fetcher } from "@/utils/fetcher";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Thesis {
    _id: string;
    mongolian: string;
    english: string;
    description: string;
    status: string;
    addedDate: string;
    editedDate: string;
}

export default function ThesisDetail() {
    const [data, setData] = useState<Thesis | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const params = useParams();

    useEffect(() => {
        if (!params?.slug) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetcher(`/api/thesis/${params.slug}`, {
                    method: "GET",
                });

                if (!res?.success || !res.data) {
                    setError("Сэдэв олдсонгүй");
                    setData(null);
                } else {
                    setData(res.data);
                    setError(null);
                }
            } catch (err) {
                console.error("Error fetching thesis:", err);
                setError("Серверийн алдаа гарлаа");
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.slug]);

    if (loading) return <p className="p-6">Уншиж байна...</p>;
    if (error) return <p className="p-6 text-red-500">{error}</p>;
    if (!data) return <p className="p-6">Сэдэв олдсонгүй</p>;

    return (
        <div className="p-6 space-y-3 bg-white shadow rounded-lg">
            <h1 className="text-2xl font-bold">{data.mongolian}</h1>
            <p className="text-gray-500">{data.english}</p>
            <p className="mt-2">{data.description}</p>
            <p className="text-sm text-gray-400">
                Нэмсэн: {new Date(data.addedDate).toLocaleString()}
            </p>
            <p className="text-sm text-gray-400">
                Засварласан: {new Date(data.editedDate).toLocaleString()}
            </p>
            <p className="mt-2 font-semibold">Төлөв: {data.status}</p>
        </div>
    );
}
