import { currentUser } from "@clerk/nextjs/server";
import MemberShipPage from "../component/member-ship";
import { fetchProfileInfo } from "@/action";
import { redirect } from "next/navigation";

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