import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
  return (
    <header className="flex items-center px-4 md:px-12 py-2 justify-between fixed top-0 w-full bg-white z-50 shadow">
      <Link href='/'>
        <Image
          src='/assets/logo.svg'
          width={110}
          height={90}
          alt="store logo"
        />
      </Link>

      <div className="flex items-center space-x-2.5 text-sm font-semibold">
        <button className="button border-2 bg-lblue-200 text-white border-transparent hover:border-lblue-200 hover:bg-transparent hover:text-black py-2 px-7 rounded">
          Log in
        </button>
        <button className="button border-2 hover:bg-lblue-200 hover:text-white hover:border-transparent border-lblue-200 bg-transparent py-2 px-7 rounded">
          Sign up
        </button>
      </div>
    </header>
  )
}
