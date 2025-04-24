import { currentUser } from "@clerk/nextjs/server";
import MemberShipPage from "../component/member-ship";
import { fetchProfileInfo } from "@/action";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Membership Plans | Job Portal App",
    description: "Unlock premium features like priority job listings, profile boosts, and expert career support. Choose the right membership plan for your job search success.",
  };
  

async function MemberShip() {

    const user=await currentUser()

    if(!user){
        redirect('/sign-in')
    }

    const profileInfo=await fetchProfileInfo(user?.id)
    if(!profileInfo?.data){
        redirect('/onboard')
    }

    return (  
        <MemberShipPage profileInfo={profileInfo} />
    );
}

export default MemberShip;