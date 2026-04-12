"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AlertTriangle, LogIn } from "lucide-react";

export default function Expired() {
    const router = useRouter();

    const handleLogin = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <div className="bg-red-100 p-4 rounded-full">
                        <AlertTriangle className="text-red-500" size={32} />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-900">
                    Session хугацаа дууссан
                </h1>

                {/* Description */}
                <p className="text-gray-500 mt-2 text-sm">
                    Таны нэвтрэх эрхийн хугацаа дууссан байна. Дахин нэвтэрч
                    үргэлжлүүлнэ үү.
                </p>

                {/* Actions */}
                <div className="mt-6 flex flex-col gap-3">
                    <Button
                        onClick={handleLogin}
                        className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 cursor-pointer"
                    >
                        <LogIn size={16} />
                        Дахин нэвтрэх
                    </Button>
                </div>
            </div>
        </div>
    );
}
