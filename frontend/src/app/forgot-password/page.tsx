"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPasswordPage() {
    const router = useRouter();

    return (
        <div className="flex h-screen p-5">
            {/* LEFT SIDE - LOGIN FORM */}
            <div className="flex items-center justify-center w-1/2 bg-white p-10">
                <form className="w-full max-w-md space-y-6">
                    <h1 className="scroll-m-20 pb-2 text-3xl text-[#263238] font-semibold tracking-tight first:mt-0 text-center   ">
                        Нууц үг сэргээх
                    </h1>

                    <Input
                        type="usercode"
                        placeholder="Хэрэглэгчийн код"
                        className="px-6 py-5"
                    />

                    <Input
                        type="email"
                        placeholder="И-мэйл хаяг"
                        className="px-6 py-5"
                    />

                    <div className="flex justify-between">
                        <Button
                            type="button"
                            onClick={() => router.push("/login")}
                            className="bg-[#F0F0F0] text-[#263238] p-2 rounded-lg pl-6 pr-8 py-5 cursor-pointer"
                        >
                            <ChevronLeft /> Буцах
                        </Button>

                        <Button
                            type="submit"
                            className="bg-[#FF8D28] text-white p-2 rounded-lg pl-8 pr-6 py-5 cursor-pointer"
                        >
                            Үргэлжлүүлэх <ChevronRight />
                        </Button>
                    </div>
                </form>
            </div>

            {/* RIGHT SIDE - IMAGE */}
            <div className="relative w-1/2">
                <Image
                    src="/assets/rightside.png"
                    alt="Login Background"
                    fill
                    className="object-cover rounded-[50px]"
                />
            </div>
        </div>
    );
}
