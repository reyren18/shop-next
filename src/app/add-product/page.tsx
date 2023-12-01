import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Add Product- ShopHub",
};

async function appendProduct(formData: FormData) {
  "use server"; //this function will be performed on the server side
  const name = formData.get("name")?.toString(); // gets the name of the product from the name input field 
  const desc = formData.get("desc")?.toString();
  const imgurl = formData.get("imgurl")?.toString();
  const price = Number(formData.get("price")||0);

  if(!name || !desc || !imgurl || !price){
    throw Error("Missing important parameters!")
  }

  // prisma.product is a Prisma Client object that represents the Product model in your Prisma schema, can perfrom CRUD using it 
  await prisma.product.create({
    data: {name, desc, imgurl, price},
  });

  redirect("/")
}

const AddProduct = () => {
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form action={appendProduct}>
        <input
          type="text"
          required
          name="name"
          placeholder="Name"
          className="input-bordered input mb-3 w-full"
        />
        <textarea
          name="desc"
          placeholder="description"
          className="textarea-bordered textarea textarea-lg mb-3 w-full"
        ></textarea>
        <input
          type="url"
          required
          name="imgurl"
          placeholder="ImageUrl"
          className="input-bordered input mb-3 w-full"
        />
        <input
          type="number"
          required
          name="price"
          placeholder="Price"
          className="input-bordered input mb-3 w-full"
        />
        <FormSubmitButton className=" btn-block">
          Add Product!
        </FormSubmitButton>
      </form>
    </div>
  );
};
export default AddProduct;
