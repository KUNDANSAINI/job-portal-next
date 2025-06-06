import { fetchProfileInfo } from "@/action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import HomePageButtonControl from "./component/homepage-button-control";
import Image from "next/image";

export const metadata = {
  title: "Find Your Dream Job | Job Portal App",
  description: "Explore thousands of job opportunities, connect with top companies, and take the next step in your career with Job Portal App.",
};


async function Home() {

  const user = await currentUser()
  //console.log(user)

  const profileInfo = await fetchProfileInfo(user?.id)

  if (user && !profileInfo?.data?._id) redirect('/onboard')

  return (
    <>
      <div className="bg-white">
        <div className=" relative w-full">
          <div className="min-h-screen flex">
            <div className="container m-auto p-0">
              <div className="flex items-center flex-wrap gap-12 lg:gap-0">
                  <div className="lg:w-5/12 space-y-8">
                      <span className="flex space-x-2">
                        <span className="block w-14 mb-2 border-b-2 border-gray-700"></span>
                        <span className="font-medium text-gray-600">One Stop Solution To Find Jobs</span>
                      </span>
                      <h1 className="text-4xl font-bold md:text-6xl">
                        The Best <br/> Job Portal App
                      </h1>
                      <p className="text-xl text-gray-700">Find Best Jobs From Top Product Based Companies And Build Your Career</p>
                      <HomePageButtonControl user={JSON.parse(JSON.stringify(user))} profileInfo={profileInfo} />
                  </div>
                  <div className="hidden relative md:block lg:w-7/12">
                    <Image
                      src="/images/recruitment.avif"
                      alt="Job Portal"
                      width={700}
                      height={700}
                      loading="lazy"
                      className=" relative ml-auto"
                    />
                  </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Home;
