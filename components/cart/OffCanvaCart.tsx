'use client'

import { useShoppingCart } from "../context/CartContext"
import { XMarkIcon } from "@heroicons/react/24/outline"
import CartItem from "./CartItem"
import { formatCurrency } from "@/utils"

export default function OffCanvaCart() {
    const { closeCart, isOpen, cartItems } = useShoppingCart()

    return (
        <>
            {isOpen && (<div className="bg-black/70 fixed w-full h-full top-0 left-0 z-50 transitionDiv">
                <div className="absolute top-0 right-0 bg-white h-full w-[30%] p-4 flex flex-col justify-between gap-y-10">
                    <div className="flex justify-between">
                        <h1 className="font-medium">Shopping Cart</h1>
                        <XMarkIcon className="w-7 h-7 p-1 rounded-full cursor-pointer hover:bg-black/10" onClick={() => closeCart()} />
                    </div>

                    <div className="overflow-y-auto flex flex-col gap-3 flex-1 cartItems">
                        {cartItems.map(item => <CartItem key={item.id} data={item} />)}
                    </div>
                    <div className="flex justify-between">
                        {/* TODO: set Total */}
                        <h5 className="font-semibold">Total: (TODO)</h5>
                        <h1>{formatCurrency(0)}</h1>
                    </div>
                </div>
            </div>)}
        </>
    )
}