
import Image from "next/image"

export default function NotFound() {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 pt-3">
            <Image
                src='/assets/not_found.svg'
                width={300}
                height={200}
                alt="not_found_svg"
                className="mx-auto"
            />
        </div>
    )
}
