import { currentUser } from "@clerk/nextjs/server";
import AccountInfo from "../component/account-info";
import { fetchProfileInfo } from "@/action";
import { redirect } from "next/navigation";

async function AccountPage() {

    const user=await currentUser()

    if(!user){
        redirect('/sign-in')
    }

    const profileInfo=await fetchProfileInfo(user?.id)

    if(!profileInfo){
        redirect('/onboard')
    }

    return ( 
        <AccountInfo profileInfo={profileInfo} />
     );
}

export default AccountPage;