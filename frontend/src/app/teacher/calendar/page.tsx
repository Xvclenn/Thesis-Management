import StudentCalendar from "@/components/own/calendar/StudentCalendar";
import React from "react";

const Calender = () => {
    return (
        <div className="h-[85vh] overflow-hidden">
            <p className="text-[12px] font-bold text-gray-300 uppercase tracking-[0.12em] mb-2">
                Хуанли
            </p>
            <StudentCalendar />
        </div>
    );
};

export default Calender;
