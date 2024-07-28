import { SignUp } from "@clerk/nextjs";

function SignUpPage() {
    return ( 
        <div className="flex items-center justify-center h-[80vh] w-full">
            <SignUp/>
        </div>
        
     );
}

export default SignUpPage;