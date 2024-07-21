'use client'

import { createRecruiterProfile } from "@/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { candidateForm, initialCandidateState, initialRecruiterState, recruiterForm } from "@/utails";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

function OnBoard() {

    const [currentTab,setCurrentTab]=useState("candidate")

    const [recruiterformData,setRecruiterFormData]=useState(initialRecruiterState)
    const [candidateformData,setCandidateFormData]=useState(initialCandidateState)

    const currentAuthUser = useUser()
    const {user}=currentAuthUser
    //console.log(currentAuthUser)

    function handleTabChange(value){
        setCurrentTab(value)
    }

    async function handlerecruiterform(){
        const data={
            recruiterInfo: recruiterformData,
            userId:user.id,
            role:'recruiter',
            isPremiumUser:false,
            email:user.primaryEmailAddress.emailAddress
        }
        await createRecruiterProfile(data,'/onboard')
    }

    function handlecandidateform(){
        //
    }

    //console.log(candidateformData)

    return ( 
        <div className="bg-white">
            <Tabs value={currentTab} onValueChange={handleTabChange}>
                <div className="w-full">
                    <div className="flex items-baseline justify-between border-b pb-6 pt-24">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-800">Welcome To Onboarding</h1>
                        <TabsList>
                            <TabsTrigger value="candidate">Candidate</TabsTrigger>
                            <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
                        </TabsList>
                    </div>
                </div>
                <TabsContent value="candidate">
                <form action={handlecandidateform}>
                        {
                            candidateForm.map((form)=>(
                        <div key={form.name}>
                                <Label className="text-xl">{form.label}</Label>
                                <div className="relative flex items-center mt-1 mb-4">
                                <Input 
                                name={form.name}
                                type={form.componentType}
                                placeholder={form.placeholder}
                                id={form.name}
                                className="w-full rounded-md h-[60px] px-4 border bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                value={candidateformData[form.name]}
                                onChange={(e)=>{
                                    setCandidateFormData({
                                        ...candidateformData,
                                        [e.target.name] : e.target.value
                                    })
                                }}
                                />
                                </div>
                        </div>
                            ))
                        }
                        <Button className="mt-5" type="submit">Onboard as Candidate</Button>
                    </form>
                </TabsContent>
                <TabsContent value="recruiter">
                    <form action={handlerecruiterform}>
                        {
                            recruiterForm.map((form)=>(
                                <div className="relative flex items-center mt-8">
                                <Input 
                                name={form.name}
                                placeholder={form.placeholder}
                                type={form.componentType}
                                id={form.name}
                                className="w-full rounded-md h-[60px] px-4 border bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                value={recruiterformData[form.name]}
                                onChange={(e)=>{
                                    setRecruiterFormData({
                                        ...recruiterformData,
                                        [e.target.name] : e.target.value
                                    })
                                }}
                                />
                                </div>
                            ))
                        }
                        <Button className="mt-5" type="submit">Onboard as Recruiter</Button>
                    </form>
                </TabsContent>
            </Tabs>
        </div>
     );
}

export default OnBoard;