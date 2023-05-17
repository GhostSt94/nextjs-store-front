'use client'

import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { useParams, useRouter } from 'next/navigation'
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline'
import { StarIcon, ShoppingCartIcon, ArrowUpTrayIcon } from '@heroicons/react/24/solid'
import ProductImage from '@/components/product/ProductImage'
import Image from 'next/image'

export default function MyDialog() {
    // The open/closed state lives outside of the Dialog and is managed by you
    let [isOpen, setIsOpen] = useState(true)
    let [product, setProduct] = useState<Product>()
    let [isLoading, setIsLoading] = useState(false)
    const { id } = useParams()
    const router = useRouter()

    useEffect(() => {
        let getProduct = async () => {
            setIsLoading(true)
            const res = await fetch(`https://fakestoreapi.com/products/${id}`)
            const product: Product = await res.json()
            setProduct(product)
            setIsLoading(false)
        }
        getProduct()
    }, [id])

    function onClose() {
        // ...
        setIsOpen(false);
        router.back()
    }

    return (
        <Dialog open={isOpen} onClose={() => onClose()} className='relative z-50'>
            <div className="fixed inset-0 bg-black/30" aria-hidden='true' />
            <div className='fixed inset-0 overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4'>
                    <Dialog.Panel className='mx-auto max-w-3xl rounded bg-white p-10'>
                        {isLoading ? (
                            <Image
                                src='/assets/loader.svg'
                                width={40}
                                height={40}
                                alt='loader'
                            />
                        ) : (
                            <div className='flex gap-x-8 h-96'>
                                {product?.image && (
                                    <div className='relative w-72 h-full hidden md:inline'>
                                        <ProductImage product={product} fill />
                                    </div>)}

                                <div className='flex-1 flex flex-col'>
                                    <div className='flex-1'>
                                        <div>
                                            <h4 className='font-semibold'>{product?.title}</h4>
                                            <p className='font-medium text-sm'>{product?.price} $</p>
                                        </div>

                                        <div className='flex items-center text-sm my-4'>
                                            <p>({product?.rating.rate})</p>
                                            {product?.rating.rate && (
                                                <div className='flex items-center ml-2 mr-6'>
                                                    {Array.from(
                                                        { length: Math.floor(product?.rating.rate) },
                                                        (_, i) => (
                                                            <StarIcon key={i} className='h-4 w-4 text-yellow-500' />
                                                        )
                                                    )}

                                                    {Array.from(
                                                        { length: 5 - Math.floor(product?.rating.rate) },
                                                        (_, i) => (
                                                            <StarIconOutline key={i} className='h-4 w-4 text-yellow-500' />
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <p className='line-clamp-5 text-sm'>{product?.description}</p>
                                    </div>
                                    <div className='space-y-3 text-sm'>
                                        <button className='button py-3 w-full border bg-lblue-200 text-white border-transparent hover:text-black hover:border-lblue-200 hover:bg-transparent flex justify-center items-center gap-2 rounded'>
                                            <ShoppingCartIcon className='h-4 w-4' />
                                            Add to cart
                                        </button>
                                        <button onClick={() => window.location.reload()} className='button py-3 w-full border hover:bg-lblue-200 hover:text-white hover:border-transparent border-lblue-200 bg-transparent flex justify-center items-center gap-2 rounded'>
                                            <ArrowUpTrayIcon className='h-4 w-4' />
                                            View full details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    )
}
