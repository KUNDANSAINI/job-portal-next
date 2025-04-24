'use client'

import { candidateProfileUpdate, recriuterProfileUpdate } from "@/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { candidateForm, initialCandidateAccountState, initialRecruiterState, recruiterForm } from "@/utails";
import { useEffect, useState } from "react";


function AccountInfo({ profileInfo }) {

    const [candidateFormData, setCandidateFormData] = useState(initialCandidateAccountState)
    const [recriuterFormData, setRecriuterFormData] = useState(initialRecruiterState)

    useEffect(() => {
        if (profileInfo?.data?.role === "candidate") {
            setCandidateFormData(profileInfo?.data?.candidateInfo)
        }
        if (profileInfo?.data?.role === "recruiter") {
            setRecriuterFormData(profileInfo?.data?.recruiterInfo)
        }
        
    }, [])

    async function handleCandidateUpdate() {
        const data = {
            _id: profileInfo?.data?._id,
            userId: profileInfo?.data?.userId,
            role: "candidate",
            email: profileInfo?.data?.email,
            isPremiumUser: profileInfo?.data?.isPremiumUser,
            membershipType: profileInfo?.data?.membershipType,
            membershipStartDate: profileInfo?.data?.membershipStartDate,
            membershipEndDate: profileInfo?.data?.membershipEndDate,
            candidateInfo:{
                ...candidateFormData,
                resume: profileInfo?.candidateInfo?.resume
            }
        }
        await candidateProfileUpdate(data,'/account')
    }


    async function handleRecriuterUpdate() {
        const data = {
            _id: profileInfo?.data?._id,
            userId: profileInfo?.data?.userId,
            role: "recuriter",
            email: profileInfo?.data?.email,
            isPremiumUser: profileInfo?.data?.isPremiumUser,
            membershipType: profileInfo?.data?.membershipType,
            membershipStartDate: profileInfo?.data?.membershipStartDate,
            membershipEndDate: profileInfo?.data?.membershipEndDate,
            candidateInfo:{
                ...recriuterFormData
            }
        }
        await recriuterProfileUpdate(data,'/account')
    }

    return (
        <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between pb-6 border-b pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">Account Details</h1>
            </div>
            <div className="py-20 pb-24 pt-6">
                <div className="container mx-auto p-0 space-y-8">
                    {
                        profileInfo?.data?.role === "candidate" ? (
                            <form action={handleCandidateUpdate}>
                                {
                                    candidateForm.filter(formControl => formControl.name !== "resume").map((form) => (
                                        <div key={form.name}>
                                            <Label className="text-xl">{form.label}</Label>
                                            <div className="relative flex items-center mt-1 mb-4">
                                                <Input
                                                    name={form.name}
                                                    type={form.componentType}
                                                    placeholder={form.placeholder}
                                                    id={form.name}
                                                    className="w-full rounded-md h-[60px] px-4 border bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                                    value={candidateFormData[form.name]}
                                                    onChange={(e) => {
                                                        setCandidateFormData({
                                                            ...candidateFormData,
                                                            [e.target.name]: e.target.value
                                                        })
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))
                                }
                                <Button className="mt-5" type="submit">Update Profile</Button>
                            </form>
                        ) :
                            <form action={handleRecriuterUpdate}>
                                {
                                    recruiterForm.map((form, index) => (
                                        <div className="relative flex items-center mt-8" key={index}>
                                            <Input
                                                name={form.name}
                                                placeholder={form.placeholder}
                                                type={form.componentType}
                                                id={form.name}
                                                className="w-full rounded-md h-[60px] px-4 border bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                                value={recriuterFormData[form.name]}
                                                onChange={(e) => {
                                                    setRecriuterFormData({
                                                        ...recriuterFormData,
                                                        [e.target.name]: e.target.value
                                                    })
                                                }}
                                            />
                                        </div>
                                    ))
                                }
                                <Button className="mt-5" type="submit">Update Profile</Button>
                            </form>
                    }
                </div>
            </div>
        </div>
    );
}

export default AccountInfo;
