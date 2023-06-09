import ProductImage from "@/components/product/ProductImage"
import { notFound } from 'next/navigation'
import { formatCurrency } from "@/utils"
import AddToCart from "@/components/cart/AddToCart"

type Props = {
  params: {
    id: string
  }
}

export default async function ProductPage({ params: { id } }: Props) {
  try {

    const res = await fetch(`https://fakestoreapi.com/products/${id}`, { next: { revalidate: 200 } })
    const product: Product = await res.json()

    return (
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 mt-48">
        <ProductImage product={product} />

        <div className="divide-y">
          <div className='space-y-2 pb-8'>
            <h1 className="text-2xl md:text-4xl font-bold">{product.title}</h1>
            <h2 className="text-gray-500 font-bold text-xl md:text-4xl">{formatCurrency(product.price)}</h2>
          </div>
          <div className="py-8">
            <p className="text-xs md:text-sm">
              {product.description}
            </p>
          </div>
          <div>
            <AddToCart product={product} />
          </div>
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
}
