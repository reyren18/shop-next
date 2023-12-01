import { cookies } from "next/dist/client/components/headers";
import { prisma } from "./prisma";

async function getCart() {
    const localCart = cookies().get("localCart")?.value;
    const cart = localCart
      ? await prisma.cart.findUnique({
          where: { id: localCart },
          include: { items: { include: { product: true } } },
        })
      : null;
  
    if (cart == null) {
      return null;
    }
  
    // Calculate the size of the cart
    const size = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  
    // Calculate the subtotal of the cart
    const subtotal = cart.items.reduce((acc, item) => {
      const productPrice = item.product.price;
      const quantity = item.quantity;
      return acc + productPrice * quantity;
    }, 0);
  
    return {
      ...cart,
      size,
      subtotal,
    };
  }

export async function createCart() {
  const newCart = await prisma.cart.create({
    data: {},
  });
  cookies().set("localCart", newCart.id); // need to store cart ID so that we can differentiate when it is anon and when logged in
}
