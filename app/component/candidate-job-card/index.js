'use client'

import { Button } from "@/components/ui/button";
import CommonCard from "../common-card";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { useState } from "react";
import { createJobApplication } from "@/action";


function CandidateJobCard({ jobs,profileInfo, fetchAllApplication }) {

    const [showJobDetails, setShowJobDetails] = useState(false)

    async function handleApplyAppication() {
        const data = {
            recriuterUserID: jobs?.recruiterId,
            name: profileInfo?.candidateInfo?.name,
            email: profileInfo?.email,
            candidateUserID: profileInfo?.userId,
            status: ["Applied"],
            jobID: jobs?._id,
            jobAppliedDate: new Date().toLocaleDateString()
        }
        await createJobApplication(data,'/jobs')
        setShowJobDetails(false)
    }

    return (
        <>
            <Drawer open={showJobDetails} onOpenChange={setShowJobDetails} >
                <CommonCard
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="lucide stroke-2 lucide-rocket"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>}
                    title={jobs?.title}
                    descripation={jobs?.companyName}
                    footerContant={
                        <Button onClick={() => { setShowJobDetails(true) }}>View Details</Button>
                    }
                />
                <DrawerContent className="p-6">
                    <DrawerHeader className="px-0">
                        <div className="flex justify-between">
                            <DrawerTitle className="text-4xl font-extrabold text-gray-900">{jobs?.title}</DrawerTitle>
                            <div className="gap-4">
                                <Button onClick={handleApplyAppication}
                                disabled={
                                    fetchAllApplication.data.findIndex((item) => item.jobID === jobs?._id) > -1 ? true : false
                                }
                                className="disabled:opacity-65"
                                >
                                    {
                                        fetchAllApplication.data.findIndex((item) => item.jobID === jobs?._id) > -1 ? "Applied" : "Apply"
                                    }
                                </Button>
                                <Button className="ml-4 mt-4" onClick={() => setShowJobDetails(false)}>Cancel</Button>
                            </div>
                        </div>
                    </DrawerHeader>
                    <DrawerDescription className="text-3xl font-medium text-gray-600">
                        {jobs?.descripation}
                        <span className="text-xl font-normal text-gray-500 ml-2">{jobs?.location}</span>
                    </DrawerDescription>
                    <div className="w-[150px] flex justify-center mt-2 items-center h-[40px] bg-black rounded-[8px]">
                        <h2 className="text-xl font-bold text-white">{jobs?.type} Time</h2>
                    </div>
                    <h3 className="mt-3 text-2xl font-medium text-black">Experience : {jobs?.experience} Year</h3>
                    <div className="flex gap-4 mt-6">
                        {jobs?.skills.split(",").map((skill) => (
                            <div className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px]"><h2 className="text-[13px] font-medium text-white">{skill}</h2></div>
                        ))
                        }
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default CandidateJobCard;