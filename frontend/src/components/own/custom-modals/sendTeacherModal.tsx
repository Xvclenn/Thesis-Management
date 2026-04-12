"use client";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { fetcher } from "@/utils/fetcher";
import { X, Save, RotateCcw, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

type SendToTeacherModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (teacherId: string) => void;
};

export default function SendToTeacherModal({
    isOpen,
    onClose,
    onSave,
}: SendToTeacherModalProps) {
    const [selectedTeacher, setSelectedTeacher] = useState("");
    const [supervisors, setSupervisors] = useState<any[]>([]);

    useEffect(() => {
        const fetchSupervisors = async () => {
            try {
                const res = await fetcher("/api/auth/getAllTeachers");

                console.log(res);

                if (res.success) {
                    setSupervisors(res.data);
                }
            } catch (err) {
                console.error("Багш авахад алдаа:", err);
            }
        };

        fetchSupervisors();
    }, []);

    if (!isOpen) return null;

    const handleSave = () => {
        if (!selectedTeacher) return;
        onSave(selectedTeacher);
        setSelectedTeacher("");
        onClose();
    };

    const handleClose = () => {
        setSelectedTeacher("");
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
                <div className="flex items-start justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                        Багшид сэдвийн хүсэлт илгээх
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors ml-4 mt-1 cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Teacher Select */}
                <div>
                    <Select
                        value={selectedTeacher}
                        onValueChange={(value) => setSelectedTeacher(value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Удирдагч багш" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {supervisors.map((t: any) => (
                                    <SelectItem
                                        key={t._id}
                                        value={t.supervisorProfile._id}
                                    >
                                        {t.firstName} {t.lastName} (
                                        {t.supervisorProfile?.supervisorCode})
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-8">
                    <Button
                        onClick={handleClose}
                        variant="outline"
                        className="flex items-center gap-1.5 cursor-pointer"
                    >
                        <RotateCcw size={14} /> Буцах
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={!selectedTeacher}
                        variant="default"
                        className="flex items-center gap-1.5 bg-orange-500 border-orange-500 hover:bg-orange-600 transition-all cursor-pointer"
                    >
                        <Save size={14} /> Хадгалах
                    </Button>
                </div>
            </div>
        </div>
    );
}
