// export default function StatusBadge({ status }: { status: string }) {
//     // const config: any = {
//     //     Илгээсэн: "bg-orange-100 text-orange-600",
//     //     Баталсан: "bg-green-100 text-green-600",
//     //     Татгалсан: "bg-red-100 text-red-600",
//     // };

//     const config: any = {
//     Илгээсэн: {
//         dot: "bg-orange-400",
//         badge: "bg-orange-50 text-orange-700 border-orange-200",
//     },
//     Татгалсан: {
//         dot: "bg-red-400",
//         badge: "bg-red-50 text-red-700 border-red-200",
//     },
//     Баталсан: {
//         dot: "bg-green-400",
//         badge: "bg-green-50 text-green-700 border-green-200",
//     },
// };

//     return (
//         <span className={`px-2 py-1 text-xs rounded-full ${config[status]}`}>
//             {status}
//         </span>
//     );
// }

export default function StatusBadge({ status }: { status: string }) {
    const config: any = {
        "Хүлээгдэж байгаа": {
            dot: "bg-orange-400",
            badge: "bg-orange-50 text-orange-700 border-orange-200",
        },
        Илгээсэн: {
            dot: "bg-orange-400",
            badge: "bg-orange-50 text-orange-700 border-orange-200",
        },
        Татгалсан: {
            dot: "bg-red-400",
            badge: "bg-red-50 text-red-700 border-red-200",
        },
        Баталсан: {
            dot: "bg-green-400",
            badge: "bg-green-50 text-green-700 border-green-200",
        },
    };

    const cfg = config[status] ?? {
        dot: "bg-gray-400",
        badge: "bg-gray-50 text-gray-600 border-gray-200",
    };
    return (
        <span
            className={`inline-flex items-center gap-1.5 border rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${cfg.badge}`}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {status}
        </span>
    );
}
