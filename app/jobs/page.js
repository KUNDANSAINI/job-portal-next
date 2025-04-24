import { currentUser } from "@clerk/nextjs/server";
import Jobs from "../component/jobs-listing";
import { createFilterCatagory, fetchCandidateAllJobs, fetchCandidateApplication, fetchProfileInfo, fetchRecriuterApplication, fetchRecruiterAllJobs } from "@/action";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Browse Jobs | Job Portal App",
    description: "Search and apply for the latest job openings across various industries and locations. Find full-time, part-time, and remote jobs tailored to your skills.",
  };  

async function JobsPage({searchParams}) {
    
    const user= await currentUser()

    const profile=await fetchProfileInfo(user?.id)
    const profileInfo=profile.data

    if(!user){
        redirect('/sign-in')
    }

    const fetchAllJobs=profileInfo?.role === "candidate" ? await fetchCandidateAllJobs(searchParams) : await fetchRecruiterAllJobs(user?.id)

    const fetchAllApplication= profileInfo?.role === "candidate" ? await fetchCandidateApplication(user?.id) : await fetchRecriuterApplication(user?.id)

    const fetchFilterJob=await createFilterCatagory()

    return ( 
        <Jobs user={JSON.parse(JSON.stringify(user))} profileInfo={profileInfo} joblisting={fetchAllJobs.data} fetchAllApplication={fetchAllApplication} filterCatigory={fetchFilterJob} />
     );
}

export default JobsPage;