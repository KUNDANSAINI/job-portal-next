import PostNewJobs from "../post-new-job";
import RecruiterJobCard from "../recruiter-job-card";



function Jobs(params) {
    const {user,profileInfo,joblisting}=params
    //console.log(joblisting)
    return ( 
        <div>
            <div className="mx-auto max-w-7xl">
                <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                        {
                            profileInfo?.role==='candidate' ?
                            "Explore All Jobs"
                            : "Jobs DashBoard"
                        }
                    </h1>
                    <div className="flex items-center">
                        {
                            profileInfo?.role===  'candidate' ? <p>Filter</p>
                            : <PostNewJobs user={user} profileInfo={profileInfo}/>
                        }
                    </div>
                </div>
                <div className="pt-6 pb-24">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                        <div className="lg:col-span-4">
                            <div className="container mx-auto p-0 space-y-8">
                                <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                                    {
                                        joblisting && joblisting.length > 0 ?
                                        joblisting.map((jobs,index)=>(
                                            profileInfo?.role === "candidate" ? (
                                                <p>Candidate</p>
                                            ) : (
                                                <RecruiterJobCard jobs={jobs} key={index}/>
                                            )

                                        )) : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Jobs;