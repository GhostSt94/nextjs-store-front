'use client'

import { ReactNode, createContext, useContext, useState } from "react"
import { useLocalStorage } from "@/hooks/useLocalStorage"

type CartContext = {
    openCart: () => void
    closeCart: () => void
    cartItems: CartItem[]
    cartQuantity: number
    getItemQuantity: (id: number) => number
    increaseItemQuantity: (id: number) => void
    decreaseItemQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    isProductAddedToCart: (id: number) => boolean
    isOpen: boolean
    //     setTotalPrice: (price: number) => void
    //     total: number
}

const CartContext = createContext({} as CartContext)

const useShoppingCart = () => useContext(CartContext)

const CartProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', [])
    // const [total, setTotal] = useState(0)
    const getItemQuantity = (id: number) => {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }
    const isProductAddedToCart = (id: number) => {
        return !!cartItems.find(item => item.id === id)
    }
    const increaseItemQuantity = (id: number) => {
        setCartItems((currItems) => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }]
            } else {
                return currItems.map(item => {
                    return item.id === id ? { ...item, quantity: item.quantity < 10 ? item.quantity + 1 : item.quantity } : item
                })
            }
        })
    }
    const decreaseItemQuantity = (id: number) => {
        setCartItems((currItems) => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id === id)
            } else {
                return currItems.map(item => {
                    return item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                })
            }
        })
    }
    const removeFromCart = (id: number) => {
        setCartItems((currItems) => currItems.filter(item => item.id !== id))
    }
    const cartQuantity = cartItems.length
    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)
    // const setTotalPrice = (price: number) => setTotal((currTotal) => currTotal + price)

    return (
        <CartContext.Provider value={{ cartItems, cartQuantity, isOpen, isProductAddedToCart, openCart, closeCart, getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeFromCart }}>
            {children}
        </CartContext.Provider>
    )
}

export { useShoppingCart, CartProvider }