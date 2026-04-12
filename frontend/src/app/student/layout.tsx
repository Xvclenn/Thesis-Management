"use client";

import { useEffect, useState } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    Calendar,
    Home,
    LayoutList,
    Users,
    Menu,
    X,
    LogOut,
    GraduationCap,
    Bell,
    Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const menus = [
    { name: "Нүүр", icon: Home, href: "/student/dashboard" },
    { name: "Төгсөлтийн ажил", icon: LayoutList, href: "/student/thesis" },
    { name: "Багш", icon: Users, href: "/student/teacher" },
    { name: "Хуанли", icon: Calendar, href: "/student/calendar" },
];

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) return null;

    /* active page label for breadcrumb */
    const activeMenu = menus.find((m) => pathname.startsWith(m.href));

    return (
        <div className="flex h-screen bg-[#F7F8FA] overflow-hidden font-sans">
            {/* ── Mobile overlay ── */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* ════════════════════════════════
                SIDEBAR
            ════════════════════════════════ */}
            <aside
                className={`
                    fixed md:sticky top-0 left-0 z-50 h-full
                    w-64 flex flex-col
                    bg-white border-r border-gray-100
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0
                `}
            >
                {/* ── close (mobile) ── */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X size={18} />
                </button>

                {/* ── Brand ── */}
                <div className="px-6 pt-7 pb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md shadow-orange-200 shrink-0">
                            <GraduationCap size={20} className="text-white" />
                        </div>
                        <div>
                            <p className="text-[15px] font-extrabold text-gray-900 leading-none tracking-tight">
                                MUST
                            </p>
                            <p className="text-[11px] text-gray-400 mt-0.5 leading-none">
                                Цахим дипломын портал
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── User mini card ── */}
                <div className="mx-4 mb-5 px-4 py-3 rounded-2xl bg-orange-50 border border-orange-100 flex items-center gap-3">
                    <div className="relative shrink-0">
                        <Image
                            src={
                                user?.image ||
                                "https://res.cloudinary.com/dpxaln0kd/image/upload/v1775404588/profiles/imwuimkxptusw4ba5edx.png"
                            }
                            alt="avatar"
                            width={36}
                            height={36}
                            className="w-9 h-9 rounded-xl object-cover"
                        />
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-orange-50" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[13px] font-semibold text-gray-800 leading-tight truncate">
                            {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-[11px] text-orange-400 leading-tight mt-0.5">
                            {user?.studentProfile?.studentCode}
                        </p>
                    </div>
                </div>

                {/* ── Nav ── */}
                <nav className="flex-1 px-3 overflow-y-auto space-y-0.5">
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.12em] px-3 mb-2">
                        Үндсэн цэс
                    </p>
                    {menus.map((menu) => {
                        const Icon = menu.icon;
                        const active = pathname.startsWith(menu.href);
                        return (
                            <Link
                                key={menu.href}
                                href={menu.href}
                                onClick={() => setIsOpen(false)}
                                className={`
                                    group flex items-center gap-3 px-3 py-2.5 rounded-xl
                                    text-[13.5px] font-medium transition-all duration-150
                                    ${
                                        active
                                            ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                    }
                                `}
                            >
                                <Icon
                                    size={16}
                                    className={
                                        active
                                            ? "text-white"
                                            : "text-gray-400 group-hover:text-gray-600"
                                    }
                                />
                                {menu.name}
                                {active && (
                                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* ── Bottom actions ── */}
                <div className="px-3 py-4 space-y-0.5 border-t border-gray-100 mt-2">
                    {/* <Link
                        href="/student/profile"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all"
                    >
                        <Settings size={16} className="text-gray-400" />
                        Тохиргоо
                    </Link> */}
                    <button
                        onClick={logout}
                        className="w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all"
                    >
                        <LogOut size={16} className="text-gray-400" />
                        Гарах
                    </button>
                </div>
            </aside>

            {/* ════════════════════════════════
                MAIN AREA
            ════════════════════════════════ */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
                {/* ── Top header ── */}
                <header className="shrink-0 h-16 bg-white border-b border-gray-100 px-6 flex items-center justify-between">
                    {/* Left: hamburger + breadcrumb */}
                    <div className="flex items-center gap-3">
                        <button
                            className="md:hidden text-gray-400 hover:text-gray-700 transition-colors"
                            onClick={() => setIsOpen(true)}
                        >
                            <Menu size={22} />
                        </button>

                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink
                                        href="/student/dashboard"
                                        className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
                                    >
                                        Нүүр
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {activeMenu &&
                                    activeMenu.href !==
                                        "/student/dashboard" && (
                                        <>
                                            <BreadcrumbSeparator className="text-gray-300" />
                                            <BreadcrumbItem>
                                                <span className="text-sm font-medium text-gray-700">
                                                    {activeMenu.name}
                                                </span>
                                            </BreadcrumbItem>
                                        </>
                                    )}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    {/* Right: bell + user dropdown */}
                    <div className="flex items-center gap-2">
                        {/* Bell */}
                        <button className="relative w-9 h-9 rounded-xl bg-gray-50 hover:bg-orange-50 border border-gray-100 hover:border-orange-200 flex items-center justify-center text-gray-400 hover:text-orange-500 transition-all">
                            <Bell size={16} />
                            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-orange-500 rounded-full" />
                        </button>

                        {/* User dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    type="button"
                                    className="flex items-center gap-2.5 pl-2 pr-2.5 py-1.5 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all cursor-pointer bg-white outline-none"
                                >
                                    <div className="relative">
                                        <Image
                                            src={
                                                user?.image ||
                                                "https://res.cloudinary.com/dpxaln0kd/image/upload/v1775404588/profiles/imwuimkxptusw4ba5edx.png"
                                            }
                                            alt="User"
                                            width={30}
                                            height={30}
                                            className="w-7 h-7 rounded-full object-cover"
                                        />
                                        <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full border border-white" />
                                    </div>
                                    <div className="text-left hidden sm:block">
                                        <p className="text-[13px] font-semibold text-gray-800 leading-tight">
                                            {user?.firstName} {user?.lastName}
                                        </p>
                                        <p className="text-[11px] text-orange-400 leading-none mt-0.5">
                                            {user?.studentProfile?.studentCode}
                                        </p>
                                    </div>
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align="end"
                                className="w-52 rounded-lg p-2 shadow-xl shadow-gray-100 border-gray-100 mt-1"
                            >
                                <DropdownMenuItem
                                    onClick={() =>
                                        router.push("/student/profile")
                                    }
                                    className="cursor-pointer focus:bg-orange-50 focus:text-orange-700"
                                >
                                    Профайл
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer focus:bg-orange-50 focus:text-orange-700">
                                    Нууц үг солих
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-gray-100 my-1" />
                                <DropdownMenuItem
                                    onClick={logout}
                                    variant="destructive"
                                    className="cursor-pointer"
                                >
                                    <LogOut size={13} className="mr-1.5" />
                                    Гарах
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* ── Page content ── */}
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    );
}
