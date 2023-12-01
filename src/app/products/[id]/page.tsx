import PriceTag from "@/components/PriceTag";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import CartButton from "./CartButton";

interface ProductPageProps {
  params: {
    id: string;
  };
}

// Caching to avoid multiple calls, once the product gets cached, it doesn't take any time to load.
const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();
  return product;
});

// Useful for SEO and social sharing
export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);

  return {
    title: product.name + " - ShopHub",
    description: product.desc,
    openGraph: {
      images: [{ url: product.imgurl }],
    },
  };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);

  return (
    <div className="flex flex-col lg:flex-row items-center">
      <Image
        src={product.imgurl}
        alt={product.name}
        width={500}
        height={500}
        className="rounded-lg"
        priority
      />

      <div className="ml-4">
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
        <PriceTag price={product.price} className="mt-2 text-2xl font-semibold text-green-600" />
        <p className="mt-4 text-gray-600 text-lg">{product.desc}</p>
        <div className="mt-4">
        <CartButton productId={product.id} />
      </div>
      </div>

    </div>
  );
}
