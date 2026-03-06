export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-red-300 text-white p-4">
                <h1>Student Portal</h1>
            </header>

            <main className="flex-1 p-6">{children}</main>

            <footer className="bg-gray-200 text-center p-4">
                © 2026 Diplom Project
            </footer>
        </div>
    );
}
