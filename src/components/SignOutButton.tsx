'use client'
import { signOut } from 'next-auth/react'
import { FC } from 'react'

interface SignOutButtonProps { }

const SignOutButton: FC<SignOutButtonProps> = ({ }) => {
    const signUserOut = async () => {
        try {
            await signOut()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <button className="font-semibold text-sm" onClick={signUserOut}>
            Sign out
        </button>
    )
}

export default SignOutButton