"use client";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Bell, Calendar, Home, LayoutList, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
    { name: "Нүүр", icon: Home, href: "/student/dashboard" },
    { name: "Төгсөлтийн ажил", icon: LayoutList, href: "/student/thesis" },
    { name: "Багш", icon: Users, href: "/student/teacher" },
    { name: "Хуанли", icon: Calendar, href: "/student/calendar" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex h-screen bg-gray-100">
            {/* SIDEBAR */}
            <aside className="w-64 bg-white border-r flex flex-col">
                {/* LOGO */}

                <div className="pt-5 px-6 mb-5 flex justify-center">
                    <Image
                        src="/assets/logoblue.png"
                        alt="MUST Logo"
                        width={300}
                        height={60}
                        className=""
                    />
                </div>

                {/* MENU */}
                <nav className="flex-1 p-4 space-y-1.5 font-semibold text-[#263238]">
                    {menus.map((menu) => {
                        const Icon = menu.icon;

                        return (
                            <Link
                                key={menu.href}
                                href={menu.href}
                                className={`flex items-center gap-2.5 p-3 rounded-lg ${
                                    pathname.startsWith(menu.href)
                                        ? "bg-gray-200"
                                        : "hover:bg-gray-100"
                                }`}
                            >
                                <Icon size={20} /> {menu.name}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* RIGHT SIDE */}
            <div className="flex-1 flex flex-col">
                {/* HEADER */}
                <header className="bg-white border-b px-10 py-4 flex justify-between items-center">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">Нүүр</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className="flex items-center gap-4">
                        <div className="bg-[#D9D9D9] p-2 rounded-full">
                            <Bell size={24} color="#21272A" />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="text-right">
                                <p className="font-medium">
                                    Болдбаяр Энххүслэн
                                </p>
                                <p className="text-sm text-gray-500">Оюутан</p>
                            </div>

                            <div className="w-10 h-10 bg-gray-300 rounded-full" />
                        </div>
                    </div>
                </header>

                {/* CONTENT */}
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
