'use client'

import { useShoppingCart } from "../context/CartContext"
import { XMarkIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import { CartItems, Total } from "./CartItem"
import Link from "next/link"

export default function OffCanvaCart() {
    const { closeCart, isOpen } = useShoppingCart()

    return (
        <>
            {isOpen && (<div className="bg-black/70 fixed w-full h-full top-0 left-0 z-50 transitionDiv">
                <div className="absolute top-0 right-0 bg-white h-full w-[85%] sm:w-[50%] md:[40%] lg:w-[30%] p-4 flex flex-col justify-between gap-y-10">
                    <div className="flex justify-between">
                        <Link href='/shopping-cart' onClick={() => closeCart()} className="font-medium hover:underline flex gap-2">Shopping Cart <ArrowTopRightOnSquareIcon className="w-4 h-4 text-gray-400" /></Link>
                        <XMarkIcon className="w-7 h-7 p-1 rounded-full cursor-pointer hover:bg-black/10" onClick={() => closeCart()} />
                    </div>

                    <div className="overflow-y-auto flex flex-col gap-3 flex-1 transitionDiv">
                        <CartItems />
                    </div>
                    <Total />
                </div>
            </div>)}
        </>
    )
}
