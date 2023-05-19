type Product ={
    category: string,
    description: string,
    rating: {
      count: number,
      rate: number
    },
    price: number,
    image: string,
    title: string,
    id: number,
}
  
type CartItem = {
    id: number
    quantity: number
}