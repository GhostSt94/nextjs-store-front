'use client'

import { useShoppingCart } from "../context/CartContext"
import { XMarkIcon } from "@heroicons/react/24/outline"
import CartItem from "./CartItem"
import { formatCurrency } from "@/utils"

export default function OffCanvaCart() {
    const { closeCart, isOpen, cartItems, total } = useShoppingCart()

    return (
        <>
            {isOpen && (<div className="bg-black/70 fixed w-full h-full top-0 left-0 z-50 transitionDiv">
                <div className="absolute top-0 right-0 bg-white h-full w-[85%] sm:w-[50%] md:[40%] lg:w-[30%] p-4 flex flex-col justify-between gap-y-10">
                    <div className="flex justify-between">
                        <h1 className="font-medium">Shopping Cart</h1>
                        <XMarkIcon className="w-7 h-7 p-1 rounded-full cursor-pointer hover:bg-black/10" onClick={() => closeCart()} />
                    </div>

                    <div className="overflow-y-auto flex flex-col gap-3 flex-1 cartItems">
                        {
                            cartItems.length ?
                                (cartItems.map(item => <CartItem key={item.id} data={item} />))
                                : (<h1 className="text-gray-500 text-center my-10">No item added to cart</h1>)
                        }
                    </div>
                    <div className="flex justify-between">
                        {/* TODO: set Total */}
                        <h5 className="font-semibold">Total:</h5>
                        <h1>{formatCurrency(total())}</h1>
                    </div>
                </div>
            </div>)}
        </>
    )
}
