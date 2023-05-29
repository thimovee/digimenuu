"use client"
import { FC, useState } from 'react';
import { signIn } from 'next-auth/react';
interface SignInButtonProps { }

const SignInButton: FC<SignInButtonProps> = ({ }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const signInWithGoogle = async () => {
        setIsLoading(true);

        try {
            await signIn('google')
        } catch (error) {
            alert("There was an error signing in. Please try again later.")
        }
    }

    return (
        <button className="my-auto bg-[#333333] px-5 py-3 rounded-md text-sm" onClick={signInWithGoogle}>
            Inloggen
        </button>
    );
}

export default SignInButton;