import { CreditCardIcon } from "@heroicons/react/24/outline"

export default function Footer() {
  return (
    <footer className="border-t mt-28 flex justify-around items-center px-5 p-2 bg-primary-100 absolute bottom-0 w-full text-center italic">
      <div className="font-semibold">
        Footer
      </div>
      <div>
        Ghost 2023
      </div>
      <div>
        <CreditCardIcon className="w-6 h-6" />
      </div>
    </footer>
  )
}
