'use client'
import { ShoppingCartIcon, CheckIcon } from '@heroicons/react/24/solid'
import { useShoppingCart } from '@/components/context/CartContext'

export default function AddToCart({ product }: { product: Product }) {

    const { isProductAddedToCart, increaseItemQuantity } = useShoppingCart()
    return (
        <>
            {product?.id && isProductAddedToCart(product.id) ?
                (
                    <div className='flex justify-center items-center gap-2 text-green-600 py-2 md:py-3'>
                        <CheckIcon className='h-4 w-4' />
                        <h5> Product added to cart</h5>
                    </div>
                ) : (
                    <button onClick={() => product?.id && increaseItemQuantity(product.id, { id: product.id, price: product.price, quantity: 1 })} className='button py-2 md:py-3 w-full border bg-primary-200 text-white border-transparent hover:text-black hover:border-primary-200 hover:bg-transparent flex justify-center items-center gap-2 rounded'>
                        <ShoppingCartIcon className='h-4 w-4' />
                        Add to cart
                    </button>
                )
            }
        </>
    )
}
