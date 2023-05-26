'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"

export default function LoginButton() {

    const { data: session } = useSession()
    return (
        <>
            {session ? (
                <>
                    {session.user?.image ? (<Image
                        src={session.user?.image}
                        width={40}
                        height={40}
                        alt="profile_image"
                        className="rounded-full"
                    />) : (<h4 className="text-gray-500">{session.user?.name}</h4>)}
                    <button onClick={() => signOut()} className="border border-transparent p-2 rounded-full hover:border-gray-200">
                        <ArrowRightOnRectangleIcon className="w-6 h-6" />
                    </button>
                </>
            ) : (
                <button onClick={() => signIn()} className="button border-2 bg-primary-200 text-white border-transparent hover:border-primary-200 hover:bg-transparent hover:text-black py-2 px-7 rounded-full">
                    Log in
                </button>
            )}
        </>
    )
}
