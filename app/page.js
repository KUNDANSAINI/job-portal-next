import { fetchProfileInfo } from "@/action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Home() {

  const user= await currentUser()
  //console.log(user)

  const profile=await fetchProfileInfo(user?.id)

  if(user && !profile.data?._id) redirect('/onboard')

  return (
    <div>
      Main Contant
    </div>
  );
}

export default Home;