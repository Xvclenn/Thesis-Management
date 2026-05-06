//teacher/profile/page.tsx
"use client";

import { useState } from "react";
import { Edit, Wifi } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/utils/fetcher";
import { toast, ToastContainer } from "react-toastify";
import LoadingComp from "@/components/own/LoadingComp";
import TeacherProfileModal from "@/components/own/custom-modals/teacherProfileModal";

// ================= Types =================
interface BioFieldProps {
    label: string;
    value: string;
}

// ================= Sub Component =================
function BioField({ label, value }: BioFieldProps) {
    return (
        <div className="flex flex-col gap-0.5">
            <span className="text-xs text-gray-400">{label}</span>
            <span className="text-sm font-medium text-gray-800">
                {value || "-"}
            </span>
        </div>
    );
}

// ================= Main Page =================
export default function TeacherProfile() {
    const { user, setUser } = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // ================= OPEN MODAL =================
    const handleEdit = () => {
        setIsModalOpen(true);
    };

    // ================= SAVE PROFILE =================
    const handleSave = async (data: any) => {
        try {
            setLoading(true);

            const res = await fetcher("/api/supervisor/profile", {
                method: "PUT",
                data,
            });

            console.log(res);

            // 🔥 update context (instant UI sync)
            if (res.success) {
                toast.success("Амжилттай хадгалагдлаа");
            }
            if (setUser) {
                setUser(res.user);
            }

            setIsModalOpen(false);
        } catch (err) {
            console.error("SAVE ERROR:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: any) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("image", file);

            const res = await fetcher("/api/auth/upload-profile", {
                method: "POST",
                data: formData,
            });

            if (res.success) {
                toast.success("Зураг амжилттай солигдлоо");

                // 🔥 instant UI update
                setUser((prev: any) => {
                    if (!prev) return prev;

                    const updated = {
                        ...prev,
                        image: res.image,
                    };

                    localStorage.setItem("user", JSON.stringify(updated));

                    return updated;
                });
            }
        } catch (err) {
            console.error(err);
            toast.error("Хүсэлт амжилтгүй.");
        } finally {
            setLoading(false);
        }
    };

    // ================= BIO DATA =================
    const bioFields: Array<[string, string]> = [
        ["Тэнхим", user?.supervisorProfile?.department],
        ["Зэрэг", String(user?.supervisorProfile?.position)],
        ["Багшийн код", user?.supervisorProfile?.supervisorCode],
        ["Байршил", ""],
        ["Дуртай технологи", ""],
        ["Ашигладаг хэрэгсэл", ""],
    ];

    return (
        <div className="font-sans">
            {/* ================= HEADER ================= */}
            <div className="mb-5 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                        Профайл
                    </h1>
                    <p className="text-sm text-gray-500">
                        Өөрийн бүх профайлын мэдээллийг энд харна уу.
                    </p>
                </div>

                <Button
                    onClick={handleEdit}
                    variant="outline"
                    className="cursor-pointer"
                >
                    <Edit size={16} />
                    Засварлах
                </Button>
            </div>

            <Separator className="h-1 border-t border-dashed bg-transparent" />

            {/* ================= PROFILE CARD ================= */}
            <div className="my-4 flex flex-col lg:flex-row gap-5">
                {/* LEFT */}
                <div className="w-full lg:w-60 min-w-80 border bg-white rounded-2xl p-6 flex flex-col items-center gap-3">
                    <label
                        htmlFor="avatarUpload"
                        className="cursor-pointer block"
                    >
                        <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg group">
                            {/* image */}
                            <Image
                                src={user?.image || "/assets/user.png"}
                                alt="avatar"
                                fill
                                className="object-cover group-hover:opacity-80 transition"
                            />

                            {/* hover overlay */}
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm">
                                Зураг солих
                            </div>
                        </div>
                    </label>

                    <p className="font-semibold text-center">
                        {user?.firstName} {user?.lastName}
                    </p>

                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        {user?.supervisorProfile?.supervisorCode}
                    </span>
                </div>

                {/* RIGHT */}
                <div className="flex-1 p-6 border bg-white rounded-2xl">
                    <div className="flex justify-between mb-4">
                        <h2 className="font-semibold">
                            Bio болон бусад мэдээлэл
                        </h2>
                        {/* <Wifi size={16} className="text-green-500" /> */}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {bioFields.map(([label, value]) => (
                            <BioField key={label} label={label} value={value} />
                        ))}
                    </div>
                </div>
            </div>

            {/* ================= MODAL ================= */}
            <TeacherProfileModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={user}
            />

            {/* ================= LOADING OVERLAY ================= */}
            {loading && (
                <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
                    <div className="bg-white px-6 py-4 rounded-xl shadow">
                        Хадгалж байна...
                    </div>
                </div>
            )}

            <input
                type="file"
                id="avatarUpload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
            />

            <ToastContainer theme="colored" stacked position="top-right" />
        </div>
    );
}
