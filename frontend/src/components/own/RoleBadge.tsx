import React from "react";

type RoleBadgeProps = {
    role: Array<string>;
    className?: string;
};

const roleLabels: Record<string, string> = {
    admin: "Админ",
    supervisor: "Удирдагч",
    commission: "Комисс",
    headofdepartment: "Тэнхимийн эрхлэгч",
};

const RoleBadge: React.FC<RoleBadgeProps> = ({ role }) => {
    const config: any = {
        admin: {
            dot: "bg-emerald-400",
            badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
        },
        supervisor: {
            dot: "bg-sky-400",
            badge: "bg-sky-50 text-sky-700 border-sky-200",
        },
        commission: {
            dot: "bg-violet-400",
            badge: "bg-violet-50 text-violet-700 border-violet-200",
        },
        headofdepartment: {
            dot: "bg-amber-400",
            badge: "bg-amber-50 text-amber-700 border-amber-200",
        },
    };

    const roleKey = role[0] ?? "";
    const cfg = config[roleKey] ?? {
        dot: "bg-gray-400",
        badge: "bg-gray-50 text-gray-600 border-gray-200",
    };

    return (
        <div className="flex gap-2">
            {role.map((r) => {
                const roleConfig = config[r] ?? {
                    dot: "bg-gray-400",
                    badge: "bg-gray-50 text-gray-600 border-gray-200",
                };

                return (
                    <span
                        key={r}
                        className={`inline-flex items-center gap-1.5 border rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${roleConfig.badge}`}
                    >
                        <span
                            className={`w-1.5 h-1.5 rounded-full ${roleConfig.dot}`}
                        />
                        {roleLabels[r] ?? r}
                    </span>
                );
            })}
        </div>
    );
};

export default RoleBadge;
