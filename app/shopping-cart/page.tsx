import { CartItems, Total } from "@/components/cart/CartItem"
import { ShoppingBagIcon, ArrowRightIcon } from "@heroicons/react/24/solid"

export default function CartPage() {
    return (
        <div className="divide-y mt-36 flex flex-col items-center justify-center">
            <div className="flex items-end gap-3 flex-1 mb-5">
                <ShoppingBagIcon className="w-10 h-10" />
                <h1 className="text-2xl font-semibold"> My Shopping Cart</h1>
            </div>
            <div className="min-w-[60%] pt-5 flex flex-col gap-3 px-3 lg:px-0">
                <CartItems />
            </div>
            <div className="min-w-[60%] mt-3 pt-3">
                <Total />
                <button className="rounded-full bg-primary-200 hover:bg-primary-300 text-white font-semibold py-2 px-4 flex gap-1 items-center mt-5 lg:mt-8 mx-auto">Proceed to checkout <ArrowRightIcon className="w-4 h-4" /></button>
            </div>
        </div>
    )
}
