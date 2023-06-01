import SignInButton from "@/components/SignInButton";
import SignOutButton from "@/components/SignOutButton";
import { db } from "@/lib/db";
import { Check, ShoppingCart } from "lucide-react";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import formatCurrency from "@/lib/formatCurrency";
import { differenceInMonths } from 'date-fns';
import Hero from "@/components/Hero";
import AddToCartButton from "@/components/AddToCart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id
  const allProducts = await db.product.findMany()
  const addToCart = async (productId: string) => {
    "use server"
    if (userId) {
      await db.shoppingCart.upsert({
        where: {
          userId: userId,
        },
        create: {
          userId: userId,
          products: {
            connect: {
              id: productId,
            },
          },
        },
        update: {
          products: {
            connect: {
              id: productId,
            },
          },
        },
      });
      revalidatePath("/");
    }
  };

  const isRecentlyUpdated = (updatedAt: Date) => {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    return differenceInMonths(updatedAt, lastMonth) === 0;
  };

  return (
    <>
      <Hero />
      <section className="mt-16 w-full bg-[#f1fafe]">
        <div className="w-3/4 mx-auto pb-20 grid grid-cols-4">
          {allProducts.map((product) => (
            <article className="flex flex-col shadow-xl rounded-t-md relative max-w-[320px] mt-20" key={product.id}>
              {product.discount && product.discount > 0 && (
                <span className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 rounded-tl-md rounded-br-md">
                  SALE
                </span>
              )}
              <Image className="rounded-t-md max-h-[200px] object-cover" src={product.image!} width={320} height={200} alt={product.name} />
              <div className="p-5">
                <div className="flex justify-between">
                  <h2 className="text-base font-medium text-slate-800">{product.name}</h2>
                  <h2 className="font-semibold text-lg">
                    {formatCurrency(product.price, product.discount!)}
                  </h2>
                </div>
                <p className="text-slate-600 text-sm my-4">
                  {product.description && product.description.split(' ').slice(0, 14).join(' ')}...
                </p>
                {isRecentlyUpdated(product.updatedAt) && (
                  <button className="px-2 py-[3px] rounded-full my-8 bg-[#1ab744] font-medium text-slate-200 text-sm max-w-fit flex gap-1">
                    <Check size={17} className="my-auto" strokeWidth={3} />
                    Recent geüpdatet
                  </button>
                )}
                <div className="flex justify-between">
                  <Link href={`/product/${product.id}`} className="bg-[#292929] text-white w-[130px] py-2 rounded-sm text-center">Details</Link>
                  <AddToCartButton productId={product.id} addToCart={addToCart} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
