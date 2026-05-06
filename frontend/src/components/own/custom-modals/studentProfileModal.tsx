//studentProfileModal.tsx
"use client";

import { Button } from "@/components/ui/button";
import { X, Save, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import TextInput from "../custom-inputs/TextInput";
import TextArea from "../custom-inputs/TextArea";

type StudentProfileModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
    initialData?: any;
};

export default function StudentProfileModal({
    isOpen,
    onClose,
    onSave,
    initialData,
}: StudentProfileModalProps) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [major, setMajor] = useState("");
    const [year, setYear] = useState("");
    const [studentCode, setStudentCode] = useState("");

    // 🔥 Load data when modal opens
    useEffect(() => {
        if (initialData) {
            setFirstName(initialData.firstName || "");
            setLastName(initialData.lastName || "");
            setMajor(initialData.studentProfile?.major || "");
            setYear(initialData.studentProfile?.year || "");
            setStudentCode(initialData.studentProfile?.studentCode || "");
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSave = () => {
        onSave({
            firstName,
            lastName,
            major,
            year,
            studentCode,
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/10 backdrop-blur-xs cursor-pointer"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-4 p-8 z-10">
                {/* Header */}
                <div className="flex justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-bold">Профайл засах</h2>
                        <p className="text-sm text-gray-500">
                            Өөрийн мэдээллийг шинэчилнэ үү
                        </p>
                    </div>

                    <button onClick={onClose} className="cursor-pointer">
                        <X />
                    </button>
                </div>

                {/* Inputs */}
                <div className="space-y-4">
                    {/* Row 1 */}
                    <div className="grid grid-cols-2 gap-4">
                        <TextInput
                            label="Нэр"
                            value={firstName}
                            onChange={setFirstName}
                        />

                        <TextInput
                            label="Овог"
                            value={lastName}
                            onChange={setLastName}
                        />
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-2 gap-4">
                        <TextInput
                            label="Мэргэжил"
                            value={major}
                            onChange={setMajor}
                        />

                        <TextInput
                            label="Дамжаа"
                            value={year}
                            onChange={setYear}
                        />
                    </div>

                    {/* Row 3 (full width) */}
                    <TextInput
                        label="Оюутны код"
                        value={studentCode}
                        onChange={setStudentCode}
                    />
                </div>

                {/* Footer */}
                <div className="flex justify-between mt-6">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="cursor-pointer"
                    >
                        <RotateCcw size={14} /> Буцах
                    </Button>

                    <Button
                        onClick={handleSave}
                        className="cursor-pointer bg-orange-500 border-orange-500 hover:bg-orange-600 transition-all"
                    >
                        <Save size={14} /> Хадгалах
                    </Button>
                </div>
            </div>
        </div>
    );
}
