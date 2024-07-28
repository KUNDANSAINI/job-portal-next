'use client'

import { Button } from "@/components/ui/button";
import CommonCard from "../common-card";
import { useState } from "react";
import JobApplicants from "../job-applicants";





function RecruiterJobCard({ jobs,fetchAllApplication, profileInfo }) {
    const [showDrawer,setShowDrawer]=useState(false)
    const [showCandidateDetails,setShowCandidateDetails]=useState(false)
    const [candidateDetails,setCandidateDetails]=useState(null)

    return (
        <div>
        <CommonCard
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="lucide stroke-2 lucide-rocket"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>}
            title={jobs?.title}
            footerContant={
                <Button 
                onClick={()=>{setShowDrawer(true)}}
                className=" disabled:opacity-55 flex h-11 items-center justify-center px-5"
                disabled={
                        fetchAllApplication.data.filter((item)=>
                            item?.jobID === jobs?._id
                        ).length === 0
                }
                >
                    {
                        fetchAllApplication.data.filter((item)=>
                            item?.jobID === jobs?._id
                        ).length
                    } Application
                </Button>
            }
            />
            <JobApplicants
            showDrawer={showDrawer}
            setShowDrawer={setShowDrawer}
            showCandidateDetails={showCandidateDetails}
            setShowCandidateDetails={setShowCandidateDetails}
            candidateDetails={candidateDetails}
            setCandidateDetails={setCandidateDetails}
            jobs={jobs}
            fetchAllApplication={fetchAllApplication.data.filter((jobItem) => jobItem?.jobID === jobs?._id)}
            />
        </div>
    );
}

export default RecruiterJobCard;