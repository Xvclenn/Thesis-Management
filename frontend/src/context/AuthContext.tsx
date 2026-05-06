"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<any>(null);
    const [hydrated, setHydrated] = useState(false);
    const router = useRouter();

    const setUserWithStorage = (data: any) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        try {
            if (storedUser && storedUser !== "undefined") {
                setUser(JSON.parse(storedUser));
            } else {
                localStorage.removeItem("user");
            }
        } catch (err) {
            console.error("Invalid user in localStorage:", err);
            localStorage.removeItem("user");
        }

        setHydrated(true);
    }, []);

    // 🔥 logout function
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider
            value={{ user, setUser: setUserWithStorage, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
