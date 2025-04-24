import { currentUser } from "@clerk/nextjs/server";
import OnBoard from "../component/on-board";
import { fetchProfileInfo } from "@/action";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Get Started | Job Portal App",
    description: "Complete your profile, set your job preferences, and start exploring tailored opportunities. Let’s get you hired!",
  };
  

async function OnBoardPage() {

    const user=await currentUser()
    //console.log(user)

    const profile= await fetchProfileInfo(user?.id)

    if(profile.data?._id){
        if(profile.data.role === 'recruiter' && !profile.data.isPremiumUser){
            redirect('/membership')
        }else{
            redirect('/')
        }
    }else{ 
        return ( 
            <OnBoard />
        );
    }
    }

export default OnBoardPage;