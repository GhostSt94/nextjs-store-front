'use client'

import { ReactNode, createContext, useContext, useState } from "react"
import { useLocalStorage } from "@/hooks/useLocalStorage"

type CartContext = {
    openCart: () => void
    closeCart: () => void
    cartItems: CartItem[]
    cartQuantity: number
    getItemQuantity: (id: number) => number
    increaseItemQuantity: (id: number, item_?: OrderPrice) => void
    decreaseItemQuantity: (id: number, item_?: OrderPrice) => void
    removeFromCart: (id: number) => void
    isProductAddedToCart: (id: number) => boolean
    isOpen: boolean
    total: () => number
}
type OrderPrice = {
    id: number, price: number, quantity: number
}

const CartContext = createContext({} as CartContext)

const useShoppingCart = () => useContext(CartContext)

const CartProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', [])
    // const [total, setTotal] = useState(0)
    const [ordersWithPrice, setOrdersWithPrice] = useState<OrderPrice[]>([])
    const getItemQuantity = (id: number) => {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }
    const isProductAddedToCart = (id: number) => {
        return !!cartItems.find(item => item.id === id)
    }
    const increaseItemQuantity = (id: number, item_?: OrderPrice) => {
        setCartItems((currItems) => {
            if (currItems.find(item => item.id === id) == null) {
                item_ && setOrdersWithPrice(prev => [...prev, item_])
                return [...currItems, { id, quantity: 1 }]
            } else {
                item_ && setOrdersWithPrice(prev => prev.map(el => (el.id === item_.id ? { ...el, quantity: el.quantity < 10 ? el.quantity + 1 : el.quantity } : el)))
                return currItems.map(item => {
                    return item.id === id ? { ...item, quantity: item.quantity < 10 ? item.quantity + 1 : item.quantity } : item
                })
            }
        })
    }
    const decreaseItemQuantity = (id: number, item_?: OrderPrice) => {
        setCartItems((currItems) => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id === id)
            } else {
                item_ && setOrdersWithPrice(prev => prev.map(el => (el.id === item_.id ? { ...el, quantity: el.quantity - 1 } : el)))
                return currItems.map(item => {
                    return item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                })
            }
        })
    }
    const removeFromCart = (id: number) => {
        setOrdersWithPrice(prev => prev.filter(el => el.id !== id))
        setCartItems((currItems) => currItems.filter(item => item.id !== id))
    }
    const cartQuantity = cartItems.length
    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)
    const total = () => ordersWithPrice.reduce((total, { price, quantity }) => total + (price * quantity), 0)

    return (
        <CartContext.Provider value={{ total, cartItems, cartQuantity, isOpen, isProductAddedToCart, openCart, closeCart, getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeFromCart }}>
            {children}
        </CartContext.Provider>
    )
}

export { useShoppingCart, CartProvider }