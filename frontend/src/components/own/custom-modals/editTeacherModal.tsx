//editTeacherModal.tsx
"use client";

import { Button } from "@/components/ui/button";
import { X, Save, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import TextInput from "../custom-inputs/TextInput";
import TextArea from "../custom-inputs/TextArea";
import { Checkbox } from "@/components/ui/checkbox";

type EditTeacherProfileModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
    initialData?: any;
};
type Role = "admin" | "supervisor" | "commission" | "headofdepartment";

export default function EditTeacherProfileModal({
    isOpen,
    onClose,
    onSave,
    initialData,
}: EditTeacherProfileModalProps) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [department, setDepartment] = useState("");
    const [position, setPosition] = useState("");
    const [supervisorCode, setSupervisorCode] = useState("");
    const [roles, setRoles] = useState<Role[]>([]);

    // 🔥 Load data when modal opens
    useEffect(() => {
        if (initialData) {
            setFirstName(initialData.firstName || "");
            setLastName(initialData.lastName || "");
            setDepartment(initialData.department || "");
            setPosition(initialData.position || "");
            setSupervisorCode(initialData.supervisorCode || "");
            setRoles(initialData.role || []);
        }
    }, [initialData, isOpen]);

    const toggleRole = (role: Role) => {
        setRoles((prev) =>
            prev.includes(role)
                ? prev.filter((r) => r !== role)
                : [...prev, role],
        );
    };

    const roleLabels: Record<Role, string> = {
        admin: "Админ",
        supervisor: "Удирдагч",
        commission: "Комисс",
        headofdepartment: "Тэнхимийн эрхлэгч",
    };

    if (!isOpen) return null;

    const handleSave = () => {
        onSave({
            firstName,
            lastName,
            department,
            position,
            supervisorCode,
            role: roles,
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
                        <h2 className="text-xl font-bold">
                            Багшийн мэдээлэл засах
                        </h2>
                        <p className="text-sm text-gray-500">
                            Багш нарын мэдээллийг энд шинэчилнэ.
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
                        onChange={setSupervisorCode}
                    />

                    <div>
                        <p className="text-sm font-medium mb-2">
                            Системийн эрх
                        </p>

                        <div className="grid grid-cols-2 gap-3">
                            {(Object.keys(roleLabels) as Role[]).map((role) => (
                                <label
                                    key={role}
                                    className="flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50"
                                >
                                    <Checkbox
                                        checked={roles.includes(role)}
                                        onCheckedChange={() => toggleRole(role)}
                                    />
                                    <span className="text-sm">
                                        {roleLabels[role]}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
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
