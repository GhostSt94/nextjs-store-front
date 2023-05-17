import Link from "next/link"
import ProductImage from "./ProductImage"

type Props = {
  product: Product
}

export default function Product({ product }: Props) {

  const { id, title, price, description } = product
  return (
    <Link prefetch={false} href={`/product/${id}`} className="h-96 flex flex-col p-5 rounded border group hover:scale-105 transition-transform ease-out duration-200">
      <div className="relative max-h-72 flex-1">
        <ProductImage product={product} fill />
      </div>
      <div className="font-semibold flex items-center justify-between">
        <h3 className="w-44 truncate">{title}</h3>
        <h5>{price}</h5>
      </div>

      <div>
        <p className="italic text-xs w-64 line-clamp-2 text-gray-600">{description}</p>
      </div>
    </Link>
  )
}
