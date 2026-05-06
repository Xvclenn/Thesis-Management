//frontend/src/app/teacher/dashboard/page.tsx
"use client";
import React, { useState } from "react";
import {
    ClipboardList,
    Users,
    Calendar,
    Clock,
    CheckCircle2,
    AlertCircle,
    FileText,
    TrendingUp,
    X,
    Check,
    UserCheck,
    Award,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

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
    id: number;
    title: string;
    due: string;
    status: "late" | "active" | "done";
    submitted?: number;
    total?: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const STATS: StatCardProps[] = [
    {
        icon: <Users size={18} />,
        label: "Нийт оюутан",
        value: 34,
        sub: "Математик",
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
    },
    {
        icon: <UserCheck size={18} />,
        label: "Өнөөдрийн ирц",
        value: "91%",
        sub: "31/34 оюутан",
        iconBg: "bg-green-50",
        iconColor: "text-green-600",
    },
    {
        icon: <ClipboardList size={18} />,
        label: "Нээлттэй даалгавар",
        value: 5,
        sub: "Энэ улирал",
        iconBg: "bg-orange-50",
        iconColor: "text-orange-500",
    },
    {
        icon: <Award size={18} />,
        label: "Дундаж оноо",
        value: "78.4",
        sub: "100-аас",
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600",
    },
];

const TASKS: TaskItem[] = [
    {
        id: 1,
        title: "Тригонометрийн функц — 1",
        due: "4-р сар 18",
        status: "active",
        submitted: 28,
        total: 34,
    },
    {
        id: 2,
        title: "Логарифм — дадлага",
        due: "4-р сар 20",
        status: "active",
        submitted: 12,
        total: 34,
    },
    {
        id: 3,
        title: "Явцын шалгалт бүртгэх",
        due: "4-р сар 10",
        status: "late",
        submitted: 0,
        total: 34,
    },
    {
        id: 4,
        title: "Интеграл — онолын хэсэг",
        due: "4-р сар 25",
        status: "active",
        submitted: 0,
        total: 34,
    },
    {
        id: 5,
        title: "Матриц — бие даалт",
        due: "4-р сар 10",
        status: "done",
        submitted: 34,
        total: 34,
    },
];

const statusConfig = {
    done: {
        label: "Дууссан",
        dot: "bg-green-400",
        cls: "bg-green-50 text-green-600",
        icon: <CheckCircle2 size={13} />,
    },
    late: {
        label: "Хоцорсон",
        dot: "bg-red-400",
        cls: "bg-red-50 text-red-500",
        icon: <AlertCircle size={13} />,
    },
    active: {
        label: "Нээлттэй",
        dot: "bg-yellow-400",
        cls: "bg-yellow-50 text-yellow-600",
        icon: <Clock size={13} />,
    },
};

const ATTEND_ITEMS = [
    { label: "Ирсэн", value: 91, color: "bg-green-500" },
    { label: "Хоцорсон", value: 6, color: "bg-yellow-400" },
    { label: "Тасалсан", value: 3, color: "bg-red-400" },
];

const radarData = {
    labels: ATTEND_ITEMS.map((i) => i.label),
    datasets: [
        {
            data: ATTEND_ITEMS.map((i) => i.value),
            backgroundColor: "rgba(55,138,221,0.12)",
            borderColor: "#378ADD",
            borderWidth: 2,
            pointBackgroundColor: ["#639922", "#EF9F27", "#E24B4A"],
            pointBorderColor: ["#639922", "#EF9F27", "#E24B4A"],
            pointRadius: 5,
        },
    ],
};

const radarOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
        r: {
            min: 0,
            max: 100,
            ticks: {
                stepSize: 25,
                callback: (tickValue: string | number) =>
                    Number(tickValue) + "%",
                backdropColor: "transparent",
            },
        },
    },
};

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
        <div className={`${iconBg} ${iconColor} p-2.5 rounded-xl shrink-0`}>
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

// ─── Main Dashboard ───────────────────────────────────────────────────────────

const TeacherDashboard: React.FC = () => {
    const [tasks, setTasks] = useState(TASKS);
    const [filter, setFilter] = useState<"all" | "active" | "done">("all");
    const [newTitle, setNewTitle] = useState("");
    const [newDue, setNewDue] = useState("");
    const { user } = useAuth();
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

    const addTask = () => {
        if (!newTitle.trim()) return;
        setTasks((prev) => [
            {
                id: Date.now(),
                title: newTitle.trim(),
                due: newDue.trim(),
                status: "active" as const,
                submitted: 0,
                total: 34,
            },
            ...prev,
        ]);
        setNewTitle("");
        setNewDue("");
    };

    const toggleDone = (id: number) => {
        setTasks((prev) =>
            prev.map((t) =>
                t.id === id
                    ? {
                          ...t,
                          status:
                              t.status === "done"
                                  ? ("active" as const)
                                  : ("done" as const),
                      }
                    : t,
            ),
        );
    };

    const deleteTask = (id: number) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    const clearDone = () => {
        setTasks((prev) => prev.filter((t) => t.status !== "done"));
    };

    const filtered = tasks.filter((t) =>
        filter === "all"
            ? true
            : filter === "done"
              ? t.status === "done"
              : t.status !== "done",
    );

    const doneCount = tasks.filter((t) => t.status === "done").length;
    const avgAttend = ATTEND_ITEMS.find((a) => a.label === "Ирсэн")?.value ?? 0;

    return (
        <div className="space-y-6 bg-[#F7F7F5] min-h-full">
            {/* ── Welcome ── */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                        Сайн уу, {user?.firstName} {user?.lastName} багш
                    </h1>
                    <p className="text-sm text-gray-400 mt-0.5">
                        {weekdays[today.getDay()]}, {dateStr}
                    </p>
                </div>
                <div className="hidden md:flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600">
                    <Calendar size={15} className="text-orange-500" />
                    <span>2025 – 2026 хичээлийн жил, II улирал</span>
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
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <FileText size={16} className="text-gray-400" />
                            <h2 className="text-sm font-semibold text-gray-800">
                                Даалгаврууд
                            </h2>
                        </div>
                        <div className="flex gap-1.5">
                            {(["all", "active", "done"] as const).map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                                        filter === f
                                            ? "bg-gray-800 text-white"
                                            : "text-gray-400 hover:text-gray-600"
                                    }`}
                                >
                                    {f === "all"
                                        ? "Бүгд"
                                        : f === "active"
                                          ? "Нээлттэй"
                                          : "Дууссан"}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Add task input */}
                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addTask()}
                            placeholder="Шинэ даалгавар нэмэх..."
                            className="flex-1 text-xs px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 placeholder-gray-400 outline-none focus:border-gray-300"
                        />
                        <input
                            type="text"
                            value={newDue}
                            onChange={(e) => setNewDue(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addTask()}
                            placeholder="Огноо"
                            className="w-40 text-xs px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 placeholder-gray-400 outline-none focus:border-gray-300"
                        />
                        <button
                            onClick={addTask}
                            className="text-xs hidden md:block px-3 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            + Нэмэх
                        </button>
                    </div>

                    {/* Task list */}
                    <div className="space-y-1">
                        {filtered.length === 0 && (
                            <p className="text-center text-xs text-gray-400 py-6">
                                Даалгавар байхгүй
                            </p>
                        )}
                        {filtered.map((task) => {
                            const s = statusConfig[task.status];
                            const isDone = task.status === "done";
                            const isLate = task.status === "late";
                            const pct =
                                task.total && task.total > 0
                                    ? Math.round(
                                          ((task.submitted ?? 0) / task.total) *
                                              100,
                                      )
                                    : 0;
                            return (
                                <div
                                    key={task.id}
                                    className="flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-gray-50 transition-colors group"
                                >
                                    {/* Checkbox */}
                                    <button
                                        disabled={isLate}
                                        onClick={() => toggleDone(task.id)}
                                        className={`w-4.5 h-4.5 rounded-full border flex-shrink-0 flex items-center justify-center transition-colors ${
                                            isDone
                                                ? "bg-green-400 border-green-400"
                                                : isLate
                                                  ? "bg-red-400 border-red-400"
                                                  : "border-gray-300 hover:border-gray-400"
                                        }`}
                                    >
                                        {isDone && (
                                            <Check
                                                size={9}
                                                className="text-white"
                                                strokeWidth={3}
                                            />
                                        )}
                                        {isLate && (
                                            <X
                                                size={9}
                                                className="text-white"
                                                strokeWidth={3}
                                            />
                                        )}
                                    </button>

                                    {/* Title + submitted progress */}
                                    <div className="flex-1 min-w-0">
                                        <span
                                            onClick={() => toggleDone(task.id)}
                                            className={`text-sm cursor-pointer truncate block ${
                                                isDone
                                                    ? "line-through text-gray-400"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            {task.title}
                                        </span>
                                        {task.total && (
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="w-20 h-1 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-orange-400 rounded-full transition-all"
                                                        style={{
                                                            width: `${pct}%`,
                                                        }}
                                                    />
                                                </div>
                                                <span className="text-[11px] text-gray-400">
                                                    {task.submitted}/
                                                    {task.total}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Due */}
                                    {task.due && (
                                        <span className="text-xs text-gray-400 hidden sm:block flex-shrink-0">
                                            {task.due}
                                        </span>
                                    )}

                                    {/* Status badge */}
                                    <span
                                        className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${s.cls}`}
                                    >
                                        {s.icon}
                                        <span className="hidden sm:inline">
                                            {s.label}
                                        </span>
                                    </span>

                                    {/* Delete */}
                                    <button
                                        onClick={() => deleteTask(task.id)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-300 hover:text-red-400"
                                    >
                                        <X size={13} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-400">
                            {doneCount}/{tasks.length} даалгавар дууссан
                        </span>
                        <button
                            onClick={clearDone}
                            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            Дууссаныг устгах
                        </button>
                    </div>
                </div>

                {/* Attendance analysis */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp size={16} className="text-gray-400" />
                        <h2 className="text-sm font-semibold text-gray-800">
                            Ирцийн дүн шинжилгээ
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {ATTEND_ITEMS.map((item, i) => (
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
                        <p className="text-xs text-gray-400 mb-1">Нийт ирц</p>
                        <p className="text-3xl font-bold text-gray-900">
                            {avgAttend}%
                        </p>
                        <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-green-400 rounded-full"
                                style={{ width: `${avgAttend}%` }}
                            />
                        </div>

                        <div className="w-70 mx-auto -my-10">
                            <Radar data={radarData} options={radarOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
