import { SignIn } from "@clerk/nextjs";


export default function SignInPage() {
    return ( 
        <div className="flex items-center justify-center h-[80vh] w-full">
            <SignIn/>
        </div>
     );
}
