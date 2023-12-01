import HeroProduct from '@/components/HeroProduct'
import ProductCard from '@/components/ProductCard'
import { prisma } from '@/lib/db/prisma'
import React from 'react'

// this is a product list page
const Home = async() => {
  const products = await prisma.product.findMany({
    orderBy: {id: "desc"}
  })
  return (
   <>
    <HeroProduct product={products[0]}/>
     <div className='my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3'>
      {products.slice(1).map((product)=>(
        <ProductCard product={product} key={product.id}/>
      ))}
     </div>
   </>
  )
}

export default Home