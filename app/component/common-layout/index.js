import { currentUser } from "@clerk/nextjs/server";
import Header from "../header";
import { fetchProfileInfo } from "@/action";

async function CommonLayout({ children }) {

    const user=await currentUser()

    const profile=await fetchProfileInfo(user?.id)

    return (
        <div className="mx-auto max-w-7xl p-6 lg:px-8">
            {/* Header Component */}
            <Header profile={profile} user={JSON.parse(JSON.stringify(user))}/>
            {/* Header Component */}

            {/* Main Contant */}
            <main>{children}</main>
            {/* Main Contant */}
        </div>
    );
}

export default CommonLayout;