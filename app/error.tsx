'use client'

import Image from "next/image"

export default function Error({ error, reset }: { error: { message: string }, reset: () => void }) {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/2 p-5 flex flex-col justify-around gap-5">
            <h3 className="text-black text-3xl font-semibold text-center">Something Went Wrong</h3>
            <Image
                src='/assets/server_down.svg'
                width={300}
                height={200}
                alt="not_found_svg"
                className="mx-auto"
            />
            <button onClick={() => {
                reset()
            }} className="p-1.5 border text-black hover:shadow hover:bg-primary-200 hover:text-white">Retry</button>
        </div>
    )
}
