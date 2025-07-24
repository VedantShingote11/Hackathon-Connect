import { SignIn } from '@clerk/clerk-react'

const SignInPage = () => {
    return (
        <div className='min-h-[100vh] flex items-center justify-center'>
            <SignIn path='/sign-in' routing='path' signUpUrl='/sign-up' afterSignInUrl={'/dashboard'}/>
        </div>
    )
}

export default SignInPage