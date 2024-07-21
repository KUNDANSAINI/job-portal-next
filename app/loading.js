import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
    return ( 
        <div className="flex flex-col space-y-3">
            <Skeleton className="w-full h-full min-h-[630px] bg-zinc-500 mt-5" />
        </div>
     );
}

export default Loading;