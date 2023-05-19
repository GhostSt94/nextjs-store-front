'use client'

import { ShoppingCartIcon } from "@heroicons/react/24/outline"
import { useShoppingCart } from "../context/CartContext"

export default function CartIcon() {
    const { openCart, cartQuantity } = useShoppingCart()

    return (
        <button className="relative border hover:bg-primary-200 hover:text-white hover:border-transparent bg-transparent py-2 px-4 rounded-full"
            type="button" onClick={() => openCart()}>
            <ShoppingCartIcon className="h-6 w-6" />
            <span className="w-4 h-4 rounded-full absolute top-0 right-0 bg-red-500 text-white text-xs">{cartQuantity}</span>
        </button>
    )
}
