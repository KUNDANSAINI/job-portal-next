'use client'

import { filterMenuData, formUrlQuery } from "@/utails";
import CandidateJobCard from "../candidate-job-card";
import PostNewJobs from "../post-new-job";
import RecruiterJobCard from "../recruiter-job-card";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";



function Jobs(params) {
    const {user,profileInfo,joblisting, fetchAllApplication,filterCatigory}=params

    const [filterParams,setFilterParams]=useState({})
    const searchParams=useSearchParams()
    const router=useRouter()

    const filterData = filterMenuData.map((item)=> ({
        id:item.id,
        name:item.label,
        option: [
            ...new Set(filterCatigory.data.map((listItem)=> listItem[item.id]))
        ]
    }))

   async function handlefilter(getID,getOption){
    let cpyFilterParams={...filterParams}
    const indexOfCurrentSection = Object.keys(cpyFilterParams).indexOf(getID)
    if(indexOfCurrentSection === -1){
        cpyFilterParams={
            ...cpyFilterParams,
            [getID] : [getOption]
        }
    }
    else{
        const indexOfCurrentOption=
        cpyFilterParams[getID].indexOf(getOption)
        if(indexOfCurrentOption === -1){
            cpyFilterParams[getID].push(getOption)
        }else{
            cpyFilterParams[getID].splice(indexOfCurrentOption,1)
        }
    }
    setFilterParams(cpyFilterParams)
    sessionStorage.setItem("filterParams",JSON.stringify(cpyFilterParams))
}

useEffect(()=>{
    setFilterParams(JSON.parse(sessionStorage.getItem("filterParams")))
},[])

    useEffect(()=>{
        if(filterParams && Object.keys(filterParams).length > 0){
            let url="";
            url= formUrlQuery({
                param:searchParams.toString(),
                dataToAdd: filterParams
            })
            router.push(url,{scroll:false})
        }
    },[filterParams,searchParams])
    //console.log(filterParams)

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
                            profileInfo?.role===  'candidate' ? (
                            <Menubar>
                                {
                                    filterData.map((filterMenu)=>(
                                    <MenubarMenu>
                                        <MenubarTrigger>{filterMenu.name}</MenubarTrigger>
                                        <MenubarContent>
                                        {
                                            filterMenu.option.map((option,index)=>(
                                                <MenubarItem key={index} className="flex items-center" onClick={()=>handlefilter(filterMenu.id,option)} >
                                                    <div className={`h-4 w-4 border rounded border-gray-900 
                                                        ${filterParams && Object.keys(filterParams).length > 0 &&
                                                            filterParams[filterMenu.id] && filterParams[filterMenu.id].indexOf(option) > -1 ?
                                                            "bg-black" : ""
                                                         }`} />
                                                    <Label className="ml-3 text-sm cursor-pointer text-gray-600">
                                                        {option}
                                                    </Label>
                                                </MenubarItem>
                                            ))
                                        }
                                        </MenubarContent>
                                    </MenubarMenu>
                                    ))
                                }
                            </Menubar>
                            ) : (<PostNewJobs user={user} profileInfo={profileInfo}/>)
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
                                                <CandidateJobCard fetchAllApplication={fetchAllApplication} profileInfo={profileInfo} jobs={jobs} key={index} />
                                            ) : (
                                                <RecruiterJobCard fetchAllApplication={fetchAllApplication} profileInfo={profileInfo} jobs={jobs} key={index}/>
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