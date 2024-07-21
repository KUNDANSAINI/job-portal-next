'use server'

import connectToDB from "@/database"
import Job from "@/models/jobs"
import Profile from "@/models/profile"
import { revalidatePath } from "next/cache"


export async function createRecruiterProfile(formData,pathToRevalidate){
    await connectToDB()
    try{
        const newRecord=await Profile.create(formData)
        revalidatePath(pathToRevalidate)
        if(newRecord){
            return({
                success:true,
                message:"Successfully Created!"
            })
        }else{
            return({
                success:false,
                message:"Something Went Wrong. Please Try Again"
            })
        }
    }catch(error){
        console.log(error)
        return({
            success:false,
            message:"Something Went Wrong! Please try Again."
        })
    }
}


export async function fetchProfileInfo(id){
    await connectToDB()
    try{
        const profileInfo=await Profile.findOne({userId: id})

        if(profileInfo){
            return({
                success:true,
                data:JSON.parse(JSON.stringify(profileInfo))
            })
        }else{
            return({
                success:false,
                message:"Something Went Wrong. Please Try Again!"
            })
        }
    }catch(error){
        console.log(error)
        return({
            success:false,
            message:"Something Went Wrong! Please Try Again."
        })
    }
}


// Create Job Action Function

export async function createJob(formData,pathToRevalidate){
    await connectToDB();
    try{
        const newJobs=await Job.create(formData)
        revalidatePath(pathToRevalidate)
        if(newJobs){
            return({
                success:true,
                message:"Job Created!"
            })
        }else{
            return({
                success:false,
                message:"Somthing Went Wrong! Please Try Again."
            })
        }

    }catch(error){
        console.log(error)
        return({
            success:false,
            message:"An Error Occured"
        })
    }
}

// Fetch All Job Function

// recruiter All Job Fetch

export async function fetchRecruiterAllJobs(id){
    await connectToDB()
    try{
        const recruiterJobs=await Job.find({recruiterId:id})
        if(recruiterJobs){
            return({
                success:true,
                data:JSON.parse(JSON.stringify(recruiterJobs))
            })

        }else{
            return({
                success:false,
                message:"Something Went Wrong. Please Try Again!"
            })
        }

    }catch(error){
        console.log(error)
        return({
            success:false,
            message:"An Error Occured"
        })
    }
}

// candidate All Jobs

export async function fetchCandidateAllJobs(){
    await connectToDB()
    try{
        const candidateJobs=await Job.find()
        if(candidateJobs){
            return({
                success:true,
                data:JSON.parse(JSON.stringify(candidateJobs))
            })

        }else{
            return({
                success:false,
                message:"Something Went Wrong. Please Try Again!"
            })
        }

    }catch(error){
        console.log(error)
        return({
            success:false,
            message:"An Error Occured"
        })
    }
}