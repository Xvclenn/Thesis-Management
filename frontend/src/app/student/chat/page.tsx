//Энэ бол оюутны чатлах хэсэг юм.
"use client";

import { useEffect, useRef, useState } from "react";
import { fetcher } from "@/utils/fetcher";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { CheckCheck, MessageCircle, Send, User2 } from "lucide-react";

type Teacher = {
    _id: string;
    userId: string;
    firstName: string;
    lastName: string;
    image: string;
    status: string;
};

type Message = {
    _id: string;
    text: string;
    sender: {
        _id: string;
        firstName: string;
        lastName: string;
        image: string;
    };
    receiver: {
        _id: string;
        firstName: string;
        lastName: string;
        image: string;
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

export default function TeacherChatPage() {
    const { user } = useAuth();
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(
        null,
    );
    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 1. Батлагдсан багш авах
    useEffect(() => {
        const fetchTeachers = async () => {
            const res = await fetcher("/api/thesis/requests/my-teachers");
            if (res.success) {
                const approved = res.data.filter(
                    (t: Teacher) => t.status === "Баталсан",
                );
                setTeachers(approved);
            }
        };
        fetchTeachers();
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
    const fetchMessages = async (teacherUserId: string) => {
        const res = await fetcher(`/api/thesis/messages/${teacherUserId}`);
        if (res.success) setMessages(res.data);
    };

    // 4. 🔥 Polling - 3 секунд тутамд шинэчлэх
    useEffect(() => {
        if (!selectedTeacher) return;

        const interval = setInterval(() => {
            fetchMessages(selectedTeacher.userId);
        }, 3000);

        return () => clearInterval(interval);
    }, [selectedTeacher]);

    const handleSelect = (teacher: Teacher) => {
        setSelectedTeacher(teacher);
        setMessages([]);
        fetchMessages(teacher.userId);
    };

    const handleSend = async () => {
        if (!text.trim() || !selectedTeacher) return;

        const res = await fetcher("/api/thesis/message", {
            method: "POST",
            data: {
                receiver: selectedTeacher.userId,
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
        <div className="flex h-[85vh] pb-2 px-0.5 gap-3 overflow-hidden bg-[#F7F8FA]">
            {/* LEFT - TEACHERS */}
            <div className="w-64 flex flex-col rounded-xl bg-white shadow-md border-gray-100">
                <div className="px-5 py-3.5 h-[66.5px] border-b border-gray-100">
                    <p className="text-[10px] uppercase tracking-widest text-gray-300">
                        Батлагдсан
                    </p>
                    <h2 className="text-[15px] font-semibold text-gray-800">
                        Багш
                    </h2>
                </div>

                <div className="flex-1 overflow-y-auto px-2 pt-2">
                    {teachers.length === 0 && (
                        <p className="text-xs text-gray-400 text-center mt-6">
                            Багш байхгүй
                        </p>
                    )}
                    {teachers.map((t) => (
                        <button
                            key={t._id}
                            onClick={() => handleSelect(t)}
                            className={`w-full flex items-center bg-accent rounded-xl mb-1 gap-3 px-3 py-2.5 text-left transition-colors cursor-pointer ${
                                selectedTeacher?.userId === t.userId
                                    ? "bg-orange-100 shadow-sm shadow-orange-300/50"
                                    : "hover:bg-orange-100 border-transparent hover:shadow-sm shadow-orange-300/50"
                            }`}
                        >
                            <div className="w-16">
                                <Image
                                    src={t.image || "/assets/user.png"}
                                    width={100}
                                    height={100}
                                    alt="user"
                                    className="rounded-lg object-cover w-10 h-10 ring-1 ring-green-300 p-0.5"
                                />
                            </div>
                            <div className="w-full flex-col">
                                <div className="flex items-center justify-between">
                                    <p className="text-[13px] font-medium text-gray-800 truncate">
                                        {t.firstName} {t.lastName}
                                    </p>
                                    <span
                                        className={`text-[11px] ml-1 ${
                                            selectedTeacher?.userId === t.userId
                                                ? "text-emerald-500"
                                                : "hidden"
                                        }`}
                                    >
                                        ●
                                    </span>
                                </div>
                                <div className="text-[11px] text-gray-500 flex items-center gap-1">
                                    {t.status}{" "}
                                    <CheckCheck color="green" size={15} />
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            {/* RIGHT CHAT */}
            <div className="flex-1 rounded-xl border-gray-100 flex flex-col min-w-0">
                {selectedTeacher ? (
                    <>
                        <div className="flex items-center mb-3 gap-3 px-5 py-3.5 rounded-xl bg-white shadow-sm">
                            <Image
                                src={
                                    selectedTeacher.image || "/assets/user.png"
                                }
                                width={100}
                                height={100}
                                alt="user"
                                className="rounded-lg object-cover w-10 h-10 ring-1 ring-green-300 p-0.5"
                            />
                            <div>
                                <p className="text-[14px] font-semibold text-gray-800">
                                    {selectedTeacher.firstName}{" "}
                                    {selectedTeacher.lastName}
                                </p>
                                <p className="text-[11px] text-emerald-500">
                                    ● Идэвхтэй
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 rounded-xl shadow-md overflow-y-auto px-5 py-4 space-y-3 bg-white">
                            {messages.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full text-gray-300 gap-2">
                                    <MessageCircle />
                                    <p className="text-sm">
                                        Мессеж байхгүй байна
                                    </p>
                                </div>
                            )}

                            {messages.map((msg) => {
                                // 🔥 toString() хоёуланд нэмсэн
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
                                            className={`flex flex-col max-w-[65%] ${
                                                isMine
                                                    ? "items-end"
                                                    : "items-start"
                                            }`}
                                        >
                                            <div
                                                className={`px-3.5 py-2 rounded-2xl text-[13px] leading-relaxed wrap-break-words ${
                                                    isMine
                                                        ? "bg-orange-500 text-white rounded-br-sm"
                                                        : "bg-gray-100 text-gray-800 rounded-bl-sm"
                                                }`}
                                            >
                                                {msg.text}
                                            </div>
                                            <span className="text-[10px] text-gray-400 mt-1 px-1">
                                                {formatTime(msg.createdAt)}
                                            </span>
                                        </div>

                                        {isMine && (
                                            <Image
                                                src={
                                                    user.image ||
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

                        <div className="px-4 py-3 shadow-md mt-3 rounded-xl border-gray-100 bg-white flex items-center gap-2">
                            <input
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1 bg-gray-50 border border-gray-200 rounded-md px-4 py-2 text-[13px] outline-none focus:border-orange-400 transition-colors placeholder:text-gray-400"
                                placeholder="Мессеж бичих..."
                            />
                            <button
                                onClick={handleSend}
                                disabled={!text.trim()}
                                className="w-9 h-9 rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-40 flex items-center justify-center transition-colors shrink-0"
                            >
                                <Send color="#fff" size={20} />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-xl shadow-md text-gray-300 gap-3">
                        <User2 />
                        <p className="text-sm">Багш сонгоно уу</p>
                    </div>
                )}
            </div>
        </div>
    );
}
