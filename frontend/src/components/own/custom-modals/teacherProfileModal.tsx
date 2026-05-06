//TeacherProfileModal.tsx
"use client";

import { Button } from "@/components/ui/button";
import { X, Save, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import TextInput from "../custom-inputs/TextInput";
import TextArea from "../custom-inputs/TextArea";

type TeacherProfileModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
    initialData?: any;
};

export default function TeacherProfileModal({
    isOpen,
    onClose,
    onSave,
    initialData,
}: TeacherProfileModalProps) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [department, setDepartment] = useState("");
    const [position, setPosition] = useState("");
    const [supervisorCode, setsupervisorCode] = useState("");

    // 🔥 Load data when modal opens
    useEffect(() => {
        if (initialData) {
            setFirstName(initialData.firstName || "");
            setLastName(initialData.lastName || "");
            setDepartment(initialData.supervisorProfile?.department || "");
            setPosition(initialData.supervisorProfile?.position || "");
            setsupervisorCode(
                initialData.supervisorProfile?.supervisorCode || "",
            );
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSave = () => {
        onSave({
            firstName,
            lastName,
            department,
            position,
            supervisorCode,
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
                            label="Тэнхим"
                            value={department}
                            onChange={setDepartment}
                        />

                        <TextInput
                            label="Зэрэг"
                            value={position}
                            onChange={setPosition}
                        />
                    </div>

                    {/* Row 3 (full width) */}
                    <TextInput
                        label="Багшийн код"
                        value={supervisorCode}
                        onChange={setsupervisorCode}
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
