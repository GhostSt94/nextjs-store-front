import Product from "@/components/product/ProductCard"

export default async function Home() {

  const res = await fetch('https://fakestoreapi.com/products', { next: { revalidate: 200 } })
  const products: Product[] = await res.json()

  return (
    <main className="min-h-screen max-w-7xl mx-auto px-8 xl:px-0 mt-48">
      <section className="flex flex-col space-y-12 pb-44">
        <h1 className="text-5xl uppercase text-center">Deals of the day</h1>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  )
}
