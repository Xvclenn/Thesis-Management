"use client";
import { useState } from "react";
import {
    Heart,
    Repeat2,
    MessageCircle,
    Github,
    Linkedin,
    Facebook,
    Star,
    Play,
    Wifi,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

// ========== Types ==========
interface BiographyInfo {
    major: string;
    level: string;
    favoriteSubjects: string;
    favoriteLanguage: string;
    tools: string;
    learningStyle: string;
    location: string;
    availability: boolean;
    badges: string[];
    tags: string[];
}

interface SocialLinks {
    github: string;
    linkedin: string;
    facebook: string;
}

interface Project {
    id: number;
    title: string;
    duration: string;
    views: string;
    gradient: string;
}

interface CollectionItem {
    id: number;
    title: string;
    artist: string;
    emoji: string;
    bg: string;
}

interface StudentUser {
    name: string;
    initials: string;
    studentId: string;
    bio: BiographyInfo;
    socials: SocialLinks;
    projects: Project[];
    collection: CollectionItem[];
}

// ========== Mock Data ==========
const mockUser: StudentUser = {
    name: "Энххүслэн Болдбаяр",
    initials: "ЭБ",
    studentId: "B210930022",
    bio: {
        major: "Программ хангамж",
        level: "3-р курс",
        favoriteSubjects: "Алгоритм, Веб, Дата сан",
        favoriteLanguage: "JavaScript",
        tools: "VS Code",
        learningStyle: "Практик",
        location: "Улаанбаатар, Монгол",
        availability: true,
        badges: ["Шилдэг оюутан"],
        tags: ["#Frontend", "#React", "#MUST"],
    },
    socials: {
        github: "#",
        linkedin: "#",
        facebook: "#",
    },
    projects: [
        {
            id: 1,
            title: "Веб апп төсөл",
            duration: "2:24",
            views: "1,248",
            gradient: "from-violet-500 to-indigo-500",
        },
        {
            id: 2,
            title: "Мобайл апп",
            duration: "1:45",
            views: "856",
            gradient: "from-pink-500 to-rose-400",
        },
        {
            id: 3,
            title: "Дата шинжилгээ",
            duration: "3:10",
            views: "2,104",
            gradient: "from-cyan-400 to-blue-500",
        },
    ],
    collection: [
        {
            id: 1,
            title: "Алгоритм",
            artist: "Б. Лхагва",
            emoji: "📚",
            bg: "bg-amber-100",
        },
        {
            id: 2,
            title: "Веб хөгжүүлэлт",
            artist: "Д. Батбаяр",
            emoji: "💻",
            bg: "bg-purple-100",
        },
        {
            id: 3,
            title: "Дата сан",
            artist: "Э. Ганбаатар",
            emoji: "🗄️",
            bg: "bg-emerald-100",
        },
        {
            id: 4,
            title: "Программчлал",
            artist: "О. Нэргүй",
            emoji: "🔧",
            bg: "bg-orange-100",
        },
        {
            id: 5,
            title: "Статистик",
            artist: "Б. Лхагва",
            emoji: "📊",
            bg: "bg-blue-100",
        },
        {
            id: 6,
            title: "Хиймэл оюун",
            artist: "Д. Батбаяр",
            emoji: "🤖",
            bg: "bg-pink-100",
        },
    ],
};

// ========== Sub Components ==========
interface BioFieldProps {
    label: string;
    value: string;
}

function BioField({ label, value }: BioFieldProps) {
    return (
        <div className="flex flex-col gap-0.5">
            <span className="text-xs text-gray-400">{label}</span>
            <span className="text-sm font-medium text-gray-800">{value}</span>
        </div>
    );
}

interface ProjectRowProps {
    project: Project;
    userName: string;
    liked: boolean;
    onLike: (id: number) => void;
}

function ProjectRow({ project, userName, liked, onLike }: ProjectRowProps) {
    return (
        <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
            <td className="px-3 py-3">
                <div className="flex items-center gap-3">
                    <div
                        className={`w-8 h-8 rounded-md bg-gradient-to-br ${project.gradient} flex-shrink-0`}
                    />
                    <div>
                        <p className="text-sm font-medium text-gray-800">
                            {project.title}
                        </p>
                        <p className="text-xs text-gray-400">{userName}</p>
                    </div>
                </div>
            </td>
            <td className="px-3 py-3 text-sm text-gray-600">
                {project.duration}
            </td>
            <td className="px-3 py-3 text-sm text-gray-600">{project.views}</td>
            <td className="px-3 py-3">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => onLike(project.id)}
                        className={`transition-colors ${liked ? "text-red-500" : "text-gray-400 hover:text-red-400"}`}
                    >
                        <Heart
                            size={15}
                            fill={liked ? "currentColor" : "none"}
                        />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <Repeat2 size={15} />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <MessageCircle size={15} />
                    </button>
                </div>
            </td>
        </tr>
    );
}

interface CollectionCardProps {
    item: CollectionItem;
}

function CollectionCard({ item }: CollectionCardProps) {
    return (
        <div className="group cursor-pointer">
            <div
                className={`relative rounded-xl aspect-square ${item.bg} flex items-center justify-center text-3xl mb-2 overflow-hidden`}
            >
                {item.emoji}
                <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                    <Play size={10} className="text-white fill-white ml-0.5" />
                </div>
            </div>
            <p className="text-xs font-medium text-gray-800 truncate">
                {item.title}
            </p>
            <p className="text-xs text-gray-400 truncate">{item.artist}</p>
        </div>
    );
}

// ========== Main Component ==========
export default function StudentProfile() {
    const { user } = useAuth();
    const [liked, setLiked] = useState<Record<number, boolean>>({});
    // const user = mockUser;

    console.log("USER", user);

    const toggleLike = (id: number): void => {
        setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const bioFields: Array<[string, string]> = [
        ["Мэргэжил", user.studentProfile?.major],
        ["Түвшин", user.studentProfile?.year],
        ["Дуртай 3 хичээл", ""],
        ["Дуртай технологи", ""],
        ["Ашигладаг хэрэгсэл", ""],
        ["Дуртай хичээлийн хэлбэр", ""],
        ["Байршил", ""],
    ];

    return (
        <div className="font-sans">
            {/* Page Header */}
            <div className="mb-5">
                <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                    Профайл
                </h1>
                <p className="text-sm text-gray-500">
                    Өөрийн бүх профайлын мэдээллийг энд харна уу.
                </p>
            </div>

            <Separator className="h-1 border-t border-dashed bg-transparent" />

            {/* Profile Card */}
            <div className="my-4 flex flex-col lg:flex-row gap-5 overflow-hidden">
                {/* Left - Avatar */}
                <div className="w-full lg:w-60 min-w-80 border bg-white rounded-2xl border-gray-200 flex flex-col items-center justify-center p-6 border-r gap-3">
                    <div className="relative group">
                        {/* Outer glow */}
                        <div className="absolute inset-0 rounded-full bg-linear-to-tr from-orange-400 to-orange-500 blur-md opacity-30 group-hover:opacity-50 transition" />

                        {/* Avatar container */}
                        <div className="relative w-50 h-50 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100">
                            <Image
                                src={
                                    user?.image ||
                                    "https://res.cloudinary.com/dpxaln0kd/image/upload/v1775967308/1-intro-photo-final_uymtpm.jpg"
                                }
                                alt="avatar"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Online indicator */}
                        <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                    </div>
                    <p className="text-base font-semibold text-gray-900 text-center leading-tight">
                        {user.firstName} {user.lastName}
                    </p>
                    <span className="text-xs text-green-700 bg-green-100 px-3 py-1 rounded-full">
                        {user.studentProfile?.studentCode}
                    </span>
                </div>

                {/* Right - Bio */}
                <div className="flex-1 p-6 border bg-white rounded-2xl border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-semibold text-gray-900">
                            Bio болон бусад мэдээлэл
                        </h2>
                        <Wifi size={16} className="text-green-500" />
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        {bioFields.map(([label, value]) => (
                            <BioField key={label} label={label} value={value} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-4">
                <h2 className="text-base font-semibold text-gray-900 mb-4">
                    Сошиал медиа
                </h2>
                <div className="flex gap-3">
                    <a
                        href="#"
                        className="w-10 h-10 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-700 transition-colors"
                    >
                        <Github size={18} />
                    </a>
                    <a
                        href="#"
                        className="w-10 h-10 rounded-full border border-blue-100 bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-blue-600 transition-colors"
                    >
                        <Linkedin size={18} />
                    </a>
                    <a
                        href="#"
                        className="w-10 h-10 rounded-full border border-blue-100 bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-blue-700 transition-colors"
                    >
                        <Facebook size={18} />
                    </a>
                </div>
            </div>
        </div>
    );
}
