import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
    return (
        <div className="min-h-[100vh] flex items-center justify-center">
            <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" afterSignUpUrl={"/sign-in"} />
        </div>
    )
}

export default SignUpPage