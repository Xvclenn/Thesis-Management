//Энэ бол багшийн чатлах хэсэг юм.
"use client";

import { useEffect, useRef, useState } from "react";
import { fetcher } from "@/utils/fetcher";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import {
    CheckCheck,
    ChevronLeft,
    MessageCircle,
    Send,
    User2,
} from "lucide-react";

type Student = {
    _id: string;
    firstName: string;
    lastName: string;
    image: string;
    studentCode: string;
};

type Message = {
    _id: string;
    text: string;
    sender: {
        _id: string;
        firstName: string;
        lastName: string;
        image: string;
        role: "supervisor" | "student";
    };
    receiver: {
        _id: string;
        firstName: string;
        lastName: string;
        image: string;
        role: "supervisor" | "student";
    };
    createdAt: string;
};

function formatTime(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("mn-MN", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default function StudentChatPage() {
    const { user } = useAuth();
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(
        null,
    );
    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 1. Оюутнуудыг авах
    useEffect(() => {
        const fetchStudents = async () => {
            const res = await fetcher("/api/thesis/approved");
            if (res.success) setStudents(res.data);
        };
        fetchStudents();
    }, []);

    // 2. Scroll
    const prevMessageCountRef = useRef(0);

    useEffect(() => {
        if (messages.length > prevMessageCountRef.current) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
        prevMessageCountRef.current = messages.length;
    }, [messages]);

    // 3. Мессеж авах функц
    const fetchMessages = async (studentId: string) => {
        const res = await fetcher(`/api/thesis/messages/${studentId}`);
        if (res.success) setMessages(res.data);
    };

    // 4. 🔥 Polling - 3 секунд тутамд шинэчлэх
    useEffect(() => {
        if (!selectedStudent) return;

        const interval = setInterval(() => {
            fetchMessages(selectedStudent._id);
        }, 3000);

        return () => clearInterval(interval);
    }, [selectedStudent]);

    const handleSelect = (student: Student) => {
        setSelectedStudent(student);
        setMessages([]);
        fetchMessages(student._id);
    };

    const handleSend = async () => {
        if (!text.trim() || !selectedStudent) return;

        const res = await fetcher("/api/thesis/message", {
            method: "POST",
            data: {
                receiver: selectedStudent._id,
                text,
            },
        });

        if (res.success) {
            setMessages((prev) => [...prev, res.message]);
            setText("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSend();
    };

    return (
        <div className="flex h-[85vh] pb-2 px-0.5 gap-3 overflow-hidden bg-[#F7F8FA] relative">
            {/* LEFT SIDEBAR */}
            <div
                className={`absolute md:relative z-20 w-full md:w-64 h-full md:h-auto transition-transform duration-300 ${selectedStudent ? "-translate-x-[-110%] md:translate-x-0" : "translate-x-0"} flex flex-col rounded-xl bg-white shadow-md border-gray-100`}
            >
                <div className="px-5 py-3.5 h-[66.5px] border-b border-gray-100">
                    <p className="text-[10px] uppercase tracking-widest text-gray-300">
                        Батлагдсан
                    </p>
                    <h2 className="text-[15px] font-semibold text-gray-800">
                        Оюутнууд
                    </h2>
                </div>

                <div className="flex-1 overflow-y-auto px-2 pt-2">
                    {students.length === 0 && (
                        <p className="text-xs text-gray-400 text-center mt-6">
                            Оюутан олдсонгүй
                        </p>
                    )}
                    {students.map((s) => (
                        <button
                            key={s._id}
                            onClick={() => handleSelect(s)}
                            className={`w-full flex items-center bg-accent rounded-xl mb-1 gap-3 px-3 py-2.5 text-left transition-colors cursor-pointer ${
                                selectedStudent?._id === s._id
                                    ? "bg-orange-100 shadow-sm shadow-orange-300/50"
                                    : "hover:bg-orange-100"
                            }`}
                        >
                            <Image
                                src={s.image || "/assets/user.png"}
                                width={100}
                                height={100}
                                alt="user"
                                className="rounded-lg object-cover w-10 h-10 ring-1 ring-green-300 p-0.5"
                            />

                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <p className="text-[13px] font-medium text-gray-800 truncate">
                                        {s.firstName} {s.lastName}
                                    </p>
                                    <span
                                        className={`text-[11px] ${
                                            selectedStudent?._id === s._id
                                                ? "text-emerald-500"
                                                : "hidden"
                                        }`}
                                    >
                                        ●
                                    </span>
                                </div>
                                <div className="text-[11px] text-gray-500 flex items-center gap-1">
                                    <CheckCheck color="green" size={15} />
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* RIGHT CHAT AREA */}
            <div
                className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${selectedStudent ? "w-full" : "hidden md:flex"}`}
            >
                {selectedStudent ? (
                    <>
                        {/* HEADER */}
                        <div className="flex items-center justify-between mb-3 gap-3 px-4 md:px-5 py-3.5 rounded-xl bg-white shadow-sm">
                            {/* 🔙 BACK BUTTON (mobile only) */}
                            <button
                                onClick={() => setSelectedStudent(null)}
                                className="md:hidden text-gray-500"
                            >
                                <ChevronLeft />
                            </button>

                            <div className="flex items-center gap-3">
                                <div className="block md:hidden">
                                    <p className="text-[14px] font-semibold text-gray-800">
                                        {selectedStudent.firstName}{" "}
                                        {selectedStudent.lastName}
                                    </p>
                                    <p className="text-[11px] text-right text-emerald-500">
                                        ● Идэвхтэй
                                    </p>
                                </div>
                                <Image
                                    src={
                                        selectedStudent.image ||
                                        "/assets/user.png"
                                    }
                                    width={100}
                                    height={100}
                                    alt="user"
                                    className="rounded-lg object-cover w-10 h-10 ring-1 ring-green-300 p-0.5"
                                />
                                <div className="hidden md:block">
                                    <p className="text-[14px] font-semibold text-gray-800">
                                        {selectedStudent.firstName}{" "}
                                        {selectedStudent.lastName}
                                    </p>
                                    <p className="text-[11px] text-emerald-500">
                                        ● Идэвхтэй
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* MESSAGES */}
                        <div className="flex-1 rounded-xl shadow-md overflow-y-auto px-3 md:px-5 py-4 space-y-3 bg-white">
                            {messages.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full text-gray-300 gap-2">
                                    <MessageCircle />
                                    <p className="text-sm">
                                        Мессеж байхгүй байна
                                    </p>
                                </div>
                            )}

                            {messages.map((msg) => {
                                const isMine =
                                    msg.sender?._id?.toString() ===
                                    user?.id?.toString();

                                return (
                                    <div
                                        key={msg._id}
                                        className={`flex items-end gap-2 ${
                                            isMine
                                                ? "justify-end"
                                                : "justify-start"
                                        }`}
                                    >
                                        {!isMine && (
                                            <Image
                                                src={
                                                    msg.sender.image ||
                                                    "/assets/user.png"
                                                }
                                                width={100}
                                                height={100}
                                                alt="avatar"
                                                className="rounded-full object-cover w-8 h-8 ring-1 ring-green-500 p-0.5"
                                            />
                                        )}

                                        <div
                                            className={`flex flex-col max-w-[80%] md:max-w-[65%] ${
                                                isMine
                                                    ? "items-end"
                                                    : "items-start"
                                            }`}
                                        >
                                            <div
                                                className={`px-3.5 py-2 rounded-2xl text-[13px] wrap-break-words ${
                                                    isMine
                                                        ? "bg-orange-500 text-white rounded-br-sm"
                                                        : "bg-gray-100 text-gray-800 rounded-bl-sm"
                                                }`}
                                            >
                                                {msg.text}
                                            </div>
                                            <span className="text-[10px] text-gray-400 mt-1">
                                                {formatTime(msg.createdAt)}
                                            </span>
                                        </div>

                                        {isMine && (
                                            <Image
                                                src={
                                                    msg.sender.image ||
                                                    "/assets/user.png"
                                                }
                                                width={100}
                                                height={100}
                                                alt="avatar"
                                                className="rounded-full object-cover w-8 h-8 ring-1 ring-green-500 p-0.5"
                                            />
                                        )}
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* INPUT */}
                        <div className="px-3 md:px-4 py-3 shadow-md mt-3 rounded-xl bg-white flex items-center gap-2">
                            <input
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1 bg-gray-50 border border-gray-200 rounded-md px-4 py-2 text-[13px] outline-none focus:border-orange-400"
                                placeholder="Мессеж бичих..."
                            />
                            <button
                                onClick={handleSend}
                                disabled={!text.trim()}
                                className="w-9 h-9 rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-40 flex items-center justify-center cursor-pointer"
                            >
                                <Send color="#fff" size={16} />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="hidden md:flex flex-1 items-center justify-center bg-white rounded-xl shadow-md text-gray-300 gap-3">
                        <User2 />
                        <p className="text-sm">Оюутан сонгоно уу</p>
                    </div>
                )}
            </div>
        </div>
    );
}
