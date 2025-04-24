import { SignIn } from "@clerk/nextjs";

export const metadata = {
    title: "Sign In to Your Account | Job Portal App",
    description: "Access your Job Portal account to manage applications, update your profile, and connect with top employers.",
}

export default function SignInPage() {
    return (
        <div className="flex items-center justify-center h-[80vh] w-full">
            <SignIn />
        </div>
    );
}
