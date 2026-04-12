//addTopicModal.tsx
"use client";
import { Button } from "@/components/ui/button";
import { X, Save, RotateCcw } from "lucide-react";
import { useState } from "react";
import TextInput from "../custom-inputs/TextInput";
import TextArea from "../custom-inputs/TextArea";

type AddTopicModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: {
        mongolian: string;
        english: string;
        description: string;
    }) => void;
};

export default function AddTopicModal({
    isOpen,
    onClose,
    onSave,
}: AddTopicModalProps) {
    const [mongolian, setMongolian] = useState("");
    const [english, setEnglish] = useState("");
    const [description, setDescription] = useState("");

    if (!isOpen) return null;

    const handleSave = () => {
        onSave({ mongolian, english, description });
        setMongolian("");
        setEnglish("");
        setDescription("");
        onClose();
    };

    const handleClose = () => {
        setMongolian("");
        setEnglish("");
        setDescription("");
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
                <div className="flex items-start justify-between mb-2">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Төслийн ажлын сэдэв нэмэх
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Та өөрийн сэдвийг монгол болон англи хэл дээр бичиж
                            хадгалана уу.
                        </p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors ml-4 mt-1 cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="mt-6 space-y-5">
                    {/* Mongolian Name */}
                    <div>
                        <TextInput
                            label="Төслийн нэр ( Монгол )"
                            value={mongolian}
                            onChange={setMongolian}
                            placeholder="Төслийн нэр ( Монгол )"
                        />
                    </div>

                    {/* English Name */}
                    <div>
                        <TextInput
                            label="Төслийн нэр ( Англи )"
                            value={english}
                            onChange={setEnglish}
                            placeholder="Төслийн нэр ( Англи )"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <TextArea
                            label="Төслийн нэмэлт тайлбар"
                            value={description}
                            onChange={setDescription}
                            placeholder="Энэхүү төсөл нь..."
                        />
                    </div>
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
