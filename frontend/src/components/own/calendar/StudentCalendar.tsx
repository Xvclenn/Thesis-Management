"use client";

import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import { DateSelectArg, EventClickArg, EventApi } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

// ─── Types ───────────────────────────────────────────────────────────────────

type EventCategory = "blue" | "red" | "green" | "amber" | "teal";

interface CalEvent {
    id: string;
    title: string;
    start: string;
    end?: string;
    allDay?: boolean;
    extendedProps?: { category: EventCategory };
}

// ─── Constants ───────────────────────────────────────────────────────────────

const MONTHS = [
    "1-р сар",
    "2-р сар",
    "3-р сар",
    "4-р сар",
    "5-р сар",
    "6-р сар",
    "7-р сар",
    "8-р сар",
    "9-р сар",
    "10-р сар",
    "11-р сар",
    "12-р сар",
];

const WEEKDAYS = ["Да", "Мя", "Лх", "Пү", "Ба", "Бя", "Ня"];

const CATEGORY_COLORS: Record<
    EventCategory,
    { bg: string; text: string; dot: string }
> = {
    blue: { bg: "#B5D4F4", text: "#0C447C", dot: "#185FA5" },
    red: { bg: "#F7C1C1", text: "#791F1F", dot: "#E24B4A" },
    green: { bg: "#C0DD97", text: "#27500A", dot: "#639922" },
    amber: { bg: "#FAC775", text: "#633806", dot: "#BA7517" },
    teal: { bg: "#9FE1CB", text: "#085041", dot: "#1D9E75" },
};

const LEGEND_ITEMS: { category: EventCategory; label: string }[] = [
    { category: "blue", label: "Эрдэм шинжилгээний нэгдсэн хуваари" },
    { category: "green", label: "Оюутны үйлчилгээний нэгдсэн хуваари" },
    { category: "amber", label: "Сургалтын нэгдсэн хуваари" },
    { category: "red", label: "Бүх нийтийн амралтын өдрүүд" },
];

const CATEGORY_LABELS: Record<EventCategory, string> = {
    blue: "Эрдэм шинжилгээний",
    green: "Оюутны үйлчилгээний",
    amber: "Сургалтын",
    red: "Ерөнхий",
    teal: "Цахим",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toDateStr(y: number, m: number, d: number) {
    return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function daysInMonth(y: number, m: number) {
    return new Date(y, m + 1, 0).getDate();
}

// ─── Mini Calendar ───────────────────────────────────────────────────────────

interface MiniCalendarProps {
    year: number;
    month: number;
    today: Date;
    eventDates: Set<string>;
    onPrev: () => void;
    onNext: () => void;
}

const MiniCalendar: React.FC<MiniCalendarProps> = ({
    year,
    month,
    today,
    eventDates,
    onPrev,
    onNext,
}) => {
    const firstDay = new Date(year, month, 1).getDay();
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;
    const total = daysInMonth(year, month);
    const prevTotal = daysInMonth(year, month - 1);

    const cells: { day: number; type: "prev" | "cur" | "next" }[] = [];
    for (let i = startOffset - 1; i >= 0; i--)
        cells.push({ day: prevTotal - i, type: "prev" });
    for (let d = 1; d <= total; d++) cells.push({ day: d, type: "cur" });
    while (cells.length % 7 !== 0)
        cells.push({
            day: cells.length - total - startOffset + 1,
            type: "next",
        });

    return (
        <div className="border border-gray-200 rounded-xl bg-white p-3">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <button
                    onClick={onPrev}
                    className="text-gray-400 hover:text-gray-600 text-base px-1 leading-none bg-transparent border-none cursor-pointer"
                >
                    ‹
                </button>
                <span className="text-[13px] font-medium text-gray-900">
                    {MONTHS[month]} {year}
                </span>
                <button
                    onClick={onNext}
                    className="text-gray-400 hover:text-gray-600 text-base px-1 leading-none bg-transparent border-none cursor-pointer"
                >
                    ›
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-7 gap-1">
                {WEEKDAYS.map((w) => (
                    <div
                        key={w}
                        className="flex items-center justify-center w-6.25 h-6.25 text-[10px] text-gray-400 font-medium"
                    >
                        {w}
                    </div>
                ))}
                {cells.map((c, i) => {
                    const ds =
                        c.type === "cur" ? toDateStr(year, month, c.day) : "";
                    const isToday =
                        c.type === "cur" &&
                        year === today.getFullYear() &&
                        month === today.getMonth() &&
                        c.day === today.getDate();
                    const hasEv = c.type === "cur" && eventDates.has(ds);

                    return (
                        <div
                            key={i}
                            className={`relative flex items-center justify-center w-6.25 h-6.25 text-[11px] rounded-full cursor-pointer
                                ${c.type !== "cur" ? "text-gray-300" : "text-gray-900"}
                                ${isToday ? "bg-[#185FA5]! text-white! font-medium" : ""}
                            `}
                        >
                            {c.day}
                            {hasEv && !isToday && (
                                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0.75 h-0.75 rounded-full bg-[#378ADD]" />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// ─── Upcoming Events ─────────────────────────────────────────────────────────

interface UpcomingProps {
    events: CalEvent[];
    year: number;
    month: number;
}

const UpcomingEvents: React.FC<UpcomingProps> = ({ events, year, month }) => {
    const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
    const filtered = events
        .filter((e) => e.start.startsWith(prefix))
        .slice(0, 10);

    return (
        <div className="border border-gray-200 rounded-xl bg-white p-3 flex-1 overflow-y-auto max-h-52.5">
            <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-1">
                Үйл ажиллагаанууд
            </div>
            <div className="text-[11px] text-gray-400 mb-2">
                {MONTHS[month]} {year}
            </div>

            {filtered.length === 0 && (
                <p className="text-[12px] text-gray-400">Үйл явдал алга</p>
            )}

            {filtered.map((ev) => {
                const cat = (ev.extendedProps?.category ??
                    "blue") as EventCategory;
                const color = CATEGORY_COLORS[cat];
                const d = new Date(ev.start);
                return (
                    <div key={ev.id} className="flex gap-2 mb-2.5 items-start">
                        <div
                            className="w-2 h-2 rounded-full shrink-0 mt-1"
                            style={{ background: color.dot }}
                        />
                        <div>
                            <div className="text-[10px] text-gray-400">
                                {month + 1}-р сар {d.getDate()}
                            </div>
                            <div className="text-[12px] text-gray-700 leading-snug">
                                {ev.title}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

// ─── Event Detail Modal ───────────────────────────────────────────────────────

interface EventDetailModalProps {
    event: EventApi;
    onDelete: () => void;
    onClose: () => void;
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({
    event,
    onDelete,
    onClose,
}) => {
    const cat = (event.extendedProps?.category ?? "blue") as EventCategory;
    const color = CATEGORY_COLORS[cat];
    const start = event.start ? new Date(event.start) : null;
    const end = event.end ? new Date(event.end) : null;

    const formatDate = (d: Date) =>
        `${d.getFullYear()} оны ${d.getMonth() + 1}-р сарын ${d.getDate()}`;

    return (
        <div
            className="flex items-center justify-center fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
            onClick={onClose}
        >
            <div
                className="bg-white border-gray-200 rounded-xl p-6 w-75 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Color accent top bar */}
                <div
                    className="h-2.5 -mx-6 -mt-6 mb-4 rounded-t-xl"
                    style={{ background: color.dot }}
                />

                {/* Category badge */}
                <div
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full mb-2.5"
                    style={{ background: color.bg, color: color.text }}
                >
                    <span
                        className="w-1.5 h-1.5 rounded-full inline-block"
                        style={{ background: color.dot }}
                    />
                    {CATEGORY_LABELS[cat]}
                </div>

                {/* Title */}
                <div className="text-[16px] font-semibold text-gray-900 mb-4 leading-snug">
                    {event.title}
                </div>

                {/* Info rows */}
                <div className="flex flex-col gap-2.5 mb-5">
                    <div className="flex items-start gap-2">
                        <span className="text-base">📅</span>
                        <div>
                            <div className="text-[11px] text-gray-400 font-medium">
                                Огноо
                            </div>
                            <div className="text-[13px] text-gray-700">
                                {start ? formatDate(start) : "—"}
                                {end &&
                                    !event.allDay &&
                                    ` – ${formatDate(end)}`}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-base">🕐</span>
                        <div>
                            <div className="text-[11px] text-gray-400 font-medium">
                                Хугацаа
                            </div>
                            <div className="text-[13px] text-gray-700">
                                {event.allDay
                                    ? "Бүтэн өдөр"
                                    : start
                                      ? start.toLocaleTimeString("mn-MN", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })
                                      : "—"}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-2">
                    <button
                        onClick={onDelete}
                        className="text-[13px] px-4 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors cursor-pointer bg-transparent"
                    >
                        Устгах
                    </button>
                    <button
                        onClick={onClose}
                        className="text-[13px] px-4 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer bg-transparent"
                    >
                        Хаах
                    </button>
                </div>
            </div>
        </div>
    );
};

// ─── Add Event Modal ──────────────────────────────────────────────────────────

interface AddModalProps {
    dateStr: string;
    onSave: (title: string, category: EventCategory) => void;
    onClose: () => void;
}

const AddModal: React.FC<AddModalProps> = ({ dateStr, onSave, onClose }) => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState<EventCategory>("blue");
    const d = new Date(dateStr);

    return (
        <div
            className="flex items-center justify-center fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
            onClick={onClose}
        >
            <div
                className="bg-white border-gray-200 rounded-xl p-6 w-75 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-[15px] font-semibold text-gray-900 mb-1">
                    Шинэ үйл явдал нэмэх
                </div>
                <div className="text-[12px] text-gray-400 mb-3">
                    {d.getFullYear()}.{d.getMonth() + 1}.{d.getDate()}
                </div>

                <div className="flex flex-col justify-center gap-2">
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === "Enter" &&
                            title.trim() &&
                            onSave(title.trim(), category)
                        }
                        // type="text"
                        placeholder="Үйл явдлын нэр..."
                        className="w-full py-2 pr-2 pl-2.5 placeholder:text-xs text-xs rounded-lg border-[#E0E0E0] bg-white text-[#263238] placeholder:text-[#B0BEC5] focus-visible:ring-1 focus-visible:ring-[#FF8D28] focus-visible:border-[#FF8D28] transition-all"
                    />

                    <Select
                        value={category}
                        onValueChange={(e: any) => setCategory(e)}
                    >
                        <SelectTrigger className="w-full mb-10 z-1000">
                            <SelectValue placeholder="Удирдагч багш" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="blue">
                                    Эрдэм шинжилгээний
                                </SelectItem>
                                <SelectItem value="green">
                                    Оюутны үйлчилгээний
                                </SelectItem>
                                <SelectItem value="amber">Сургалтын</SelectItem>
                                <SelectItem value="red">Ерөнхий</SelectItem>
                                <SelectItem value="teal">Цахим</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex gap-2 justify-end">
                    <Button
                        onClick={onClose}
                        variant="outline"
                        className="flex items-center gap-1.5 cursor-pointer"
                    >
                        <RotateCcw size={14} /> Буцах
                    </Button>
                    <Button
                        disabled={!title}
                        onClick={() =>
                            title.trim() && onSave(title.trim(), category)
                        }
                        variant="default"
                        className="cursor-pointer bg-orange-500 hover:bg-orange-700"
                    >
                        Хадгалах
                    </Button>
                </div>
            </div>
        </div>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const StudentCalendar: React.FC = () => {
    const calRef = useRef<FullCalendar>(null);
    const today = new Date();

    const [currentDate, setCurrentDate] = useState(
        new Date(today.getFullYear(), today.getMonth(), 1),
    );
    const [events, setEvents] = useState<CalEvent[]>(() => {
        if (typeof window === "undefined") return [];
        try {
            return JSON.parse(
                localStorage.getItem("mn_calendar_events") || "[]",
            );
        } catch {
            return [];
        }
    });
    const [modal, setModal] = useState<string | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<EventApi | null>(null);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("mn_calendar_events", JSON.stringify(events));
        }
    }, [events]);

    const eventDates = new Set(events.map((e) => e.start.slice(0, 10)));

    const changeMonth = (delta: number) => {
        const api = calRef.current?.getApi();
        if (delta > 0) api?.next();
        else api?.prev();
        setCurrentDate(
            (d) => new Date(d.getFullYear(), d.getMonth() + delta, 1),
        );
    };

    const goToday = () => {
        calRef.current?.getApi().today();
        setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    };

    const handleDateSelect = (sel: DateSelectArg) => {
        sel.view.calendar.unselect();
        setModal(sel.startStr);
    };

    const handleEventClick = (info: EventClickArg) => {
        setSelectedEvent(info.event);
    };

    const handleDeleteEvent = () => {
        if (!selectedEvent) return;
        selectedEvent.remove();
        setEvents((prev) => prev.filter((e) => e.id !== selectedEvent.id));
        setSelectedEvent(null);
    };

    const handleSave = (title: string, category: EventCategory) => {
        if (!modal) return;
        if (!title) {
            toast.warn("Талбар хоосон байна.");
        }
        const newEv: CalEvent = {
            id: `${modal}-${Date.now()}`,
            title,
            start: modal,
            allDay: true,
            extendedProps: { category },
        };
        setEvents((prev) => [...prev, newEv]);
        calRef.current?.getApi().addEvent({
            ...newEv,
            backgroundColor: CATEGORY_COLORS[category].bg,
            borderColor: CATEGORY_COLORS[category].bg,
            textColor: CATEGORY_COLORS[category].text,
        });
        setModal(null);
    };

    const renderEventContent = (info: { event: EventApi }) => {
        const cat = (info.event.extendedProps?.category ??
            "blue") as EventCategory;
        const c = CATEGORY_COLORS[cat];
        return (
            <div
                className="text-[11px] px-1.5 py-px rounded-sm overflow-hidden text-ellipsis whitespace-nowrap w-full"
                style={{ background: c.bg, color: c.text }}
            >
                {info.event.title}
            </div>
        );
    };

    const fcEvents = events.map((e) => {
        const cat = (e.extendedProps?.category ?? "blue") as EventCategory;
        const c = CATEGORY_COLORS[cat];
        return {
            ...e,
            backgroundColor: c.bg,
            borderColor: c.bg,
            textColor: c.text,
        };
    });

    return (
        <div className="flex gap-4 py-3 relative min-h-150 font-inherit">
            {/* ── Main Calendar ── */}
            <div className="flex-1 min-w-0">
                <div className="p-2.5 border border-gray-200 rounded-xl overflow-hidden bg-white">
                    <FullCalendar
                        ref={calRef}
                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                        ]}
                        height="77vh"
                        initialView="dayGridMonth"
                        selectable
                        editable
                        selectMirror
                        dayMaxEvents={3}
                        select={handleDateSelect}
                        eventClick={handleEventClick}
                        events={fcEvents}
                        eventContent={renderEventContent}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay",
                        }}
                        buttonText={{
                            today: "Өнөөдөр",
                            month: "Сар",
                            week: "7 хоног",
                            day: "Өдөр",
                        }}
                        titleFormat={{}}
                        locale="mn"
                        firstDay={1}
                    />
                </div>
            </div>

            {/* ── Sidebar ── */}
            <div className="w-57.5 shrink-0 flex flex-col gap-3">
                <MiniCalendar
                    year={year}
                    month={month}
                    today={today}
                    eventDates={eventDates}
                    onPrev={() => changeMonth(-1)}
                    onNext={() => changeMonth(1)}
                />

                {/* Legend */}
                <div className="border border-gray-200 rounded-xl bg-white p-3">
                    <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-2">
                        Миний хуваариуд
                    </div>
                    {LEGEND_ITEMS.map((item) => (
                        <div
                            key={item.category}
                            className="flex items-center gap-2 mb-1.5"
                        >
                            <div
                                className="w-3 h-3 rounded-sm shrink-0"
                                style={{
                                    background:
                                        CATEGORY_COLORS[item.category].dot,
                                }}
                            />
                            <span className="text-[12px] text-gray-700 leading-snug">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>

                <UpcomingEvents events={events} year={year} month={month} />
            </div>

            {/* ── Modals ── */}
            {modal && (
                <AddModal
                    dateStr={modal}
                    onSave={handleSave}
                    onClose={() => setModal(null)}
                />
            )}
            {selectedEvent && (
                <EventDetailModal
                    event={selectedEvent}
                    onDelete={handleDeleteEvent}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
            <ToastContainer className={"z-1000"} />
        </div>
    );
};

export default StudentCalendar;
