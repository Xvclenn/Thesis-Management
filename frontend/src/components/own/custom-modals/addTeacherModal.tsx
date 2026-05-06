//addTeacherModal.tsx
"use client";

import { Button } from "@/components/ui/button";
import { X, Save } from "lucide-react";
import { useState } from "react";
import TextInput from "../custom-inputs/TextInput";

type AddTeacherModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
};

type FormState = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};

export default function AddTeacherModal({
    isOpen,
    onClose,
    onSave,
}: AddTeacherModalProps) {
    const [form, setForm] = useState<FormState>({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    });

    if (!isOpen) return null;

    const handleChange = (name: keyof FormState, value: string) => {
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setForm({
            email: "",
            password: "",
            firstName: "",
            lastName: "",
        });
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleSave = () => {
        const payload = {
            ...form,
            role: ["supervisor"], // 🔥 hardcoded role
        };

        onSave(payload);

        resetForm();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/10 backdrop-blur-xs"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-4 p-8 z-10">
                {/* Header */}
                <div className="flex justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-bold">Багш нэмэх</h2>
                        <p className="text-sm text-gray-500">
                            Шинэ багш бүртгэх хэсэг
                        </p>
                    </div>

                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                        <X />
                    </button>
                </div>

                {/* Inputs */}
                <div className="space-y-4">
                    <TextInput
                        label="Email"
                        value={form.email}
                        onChange={(value) => handleChange("email", value)}
                    />

                    <TextInput
                        label="Нууц үг"
                        value={form.password}
                        onChange={(value) => handleChange("password", value)}
                    />

                    <TextInput
                        label="Нэр"
                        value={form.firstName}
                        onChange={(value) => handleChange("firstName", value)}
                    />

                    <TextInput
                        label="Овог"
                        value={form.lastName}
                        onChange={(value) => handleChange("lastName", value)}
                    />
                </div>

                {/* Footer */}
                <div className="flex justify-between mt-6">
                    <Button
                        variant="outline"
                        onClick={handleClose}
                        className="cursor-pointer"
                    >
                        Буцах
                    </Button>

                    <Button
                        onClick={handleSave}
                        className="bg-orange-500 hover:bg-orange-600 cursor-pointer"
                    >
                        <Save size={14} /> Хадгалах
                    </Button>
                </div>
            </div>
        </div>
    );
}
