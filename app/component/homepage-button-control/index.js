'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


function HomePageButtonControl({user, profileInfo}) {

    const router=useRouter()

    return (
        <div className="flex space-x-4">
            <Button onClick={()=>router.push('/jobs')}>
                {
                    user ? profileInfo?.data?.role === "candidate" ? "Browse Jobs" : "Job DashBoard" : "Find Jobs"
                }
            </Button>
            <Button onClick={()=>router.push(
                user ? profileInfo?.data?.role === "candidate" ? "/activity" : "/jobs" : "/jobs"
            )}>
                {
                    user ? profileInfo?.data?.role === "candidate" ? "Your Activity" : "Post A New Job" : "Post New Jobs"
                }
            </Button>
        </div>
    );
}

export default HomePageButtonControl;