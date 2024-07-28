'use server'

import connectToDB from "@/database"
import Application from "@/models/application"
import Job from "@/models/jobs"
import Profile from "@/models/profile"
import { revalidatePath } from "next/cache"


// Create Recruiter Profile

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

// Create Candidate Profile

export async function createCandidateProfile(formData,pathToRevalidate){
    await connectToDB();
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
            message:"Bad Request"
        })
    }
}


// User Profile Information Fetch

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

export async function fetchCandidateAllJobs(filterParams = {}){
    await connectToDB()
    try{
        let updatedParams={}
        Object.keys(filterParams).forEach((filterKey)=>{
            updatedParams[filterKey] = { $in :filterParams[filterKey].split(',')}
        })
        const candidateJobs=await Job.find(filterParams && Object.keys(filterParams).length > 0 ? updatedParams : {})
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

// Create Job Application

export async function createJobApplication(data,pathToRevalidate){
    await connectToDB();
    try{
        const jobApplication=await Application.create(data)
        revalidatePath(pathToRevalidate)
        if(jobApplication){
            return({
                success:true,
                message:"Successfully Apply"
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
            message:"Bad Request"
        })
    }
}

// Fetch Job Application Recriuter

export async function fetchRecriuterApplication(recriuterID){
    await connectToDB();
    try{
        const recriuterApplication=await Application.find({recriuterUserID:recriuterID})
        if(recriuterApplication){
            return({
                success:true,
                data:JSON.parse(JSON.stringify(recriuterApplication))
            })
        }else{
            return({
                success:false,
                message:"Something Went Wrong, Please Try Again!"
            })
        }
    }catch(error){
        console.log(error)
        return({
            success:false,
            message:"Bad Request"
        })
    }
}

// Fetch Job Application Candidate

export async function fetchCandidateApplication(candidateID){
    await connectToDB();
    try{
        const candidateApplication=await Application.find({candidateUserID:candidateID})
        if(candidateApplication){
            return({
                success:true,
                data:JSON.parse(JSON.stringify(candidateApplication))
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
            message:"Bad Request"
        })
    }
}

// Updateing Job Application

export async function updateJobApplication(data,pathToRevalidate){
    await connectToDB();
    try{
        const {recriuterUserID,name,email,candidateUserID,status,jobID,jobAppliedDate,_id}=data
        const result=await Application.findByIdAndUpdate({_id:_id},{recriuterUserID,name,email,candidateUserID,status,jobID,jobAppliedDate},{new:true})
        revalidatePath(pathToRevalidate)
        if(result){
            return({
                success:true,
                message:"Successfully Update!"
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
            message:"Bad Request"
        })
    }

}



// Fetch Candidate Details By ID

export async function fetchCandidateDetailsID(candidateID){
    await connectToDB();
    try{
        const result=await Profile.findOne({userId:candidateID})
        if(result){
            return({
                success:true,
                data:JSON.parse(JSON.stringify(result))
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
            message:"Bad Request"
        })
    }
}

// Create Filter Catagory

export async function createFilterCatagory(){
    await connectToDB();
    try{
        const fetchAllJob=await Job.find({})
        if(fetchAllJob){
            return({
                success:true,
                data:JSON.parse(JSON.stringify(fetchAllJob))
            })
        }else{
            return({
                success:false,
                message:"Something Went Wrong. Please try Again!"
            })
        }

    }catch(error){
        console.log(error)
        return({
            success:false,
            message:'Bad Request'
        })
    }
}


// Candidate Profile Update Function

export async function candidateProfileUpdate(data,pathToRevalidate){
    await connectToDB();
    try{
        const {userId,role,email,isPremiumUser,candidateInfo,_id}=data
        const updateCandidateProfile=await Profile.findOneAndUpdate({_id:_id},{
            userId,role,email,isPremiumUser,candidateInfo
        },{new: true})
        revalidatePath(pathToRevalidate)

    if(updateCandidateProfile){
        return({
            success:true,
            message:"Successfully Updated"
        })
    }else{
        return({
            success:false,
            message:"Something Went Wrong! Please Try Again."
        })
    }

    }catch(error){
        console.log(error)
        return({
            success:false,
            message:"Bad Request"
        })
    }
}

// Recriuter Profile Update Funcation

export async function recriuterProfileUpdate(data,pathToRevalidate){
    await connectToDB();
    try{
        const {userId,role,email,isPremiumUser,recruiterInfo,_id}=data
        const updateRecriuterProfile=await Profile.findOneAndUpdate({_id:_id},{
            userId,role,email,isPremiumUser,recruiterInfo
        },{new: true})
        revalidatePath(pathToRevalidate)

    if(updateRecriuterProfile){
        return({
            success:true,
            message:"Successfully Updated"
        })
    }else{
        return({
            success:false,
            message:"Something Went Wrong! Please Try Again."
        })
    }
    }catch(error){
        console.log(error)
        return({
            success:false,
            message:"Bad Request"
        })
    }
}