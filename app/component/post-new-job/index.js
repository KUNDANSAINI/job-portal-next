'use client'

import { createJob } from "@/action";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initialPostNewJobState, postNewJobForm } from "@/utails";
import { useState } from "react";

function PostNewJobs({ user, profileInfo }) {

    const [showJobDialog, setShowJobDialog] = useState(false)
    const [jobFormData, setJobFormData] = useState({
        ...initialPostNewJobState,
        companyName: profileInfo?.recruiterInfo?.companyName
    })

    async function createNewJob() {
        await createJob({
            ...jobFormData,
            recruiterId: user?.id,
            applicants: []
        }, '/jobs')
        setShowJobDialog(false)
        setJobFormData({
            ...initialPostNewJobState,
            companyName: profileInfo?.recruiterInfo?.companyName
    })
    }


    return (
        <div>
            <Button onClick={() => { setShowJobDialog(true) }}>Post A Jobs</Button>
            <Dialog open={showJobDialog} onOpenChange={() => {
                setShowJobDialog(false)
                setJobFormData({
                    ...initialPostNewJobState,
                    companyName: profileInfo?.recruiterInfo?.companyName
                })
            }}>
                <DialogContent className="sm:max-w-screen-md overflow-auto h-[800px]">
                    <DialogHeader>
                        <DialogTitle>Post New Job</DialogTitle>
                        <div className="grid gap-4 py-4">
                            <form action={createNewJob}>
                                {
                                    postNewJobForm.map((form) => (
                                        <div key={form.name}>
                                            <Label className="text-xl">{form.label}</Label>
                                            <div className="relative flex items-center mt-1 mb-4">
                                                <Input
                                                    name={form.name}
                                                    type={form.componentType}
                                                    placeholder={form.placeholder}
                                                    id={form.name}
                                                    disabled={form.disabled}
                                                    className="w-full rounded-md h-[60px] px-4 border bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                                    value={jobFormData[form.name]}
                                                    onChange={(e) => {
                                                        setJobFormData({
                                                            ...jobFormData,
                                                            [e.target.name]: e.target.value
                                                        })
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))
                                }
                                <Button type="submit">SAVE</Button>
                            </form>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default PostNewJobs;