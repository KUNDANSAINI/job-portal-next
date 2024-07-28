'use client'

import { fetchCandidateDetailsID, updateJobApplication } from "@/action";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";



function CandidateList({
    showCandidateDetails,
    setShowCandidateDetails,
    candidateDetails,
    setCandidateDetails,
    fetchAllApplication
}) {

    async function handleCandidateDetails(candidateID) {
        const result = await fetchCandidateDetailsID(candidateID)
        if (result?.data) {
            setCandidateDetails(result?.data)
            setShowCandidateDetails(true)
        }
    }

    async function handleSelectCandidate(getCurrentStatus) {
        const cpyJobApplicant = [...fetchAllApplication]
        const indexOfJobApplicant = cpyJobApplicant.findIndex((item) => item.candidateUserID === candidateDetails?.userId)
        //console.log(indexOfJobApplicant)
        const jobApplicantToUpdate = {
            ...cpyJobApplicant[indexOfJobApplicant],
            status: cpyJobApplicant[indexOfJobApplicant].status.concat(getCurrentStatus)
        }
        await updateJobApplication(jobApplicantToUpdate, '/jobs')
    }

    return (
        <div>
            <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
                {
                    fetchAllApplication && fetchAllApplication?.length > 0 ?
                        fetchAllApplication.map((applicants) =>
                            <div className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
                                <div className="px-4 my-6 flex justify-between items-center">
                                    <h3 className="text-lg font-bold ">{applicants?.name}</h3>
                                    <Button onClick={() => { handleCandidateDetails(applicants?.candidateUserID) }}>View Details</Button>
                                </div>
                            </div>
                        )
                        : null
                }
            </div>
            <Dialog open={showCandidateDetails} onOpenChange={() => {
                setCandidateDetails(null)
                setShowCandidateDetails(false)
            }}>
                <DialogContent>
                    <div>
                        <h2>Name: {candidateDetails?.candidateInfo?.name}</h2>
                        <p>Email: {candidateDetails?.email}</p>
                        <p>Current Company: {candidateDetails?.candidateInfo?.currentCompany}</p>
                        <p>Location: {candidateDetails?.candidateInfo?.currentJobLocation}</p>
                        <p>Total Experience: {candidateDetails?.candidateInfo?.totalExperience} Year</p>
                        <p>Salary: {candidateDetails?.candidateInfo?.currentSalary} LPA</p>
                        <p>Notice Period: {candidateDetails?.candidateInfo?.noticePeriod} Days</p>
                        <p>Previous Companies: {candidateDetails?.candidateInfo?.previousCompanies}</p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {candidateDetails?.candidateInfo?.skills.split(",").map((skill) => (
                            <div className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px]"><h2 className="text-[13px] font-medium text-white">{skill}</h2></div>
                        ))
                        }
                    </div>
                    <div className="flex gap-3 justify-center">
                        <Button>Resume</Button>
                        <Button
                            onClick={() => { handleSelectCandidate("selected") }}
                            className=" disabled:opacity-55"
                            disabled={
                                fetchAllApplication.find((item) => item.candidateUserID === candidateDetails?.userId)?.status.includes("selected") ||
                                fetchAllApplication.find((item) => item.candidateUserID === candidateDetails?.userId)?.status.includes("rejected") ? true : false
                            }
                        >
                            {
                                fetchAllApplication.find((item) => item.candidateUserID === candidateDetails?.userId)?.status.includes("selected") ? "Selected" : "Select"
                            }
                        </Button>
                        <Button
                            onClick={() => { handleSelectCandidate("rejected") }}
                            className=" disabled:opacity-55"
                            disabled={
                                fetchAllApplication.find((item) => item.candidateUserID === candidateDetails?.userId)?.status.includes("selected")  ||
                                fetchAllApplication.find((item) => item.candidateUserID === candidateDetails?.userId)?.status.includes("rejected") ? true : false
                            }
                        >
                            {
                                fetchAllApplication.find((item) => item.candidateUserID === candidateDetails?.userId)?.status.includes("rejected") ? "Rejected" : "Reject"
                            }
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CandidateList;