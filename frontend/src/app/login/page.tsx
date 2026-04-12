"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/context/AuthContext";
import { fetcher } from "@/utils/fetcher";
import Link from "next/dist/client/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function LoginPage() {
    const { setUser } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            return toast.warning("Бүх талбарыг бөглөнө үү");
        }

        try {
            const res = await fetcher("/api/auth/login", {
                method: "POST",
                data: { email, password },
            });

            if (!res || res.status === "error") {
                return alert(res?.message || "Нэвтрэхэд алдаа гарлаа");
            }

            const { token, user } = res;

            console.log("Response:", res.user.role);

            if (res.status !== 200) {
                toast.info(res.message || "Нэвтрэхэд алдаа гарлаа");
            }

            localStorage.setItem("token", token);
            localStorage.setItem("role", res.user.role);
            localStorage.setItem("user", JSON.stringify(user));

            setUser(user);

            if (res.user.role.includes("student")) {
                router.push("/student/dashboard");
            } else if (
                res.user.role.includes("supervisor") ||
                res.user.role.includes("admin")
            ) {
                router.push("/teacher/dashboard");
            }
        } catch (err: any) {
            toast.error(
                err?.response?.data?.message || "Серверийн алдаа гарлаа",
            );
        }
    };

    return (
        <div className="flex h-screen bg-[#FAFAF8]">
            {/* LEFT SIDE — LOGIN FORM */}
            <div className="flex flex-col justify-center w-full lg:w-1/2 px-10 md:px-20 xl:px-50">
                {/* Logo / Brand mark */}
                <div className="mb-12">
                    <div className="inline-flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#FF8D28] flex items-center justify-center">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                            >
                                <path
                                    d="M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z"
                                    fill="white"
                                />
                            </svg>
                        </div>
                        <span className="text-sm font-semibold text-[#263238] tracking-tight">
                            Цахим дипломын портал
                        </span>
                    </div>
                </div>

                {/* Heading */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-[#263238] tracking-tight leading-tight mb-2">
                        Тавтай морил
                    </h1>
                    <p className="text-sm text-[#90A4AE]">
                        Үргэлжлүүлэхийн тулд нэвтэрнэ үү
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleLogin}>
                    {/* Role selector */}
                    <RadioGroup
                        defaultValue="student"
                        className="flex gap-3 mb-6"
                    >
                        <div className="flex-1">
                            <RadioGroupItem
                                value="student"
                                id="r1"
                                className="sr-only peer"
                            />
                            <Label
                                htmlFor="r1"
                                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-[#E0E0E0] bg-white text-sm font-medium text-[#546E7A] cursor-pointer transition-all peer-data-[state=checked]:border-[#FF8D28] peer-data-[state=checked]:text-[#FF8D28] peer-data-[state=checked]:bg-[#FFF5ED] hover:border-[#FF8D28]/50"
                            >
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                </svg>
                                Оюутан
                            </Label>
                        </div>
                        <div className="flex-1">
                            <RadioGroupItem
                                value="teacher"
                                id="r2"
                                className="sr-only peer"
                            />
                            <Label
                                htmlFor="r2"
                                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-[#E0E0E0] bg-white text-sm font-medium text-[#546E7A] cursor-pointer transition-all peer-data-[state=checked]:border-[#FF8D28] peer-data-[state=checked]:text-[#FF8D28] peer-data-[state=checked]:bg-[#FFF5ED] hover:border-[#FF8D28]/50"
                            >
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                                Багш
                            </Label>
                        </div>
                    </RadioGroup>

                    {/* Inputs */}
                    <div className="space-y-3">
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0BEC5]">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </span>
                            <Input
                                type="text"
                                placeholder="Хэрэглэгчийн код"
                                className="pl-11 pr-4 py-5 rounded-xl border-[#E0E0E0] bg-white text-sm text-[#263238] placeholder:text-[#B0BEC5] focus-visible:ring-1 focus-visible:ring-[#FF8D28] focus-visible:border-[#FF8D28] transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0BEC5]">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <rect
                                        x="3"
                                        y="11"
                                        width="18"
                                        height="11"
                                        rx="2"
                                    />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </span>
                            <Input
                                type="password"
                                placeholder="Нууц үг"
                                className="pl-11 pr-4 py-5 rounded-xl border-[#E0E0E0] bg-white text-sm text-[#263238] placeholder:text-[#B0BEC5] focus-visible:ring-1 focus-visible:ring-[#FF8D28] focus-visible:border-[#FF8D28] transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Forgot password */}
                    <div className="flex justify-end pt-1">
                        <Link
                            href="/forgot-password"
                            className="text-xs font-medium text-[#FF8D28] hover:text-[#e07820] transition-colors"
                        >
                            Нууц үгээ мартсан уу?
                        </Link>
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        className="w-full bg-[#FF8D28] hover:bg-[#e07820] active:scale-[0.98] text-white font-semibold py-5 rounded-xl shadow-sm shadow-[#FF8D28]/30 transition-all duration-150 cursor-pointer mt-2"
                        onClick={handleLogin}
                    >
                        Нэвтрэх
                    </Button>
                </form>

                {/* Footer note */}
                <p className="mt-10 text-xs text-[#B0BEC5] text-center">
                    © 2026 Цахим дипломын портал.
                </p>
            </div>

            {/* RIGHT SIDE — IMAGE */}
            <div className="hidden lg:block relative w-1/2 m-4">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    <Image
                        src="/assets/rightside.png"
                        alt="Login Background"
                        fill
                        className="object-cover"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent rounded-2xl" />

                    {/* Bottom quote card */}
                    <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5">
                        <p className="text-white text-sm font-medium leading-relaxed">
                            "Мэдлэг бол хамгийн хүчтэй зэвсэг — ертөнцийг
                            өөрчлөхөд ашиглаж болно."
                        </p>
                        <p className="text-white/60 text-xs mt-2">
                            — Нельсон Мандела
                        </p>
                    </div>
                </div>
            </div>

            <ToastContainer theme="colored" stacked position="top-right" />
        </div>
    );
}
