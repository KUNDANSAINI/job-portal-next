import { fetchCandidateAllJobs, fetchCandidateApplication } from "@/action";
import Activity from "../component/candidate-activity";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Your Activity | Job Portal App",
    description: "Track your job applications, saved listings, and profile updates in one place on your activity dashboard.",
  };
  

async function ActivityPage() {

    const user=await currentUser()

    if(!user){
        redirect('/sign-in')
    }

    const candidateJobs=await fetchCandidateAllJobs()
    const candidateApplication=await fetchCandidateApplication(user?.id)

    return ( 
        <>
        <Activity
        candidateJobs={candidateJobs}
        candidateApplication={candidateApplication}
        />
        </>
     );
}

export default ActivityPage;