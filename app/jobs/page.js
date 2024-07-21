import { currentUser } from "@clerk/nextjs/server";
import Jobs from "../component/jobs-listing";
import { fetchProfileInfo, fetchRecruiterAllJobs } from "@/action";

async function JobsPage() {

    const user= await currentUser()

    const profile=await fetchProfileInfo(user?.id)
    const profileInfo=profile.data

    const recruiterJobs=await fetchRecruiterAllJobs(user?.id)

    return ( 
        <Jobs user={JSON.parse(JSON.stringify(user))} profileInfo={profileInfo} joblisting={recruiterJobs.data} />
     );
}

export default JobsPage;