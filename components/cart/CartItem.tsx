'use client'

import { useState, useEffect } from "react"
import { useShoppingCart } from "../context/CartContext"
import ProductImage from "../product/ProductImage"
import { TrashIcon } from "@heroicons/react/24/outline"
import { formatCurrency } from "@/utils"

type Props = {
    data: CartItem
}

function CartItem({ data }: Props) {

    const { increaseItemQuantity, decreaseItemQuantity, removeFromCart, addOrdreWithPrice } = useShoppingCart()
    const [item, setItem] = useState<Product>()

    useEffect(() => {
        let getItem = async () => {
            let res = await fetch(`https://fakestoreapi.com/products/${data.id}`)
            let item_ = await res.json()

            setItem(item_)
            item_ && addOrdreWithPrice({ id: item_.id, price: item_.price, quantity: data.quantity })
        }
        getItem()
    }, [])

    return (
        <div className="flex justify-between items-center gap-3">
            <div className="max-w-32 max-h-32">
                {item?.image && (<div className="w-10 h-30"><ProductImage key={item.id} product={item} /></div>)}
            </div>
            <h4 className="font-semibold text-sm line-clamp-2 flex-1" title={item?.title}>
                {item?.title}
            </h4>
            <h3>
                {item?.price && formatCurrency(item?.price)}
            </h3>
            <div className="flex items-center border text-white font-bold">
                <button className="p-1 bg-primary-200 hover:bg-primary-300 hover:scale-105 hover:shadow" onClick={() => decreaseItemQuantity(data.id, { id: data.id, price: item?.price || 0, quantity: data.quantity })}>-</button>
                <h5 className="font-semibold text-primary-200 px-2">{data.quantity}</h5>
                <button className="p-1 bg-primary-200 hover:bg-primary-300 hover:scale-105 hover:shadow" onClick={() => increaseItemQuantity(data.id, { id: data.id, price: item?.price || 0, quantity: data.quantity })}>+</button>
            </div>
            <div>
                <TrashIcon className="w-4 h-4 hover:text-red-400 cursor-pointer hover:scale-105" onClick={() => removeFromCart(data.id)} />
            </div>
        </div>
    )
}

function CartItems() {
    const { cartItems } = useShoppingCart()

    return (
        <>
            {
                cartItems.length ?
                    (cartItems.map(item => <CartItem key={item.id} data={item} />))
                    : (<h1 className="text-gray-500 text-center my-10">No item added to cart</h1>)
            }
        </>
    )
}

function Total() {
    const { total } = useShoppingCart()

    return (
        <div className="flex justify-between">
            <h5 className="font-semibold">Total:</h5>
            <h1>{formatCurrency(total())}</h1>
        </div>
    )
}

export { CartItems, Total, CartItem }