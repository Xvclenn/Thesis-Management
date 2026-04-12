// import React from "react";

// const Teacher = () => {
//     return <div>Teacher</div>;
// };

// export default Teacher;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { fetcher } from "@/utils/fetcher";

export default function RegisterPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        role: ["student"], // default student
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRoleChange = (value: string) => {
        setForm({ ...form, role: [value] }); // array хэлбэрээр backend-д очно
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await fetcher(`/api/auth/register`, {
                method: "POST",
                data: form,
            });
            // const res = await fetch("/api/register", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(form),
            // });

            console.log("Response:", res);

            if (res.success) {
                setMessage(res.message);
                // router.push("/dashboard"); // амжилттай бол dashboard руу
                return;
            }

            if (!res.ok) throw new Error(res.message || "Алдаа гарлаа");

            setMessage(res.message);
            // router.push("/dashboard"); // амжилттай бол dashboard руу
        } catch (err: any) {
            setMessage(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-10 rounded-xl shadow-md w-full max-w-md space-y-6"
            >
                <h1 className="text-2xl font-bold text-center">
                    Хэрэглэгч бүртгэх
                </h1>

                <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <Input
                    name="password"
                    type="password"
                    placeholder="Нууц үг"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <Input
                    name="firstName"
                    type="text"
                    placeholder="Нэр"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                />
                <Input
                    name="lastName"
                    type="text"
                    placeholder="Овог"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                />

                <div>
                    <Label>Role сонгох:</Label>
                    <RadioGroup
                        defaultValue="student"
                        className="flex gap-4 mt-2"
                        onValueChange={handleRoleChange}
                    >
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="student" id="r-student" />
                            <Label htmlFor="r-student">Оюутан</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem
                                value="supervisor"
                                id="r-supervisor"
                            />
                            <Label htmlFor="r-supervisor">Багш</Label>
                        </div>
                    </RadioGroup>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-2 rounded-lg"
                    disabled={loading}
                >
                    {loading ? "Хүлээж байна..." : "Бүртгэх"}
                </Button>

                {message && (
                    <p
                        className={`text-center mt-2 ${message.includes("Амжилттай") ? "text-green-600" : "text-red-600"}`}
                    >
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
}
