import Image from "next/image"
import Link from "next/link"
import CartIcon from "../cart/CartIcon"
import LoginButton from "./login"

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
        {/* <button className="button border-2 bg-primary-200 text-white border-transparent hover:border-primary-200 hover:bg-transparent hover:text-black py-2 px-7 rounded-full">
          Log in
        </button> */}
        <LoginButton />
        <CartIcon />
      </div>
    </header>
  )
}
