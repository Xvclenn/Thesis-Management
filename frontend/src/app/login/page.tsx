"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/dist/client/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();

    const [role, setRole] = useState("teacher");

    const handleLogin = async (e: any) => {
        e.preventDefault();

        // энд backend login API дуудах боломжтой
        // жишээ:
        // const res = await fetcher("/api/login",{method:"POST",data:{...}})

        if (role === "student") {
            router.push("/student/dashboard");
        }

        if (role === "teacher") {
            router.push("/admin/dashboard");
        }
    };

    return (
        <div className="flex h-screen p-5">
            {/* LEFT SIDE - LOGIN FORM */}
            <div className="flex items-center justify-center w-1/2 bg-white p-10">
                <form className="w-full max-w-md space-y-6">
                    <h1 className="scroll-m-20 pb-2 text-3xl text-[#263238] font-semibold tracking-tight first:mt-0 text-center   ">
                        Нэвтрэх
                    </h1>
                    <Input
                        type="usercode"
                        placeholder="Хэрэглэгчийн код"
                        className="px-6 py-5"
                    />
                    <Input
                        type="password"
                        placeholder="Нууц үг"
                        className="px-6 py-5"
                    />
                    <RadioGroup
                        defaultValue="student"
                        className="w-full flex justify-center gap-4"
                    >
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="student" id="r1" />
                            <Label htmlFor="r1">Оюутан</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="teacher" id="r2" />
                            <Label htmlFor="r2">Багш</Label>
                        </div>
                    </RadioGroup>
                    <Link
                        href="/forgot-password"
                        className="text-sm font-medium text-end text-[#FF8D28] block"
                    >
                        Нууц үгээ мартсан уу?
                    </Link>

                    <Button
                        type="submit"
                        className="w-full bg-[#FF8D28] text-white p-2 rounded-lg px-6 py-5 cursor-pointer"
                        onClick={handleLogin}
                    >
                        Нэвтрэх
                    </Button>
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
