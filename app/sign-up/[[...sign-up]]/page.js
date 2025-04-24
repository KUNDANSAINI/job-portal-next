import { SignUp } from "@clerk/nextjs";

export const metadata = {
    title: "Create an Account | Job Portal App",
    description: "Join Job Portal App to discover top job opportunities, save listings, and apply with ease. Signing up is quick and free!",
};


function SignUpPage() {
    return (
        <div className="flex items-center justify-center h-[80vh] w-full">
            <SignUp />
        </div>

    );
}

export default SignUpPage;