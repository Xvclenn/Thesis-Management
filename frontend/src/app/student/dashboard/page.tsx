"use client";
import React from "react";
import {
    BookOpen,
    ClipboardList,
    GraduationCap,
    Calendar,
    Clock,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    FileText,
    TrendingUp,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    sub?: string;
    iconBg: string;
    iconColor: string;
}

interface TaskItem {
    title: string;
    due: string;
    status: "done" | "pending" | "late";
}

interface ScheduleItem {
    time: string;
    subject: string;
    room: string;
    teacher: string;
    color: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const STATS: StatCardProps[] = [
    {
        icon: <BookOpen size={18} />,
        label: "Нийт кредит",
        value: 124,
        sub: "180-аас",
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
    },
    {
        icon: <TrendingUp size={18} />,
        label: "Дундаж голч",
        value: "3.6",
        sub: "4.0-аас",
        iconBg: "bg-green-50",
        iconColor: "text-green-600",
    },
    {
        icon: <ClipboardList size={18} />,
        label: "Хичээлийн тоо",
        value: 6,
        sub: "Энэ улирал",
        iconBg: "bg-orange-50",
        iconColor: "text-orange-500",
    },
    {
        icon: <GraduationCap size={18} />,
        label: "Дүүргэлт",
        value: "69%",
        sub: "Төгсөлтийн явц",
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
    },
];

const TASKS: TaskItem[] = [
    {
        title: "Дипломын ажлын сэдэв батлуулах",
        due: "4-р сар 15",
        status: "pending",
    },
    { title: "Судалгааны тайлан №1 илгээх", due: "4-р сар 10", status: "done" },
    { title: "Удирдагч багштай уулзалт", due: "4-р сар 8", status: "late" },
    { title: "Ном зүй бэлтгэх", due: "4-р сар 20", status: "pending" },
    {
        title: "Явцын хамгаалалт бүртгүүлэх",
        due: "4-р сар 25",
        status: "pending",
    },
];

const SCHEDULE: ScheduleItem[] = [
    {
        time: "08:00 – 09:30",
        subject: "Мэдээллийн систем",
        room: "А-302",
        teacher: "П. Болд",
        color: "border-blue-400 bg-blue-50",
    },
    {
        time: "10:00 – 11:30",
        subject: "Өгөгдлийн сан",
        room: "Б-115",
        teacher: "Д. Нарантуяа",
        color: "border-orange-400 bg-orange-50",
    },
    {
        time: "13:00 – 14:30",
        subject: "Программ хангамж",
        room: "В-201",
        teacher: "С. Мөнхбаяр",
        color: "border-green-400 bg-green-50",
    },
    {
        time: "15:00 – 16:30",
        subject: "Сүлжээний технологи",
        room: "А-108",
        teacher: "Б. Эрдэнэ",
        color: "border-purple-400 bg-purple-50",
    },
];

const PROGRESS_ITEMS = [
    { label: "Судалгааны ажил", value: 65, color: "bg-blue-500" },
    { label: "Бичгийн хэсэг", value: 30, color: "bg-orange-400" },
    { label: "Практик хэсэг", value: 45, color: "bg-green-500" },
];

// ─── Stat Card ────────────────────────────────────────────────────────────────

const StatCard: React.FC<StatCardProps> = ({
    icon,
    label,
    value,
    sub,
    iconBg,
    iconColor,
}) => (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-start gap-4 hover:shadow-sm transition-shadow">
        <div
            className={`${iconBg} ${iconColor} p-2.5 rounded-xl flex-shrink-0`}
        >
            {icon}
        </div>
        <div>
            <p className="text-xs text-gray-400 mb-0.5">{label}</p>
            <p className="text-2xl font-bold text-gray-900 leading-none mb-1">
                {value}
            </p>
            {sub && <p className="text-xs text-gray-400">{sub}</p>}
        </div>
    </div>
);

// ─── Task Status ─────────────────────────────────────────────────────────────

const statusConfig = {
    done: {
        label: "Дууссан",
        cls: "bg-green-50 text-green-600",
        icon: <CheckCircle2 size={13} />,
    },
    pending: {
        label: "Хүлээгдэж байгаа",
        cls: "bg-yellow-50 text-yellow-600",
        icon: <Clock size={13} />,
    },
    late: {
        label: "Хоцорсон",
        cls: "bg-red-50 text-red-500",
        icon: <AlertCircle size={13} />,
    },
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────

const StudentDashboard: React.FC = () => {
    const today = new Date();
    const dateStr = `${today.getFullYear()} оны ${today.getMonth() + 1}-р сарын ${today.getDate()}`;
    const weekdays = [
        "Ням",
        "Даваа",
        "Мягмар",
        "Лхагва",
        "Пүрэв",
        "Баасан",
        "Бямба",
    ];

    return (
        <div className="space-y-6 bg-[#F7F7F5] min-h-full">
            {/* ── Welcome ── */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                        Сайн байна уу, Энхүслэн 👋
                    </h1>
                    <p className="text-sm text-gray-400 mt-0.5">
                        {weekdays[today.getDay()]}, {dateStr}
                    </p>
                </div>
                <div className="hidden md:flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600">
                    <Calendar size={15} className="text-orange-500" />
                    <span>2024 – 2025 хичээлийн жил, II улирал</span>
                </div>
            </div>

            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {STATS.map((s, i) => (
                    <StatCard key={i} {...s} />
                ))}
            </div>

            {/* ── Middle row ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Tasks */}
                <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <FileText size={16} className="text-gray-400" />
                            <h2 className="text-sm font-semibold text-gray-800">
                                Даалгаврууд
                            </h2>
                        </div>
                        <button className="text-xs text-orange-500 hover:text-orange-600 flex items-center gap-0.5 transition-colors">
                            Бүгдийг харах <ChevronRight size={13} />
                        </button>
                    </div>

                    <div className="space-y-2.5">
                        {TASKS.map((task, i) => {
                            const s = statusConfig[task.status];
                            return (
                                <div
                                    key={i}
                                    className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-gray-50 transition-colors group cursor-pointer"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div
                                            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                                task.status === "done"
                                                    ? "bg-green-400"
                                                    : task.status === "late"
                                                      ? "bg-red-400"
                                                      : "bg-yellow-400"
                                            }`}
                                        />
                                        <span
                                            className={`text-sm truncate ${task.status === "done" ? "line-through text-gray-400" : "text-gray-700"}`}
                                        >
                                            {task.title}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                                        <span className="text-xs text-gray-400 hidden sm:block">
                                            {task.due}
                                        </span>
                                        <span
                                            className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${s.cls}`}
                                        >
                                            {s.icon}
                                            <span className="hidden sm:inline">
                                                {s.label}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Diploma progress */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp size={16} className="text-gray-400" />
                        <h2 className="text-sm font-semibold text-gray-800">
                            Дипломын явц
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {PROGRESS_ITEMS.map((item, i) => (
                            <div key={i}>
                                <div className="flex justify-between mb-1.5">
                                    <span className="text-xs text-gray-600">
                                        {item.label}
                                    </span>
                                    <span className="text-xs font-medium text-gray-800">
                                        {item.value}%
                                    </span>
                                </div>
                                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${item.color} transition-all`}
                                        style={{ width: `${item.value}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Overall */}
                    <div className="mt-5 pt-4 border-t border-gray-100 text-center">
                        <p className="text-xs text-gray-400 mb-1">
                            Нийт дүүргэлт
                        </p>
                        <p className="text-3xl font-bold text-gray-900">47%</p>
                        <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-orange-400 rounded-full"
                                style={{ width: "47%" }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Today's Schedule ── */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-400" />
                        <h2 className="text-sm font-semibold text-gray-800">
                            Өнөөдрийн хуваарь
                        </h2>
                    </div>
                    <button className="text-xs text-orange-500 hover:text-orange-600 flex items-center gap-0.5 transition-colors">
                        Бүтэн хуваарь <ChevronRight size={13} />
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                    {SCHEDULE.map((item, i) => (
                        <div
                            key={i}
                            className={`border-l-[3px] rounded-xl p-3.5 cursor-pointer hover:shadow-sm transition-shadow ${item.color}`}
                        >
                            <p className="text-[11px] text-gray-400 mb-1 font-medium">
                                {item.time}
                            </p>
                            <p className="text-sm font-semibold text-gray-800 leading-snug mb-2">
                                {item.subject}
                            </p>
                            <div className="flex items-center justify-between text-[11px] text-gray-500">
                                <span>{item.room}</span>
                                <span>{item.teacher}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
