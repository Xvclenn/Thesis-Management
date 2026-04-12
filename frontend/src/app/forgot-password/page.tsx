"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
    const router = useRouter();

    return (
        <div className="flex h-screen bg-[#FAFAF8]">
            {/* LEFT SIDE */}
            <div className="flex flex-col justify-center w-full lg:w-1/2 px-10 md:px-20 xl:px-50">
                {/* Logo */}
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
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#FFF5ED] mb-5">
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#FF8D28"
                            strokeWidth="2"
                        >
                            <rect x="3" y="11" width="18" height="11" rx="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-[#263238] tracking-tight leading-tight mb-2">
                        Нууц үг сэргээх
                    </h1>
                    <p className="text-sm text-[#90A4AE]">
                        Хэрэглэгчийн код болон и-мэйл хаягаа оруулна уу
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-3">
                    {/* Usercode input */}
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
                        />
                    </div>

                    {/* Email input */}
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
                                    x="2"
                                    y="4"
                                    width="20"
                                    height="16"
                                    rx="2"
                                />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                        </span>
                        <Input
                            type="email"
                            placeholder="И-мэйл хаяг"
                            className="pl-11 pr-4 py-5 rounded-xl border-[#E0E0E0] bg-white text-sm text-[#263238] placeholder:text-[#B0BEC5] focus-visible:ring-1 focus-visible:ring-[#FF8D28] focus-visible:border-[#FF8D28] transition-all"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">
                        <Button
                            type="button"
                            onClick={() => router.push("/login")}
                            className="flex-1 bg-white hover:bg-[#F5F5F5] active:scale-[0.98] text-[#546E7A] border border-[#E0E0E0] font-medium py-5 rounded-xl transition-all duration-150 cursor-pointer shadow-none"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Буцах
                        </Button>

                        <Button
                            type="submit"
                            className="flex-1 bg-[#FF8D28] hover:bg-[#e07820] active:scale-[0.98] text-white font-semibold py-5 rounded-xl shadow-sm shadow-[#FF8D28]/30 transition-all duration-150 cursor-pointer"
                        >
                            Үргэлжлүүлэх
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                </form>

                {/* Footer */}
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
                        className="object-cover object-right"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent rounded-2xl" />

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
        </div>
    );
}
