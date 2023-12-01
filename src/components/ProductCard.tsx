import { Product } from "@prisma/client";
import Link from "next/link";
import React from "react";
import PriceTag from "./PriceTag";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isNew = Date.now() - new Date(product.createdAt).getTime() < 1000*60*60*24*7
  return (
    <Link href={"/products/" + product.id}>
      <div className="card w-full bg-base-100 shadow-xl">
        <figure>
          <Image
            src={product.imgurl} // Adjust the width and height as needed
            width={800}
            height={400}
            alt={product.name}
            className="h-48 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.name}
          {isNew && <div className="badge badge-primary">New</div>}
          </h2>
          <p>{product.desc}</p>
          <PriceTag price={product.price}/>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
