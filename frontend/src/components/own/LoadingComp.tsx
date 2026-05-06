import { Spinner } from "../ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingComp = () => {
    return (
        <div className="flex flex-col h-[88vh]">
            <div className="mb-2">
                <Skeleton className="bg-gray-200 h-5 w-25 rounded-full" />
            </div>

            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-200 rounded-lg p-5 flex flex-col gap-2">
                    <Skeleton className="h-5 max-w-50 rounded-full" />
                    <Skeleton className="h-5 w-25 rounded-full" />
                </div>
                <div className="bg-gray-200 rounded-lg p-5 flex flex-col gap-2">
                    <Skeleton className="h-5 max-w-w-50 rounded-full" />
                    <Skeleton className="h-5 w-25 rounded-full" />
                </div>
                <div className="bg-gray-200 rounded-lg p-5 flex flex-col gap-2">
                    <Skeleton className="h-5 max-w-w-50 rounded-full" />
                    <Skeleton className="h-5 w-25 rounded-full" />
                </div>
                <div className="bg-gray-200 rounded-lg p-5 flex flex-col gap-2">
                    <Skeleton className="h-5 max-w-w-50 rounded-full" />
                    <Skeleton className="h-5 w-25 rounded-full" />
                </div>
            </div>
            <div className="mb-2">
                <Skeleton className="bg-gray-200 h-5 w-25 rounded-full" />
            </div>
            <div className="flex-1 h-screen overflow-auto pb-5">
                <div className="border h-full rounded-2xl p-10 bg-gray-200 flex flex-col gap-5">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div className="flex gap-4" key={index}>
                            <Skeleton className="h-6 flex-1" />
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-6 w-20" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LoadingComp;
