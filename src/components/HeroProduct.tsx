import { Product } from '@prisma/client';
import Image from 'next/image';
import React from 'react'
import PriceTag from './PriceTag';
import Link from 'next/link';

interface ProductCardProps {
    product: Product;
  }

const HeroProduct = ({product}:ProductCardProps) => {
  return (
    <Link href={"/products/" + product.id} className="hero  bg-base-200 rounded-xl">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <Image src={product.imgurl} alt={product.name} className="max-w-sm rounded-lg shadow-2xl" width={400} height={800} priority></Image>
    <div>
      <h1 className="text-5xl font-bold">{product.name}</h1>
      <p className="py-6">{product.desc}</p>
      <button className="btn btn-primary">Check it out!</button>
    </div>
  </div>
</Link>
  )
}

export default HeroProduct